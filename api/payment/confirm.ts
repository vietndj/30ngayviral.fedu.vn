import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

const DEFAULT_TELEGRAM_BOT_TOKEN = "8964853536:AAHuRNm_hY-YQtveBD1HlmthN4I5xpVzM8U";
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

async function sendTelegramAlert(text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN || DEFAULT_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || DEFAULT_TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
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
              values: [['Đã thanh toán', 'Đã thanh toán (999.000đ)']],
            },
          });
          console.log(`[Google Sheets] Updated payment status at row ${targetRow}`);
        }
      } catch (sheetErr: any) {
        console.error("[Google Sheets] Status update error:", sheetErr.message);
      }
    }

    // ── 2. Bắn thông báo Telegram ──
    const teleMsg = `💰 [THANH TOÁN THÀNH CÔNG] 30 Ngày Làm Chủ Video Ngắn
👤 Học viên: ${name || "Khách hàng"}
📱 SĐT: ${normalizedPhone}
📧 Email: ${email}
💵 Học phí: 999.000 VNĐ
🔖 Mã GD: ${transactionId || "Chuyển khoản VietQR"}
⚡ Đã kích hoạt quyền vào học trên Skool!`;

    await sendTelegramAlert(teleMsg);

    // ── 3. Trigger Make.com Webhook ──
    if (email) {
      try {
        await fetch(MAKE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            phone: normalizedPhone,
            course: "30 Ngày Làm Chủ Video Ngắn",
            transactionId,
            paidAt: new Date().toISOString(),
          }),
        });
      } catch (makeErr) {
        console.error("Make webhook error:", makeErr);
      }
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("Error confirming payment:", err);
    return res.status(500).json({ error: "Failed to confirm payment", details: err.message });
  }
}
