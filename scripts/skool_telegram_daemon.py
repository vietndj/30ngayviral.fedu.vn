#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Daemon tự động mời học viên vào Skool (100% Zero-Click trên máy Mac):
1. Tự động quét Google Sheet mỗi 10 giây: nếu thấy học viên "Đã thanh toán" mà chưa được mời Skool -> Tự động bật Chromium mời ngay lập tức!
2. Lắng nghe Telegram Bot (@khoa30ngayviral_bot) để hỗ trợ nút bấm "Duyệt Skool" hoặc lệnh /invite thủ công nếu cần.
3. Tự động ghi nhận trạng thái vào Cột K (Trạng Thái Skool) trên Google Sheet.
"""

import os
import sys
import time
import json
import threading
import subprocess
from datetime import datetime
from pathlib import Path
import requests
from dotenv import load_dotenv

from google.oauth2 import service_account
from googleapiclient.discovery import build

# Nạp biến môi trường
PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env")

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "8796389265:AAH-QkaZNIrOKiMLJexprI5EboUJplL7a3c")
# Ưu tiên Bot @khoa30ngayviral_bot chuyên trách
if not BOT_TOKEN or BOT_TOKEN.startswith("896485"):
    BOT_TOKEN = "8796389265:AAH-QkaZNIrOKiMLJexprI5EboUJplL7a3c"

ALLOWED_CHAT_ID = int(os.getenv("TELEGRAM_CHAT_ID", "2050406425"))
BASE_URL = f"https://api.telegram.org/bot{BOT_TOKEN}"

SPREADSHEET_ID = "1PaHkFMdY615FasQDcqqeia94L1662YKES7cPuFIpKhg"
SHEET_NAME = "Danh Sách Học Viên"

SCRIPT_DIR = Path(__file__).resolve().parent
INVITE_SCRIPT = SCRIPT_DIR / "skool_auto_invite.py"

lock = threading.Lock()
processing_emails = set()

def get_now_str():
    return datetime.now().strftime("%H:%M:%S %d/%m/%Y")

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
        print(f"Lỗi gửi Telegram: {e}")

def answer_callback(callback_query_id, text=None):
    payload = {"callback_query_id": callback_query_id}
    if text:
        payload["text"] = text
    try:
        requests.post(f"{BASE_URL}/answerCallbackQuery", json=payload, timeout=10)
    except Exception as e:
        print(f"Lỗi answerCallbackQuery: {e}")

def get_sheets_service():
    client_email = os.getenv("GOOGLE_CLIENT_EMAIL")
    private_key = (os.getenv("GOOGLE_PRIVATE_KEY") or "").replace("\\n", "\n")
    if not client_email or not private_key:
        return None
    try:
        creds = service_account.Credentials.from_service_account_info({
            "client_email": client_email,
            "private_key": private_key,
            "token_uri": "https://oauth2.googleapis.com/token",
        }, scopes=["https://www.googleapis.com/auth/spreadsheets"])
        return build("sheets", "v4", credentials=creds, cache_discovery=False)
    except Exception as e:
        print(f"Lỗi kết nối Google Sheets: {e}")
        return None

def update_sheet_status(row_idx: int, status_text: str):
    try:
        service = get_sheets_service()
        if not service:
            return
        service.spreadsheets().values().update(
            spreadsheetId=SPREADSHEET_ID,
            range=f"'{SHEET_NAME}'!K{row_idx}",
            valueInputOption="USER_ENTERED",
            body={"values": [[status_text]]}
        ).execute()
        print(f"📝 Đã cập nhật Sheet hàng {row_idx}: {status_text}")
    except Exception as e:
        print(f"Lỗi update_sheet_status (row {row_idx}): {e}")

def execute_skool_invite(email: str, name: str = "", row_idx: int = None, chat_id: int = ALLOWED_CHAT_ID) -> bool:
    clean_email = email.strip().lower()
    with lock:
        if clean_email in processing_emails:
            print(f"⏩ Email {clean_email} đang được xử lý, bỏ qua.")
            return False
        processing_emails.add(clean_email)

    try:
        print(f"\n🚀 [EXECUTE INVITE] Đang chạy Playwright mời: {clean_email} ({name})...")
        if row_idx:
            update_sheet_status(row_idx, "Đang mời Skool...")

        cmd = [sys.executable, str(INVITE_SCRIPT), clean_email]
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=90)

        if res.returncode == 0:
            now = get_now_str()
            print(f"✅ Mời thành công: {clean_email}")
            if row_idx:
                update_sheet_status(row_idx, f"Đã mời Skool ({now})")

            display_name = name or clean_email
            send_msg(
                chat_id,
                f"🎉 <b>[TỰ ĐỘNG THÀNH CÔNG]</b> Đã gửi lời mời Skool cho học viên!\n"
                f"━━━━━━━━━━━━━━━━━━━━\n"
                f"👤 <b>Học viên:</b> {display_name}\n"
                f"📧 <b>Email:</b> <code>{clean_email}</code>\n"
                f"⏰ <b>Thời gian:</b> {now}\n\n"
                f"📚 <b>Đã kích hoạt 2 khóa học:</b>\n"
                f"  1. Làm video với Capcut\n"
                f"  2. Logic quay, Kỹ Thuật Chuyển Cảnh & Kịch Bản AI\n\n"
                f"⚡ Học viên chỉ cần mở email nhấn <b>JOIN NOW</b> là vào học ngay!"
            )
            return True
        else:
            print(f"❌ Mời thất bại {clean_email}:\nSTDOUT: {res.stdout}\nSTDERR: {res.stderr}")
            if row_idx:
                update_sheet_status(row_idx, f"Lỗi mời Skool ({get_now_str()})")

            send_msg(
                chat_id,
                f"⚠️ <b>[LỖI TỰ ĐỘNG MỜI SKOOL]</b>\n"
                f"Không thể mời email: <code>{clean_email}</code>\n"
                f"Kiểm tra Terminal hoặc chạy lại lệnh mời thủ công."
            )
            return False
    except subprocess.TimeoutExpired:
        print(f"⏰ Timeout mời Skool cho {clean_email}")
        if row_idx:
            update_sheet_status(row_idx, f"Lỗi Timeout ({get_now_str()})")
        return False
    except Exception as e:
        print(f"Lỗi execute_skool_invite: {e}")
        return False
    finally:
        with lock:
            processing_emails.discard(clean_email)

def poll_google_sheets():
    """Luồng chạy ngầm quét Google Sheet liên tục để phát hiện học viên mới thanh toán."""
    print("📊 [POLLER] Khởi chạy bộ quét tự động Google Sheet (mỗi 10s)...")
    while True:
        try:
            service = get_sheets_service()
            if service:
                sheet = service.spreadsheets().values().get(
                    spreadsheetId=SPREADSHEET_ID,
                    range=f"'{SHEET_NAME}'!A2:K200"
                ).execute()
                rows = sheet.get("values", [])

                for idx, row in enumerate(rows):
                    row_idx = idx + 2 # Hàng thực tế trong Sheet (bắt đầu từ 2)
                    name = row[1].strip() if len(row) > 1 else ""
                    email = row[3].strip() if len(row) > 3 else ""
                    payment_status = row[7].strip() if len(row) > 7 else ""
                    skool_status = row[10].strip() if len(row) > 10 else ""

                    if not email or "@" not in email:
                        continue

                    # Nếu đã thanh toán nhưng chưa mời Skool
                    is_paid = "đã thanh toán" in payment_status.lower()
                    already_processed = (
                        "đã mời" in skool_status.lower() or 
                        "đã test" in skool_status.lower() or 
                        "đang mời" in skool_status.lower()
                    )

                    if is_paid and not already_processed:
                        print(f"⚡ [PHÁT HIỆN HỌC VIÊN THANH TOÁN] Hàng {row_idx}: {name} ({email}) - Tiến hành mời Skool...")
                        execute_skool_invite(email, name=name, row_idx=row_idx)

        except Exception as e:
            print(f"Lỗi trong vòng lặp poll_google_sheets: {e}")

        time.sleep(10)

def poll_telegram_bot():
    """Luồng lắng nghe Telegram Bot (@khoa30ngayviral_bot)."""
    print(f"🤖 [TELEGRAM] Khởi chạy Telegram Bot listener (@khoa30ngayviral_bot)...")
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

                # 1. Bấm nút Inline Keyboard
                if "callback_query" in update:
                    cq = update["callback_query"]
                    cq_id = cq["id"]
                    data = cq.get("data", "")
                    sender_id = cq["from"]["id"]

                    if sender_id == ALLOWED_CHAT_ID and data.startswith("invite:"):
                        target_email = data.replace("invite:", "").strip()
                        answer_callback(cq_id, f"Đang tiến hành mời {target_email}...")
                        threading.Thread(target=execute_skool_invite, args=(target_email, "", None, sender_id)).start()
                    else:
                        answer_callback(cq_id)

                # 2. Lệnh văn bản (/invite email hoặc /status)
                elif "message" in update:
                    msg = update["message"]
                    sender_id = msg["from"]["id"]
                    text = msg.get("text", "").strip()

                    if sender_id == ALLOWED_CHAT_ID:
                        if text.startswith("/invite "):
                            email_arg = text.replace("/invite ", "").strip()
                            send_msg(sender_id, f"⏳ Đang thực thi lệnh mời thủ công cho: <code>{email_arg}</code>...")
                            threading.Thread(target=execute_skool_invite, args=(email_arg, "", None, sender_id)).start()
                        elif text == "/status":
                            send_msg(
                                sender_id,
                                "🟢 <b>Hệ thống Skool Zero-Click trên Mac đang hoạt động hoàn hảo!</b>\n\n"
                                "• Quét Google Sheet: Tự động mỗi 10 giây\n"
                                "• Trình duyệt Headless: Chrome macOS Playwright\n"
                                "• Phân quyền khóa học: Tự động chọn 2 khóa chuẩn"
                            )

        except requests.exceptions.RequestException:
            time.sleep(5)
        except Exception as e:
            print(f"Lỗi trong vòng lặp poll_telegram_bot: {e}")
            time.sleep(3)

NTFY_TOPIC = "fedu_skool_auto_invite_vietmac_tpbank888041"

def poll_realtime_queue():
    """Luồng nhận đơn hàng Realtime qua ntfy.sh (Tự động 100% không cần bấm nút Telegram)."""
    print(f"⚡ [REALTIME QUEUE] Khởi chạy lắng nghe hàng đợi ntfy ({NTFY_TOPIC})...")
    since = int(time.time()) - 120
    while True:
        try:
            url = f"https://ntfy.sh/{NTFY_TOPIC}/json?poll=1&since={since}"
            resp = requests.get(url, timeout=30)
            if resp.status_code == 200:
                for line in resp.iter_lines():
                    if line:
                        try:
                            event = json.loads(line)
                            if event.get("event") == "message":
                                event_time = event.get("time", int(time.time()))
                                if event_time > since:
                                    since = event_time
                                raw_msg = event.get("message", "")
                                if raw_msg.startswith("{"):
                                    data = json.loads(raw_msg)
                                    email = data.get("email", "").strip()
                                    name = data.get("name", "")
                                    source = data.get("source", "web")
                                else:
                                    email = raw_msg.strip()
                                    name = ""
                                    source = "web"

                                if email and "@" in email:
                                    print(f"🔥 [REALTIME TỰ ĐỘNG] Nhận đơn mới từ {source}: {name} ({email}) -> Mời Skool ngay!")
                                    threading.Thread(target=execute_skool_invite, args=(email, name, None, ALLOWED_CHAT_ID)).start()
                        except Exception as parse_err:
                            print(f"Lỗi parse event ntfy: {parse_err}")
            time.sleep(3)
        except Exception as e:
            print(f"Lỗi trong vòng lặp poll_realtime_queue: {e}")
            time.sleep(5)

def main():
    print("="*60)
    print("🚀 SKOOL ZERO-CLICK DAEMON IS RUNNING ON MAC")
    print(f"• Hàng đợi Realtime: {NTFY_TOPIC} (Tự động 100%)")
    print(f"• Giám sát Google Sheet: {SPREADSHEET_ID}")
    print(f"• Telegram Admin: {ALLOWED_CHAT_ID}")
    print("="*60)

    # 1. Khởi chạy luồng nhận đơn Realtime ntfy (Tự động 100% không cần bấm nút)
    queue_thread = threading.Thread(target=poll_realtime_queue, daemon=True)
    queue_thread.start()

    # 2. Khởi chạy luồng quét Google Sheet
    sheet_thread = threading.Thread(target=poll_google_sheets, daemon=True)
    sheet_thread.start()

    # 3. Luồng chính chạy Telegram bot (vẫn giữ nút bấm thủ công dự phòng)
    poll_telegram_bot()

if __name__ == "__main__":
    main()
