import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.resolve(__dirname, '../course.config.json');
const courseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

import { generateActivationEmailHtml } from '../api/services/emailService.js';

async function main() {
  const targetEmail = process.argv[2] || "vietndj@gmail.com";
  console.log(`\n📧 [BẮN THỬ EMAIL GIAO DIỆN & VĂN PHONG MỚI]`);
  console.log(`─────────────────────────────────────────`);
  console.log(`👤 Người nhận: ${targetEmail}`);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(`❌ Chưa có RESEND_API_KEY.`);
    return;
  }

  const resend = new Resend(apiKey);
  const fromEmail = "Lớp 30 Ngày Video Ngắn · Việt <viet@fedu.vn>";

  const html = generateActivationEmailHtml({
    name: "Nguyễn Đức Việt",
    email: targetEmail,
    phone: "0934.688.632",
    transactionId: "SEPAY_TEST_999K",
    skoolUrl: "https://www.skool.com/nguyenducviet-8640",
  });

  // Save preview
  const previewPath = path.resolve(__dirname, 'email_preview.html');
  fs.writeFileSync(previewPath, html, 'utf8');

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [targetEmail],
      subject: `[Lớp 30 Ngày] Xác nhận học phí & Link vào lớp của anh Việt`,
      html,
    });

    if (error) {
      console.error(`❌ Lỗi gửi từ Resend:`, error);
    } else {
      console.log(`🎉 GỬI THÀNH CÔNG!`);
      console.log(`🆔 ID: ${data?.id}`);
      console.log(`✉️ Từ: ${fromEmail}`);
      console.log(`📬 Đến: ${targetEmail}`);
    }
  } catch (err) {
    console.error(`❌ Ngoại lệ:`, err);
  }
}

main();
