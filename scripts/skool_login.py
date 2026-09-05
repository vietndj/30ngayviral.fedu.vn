#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script mở trình duyệt Chrome để đăng nhập tài khoản Skool của anh Việt một lần duy nhất.
Sau khi đăng nhập xong, phiên làm việc sẽ được lưu vĩnh viễn tại ~/.config/skool_profile.
Các lần tự động tiếp theo sẽ chạy ngầm 100% (Headless) không cần mở cửa sổ.
"""

import sys
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

PROFILE_DIR = Path.home() / ".config" / "skool_profile"
PROFILE_DIR.mkdir(parents=True, exist_ok=True)

def login():
    print("🚀 Đang mở trình duyệt Chrome để đăng nhập Skool...")
    print("👉 Hãy đăng nhập tài khoản Skool của anh (bấm Đăng nhập hoặc Continue with Google).")
    print("👉 Sau khi vào được trang nhóm Skool, anh quay lại cửa sổ này bấm Enter để lưu lại!")
    
    with sync_playwright() as p:
        context = p.chromium.launch_persistent_context(
            user_data_dir=str(PROFILE_DIR),
            headless=False,
            channel="chrome",
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox",
            ],
            viewport={"width": 1280, "height": 850}
        )
        page = context.pages[0] if context.pages else context.new_page()
        page.goto("https://www.skool.com/login", timeout=60000)
        
        try:
            input("\n👉 [BẤM ENTER TẠI ĐÂY SAU KHI ANH ĐÃ ĐĂNG NHẬP XONG TRÊN TRÌNH DUYỆT]...")
        except KeyboardInterrupt:
            pass
            
        print(f"✅ Trang hiện tại: {page.url}")
        page.goto("https://www.skool.com/nguyenducviet-8640", timeout=30000)
        time.sleep(3)
        print("🎉 Đã lưu phiên đăng nhập Skool thành công vào ~/.config/skool_profile!")
        context.close()

if __name__ == "__main__":
    login()
