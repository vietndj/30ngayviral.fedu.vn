#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Daemon lắng nghe thông báo và điều khiển tự động mời Skool qua Telegram Bot (@khoa30ngayviral_bot).
Chạy liên tục trên máy Mac để bắt lệnh từ Telegram và điều khiển Playwright.
"""

import os
import sys
import time
import json
import subprocess
from pathlib import Path
import requests

BOT_TOKEN = "8796389265:AAH-QkaZNIrOKiMLJexprI5EboUJplL7a3c"
ALLOWED_CHAT_ID = 2050406425
BASE_URL = f"https://api.telegram.org/bot{BOT_TOKEN}"

SCRIPT_DIR = Path(__file__).resolve().parent
INVITE_SCRIPT = SCRIPT_DIR / "skool_auto_invite.py"

def send_msg(chat_id, text, reply_markup=None):
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML"
    }
    if reply_markup:
        payload["reply_markup"] = reply_markup
    try:
        requests.post(f"{BASE_URL}/sendMessage", json=payload, timeout=10)
    except Exception as e:
        print(f"Lỗi gửi tin nhắn: {e}")

def answer_callback(callback_query_id, text=None):
    payload = {"callback_query_id": callback_query_id}
    if text:
        payload["text"] = text
    try:
        requests.post(f"{BASE_URL}/answerCallbackQuery", json=payload, timeout=10)
    except Exception as e:
        print(f"Lỗi answerCallbackQuery: {e}")

def handle_invite_action(email: str, chat_id: int):
    email = email.strip()
    send_msg(chat_id, f"⏳ <b>Đang mở Skool chạy ngầm trên Mac để mời:</b> <code>{email}</code>\n<i>Vui lòng đợi trong giây lát (khoảng 5-10 giây)...</i>")
    
    # Chạy script skool_auto_invite.py
    cmd = [sys.executable, str(INVITE_SCRIPT), email]
    res = subprocess.run(cmd, capture_output=True, text=True)
    
    if res.returncode == 0:
        send_msg(
            chat_id,
            f"🎉 <b>[THÀNH CÔNG]</b> Đã gửi lời mời Skool cho học viên:\n📧 <b>{email}</b>\n\n"
            f"📚 <b>Đã cấp quyền 2 khóa học:</b>\n"
            f"  • Làm video với Capcut\n"
            f"  • Logic quay, Kỹ Thuật Chuyển Cảnh & Kịch Bản AI\n\n"
            f"⚡ Học viên chỉ cần mở hộp thư bấm <b>JOIN NOW</b> là vào học ngay!"
        )
    else:
        print(f"STDERR: {res.stderr}\nSTDOUT: {res.stdout}")
        send_msg(
            chat_id,
            f"⚠️ <b>Chưa thể tự động mời học viên {email}:</b>\n"
            f"Lý do: Phiên đăng nhập Skool có thể chưa được kích hoạt trên máy Mac.\n"
            f"👉 Anh hãy chạy lệnh sau trên Terminal để đăng nhập 1 lần duy nhất:\n"
            f"<code>python3 {SCRIPT_DIR}/skool_login.py</code>"
        )

def main():
    print(f"🤖 [DAEMON] Khởi động Skool Telegram Daemon (@khoa30ngayviral_bot)...")
    last_update_id = 0

    while True:
        try:
            url = f"{BASE_URL}/getUpdates?offset={last_update_id + 1}&timeout=30"
            resp = requests.get(url, timeout=35).json()

            if not resp.get("ok"):
                time.sleep(3)
                continue

            for update in resp.get("result", []):
                last_update_id = update["update_id"]

                # 1. Xử lý khi bấm nút (Callback Query)
                if "callback_query" in update:
                    cq = update["callback_query"]
                    cq_id = cq["id"]
                    data = cq.get("data", "")
                    sender_id = cq["from"]["id"]

                    if sender_id == ALLOWED_CHAT_ID and data.startswith("invite:"):
                        target_email = data.replace("invite:", "").strip()
                        answer_callback(cq_id, f"Đang tiến hành mời {target_email}...")
                        handle_invite_action(target_email, sender_id)
                    else:
                        answer_callback(cq_id)

                # 2. Xử lý khi gửi lệnh văn bản (/invite email@...)
                elif "message" in update:
                    msg = update["message"]
                    sender_id = msg["from"]["id"]
                    text = msg.get("text", "").strip()

                    if sender_id == ALLOWED_CHAT_ID:
                        if text.startswith("/invite "):
                            email_arg = text.replace("/invite ", "").strip()
                            handle_invite_action(email_arg, sender_id)
                        elif text == "/status":
                            send_msg(sender_id, "🟢 <b>Hệ thống Bot Skool trên Mac đang hoạt động bình thường!</b>")

        except requests.exceptions.RequestException:
            time.sleep(5)
        except Exception as e:
            print(f"Lỗi vòng lặp: {e}")
            time.sleep(3)

if __name__ == "__main__":
    main()
