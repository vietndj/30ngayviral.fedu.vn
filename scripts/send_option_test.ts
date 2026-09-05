import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function sendFigmaOption(variant: string, targetEmail: string = "vietndj@gmail.com") {
  let fileName = "email_figma_b1.html";
  let subject = "[Figma Slide B1] Gửi video để mình sửa trực tiếp";

  if (variant === 'b2') {
    fileName = "email_figma_b2.html";
    subject = "[Figma Slide B2] Gửi để mình sửa trực tiếp 1:1";
  } else if (variant === 'b1') {
    fileName = "email_figma_b1.html";
    subject = "[Figma Slide B1] Gửi video để mình sửa trực tiếp";
  }

  const filePath = path.resolve(__dirname, fileName);
  const htmlContent = fs.readFileSync(filePath, 'utf8');

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("❌ Không tìm thấy RESEND_API_KEY");
    process.exit(1);
  }

  const resend = new Resend(apiKey);

  console.log(`\n🚀 Đang gửi Figma Slide ${variant.toUpperCase()} (${fileName}) tới ${targetEmail}...`);
  const response = await resend.emails.send({
    from: "Lớp 30 ngày làm nội dung viral <viet@fedu.vn>",
    to: [targetEmail],
    subject,
    html: htmlContent,
  });

  if (response.error) {
    console.error("❌ Lỗi gửi:", response.error);
  } else {
    console.log(`✅ Đã gửi thành công ${variant.toUpperCase()}! ID:`, response.data?.id);
  }
}

const variant = (process.argv[2] || "b1").toLowerCase();
const emailArg = process.argv[3] || "vietndj@gmail.com";
sendFigmaOption(variant, emailArg).catch(console.error);
