#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Module gửi Email kích hoạt học viên qua Resend API (Phương án B2: Dứt khoát, Tối giản).
Tự động gửi email xác nhận học phí & link vào lớp Skool cho học viên.
"""

import os
import sys
import json
import argparse
from pathlib import Path
import requests
from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env")

RESEND_API_KEY = os.getenv("RESEND_API_KEY", "").strip()
RESEND_FROM_EMAIL = os.getenv("RESEND_FROM_EMAIL", "Lớp 30 ngày làm nội dung viral <viet@fedu.vn>").strip()

DEFAULT_SKOOL_URL = "https://www.skool.com/nguyenducviet-8640?invite=39f444acd4f041e78b8c1c0c2a223faf"
DEFAULT_ZALO_PHONE = "0934.688.632"
DEFAULT_ZALO_URL = "https://zalo.me/0934688632"
DEFAULT_PRICE = "999.000đ"

def generate_activation_html(
    name: str = "bạn",
    email: str = "",
    price: str = DEFAULT_PRICE,
    transaction_id: str = "Chuyển khoản trực tiếp cho anh Việt",
    skool_url: str = DEFAULT_SKOOL_URL,
    zalo_phone: str = DEFAULT_ZALO_PHONE,
    zalo_url: str = DEFAULT_ZALO_URL
) -> str:
    display_name = name.strip() if name and name.strip() else "bạn"
    clean_email = email.strip().lower()

    return f"""<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Xác nhận học phí & Link vào lớp của anh Việt</title>
  <style>
    @font-face {{
      font-family: 'Acta';
      src: url('https://pub-447bd44dfdac4938912655c855b8631c.r2.dev/fonts/SVN-Acta.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }}
    @font-face {{
      font-family: 'Aeonik';
      src: url('https://pub-447bd44dfdac4938912655c855b8631c.r2.dev/fonts/SVN-AEONIK-REGULAR.TTF') format('truetype');
      font-weight: normal;
      font-style: normal;
    }}
    @font-face {{
      font-family: 'SVN-Sonoma';
      src: url('https://pub-447bd44dfdac4938912655c855b8631c.r2.dev/fonts/SVN-Sonoma-Bold.ttf') format('truetype');
      font-weight: 700;
      font-style: normal;
    }}
    a, a:link, a:visited, a:hover, a span {{
      color: #1a73e8 !important;
      text-decoration: underline !important;
    }}
    .cta-btn, .cta-btn span {{
      color: #ffffff !important;
      text-decoration: none !important;
    }}
    a[x-apple-data-detectors], a[x-apple-data-detectors] * {{
      color: #1a73e8 !important;
      text-decoration: underline !important;
    }}
    u + #body a {{
      color: #1a73e8 !important;
    }}
    #MessageViewBody a {{
      color: #1a73e8 !important;
    }}
  </style>
</head>
<body id="body" style="margin: 0; padding: 0; background-color: #f1f3f6; font-family: 'Aeonik', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f3f6; padding: 32px 12px;">
    <tr>
      <td align="center">
        <!-- Khung Card Slide: Nền trắng tinh khiết #ffffff chuẩn Figma Slide DS 2.0 -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 36px rgba(15, 23, 42, 0.07);">
          
          <!-- Top Header chuẩn Slide: Dàn 2 đầu -->
          <tr>
            <td style="padding: 16px 28px; background-color: #fafbfc; border-bottom: 1px solid #edf2f7;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="font-family: 'SVN-Sonoma', 'Sonoma', monospace; font-size: 11px; font-weight: 700; color: #64748b; letter-spacing: 0.14em; text-transform: uppercase;">
                    2026 • LỚP 30 NGÀY LÀM CHỦ VIDEO NGẮN
                  </td>
                  <td align="right" style="font-family: 'SVN-Sonoma', 'Sonoma', monospace; font-size: 11px; font-weight: 700; color: #1a73e8; letter-spacing: 0.08em;">
                    ZALO : {zalo_phone}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Tiêu đề chính: Font Acta đồng nhất 1 màu đen than chì #0f172a -->
          <tr>
            <td style="padding: 34px 28px 20px 28px;">
              <div style="font-family: 'SVN-Sonoma', 'Sonoma', monospace; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #1a73e8; margin-bottom: 10px;">
                <span style="opacity: 0.4;">// </span>XÁC NHẬN ĐĂNG KÝ HỌC VIÊN
              </div>

              <h1 style="margin: 0 0 14px 0; font-family: 'Acta', 'SVN-Acta', Georgia, serif; font-size: 26px; line-height: 1.25; font-weight: 600; color: #0f172a; letter-spacing: -0.02em;">
                Chào {display_name},<br>
                mình nhận được học&nbsp;phí&nbsp;rồi&nbsp;nhé.
              </h1>

              <p style="margin: 0; font-size: 15.5px; line-height: 1.7; color: #475569;">
                Khoản học phí <strong style="color: #0f172a; font-weight: 700;">{price}</strong> của bạn đã được xác nhận thành công (Mã GD: <span style="font-family: monospace; color: #64748b;">{transaction_id}</span>).
              </p>
            </td>
          </tr>

          <!-- CTA Button Chính: Vào lớp học Skool -->
          <tr>
            <td style="padding: 0 28px 24px 28px;">
              <div style="background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #e2e8f0; border-radius: 14px; padding: 24px 20px; text-align: center;">
                <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 600; color: #0f172a;">
                  Bấm vào nút bên dưới để vào thẳng lớp học & nhận đủ 4 khóa trên Skool:
                </p>
                <a href="{skool_url}" target="_blank" class="cta-btn" style="display: inline-block; background-color: #1a73e8; color: #ffffff !important; text-decoration: none !important; font-size: 15px; font-weight: 700; padding: 15px 36px; border-radius: 10px; letter-spacing: 0.03em; box-shadow: 0 4px 16px rgba(26, 115, 232, 0.35);">
                  <span style="color: #ffffff !important; text-decoration: none !important;">THAM GIA LỚP HỌC TRÊN SKOOL →</span>
                </a>
                <p style="margin: 12px 0 0 0; font-size: 13px; color: #64748b;">
                  Đăng nhập bằng email: <a href="mailto:{clean_email}" style="color: #1a73e8 !important; text-decoration: underline !important; font-weight: 600;"><span style="color: #1a73e8 !important; text-decoration: underline !important;">{clean_email}</span></a>
                </p>
              </div>
            </td>
          </tr>

          <!-- TRỌN BỘ 4 KHÓA HỌC THỰC CHIẾN ĐƯỢC MỞ KHÓA -->
          <tr>
            <td style="padding: 0 28px 26px 28px;">
              <div style="font-family: 'SVN-Sonoma', 'Sonoma', monospace; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #1a73e8; margin-bottom: 12px;">
                <span style="opacity: 0.4;">// </span>ĐẶC QUYỀN MỞ KHÓA TRỌN BỘ 4 KHÓA HỌC SKOOL
              </div>
              <div style="background-color: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 18px 20px;">
                <div style="font-size: 14.5px; font-weight: 700; color: #0f172a; margin-bottom: 12px;">
                  Tài khoản của bạn đã được kích hoạt quyền truy cập trọn bộ 4 khóa học:
                </div>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px; line-height: 1.7; color: #334155;">
                  <tr>
                    <td style="padding: 5px 0;">🎬 <strong>1. Làm video với Capcut</strong> — Tích lũy giờ bay, làm chủ công cụ từ con số 0</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0;">📐 <strong>2. Logic quay, Kỹ Thuật Chuyển Cảnh & Kịch Bản AI</strong> — Ma trận cỡ cảnh, nhịp điệu & chuyển cảnh tàng hình</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0;">💡 <strong>3. Từ Ý Tưởng Đến Kịch Bản Viral</strong> — Khai phá ý tưởng, bẻ khóa cấu trúc kịch bản giữ chân người xem</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0;">⚡ <strong>4. Ứng dụng AI Edit Video Marketing</strong> — Đòn bẩy AI tự động hóa sản xuất & tối ưu thời gian dựng phim</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- LỘ TRÌNH 4 BƯỚC BẮT ĐẦU THỰC CHIẾN -->
          <tr>
            <td style="padding: 0 28px 30px 28px;">
              <div style="font-family: 'SVN-Sonoma', 'Sonoma', monospace; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #64748b; margin-bottom: 16px;">
                <span style="opacity: 0.4;">// </span>LỘ TRÌNH 4 BƯỚC BẮT ĐẦU THỰC CHIẾN
              </div>

              <!-- Container 4 Blocks -->
              <div style="background-color: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 20px 20px;">
                
                <!-- Block 1 -->
                <div style="padding-bottom: 14px; border-bottom: 1px solid #e2e8f0;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="36" valign="top">
                        <div style="width: 28px; height: 28px; border-radius: 8px; background-color: #eff6ff; color: #1a73e8; text-align: center; line-height: 28px; font-weight: 700; font-size: 13px; border: 1px solid #bfdbfe;">01</div>
                      </td>
                      <td style="padding-left: 8px;">
                        <div style="font-size: 14.5px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">Bài giảng cô đọng 5–7 phút</div>
                        <div style="font-size: 14px; line-height: 1.6; color: #475569;">Xem nhanh, nắm chắc bản chất, không lan man lý thuyết.</div>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Block 2 -->
                <div style="padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="36" valign="top">
                        <div style="width: 28px; height: 28px; border-radius: 8px; background-color: #eff6ff; color: #1a73e8; text-align: center; line-height: 28px; font-weight: 700; font-size: 13px; border: 1px solid #bfdbfe;">02</div>
                      </td>
                      <td style="padding-left: 8px;">
                        <div style="font-size: 14.5px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">Tài nguyên có sẵn dưới bài</div>
                        <div style="font-size: 14px; line-height: 1.6; color: #475569;">Tải nhạc nền sạch bản quyền, preset phụ đề 2 dòng, câu lệnh AI dùng được ngay. Nhóm lớp cập nhật thêm hàng tuần.</div>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Block 3 -->
                <div style="padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="36" valign="top">
                        <div style="width: 28px; height: 28px; border-radius: 8px; background-color: #f0fdf4; color: #16a34a; text-align: center; line-height: 28px; font-weight: 700; font-size: 13px; border: 1px solid #bbf7d0;">03</div>
                      </td>
                      <td style="padding-left: 8px;">
                        <div style="font-size: 14.5px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">Quay thực tế bằng điện thoại</div>
                        <div style="font-size: 14px; line-height: 1.6; color: #475569;">Bám sát công việc thực tế hàng ngày, làm đến đâu ra video đến đó mà không cần chờ hoàn hảo.</div>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Block 4: Gửi để mình sửa trực tiếp 1:1 -->
                <div style="padding-top: 14px;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="36" valign="top">
                        <div style="width: 28px; height: 28px; border-radius: 8px; background-color: #f0fdf4; color: #16a34a; text-align: center; line-height: 28px; font-weight: 700; font-size: 13px; border: 1px solid #bbf7d0;">04</div>
                      </td>
                      <td style="padding-left: 8px;">
                        <div style="font-size: 14.5px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">Gửi để mình sửa trực tiếp 1:1</div>
                        <div style="font-size: 14px; line-height: 1.6; color: #475569;">
                          Bạn gửi bài qua <a href="{zalo_url}" target="_blank" style="color: #1a73e8 !important; font-weight: 600; text-decoration: underline !important;">Zalo ({zalo_phone})</a> hoặc <a href="{skool_url}" target="_blank" style="color: #1a73e8 !important; font-weight: 600; text-decoration: underline !important;">nhóm Skool</a>. Mình sẽ xem và chỉ rõ từng chỗ thừa, từng nhịp chùng để video giữ chân người xem tốt nhất.
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>

              </div>
            </td>
          </tr>

          <!-- Lời kết & Chữ ký -->
          <tr>
            <td style="padding: 0 28px 32px 28px;">
              <p style="margin: 0 0 4px 0; font-size: 15px; color: #475569;">
                Hẹn gặp bạn trong lớp!
              </p>
              <p style="margin: 0; font-family: 'Acta', Georgia, serif; font-size: 18px; font-weight: 600; color: #0f172a;">
                Nguyễn Đức Việt
              </p>
            </td>
          </tr>

          <!-- Footer chuẩn Slide Figma: Dàn đều 2 đầu -->
          <tr>
            <td style="padding: 16px 28px; background-color: #fafbfc; border-top: 1px solid #edf2f7;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="font-size: 12.5px; color: #64748b;">
                    Mentor: <strong>Nguyễn Đức Việt</strong> · <a href="{zalo_url}" target="_blank" style="color: #1a73e8 !important; text-decoration: underline !important;">Zalo: {zalo_phone}</a>
                  </td>
                  <td align="right" style="font-size: 12px; color: #94a3b8;">
                    Hỗ trợ học viên 24/7
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""

def send_activation_email(
    email: str,
    name: str = "bạn",
    phone: str = "",
    transaction_id: str = "Chuyển khoản trực tiếp cho anh Việt"
) -> dict:
    """
    Gửi email kích hoạt chính thức cho học viên qua Resend API.
    """
    clean_email = email.strip().lower()
    if not clean_email or "@" not in clean_email:
        return {"success": False, "error": f"Email không hợp lệ: {clean_email}"}

    if not RESEND_API_KEY:
        return {"success": False, "error": "Chưa cấu hình RESEND_API_KEY trong .env"}

    html_content = generate_activation_html(
        name=name,
        email=clean_email,
        price=DEFAULT_PRICE,
        transaction_id=transaction_id,
        skool_url=DEFAULT_SKOOL_URL,
        zalo_phone=DEFAULT_ZALO_PHONE,
        zalo_url=DEFAULT_ZALO_URL
    )

    payload = {
        "from": RESEND_FROM_EMAIL,
        "to": [clean_email],
        "subject": "Xác nhận học phí & Link vào lớp của anh Việt",
        "html": html_content
    }

    try:
        resp = requests.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json"
            },
            json=payload,
            timeout=15
        )
        data = resp.json()
        if resp.status_code in [200, 201]:
            email_id = data.get("id")
            print(f"✅ [Resend] Đã gửi email kích hoạt thành công cho {clean_email}! (ID: {email_id})")
            return {"success": True, "id": email_id, "email": clean_email}
        else:
            err_msg = data.get("message") or str(data)
            print(f"❌ [Resend] Lỗi gửi email ({resp.status_code}): {err_msg}")
            return {"success": False, "error": err_msg}
    except Exception as e:
        print(f"❌ [Resend] Ngoại lệ gửi email: {e}")
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Gửi email kích hoạt học viên qua Resend API")
    parser.add_argument("email", help="Email của học viên nhận thư")
    parser.add_argument("name", nargs="?", default="bạn", help="Tên của học viên")
    args = parser.parse_args()

    res = send_activation_email(args.email, name=args.name)
    print(json.dumps(res, indent=2, ensure_ascii=False))
