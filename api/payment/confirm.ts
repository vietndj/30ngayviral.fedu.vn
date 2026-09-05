import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';
import courseConfig from '../../course.config.json';
import { sendCourseActivationEmail } from '../services/emailService';

const DEFAULT_TELEGRAM_BOT_TOKEN = "8796389265:AAH-QkaZNIrOKiMLJexprI5EboUJplL7a3c";
const DEFAULT_TELEGRAM_CHAT_ID = "2050406425";
const DEFAULT_GOOGLE_CLIENT_EMAIL = "form-feedback-offline@vietndj-git-cms.iam.gserviceaccount.com";
const DEFAULT_PRIMARY_SPREADSHEET_ID = "1PaHkFMdY615FasQDcqqeia94L1662YKES7cPuFIpKhg";
const DEFAULT_PRIMARY_SHEET_NAME = "Danh Sách Học Viên";

function getGoogleSheetsClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL || DEFAULT_GOOGLE_CLIENT_EMAIL;
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    console.warn('[Google Sheets] Missing Google Service Account credentials');
    return null;
  }

  try {
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    return google.sheets({ version: 'v4', auth });
  } catch (err: any) {
    console.error('[Google Sheets] Auth error:', err.message);
    return null;
  }
}

async function sendTelegramAlert(text: string, replyMarkup?: any) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN || DEFAULT_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || DEFAULT_TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return;

  try {
    const payload: any = {
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    };
    if (replyMarkup) {
      payload.reply_markup = replyMarkup;
    }
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Failed to send Telegram alert:", err);
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(455).json({ error: 'Method not allowed' });
  }

  try {
    const { name = "", phone = "", email = "", url = "", transactionId = "", rowIndex } = req.body || {};
    const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/mdc9dfwges9r1v06momkpboh9auhrtgu";

    const cleanPhone = phone.replace(/[\s\.\-\+]/g, "").trim();
    let normalizedPhone = cleanPhone;
    if (normalizedPhone.startsWith("84")) normalizedPhone = "0" + normalizedPhone.slice(2);

    // ── 1. Cập nhật trạng thái trong Sổ Con Google Sheets ──
    const sheets = getGoogleSheetsClient();
    if (sheets) {
      const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID || DEFAULT_PRIMARY_SPREADSHEET_ID;
      const sheetName = process.env.GOOGLE_SHEET_NAME || DEFAULT_PRIMARY_SHEET_NAME;

      try {
        let targetRow = rowIndex ? parseInt(rowIndex.toString(), 10) : -1;

        if (!targetRow || targetRow <= 1) {
          // Search row by phone or email
          const sheetRes = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `'${sheetName}'!A:D`,
          });
          const rows = sheetRes.data.values || [];
          for (let i = 0; i < rows.length; i++) {
            const rowPhone = (rows[i][2] || "").replace(/[^0-9]/g, "");
            const rowEmail = (rows[i][3] || "").toLowerCase().trim();
            if (
              (normalizedPhone && rowPhone.includes(normalizedPhone.replace(/^0+/, ""))) ||
              (email && rowEmail === email.toLowerCase().trim())
            ) {
              targetRow = i + 1; // 1-indexed
              break;
            }
          }
        }

        if (targetRow > 1) {
          // Update Cột H (Tình trạng liên hệ) & Cột I (Đã đóng học phí)
          await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `'${sheetName}'!H${targetRow}:I${targetRow}`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
              values: [['Đã thanh toán', `Đã thanh toán (${courseConfig.price}đ)`]],
            },
          });
          console.log(`[Google Sheets] Updated payment status at row ${targetRow}`);
        }
      } catch (sheetErr: any) {
        console.error("[Google Sheets] Status update error:", sheetErr.message);
      }
    }

    // ── 2. Bắn thông báo Telegram ──
    const teleMsg = `💰 <b>[THANH TOÁN THÀNH CÔNG]</b>
━━━━━━━━━━━━━━━━━━━━
👤 <b>Học viên:</b> ${name || "Khách hàng"}
📱 <b>SĐT:</b> ${normalizedPhone}
📧 <b>Email:</b> ${email || "Chưa cung cấp"}
💵 <b>Học phí:</b> ${courseConfig.price} ${courseConfig.currency}
🔖 <b>Mã GD:</b> ${transactionId || "Chuyển khoản VietQR"}
📚 <b>Khóa học:</b> ${courseConfig.courseName}
━━━━━━━━━━━━━━━━━━━━
⚡ <b>Lệnh Skool:</b> Tự động mời qua hệ thống Mac...`;

    const replyMarkup = email ? {
      inline_keyboard: [
        [
          { text: "⚡ Duyệt Skool (Tự động)", callback_data: `invite:${email.trim()}` },
          { text: "📋 Copy Email", copy_text: { text: email.trim() } }
        ],
        [
          { text: "🌐 Mở trang Invite Skool", url: "https://www.skool.com/nguyenducviet-8640" }
        ]
      ]
    } : undefined;

    await sendTelegramAlert(teleMsg, replyMarkup);

    // ── 3. Gửi Email kích hoạt qua Resend API ──
    if (email) {
      try {
        await sendCourseActivationEmail({
          name,
          email,
          phone: normalizedPhone,
          transactionId,
        });
      } catch (mailErr) {
        console.error("Resend email error:", mailErr);
      }
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("Error confirming payment:", err);
    return res.status(500).json({ error: "Failed to confirm payment", details: err.message });
  }
}
