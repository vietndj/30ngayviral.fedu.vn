import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

function viTimestamp() {
  try {
    return new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
  } catch {
    return new Date().toISOString();
  }
}

const DEFAULT_TELEGRAM_BOT_TOKEN = "8964853536:AAHuRNm_hY-YQtveBD1HlmthN4I5xpVzM8U";
const DEFAULT_TELEGRAM_CHAT_ID = "2050406425";
const DEFAULT_GOOGLE_CLIENT_EMAIL = "form-feedback-offline@vietndj-git-cms.iam.gserviceaccount.com";
const DEFAULT_PRIMARY_SPREADSHEET_ID = "1PaHkFMdY615FasQDcqqeia94L1662YKES7cPuFIpKhg";
const DEFAULT_PRIMARY_SHEET_NAME = "Danh Sách Học Viên";
const DEFAULT_MASTER_SPREADSHEET_ID = "1J9ZrjLxTba9R-wuet1n_J_hKcL0PVtQDD_ag65Ewx04";
const DEFAULT_MASTER_SHEET_NAME = "Offline FEDU";

const BAD_WORDS = [
  "dm", "dmm", "đm", "đmm", "vl", "vkl", "vcl", "dkm", "đkm", "cl", "clm", 
  "đéo", "deo", "buồi", "buoi", "lồn", "lon", "cặc", "cac", "phò", "cave", 
  "chó", "cho'", "troll", "fck", "fuck", "shit", "asshole", "bitch", "duma", 
  "đụ", "du me", "đụ má", "đụ mẹ", "địt", "dit", "con cặc", "cái lồn", "cc", 
  "bố mày", "dcm", "đcm", "dcmm", "đcmm", "điên", "ngu", "xàm", "lừa đảo", "lua dao"
];

const FAKE_PHONES = [
  "0123456789", "0987654321", "0000000000", "0111111111", "0222222222", 
  "0333333333", "0444444444", "0555555555", "0666666666", "0777777777", 
  "0888888888", "0999999999", "0909090909", "0919191919", "0989898989"
];

const BLOCKED_EMAIL_DOMAINS = [
  "tempmail.com", "10minutemail.com", "yopmail.com", "mailinator.com", 
  "guerrillamail.com", "trashmail.com", "dispostable.com", "getnada.com"
];

function validateInput(name: string, email: string, phone: string): string | null {
  const cleanName = (name || "").trim();
  const cleanEmail = (email || "").trim().toLowerCase();
  const cleanPhone = (phone || "").replace(/[\s\.\-\+]/g, "").trim();

  if (!cleanName || cleanName.length < 2) {
    return "Vui lòng nhập đầy đủ Họ và tên của bạn.";
  }
  if (/^(.)\1{3,}$/i.test(cleanName)) {
    return "Họ và tên không hợp lệ. Vui lòng nhập tên thật.";
  }
  const nameLower = cleanName.toLowerCase();
  const containsBadWord = BAD_WORDS.some(word => {
    const regex = new RegExp(`\\b${word}\\b`, "i");
    return regex.test(nameLower) || nameLower === word;
  });
  if (containsBadWord) {
    return "Họ và tên chứa từ ngữ không phù hợp. Vui lòng nhập tên thật của bạn.";
  }

  let normalizedPhone = cleanPhone;
  if (normalizedPhone.startsWith("84")) normalizedPhone = "0" + normalizedPhone.slice(2);
  const vnPhoneRegex = /^(03|05|07|08|09)\d{8}$/;
  if (!vnPhoneRegex.test(normalizedPhone) || FAKE_PHONES.includes(normalizedPhone) || /^(.)\1{9}$/.test(normalizedPhone)) {
    return "Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 số di động của bạn.";
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(cleanEmail)) {
    return "Email không đúng định dạng. Vui lòng kiểm tra lại địa chỉ email.";
  }
  const [_, emailDomain] = cleanEmail.split("@");
  if (BLOCKED_EMAIL_DOMAINS.includes(emailDomain)) {
    return "Vui lòng không sử dụng email tạm thời. Nhập email thật để nhận sản phẩm.";
  }

  return null;
}

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
    const { name = "", phone = "", email = "", url = "", occupation = "", reason = "" } = req.body || {};

    // Validate inputs
    const errorMsg = validateInput(name, email, phone);
    if (errorMsg) {
      return res.status(400).json({ error: errorMsg });
    }

    const submittedAt = viTimestamp();
    const cleanPhone = phone.replace(/[\s\.\-\+]/g, "").trim();
    let normalizedPhone = cleanPhone;
    if (normalizedPhone.startsWith("84")) normalizedPhone = "0" + normalizedPhone.slice(2);
    const sheetPhone = `'${normalizedPhone}`;
    const pageUrl = url || "https://30ngayviral.fedu.vn";

    // ── 1. Ghi vào Google Sheet (Sổ Con & Sổ Mẹ) ──
    const sheets = getGoogleSheetsClient();
    let appendedRowIndex = -1;

    if (sheets) {
      const primaryId = process.env.GOOGLE_SPREADSHEET_ID || DEFAULT_PRIMARY_SPREADSHEET_ID;
      const primaryName = process.env.GOOGLE_SHEET_NAME || DEFAULT_PRIMARY_SHEET_NAME;

      // Row values for Sổ Con:
      // A: Thời Gian | B: Họ Tên | C: SĐT | D: Email | E: Ngành Nghề | F: Khó Khăn | G: Nguồn | H: Tình Trạng | I: Đã Đóng Học Phí | J: Ghi Chú
      const primaryRow = [
        submittedAt,
        name.trim(),
        sheetPhone,
        email.trim().toLowerCase(),
        occupation || "Chưa điền",
        reason || "Chưa điền",
        pageUrl,
        "Chờ thanh toán",
        "Chưa thanh toán",
        "Lộ trình 30 Ngày 999k"
      ];

      try {
        const appendRes = await sheets.spreadsheets.values.append({
          spreadsheetId: primaryId,
          range: `'${primaryName}'!A:J`,
          valueInputOption: 'USER_ENTERED',
          insertDataOption: 'INSERT_ROWS',
          requestBody: { values: [primaryRow] },
        });

        // Parse appended row index
        const updatedRange = appendRes.data.updates?.updatedRange || "";
        const match = updatedRange.match(/!A(\d+)/);
        if (match) {
          appendedRowIndex = parseInt(match[1], 10);
        }
        console.log(`[Google Sheets] Appended to Primary Sổ Con successfully. Range: ${updatedRange}`);
      } catch (sheetErr: any) {
        console.error('[Google Sheets] Primary append error:', sheetErr.message);
      }

      // Sổ Mẹ (Két sắt dự phòng nếu khác Sổ Con)
      const masterId = process.env.MASTER_SPREADSHEET_ID || DEFAULT_MASTER_SPREADSHEET_ID;
      const masterName = process.env.MASTER_SHEET_NAME || DEFAULT_MASTER_SHEET_NAME;
      if (masterId && masterId !== primaryId) {
        try {
          const masterRow = [
            submittedAt,
            name.trim(),
            sheetPhone,
            email.trim().toLowerCase(),
            occupation || "Chưa điền",
            reason || "Chưa điền",
            pageUrl,
          ];
          await sheets.spreadsheets.values.append({
            spreadsheetId: masterId,
            range: `'${masterName}'!A:G`,
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            requestBody: { values: [masterRow] },
          });
          console.log('[Google Sheets] Appended to Master Sổ Mẹ successfully.');
        } catch (masterErr: any) {
          console.error('[Google Sheets] Master append error:', masterErr.message);
        }
      }
    }

    // ── 2. Bắn thông báo Telegram ──
    const teleMsg = `📋 [ĐĂNG KÝ MỚI] 30 Ngày Làm Chủ Video Ngắn
👤 Họ tên: ${name.trim()}
📱 SĐT: ${normalizedPhone}
📧 Email: ${email.trim().toLowerCase()}
🔗 Nguồn: ${pageUrl}
⏳ Trạng thái: Chờ thanh toán (999.000đ)`;

    await sendTelegramAlert(teleMsg);

    return res.status(200).json({ success: true, rowIndex: appendedRowIndex });
  } catch (err: any) {
    console.error("Error registering lead:", err);
    return res.status(500).json({ error: "Failed to register lead", details: err.message });
  }
}
