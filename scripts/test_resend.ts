import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const targetEmail = process.argv[2] || "vietndj@gmail.com";
  console.log(`\n📧 [BẮN THỬ EMAIL PHƯƠNG ÁN B2 CHÍNH THỨC]`);
  console.log(`─────────────────────────────────────────`);
  console.log(`👤 Người nhận: ${targetEmail}`);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("❌ Không tìm thấy RESEND_API_KEY");
    process.exit(1);
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL || "Lớp 30 ngày làm nội dung viral <viet@fedu.vn>";
  
  const templatePath = path.resolve(__dirname, 'email_figma_b2.html');
  const html = fs.readFileSync(templatePath, 'utf8');

  try {
    const result = await resend.emails.send({
      from,
      to: [targetEmail],
      subject: "Xác nhận học phí & Link vào lớp của anh Việt",
      html,
    });

    if (result.error) {
      console.error("❌ GỬI THẤT BẠI:", result.error);
    } else {
      console.log("🎉 GỬI THÀNH CÔNG BẢN CHÍNH THỨC B2!");
      console.log(`🆔 ID: ${result.data?.id}`);
      console.log(`✉️ Từ: ${from}`);
    }
  } catch (err) {
    console.error("❌ Exception:", err);
  }
}

main();
