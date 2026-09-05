#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Hệ thống tự động mời học viên và cấp quyền khóa học trên Skool (Headless 100%).
Không cần gói Skool Pro $99/tháng.
Chạy ngầm bằng Playwright kết hợp với Profile Chrome macOS.
"""

import sys
import time
import os
import argparse
from pathlib import Path
from playwright.sync_api import sync_playwright

PROFILE_DIR = Path.home() / ".config" / "skool_profile"
GROUP_URL = "https://www.skool.com/nguyenducviet-8640"

TARGET_COURSES = [
    "Làm video với Capcut",
    "Logic quay, Kỹ Thuật Chuyển Cảnh & Kịch Bản AI"
]

def invite_member_to_skool(email: str, headless: bool = True) -> bool:
    email = email.strip()
    if not email or "@" not in email:
        print(f"❌ Email không hợp lệ: {email}")
        return False

    print(f"\n🚀 [SKOOL INVITE] Bắt đầu mời tự động học viên: {email}...")
    
    if not PROFILE_DIR.exists():
        print(f"⚠️ Chưa tìm thấy profile đăng nhập tại {PROFILE_DIR}.")
        print("👉 Vui lòng chạy 'python3 scripts/skool_login.py' trước để đăng nhập một lần duy nhất.")
        return False

    with sync_playwright() as p:
        try:
            context = p.chromium.launch_persistent_context(
                user_data_dir=str(PROFILE_DIR),
                headless=headless,
                channel="chrome",
                args=[
                    "--disable-blink-features=AutomationControlled",
                    "--no-sandbox",
                    "--disable-infobars",
                ],
                viewport={"width": 1280, "height": 850}
            )
            page = context.pages[0] if context.pages else context.new_page()
            
            print(f"🌐 Đang truy cập nhóm Skool: {GROUP_URL}...")
            page.goto(GROUP_URL, wait_until="domcontentloaded", timeout=45000)
            page.wait_for_timeout(3000)

            # Kiểm tra xem có đang ở trang About (chưa đăng nhập) không
            if "/about" in page.url:
                print("⚠️ Phiên đăng nhập Skool đã hết hạn hoặc chưa đăng nhập.")
                context.close()
                return False

            print("✅ Đã vào trang quản trị nhóm Skool.")

            # 1. Bấm nút SETTINGS
            settings_btn = page.locator("button:has-text('SETTINGS'), button:has-text('Settings')").first
            settings_btn.wait_for(state="visible", timeout=10000)
            settings_btn.click()
            print("🎯 Đã bấm nút SETTINGS.")
            page.wait_for_timeout(1500)

            # 2. Bấm tab Invite trong sidebar cài đặt
            invite_tab = page.locator("div:has-text('Invite')").filter(has_text="Invite").last
            invite_tab.wait_for(state="visible", timeout=5000)
            invite_tab.click()
            print("🎯 Đã mở tab Invite.")
            page.wait_for_timeout(1500)

            # 3. Kiểm tra mục cấp quyền khóa học
            course_access_link = page.locator("text=/courses\\)/i").first
            if course_access_link.is_visible(timeout=3000):
                access_text = course_access_link.inner_text().strip()
                print(f"📚 Trạng thái khóa học hiện tại: {access_text}")
                
                # Nếu chưa phải (2/19 courses), bấm vào để chọn 2 khóa
                if "(2/" not in access_text:
                    print("⚙️ Cấu hình lại cấp quyền 2 khóa học...")
                    course_access_link.click()
                    page.wait_for_timeout(1500)

                    for course_title in TARGET_COURSES:
                        short_title = "Làm video với Capcut" if "Capcut" in course_title else "Logic quay"
                        row = page.locator(f"//div[contains(text(), '{short_title}')]/ancestor::div[@checkboxcolor]").first
                        if row.is_visible(timeout=2000):
                            btn = row.locator("button").first
                            state = btn.evaluate("e => e.firstElementChild.className")
                            if "kCgSeA" in state: # Unchecked
                                btn.click()
                                print(f"  ☑️ Đã tích chọn: {course_title}")
                                page.wait_for_timeout(400)
                            else:
                                print(f"  ✓ Đã được chọn sẵn: {course_title}")

                    # Bấm SAVE
                    save_btn = page.locator("button:has-text('SAVE'), button:has-text('Save')").first
                    if save_btn.is_enabled():
                        save_btn.click()
                        print("💾 Đã lưu thay đổi khóa học.")
                        page.wait_for_timeout(1500)
                    else:
                        cancel_btn = page.locator("button:has-text('CANCEL'), button:has-text('Cancel')").first
                        if cancel_btn.is_visible():
                            cancel_btn.click()
                            page.wait_for_timeout(1000)
                else:
                    print("✅ Đã sẵn sàng cấu hình cấp đúng 2/19 khóa học.")

            # 4. Tìm ô nhập Email và điền
            print(f"✍️ Đang điền email: {email}...")
            email_input = page.locator("input[aria-label='Email address']").first
            email_input.wait_for(state="visible", timeout=5000)
            email_input.click()
            email_input.fill("")
            email_input.type(email, delay=30)
            page.wait_for_timeout(1000)

            # 5. Bấm nút SEND
            print("🚀 Đang bấm nút SEND để gửi lời mời...")
            send_btn = page.locator("div.sc-17b60ce9-6 button, button:has-text('Send')").filter(has_text="Send").first
            send_btn.wait_for(state="visible", timeout=5000)
            
            if send_btn.is_enabled():
                send_btn.click()
                page.wait_for_timeout(3500)
                print(f"🎉 HOÀN TẤT THÀNH CÔNG: Đã gửi lời mời Skool (kèm 2 khóa học) cho {email}!")
                context.close()
                return True
            else:
                print("⚠️ Nút Send không khả dụng (có thể email đã được mời từ trước).")
                context.close()
                return True

        except Exception as err:
            print(f"❌ Lỗi: {err}")
            try:
                screenshot_path = f"/tmp/skool_error_{int(time.time())}.png"
                page.screenshot(path=screenshot_path)
                print(f"📸 Đã lưu ảnh chụp màn hình lỗi tại: {screenshot_path}")
            except Exception:
                pass
            context.close()
            return False

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Tự động mời học viên vào Skool")
    parser.add_argument("email", help="Email của học viên cần mời")
    parser.add_argument("--show", action="store_true", help="Hiện cửa sổ trình duyệt (để theo dõi)")
    args = parser.parse_args()

    success = invite_member_to_skool(args.email, headless=not args.show)
    sys.exit(0 if success else 1)
