import 'dotenv/config';
import { google } from 'googleapis';

const DEFAULT_TELEGRAM_BOT_TOKEN = "8964853536:AAHuRNm_hY-YQtveBD1HlmthN4I5xpVzM8U";
const DEFAULT_TELEGRAM_CHAT_ID = "2050406425";
const DEFAULT_GOOGLE_CLIENT_EMAIL = "form-feedback-offline@vietndj-git-cms.iam.gserviceaccount.com";
// SỔ CON (Primary Sheet làm việc chính, dùng chung với đối tác/quản lý)
const DEFAULT_PRIMARY_SPREADSHEET_ID = "1PaHkFMdY615FasQDcqqeia94L1662YKES7cPuFIpKhg";
const DEFAULT_PRIMARY_SHEET_NAME = "Danh Sách Học Viên";

// SỔ MẸ (Két Sắt Bảo Hiểm Tự Động - kho lưu trữ tích lũy toàn bộ dữ liệu)
const DEFAULT_MASTER_SPREADSHEET_ID = "1J9ZrjLxTba9R-wuet1n_J_hKcL0PVtQDD_ag65Ewx04";
const DEFAULT_MASTER_SHEET_NAME = "Offline FEDU";

function getGoogleSheetsClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL || DEFAULT_GOOGLE_CLIENT_EMAIL;
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    console.warn('Missing Google Service Account private key or email');
    return null;
  }

  try {
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    return google.sheets({ version: 'v4', auth });
  } catch (e) {
    console.error('Google Sheets auth error:', e.message);
    return null;
  }
}

async function appendToGoogleSheet(data) {
  const sheets = getGoogleSheetsClient();
  if (!sheets) {
    console.warn('Google Sheets client not ready');
    return { success: false, reason: 'not_configured' };
  }

  const primarySheetId = process.env.GOOGLE_SPREADSHEET_ID || DEFAULT_PRIMARY_SPREADSHEET_ID;
  const primarySheetName = process.env.GOOGLE_SHEET_NAME || DEFAULT_PRIMARY_SHEET_NAME;

  const masterSheetId = process.env.MASTER_SPREADSHEET_ID || DEFAULT_MASTER_SPREADSHEET_ID;
  const masterSheetName = process.env.MASTER_SHEET_NAME || DEFAULT_MASTER_SHEET_NAME;

  const rowValues = [
    data.submittedAt,
    data.fullName,
    data.phone,
    data.email,
    data.occupation || 'Chưa điền',
    data.reason || 'Chưa điền',
    data.source || 'offline.fedu.vn'
  ];

  const promises = [];

  // 1. Ghi vào SỔ CON (Làm việc chính)
  if (primarySheetId) {
    promises.push(
      sheets.spreadsheets.values.append({
        spreadsheetId: primarySheetId,
        range: `'${primarySheetName}'!A:G`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: [rowValues] }
      }).then(() => console.log('Appended to Primary Child Sheet successfully!'))
        .catch(e => console.error('Error appending to child sheet:', e.message))
    );
  }

  // 2. Ghi đồng thời vào SỔ MẸ (Két Sắt Bảo Hiểm Tự Động)
  if (masterSheetId && masterSheetId !== primarySheetId) {
    promises.push(
      sheets.spreadsheets.values.append({
        spreadsheetId: masterSheetId,
        range: `'${masterSheetName}'!A:G`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: [rowValues] }
      }).then(() => console.log('Appended to Backup Master Sheet successfully!'))
        .catch(e => console.error('Error appending to master sheet:', e.message))
    );
  }

  await Promise.allSettled(promises);
  return { success: true };
}

async function dispatchToTelegramNova(data) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN || DEFAULT_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || DEFAULT_TELEGRAM_CHAT_ID;
  const primarySheetId = process.env.GOOGLE_SPREADSHEET_ID || DEFAULT_PRIMARY_SPREADSHEET_ID;

  if (!botToken || !chatId) return;

  try {
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${primarySheetId}/edit`;
    const text =
      `🔥 <b>HỌC VIÊN ĐĂNG KÝ KHÓA OFFLINE FEDU!</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 <b>Họ tên:</b> <b>${data.fullName}</b>\n` +
      `📞 <b>Điện thoại:</b> <a href="tel:${data.phone}"><b>${data.phone}</b></a> | <a href="https://zalo.me/${data.phone}"><b>Nhắn Zalo</b></a>\n` +
      `📧 <b>Email:</b> ${data.email || 'Chưa điền'}\n` +
      `💼 <b>Nghề nghiệp / Lĩnh vực:</b> ${data.occupation || 'Chưa điền'}\n` +
      `🎯 <b>Nút thắt cần giải quyết:</b>\n<i>"${data.reason || 'Chưa điền'}"</i>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📊 <a href="${sheetUrl}"><b>Mở Google Sheet Quản Lý (Sổ Con)</b></a>\n` +
      `⏰ <i>${data.submittedAt}</i>`;

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
        disable_web_page_preview: false
      })
    });
    console.log('Dispatched alert to Telegram successfully!');
  } catch (e) {
    console.error('Telegram error:', e.message);
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const primarySheetId = process.env.GOOGLE_SPREADSHEET_ID || DEFAULT_PRIMARY_SPREADSHEET_ID;

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'healthy',
      service: 'offline.fedu.vn registration API',
      sheet: `https://docs.google.com/spreadsheets/d/${primarySheetId}/edit`
    });
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const fullName = (body.fullName || '').trim();
      const phone = (body.phone || '').trim();
      const email = (body.email || '').trim();
      const occupation = (body.occupation || '').trim();
      const reason = (body.reason || '').trim();
      const source = (body.source || 'offline.fedu.vn').trim();

      if (!fullName || !phone) {
        return res.status(400).json({ success: false, error: 'Thiếu họ tên hoặc số điện thoại' });
      }

      const submission = {
        fullName,
        phone,
        email,
        occupation,
        reason,
        source,
        submittedAt: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
      };

      const sheetsPromise = appendToGoogleSheet(submission);
      const telegramPromise = dispatchToTelegramNova(submission);

      await Promise.allSettled([sheetsPromise, telegramPromise]);

      return res.status(200).json({
        success: true,
        message: 'Đăng ký giữ chỗ thành công!',
        item: submission
      });
    } catch (e) {
      console.error('API register error:', e);
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
