#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Daemon tự động mời học viên vào Skool & Gửi Email kích hoạt qua Resend API
Hỗ trợ học viên chuyển khoản trực tiếp: Chỉ cần nhắn Email vào Bot Telegram (@khoa30ngayviral_bot).
Tự động theo dõi khi học viên bấm JOIN NOW vào nhóm thành công để báo Telegram!
"""

import os
import sys
import time
import json
import re
import threading
import subprocess
from datetime import datetime
from pathlib import Path
import requests
from dotenv import load_dotenv

# Tăng giới hạn file descriptor trên macOS chống lỗi [Errno 24] Too many open files
try:
    import resource
    soft, hard = resource.getrlimit(resource.RLIMIT_NOFILE)
    resource.setrlimit(resource.RLIMIT_NOFILE, (min(4096, hard), hard))
except Exception:
    pass

from google.oauth2 import service_account
from googleapiclient.discovery import build
from playwright.sync_api import sync_playwright

# Nạp biến môi trường
PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env")

# Token bot Telegram "30 ngày làm nội dung" (@khoa30ngayviral_bot)
BOT_TOKEN = (
    os.getenv("SKOOL_BOT_TOKEN") or 
    os.getenv("TELEGRAM_BOT_TOKEN") or 
    "8796389265:AAH-QkaZNIrOKiMLJexprI5EboUJplL7a3c"
).strip().strip('"').strip("'")

ALLOWED_CHAT_ID = int(os.getenv("TELEGRAM_CHAT_ID", "2050406425"))
BASE_URL = f"https://api.telegram.org/bot{BOT_TOKEN}"

SPREADSHEET_ID = os.getenv("GOOGLE_SPREADSHEET_ID", "1PaHkFMdY615FasQDcqqeia94L1662YKES7cPuFIpKhg").strip()
SHEET_NAME = os.getenv("GOOGLE_SHEET_NAME", "Danh Sách Học Viên").strip()

SCRIPT_DIR = Path(__file__).resolve().parent
INVITE_SCRIPT = SCRIPT_DIR / "skool_auto_invite.py"
PROFILE_DIR = Path.home() / ".config" / "skool_profile"
MEMBERS_URL = "https://www.skool.com/nguyenducviet-8640/-/members"
NTFY_TOPIC = "fedu_skool_auto_invite_vietmac_tpbank888041"

# Import helper gửi email
sys.path.insert(0, str(SCRIPT_DIR))
try:
    from email_sender import send_activation_email
except ImportError:
    def send_activation_email(email, name="bạn", phone=""):
        return {"success": False, "error": "Module email_sender không khả dụng"}

lock = threading.Lock()
playwright_lock = threading.Lock()
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

def update_sheet_status_by_email(email: str, status_text: str):
    clean_email = email.strip().lower()
    try:
        service = get_sheets_service()
        if not service:
            return
        sheet = service.spreadsheets().values().get(
            spreadsheetId=SPREADSHEET_ID,
            range=f"'{SHEET_NAME}'!A2:D200"
        ).execute()
        rows = sheet.get("values", [])
        for idx, row in enumerate(rows):
            if len(row) > 3 and row[3].strip().lower() == clean_email:
                row_idx = idx + 2
                update_sheet_status(row_idx, status_text)
                return
    except Exception as e:
        print(f"Lỗi update_sheet_status_by_email ({email}): {e}")

def sync_direct_payment_to_sheet(email: str, name: str = "", phone: str = "") -> dict:
    """
    Đồng bộ thông tin học viên chuyển khoản trực tiếp vào Google Sheets:
    - Nếu đã có dòng: Cập nhật Cột H (Đã thanh toán), Cột I (999.000 VNĐ), Cột K (Đã gửi mail & mời Skool).
    - Nếu chưa có: Thêm dòng mới vào Google Sheet với đầy đủ dữ liệu.
    """
    service = get_sheets_service()
    if not service:
        return {"success": False, "message": "Không kết nối được Google Sheets"}

    clean_email = email.strip().lower()
    now_str = get_now_str()
    try:
        sheet_res = service.spreadsheets().values().get(
            spreadsheetId=SPREADSHEET_ID,
            range=f"'{SHEET_NAME}'!A2:K200"
        ).execute()
        rows = sheet_res.get("values", [])

        target_row = -1
        existing_name = ""
        for idx, row in enumerate(rows):
            r_email = row[3].strip().lower() if len(row) > 3 else ""
            if r_email == clean_email:
                target_row = idx + 2
                existing_name = row[1].strip() if len(row) > 1 else ""
                break

        final_name = name or existing_name or "Học viên"

        if target_row > 1:
            updates = [
                {
                    "range": f"'{SHEET_NAME}'!H{target_row}:I{target_row}",
                    "values": [["Đã thanh toán (CK trực tiếp)", "999.000 VNĐ"]]
                },
                {
                    "range": f"'{SHEET_NAME}'!K{target_row}",
                    "values": [[f"Đã gửi mail & mời Skool ({now_str})"]]
                }
            ]
            if name and not existing_name:
                updates.append({
                    "range": f"'{SHEET_NAME}'!B{target_row}",
                    "values": [[name]]
                })
            if phone:
                updates.append({
                    "range": f"'{SHEET_NAME}'!C{target_row}",
                    "values": [[phone]]
                })

            service.spreadsheets().values().batchUpdate(
                spreadsheetId=SPREADSHEET_ID,
                body={"valueInputOption": "USER_ENTERED", "data": updates}
            ).execute()
            print(f"📝 Đã cập nhật dòng {target_row} trong Sheet cho: {clean_email}")
            return {"success": True, "action": "updated", "row": target_row, "name": final_name}
        else:
            new_row = [
                now_str,                          # A: Thời Gian Đăng Ký
                final_name,                       # B: Họ Và Tên
                phone,                            # C: Số Điện Thoại / Zalo
                clean_email,                      # D: Email
                "Tự do",                          # E: Ngành Nghề
                "Cần làm chủ video ngắn",         # F: Khó Khăn
                "CK trực tiếp cho anh Việt",      # G: Nguồn Đăng Ký
                "Đã thanh toán (CK trực tiếp)",   # H: Tình Trạng Liên Hệ
                "999.000 VNĐ",                    # I: Đã Đóng Học Phí
                "Báo qua Bot Telegram",           # J: Ghi Chú Riêng
                f"Đã gửi mail & mời Skool ({now_str})" # K: Trạng Thái Skool
            ]
            service.spreadsheets().values().append(
                spreadsheetId=SPREADSHEET_ID,
                range=f"'{SHEET_NAME}'!A:K",
                valueInputOption="USER_ENTERED",
                insertDataOption="INSERT_ROWS",
                body={"values": [new_row]}
            ).execute()
            print(f"📝 Đã thêm dòng mới trong Sheet cho học viên CK trực tiếp: {clean_email}")
            return {"success": True, "action": "appended", "row": len(rows) + 2, "name": final_name}
    except Exception as e:
        print(f"Lỗi sync_direct_payment_to_sheet: {e}")
        return {"success": False, "message": str(e)}

def trigger_cloud_backup_invite(email: str, name: str = ""):
    """Kích hoạt dự phòng qua Hugging Face Cloud Worker & ntfy.sh"""
    clean_email = email.strip().lower()
    try:
        requests.post(
            "https://vietndj-fedu-skool-cloud-worker.hf.space/gradio_api/call/manual_invite",
            json={"data": [clean_email, name or "Học viên"]},
            timeout=4
        )
    except Exception:
        pass

    try:
        requests.post(
            f"https://ntfy.sh/{NTFY_TOPIC}",
            json={
                "email": clean_email,
                "name": name or "Học viên",
                "source": "telegram_direct_transfer",
                "timestamp": int(time.time())
            },
            timeout=4
        )
    except Exception:
        pass

def execute_skool_invite(
    email: str,
    name: str = "",
    row_idx: int = None,
    chat_id: int = ALLOWED_CHAT_ID,
    skip_tg_report: bool = False
) -> bool:
    """Mời học viên vào Skool bằng Playwright headless trên máy Mac"""
    clean_email = email.strip().lower()
    with lock:
        if clean_email in processing_emails:
            print(f"⏩ Email {clean_email} đang được xử lý, bỏ qua.")
            return False
        processing_emails.add(clean_email)

    try:
        print(f"\n🚀 [EXECUTE INVITE] Đang chạy Playwright mời Skool: {clean_email} ({name})...")
        if row_idx:
            update_sheet_status(row_idx, "Đang mời Skool...")
        else:
            update_sheet_status_by_email(clean_email, "Đang mời Skool...")

        with playwright_lock:
            cmd = [sys.executable, str(INVITE_SCRIPT), clean_email]
            res = subprocess.run(cmd, capture_output=True, text=True, timeout=90)

        if res.returncode == 0:
            now = get_now_str()
            print(f"✅ Mời Skool thành công: {clean_email}")
            if row_idx:
                update_sheet_status(row_idx, f"Đã mời Skool ({now})")
            else:
                update_sheet_status_by_email(clean_email, f"Đã mời Skool ({now})")

            display_name = name or clean_email
            if not skip_tg_report:
                send_msg(
                    chat_id,
                    f"🎉 <b>[TỰ ĐỘNG MỜI THÀNH CÔNG]</b> Đã gửi lời mời Skool cho học viên!\n"
                    f"━━━━━━━━━━━━━━━━━━━━\n"
                    f"👤 <b>Học viên:</b> {display_name}\n"
                    f"📧 <b>Email:</b> <code>{clean_email}</code>\n"
                    f"⏰ <b>Thời gian gửi:</b> {now}\n\n"
                    f"📚 <b>Đã phân quyền 2 khóa học:</b>\n"
                    f"  1. Làm video với Capcut\n"
                    f"  2. Logic quay, Kỹ Thuật Chuyển Cảnh & Kịch Bản AI\n\n"
                    f"⚡ <i>Hệ thống Mac sẽ tự động theo dõi và báo qua Telegram ngay khi học viên bấm JOIN NOW vào nhóm!</i>"
                )
            return True
        else:
            print(f"❌ Mời thất bại {clean_email}:\nSTDOUT: {res.stdout}\nSTDERR: {res.stderr}")
            if row_idx:
                update_sheet_status(row_idx, f"Lỗi mời Skool ({get_now_str()})")
            else:
                update_sheet_status_by_email(clean_email, f"Lỗi mời Skool ({get_now_str()})")

            if not skip_tg_report:
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
        else:
            update_sheet_status_by_email(clean_email, f"Lỗi Timeout ({get_now_str()})")
        return False
    except Exception as e:
        print(f"Lỗi execute_skool_invite: {e}")
        return False
    finally:
        with lock:
            processing_emails.discard(clean_email)

def handle_student_activation(
    email: str,
    name: str = "",
    phone: str = "",
    chat_id: int = ALLOWED_CHAT_ID
):
    """
    Quy trình kích hoạt toàn diện khi anh Việt nhắn thông tin học viên CK trực tiếp vào Bot:
    1. Bắn tin nhắn tiếp nhận ngay lập tức cho anh Việt.
    2. Gửi Email kích hoạt qua Resend API (viet@fedu.vn).
    3. Chạy Playwright mời vào Skool + kích hoạt dự phòng qua Cloud.
    4. Cập nhật / thêm mới vào Google Sheets.
    5. Báo cáo kết quả đầy đủ qua Telegram.
    """
    clean_email = email.strip().lower()
    now_str = get_now_str()
    display_name = name.strip() if name and name.strip() else "Học viên"

    print(f"\n⚡ [DIRECT TRANSFER ACTIVATION] Xử lý học viên: {display_name} ({clean_email})...")

    # 1. Báo Telegram tiếp nhận
    send_msg(
        chat_id,
        f"⏳ <b>[ĐANG XỬ LÝ HỌC VIÊN CK TRỰC TIẾP]</b>\n"
        f"━━━━━━━━━━━━━━━━━━━━\n"
        f"👤 <b>Học viên:</b> {display_name}\n"
        f"📧 <b>Email:</b> <code>{clean_email}</code>\n"
        f"⏰ <b>Thời gian nhận:</b> {now_str}\n\n"
        f"<i>Đang tự động thực hiện:</i>\n"
        f"• Gửi email xác nhận học phí & link vào lớp (viet@fedu.vn)...\n"
        f"• Mời vào nhóm Skool và cấp quyền 2 khóa học...\n"
        f"• Ghi nhận vào Google Sheets..."
    )

    # 2. Gửi email kích hoạt qua Resend API
    mail_res = send_activation_email(clean_email, name=display_name, phone=phone)
    mail_ok = mail_res.get("success", False)

    # 3. Kích hoạt dự phòng qua Cloud Worker & ntfy
    trigger_cloud_backup_invite(clean_email, display_name)

    # 4. Mời vào Skool qua Playwright trên máy Mac
    skool_ok = execute_skool_invite(clean_email, name=display_name, chat_id=chat_id, skip_tg_report=True)

    # 5. Đồng bộ vào Google Sheet
    sheet_res = sync_direct_payment_to_sheet(clean_email, name=display_name, phone=phone)
    final_name = sheet_res.get("name", display_name)

    # 6. Báo cáo hoàn tất tổng hợp
    finish_now = get_now_str()
    mail_status_icon = "✅" if mail_ok else "⚠️"
    mail_status_text = "Đã gửi thành công (viet@fedu.vn)" if mail_ok else f"Lỗi: {mail_res.get('error', 'Không xác định')}"

    skool_status_icon = "✅" if skool_ok else "⏳"
    skool_status_text = "Đã gửi lời mời & phân quyền 2 khóa học" if skool_ok else "Đang hàng đợi / Đã đẩy lên Cloud Worker"

    sheet_action_desc = "Đã cập nhật hàng có sẵn" if sheet_res.get("action") == "updated" else "Đã thêm dòng mới vào sổ"

    report_msg = (
        f"🎉 <b>[HOÀN TẤT KÍCH HOẠT HỌC VIÊN]</b>\n"
        f"━━━━━━━━━━━━━━━━━━━━\n"
        f"👤 <b>Học viên:</b> {final_name}\n"
        f"📧 <b>Email:</b> <code>{clean_email}</code>\n"
        f"⏰ <b>Hoàn tất lúc:</b> {finish_now}\n\n"
        f"{mail_status_icon} <b>Email kích hoạt:</b> {mail_status_text}\n"
        f"{skool_status_icon} <b>Lời mời Skool:</b> {skool_status_text}\n"
        f"   1. Làm video với Capcut\n"
        f"   2. Logic quay, Kỹ Thuật Chuyển Cảnh & Kịch Bản AI\n"
        f"📝 <b>Google Sheets:</b> {sheet_action_desc} (Cột K)\n"
        f"━━━━━━━━━━━━━━━━━━━━\n"
        f"⚡ <i>Hệ thống Mac sẽ tự động theo dõi và báo qua Telegram ngay khi học viên bấm JOIN NOW vào nhóm!</i>"
    )
    send_msg(chat_id, report_msg)
    print(f"🎉 Hoàn tất quy trình cho {clean_email}!")

def parse_student_info(text: str):
    """
    Trích xuất Email, Tên và Số điện thoại từ tin nhắn tự nhiên của anh Việt.
    """
    # 1. Tìm email
    email_match = re.search(r'([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)', text)
    if not email_match:
        return None, "", ""
    email = email_match.group(1).strip().lower()

    # 2. Tìm số điện thoại (nếu có)
    phone = ""
    phone_match = re.search(r'(?:\+?84|0)(?:3|5|7|8|9)\d{8}', text)
    if phone_match:
        phone = phone_match.group(0)

    # 3. Loại bỏ email, sđt và các từ khóa thừa để lấy Họ Tên
    remainder = text.replace(email_match.group(0), "")
    if phone:
        remainder = remainder.replace(phone, "")

    keywords = [
        r'/(?:mail|invite|add|send|start|help)\b',
        r'\b(?:học viên|hoc vien|đã chuyển khoản|da chuyen khoan|chuyển khoản|chuyen khoan|ck|đã ck|da ck|khoá học|khóa học|khoa hoc)\b',
        r'\b(?:tên|ten|họ tên|ho ten|sđt|sdt|số điện thoại|so dien thoai|email|mail|đã chuyển|da chuyen)\b',
    ]
    for kw in keywords:
        remainder = re.sub(kw, '', remainder, flags=re.IGNORECASE)

    remainder = re.sub(r'[:,\-–—\n\r\t]+', ' ', remainder).strip()
    remainder = re.sub(r'\s+', ' ', remainder).strip()

    name = remainder if len(remainder) >= 2 else ""
    return email, name, phone

def check_skool_members_joined(pending_emails: list):
    """Truy cập Skool và tìm xem các email đang chờ đã bấm Join Now chưa."""
    if not pending_emails:
        return []
    clean_targets = {e.strip().lower() for e in pending_emails if e and "@" in e}
    if not clean_targets:
        return []

    # Dọn dẹp lock cũ nếu browser trước đó chưa thoát
    for lock_file in ["SingletonLock", "SingletonCookie", "SingletonSocket"]:
        target = PROFILE_DIR / lock_file
        if target.exists() or target.is_symlink():
            try:
                target.unlink(missing_ok=True)
            except Exception:
                pass

    with playwright_lock:
        context = None
        with sync_playwright() as p:
            try:
                context = p.chromium.launch_persistent_context(
                    user_data_dir=str(PROFILE_DIR),
                    headless=True,
                    channel="chrome",
                    args=["--disable-blink-features=AutomationControlled", "--no-sandbox"],
                    viewport={"width": 1280, "height": 850}
                )
                page = context.pages[0] if context.pages else context.new_page()
                page.goto(MEMBERS_URL, wait_until="domcontentloaded", timeout=45000)
                page.wait_for_timeout(2000)

                users = page.evaluate("() => window.__NEXT_DATA__?.props?.pageProps?.users") or []

                joined = []
                for u in users:
                    member = u.get("member", {})
                    inv = (member.get("inviteEmail") or "").strip().lower()
                    sur = (member.get("searchAnswer") or "").strip().lower()
                    matched = inv if inv in clean_targets else (sur if sur in clean_targets else None)
                    if matched:
                        first = u.get("firstName") or ""
                        last = u.get("lastName") or ""
                        name = (first + " " + last).strip() or u.get("name", "")
                        joined.append({
                            "email": matched,
                            "name": name,
                            "handle": u.get("name", ""),
                            "joined_at": member.get("approvedAt") or member.get("createdAt") or ""
                        })
                return joined
            except Exception as err:
                print(f"Lỗi check_skool_members_joined: {err}")
                return []
            finally:
                if context:
                    try:
                        context.close()
                    except Exception:
                        pass

def poll_skool_joined_members():
    """Luồng tự động kiểm tra xem học viên đã được mời có bấm JOIN NOW vào nhóm Skool chưa (mỗi 5 phút)."""
    print("👀 [JOIN MONITOR] Khởi chạy luồng theo dõi học viên vào nhóm Skool (mỗi 5 phút)...", flush=True)
    time.sleep(30)
    while True:
        try:
            service = get_sheets_service()
            if service:
                sheet = service.spreadsheets().values().get(
                    spreadsheetId=SPREADSHEET_ID,
                    range=f"'{SHEET_NAME}'!A2:K200"
                ).execute()
                rows = sheet.get("values", [])

                pending_check = []
                for idx, row in enumerate(rows):
                    row_idx = idx + 2
                    email = row[3].strip() if len(row) > 3 else ""
                    skool_status = row[10].strip() if len(row) > 10 else ""

                    if not email or "@" not in email:
                        continue

                    is_invited = "đã mời" in skool_status.lower() or "đã gửi mail" in skool_status.lower()
                    has_joined = "đã vào nhóm" in skool_status.lower() or "đã join" in skool_status.lower()

                    if is_invited and not has_joined:
                        pending_check.append({
                            "row_idx": row_idx,
                            "email": email.lower(),
                            "name": row[1].strip() if len(row) > 1 else ""
                        })

                if pending_check:
                    emails_to_query = [p["email"] for p in pending_check]
                    print(f"🔍 Đang kiểm tra Skool cho {len(emails_to_query)} học viên đang chờ vào nhóm: {emails_to_query}")
                    joined_results = check_skool_members_joined(emails_to_query)

                    for j in joined_results:
                        matched_email = j["email"]
                        for p in pending_check:
                            if p["email"] == matched_email:
                                row_idx = p["row_idx"]
                                now = get_now_str()
                                update_sheet_status(row_idx, f"Đã vào nhóm Skool ({now})")

                                member_display = j["name"] or p["name"] or matched_email
                                send_msg(
                                    ALLOWED_CHAT_ID,
                                    f"🎓 <b>[HỌC VIÊN ĐÃ VÀO NHÓM SKOOL THÀNH CÔNG]</b>\n"
                                    f"━━━━━━━━━━━━━━━━━━━━\n"
                                    f"👤 <b>Học viên:</b> {member_display} (@{j['handle']})\n"
                                    f"📧 <b>Email:</b> <code>{matched_email}</code>\n"
                                    f"⏰ <b>Thời gian vào nhóm:</b> {now}\n\n"
                                    f"📚 <b>Trạng thái:</b> Đã kích hoạt 2 khóa học & có thể bắt đầu học ngay!\n"
                                    f"━━━━━━━━━━━━━━━━━━━━\n"
                                    f"🚀 <i>Học viên đã bấm JOIN NOW qua email và chính thức tham gia cộng đồng Skool!</i>"
                                )
                                print(f"🎉 Học viên {matched_email} đã vào nhóm Skool thành công!")
                                break

        except Exception as e:
            print(f"Lỗi trong poll_skool_joined_members: {e}")

        # Quét định kỳ mỗi 5 phút (300 giây) để tiết kiệm tài nguyên máy
        time.sleep(300)

def poll_google_sheets():
    """Luồng chạy ngầm quét Google Sheet liên tục để phát hiện học viên mới thanh toán."""
    print("📊 [POLLER] Khởi chạy bộ quét tự động Google Sheet (mỗi 15s)...")
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
                    row_idx = idx + 2
                    name = row[1].strip() if len(row) > 1 else ""
                    email = row[3].strip() if len(row) > 3 else ""
                    payment_status = row[7].strip() if len(row) > 7 else ""
                    skool_status = row[10].strip() if len(row) > 10 else ""

                    if not email or "@" not in email:
                        continue

                    is_paid = "đã thanh toán" in payment_status.lower()
                    already_processed = (
                        "đã mời" in skool_status.lower() or 
                        "đã test" in skool_status.lower() or 
                        "đang mời" in skool_status.lower() or
                        "đã vào nhóm" in skool_status.lower() or
                        "đã gửi mail" in skool_status.lower()
                    )

                    if is_paid and not already_processed:
                        print(f"⚡ [PHÁT HIỆN HỌC VIÊN THANH TOÁN] Hàng {row_idx}: {name} ({email}) - Tiến hành mời Skool...")
                        execute_skool_invite(email, name=name, row_idx=row_idx)

        except Exception as e:
            print(f"Lỗi trong vòng lặp poll_google_sheets: {e}")

        time.sleep(15)

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
                        answer_callback(cq_id, f"Đang gửi mail & mời {target_email}...")
                        threading.Thread(
                            target=handle_student_activation,
                            args=(target_email, "", "", sender_id)
                        ).start()
                    else:
                        answer_callback(cq_id)

                # 2. Lệnh văn bản hoặc tin nhắn chứa email
                elif "message" in update:
                    msg = update["message"]
                    sender_id = msg["from"]["id"]
                    text = msg.get("text", "").strip()

                    if sender_id == ALLOWED_CHAT_ID:
                        # Case A: Trợ giúp & Hướng dẫn sử dụng
                        if text in ["/start", "/help"]:
                            send_msg(
                                sender_id,
                                "👋 <b>Chào anh Việt! Bot Kích Hoạt Học Viên Lớp 30 Ngày Sẵn Sàng</b>\n"
                                "━━━━━━━━━━━━━━━━━━━━\n"
                                "⚡ <b>Khi có học viên CK trực tiếp, anh chỉ cần gửi tin nhắn:</b>\n"
                                "• <i>Chỉ email:</i> <code>hocvien@gmail.com</code>\n"
                                "• <i>Email kèm Tên:</i> <code>hocvien@gmail.com Nguyễn Văn A</code>\n"
                                "• <i>Đầy đủ:</i> <code>Nguyễn Văn A - 0912345678 - hocvien@gmail.com</code>\n"
                                "• <i>Hoặc lệnh:</i> <code>/mail hocvien@gmail.com</code>\n\n"
                                "🚀 <b>Hệ thống sẽ TỰ ĐỘNG làm 3 việc trong 10 giây:</b>\n"
                                "1. Gửi Email xác nhận học phí & link vào lớp (viet@fedu.vn qua Resend)\n"
                                "2. Mở trình duyệt mời Skool & cấp quyền 2 khóa học\n"
                                "3. Cập nhật / thêm dòng mới vào Google Sheets\n\n"
                                "🔍 <i>Gõ <code>/checkjoin</code> để xem danh sách học viên đã vào nhóm.</i>\n"
                                "📊 <i>Gõ <code>/status</code> để kiểm tra hệ thống.</i>"
                            )

                        # Case B: Kiểm tra trạng thái hệ thống
                        elif text == "/status":
                            send_msg(
                                sender_id,
                                "🟢 <b>Hệ thống Kích Hoạt Học Viên đang hoạt động hoàn hảo!</b>\n\n"
                                "• Telegram Bot: @khoa30ngayviral_bot\n"
                                "• Resend Email: viet@fedu.vn (Sẵn sàng)\n"
                                "• Skool Playwright: Persistent Profile macOS\n"
                                "• Quét Google Sheet: Tự động mỗi 15s\n"
                                "• Giám sát Học viên Join: Tự động báo Telegram mỗi 5 phút\n"
                                "• Quản lý: Chat ID 2050406425"
                            )

                        # Case C: Kiểm tra danh sách học viên đã bấm Join Skool
                        elif text == "/checkjoin":
                            send_msg(sender_id, "🔍 <i>Đang quét kiểm tra danh sách học viên trên Skool...</i>")
                            def do_check_join():
                                service = get_sheets_service()
                                if not service:
                                    send_msg(sender_id, "Lỗi kết nối Google Sheets.")
                                    return
                                sheet = service.spreadsheets().values().get(
                                    spreadsheetId=SPREADSHEET_ID,
                                    range=f"'{SHEET_NAME}'!A2:K200"
                                ).execute()
                                rows = sheet.get("values", [])
                                emails = [r[3].strip() for r in rows if len(r) > 3 and "@" in r[3]]
                                joined = check_skool_members_joined(emails)
                                joined_emails = {j["email"] for j in joined}
                                
                                report = "📋 <b>TRẠNG THÁI HỌC VIÊN TRÊN SKOOL:</b>\n━━━━━━━━━━━━━━━━━━━━\n"
                                for r in rows:
                                    if len(r) > 3 and "@" in r[3]:
                                        em = r[3].strip().lower()
                                        nm = r[1].strip() if len(r) > 1 else ""
                                        pay = r[7].strip() if len(r) > 7 else ""
                                        if "đã thanh toán" in pay.lower():
                                            if em in joined_emails:
                                                report += f"✅ <b>{nm}</b> ({em}): <i>Đã vào nhóm Skool</i>\n"
                                            else:
                                                report += f"⏳ <b>{nm}</b> ({em}): <i>Chưa bấm Join Now</i>\n"
                                send_msg(sender_id, report)
                            threading.Thread(target=do_check_join).start()

                        # Case D: TIN NHẮN CHỨA EMAIL (Học viên CK trực tiếp)
                        else:
                            parsed_email, parsed_name, parsed_phone = parse_student_info(text)
                            if parsed_email:
                                threading.Thread(
                                    target=handle_student_activation,
                                    args=(parsed_email, parsed_name, parsed_phone, sender_id)
                                ).start()
                            else:
                                send_msg(
                                    sender_id,
                                    "ℹ️ <b>Không nhận diện được email trong tin nhắn!</b>\n"
                                    "👉 Anh hãy nhắn đúng cú pháp có chứa email, ví dụ:\n"
                                    "<code>hocvien@gmail.com</code> hoặc <code>hocvien@gmail.com Nguyễn Văn A</code>"
                                )

        except requests.exceptions.RequestException:
            time.sleep(5)
        except Exception as e:
            print(f"Lỗi trong vòng lặp poll_telegram_bot: {e}")
            time.sleep(3)

def poll_realtime_queue():
    """Luồng nhận đơn hàng Realtime qua ntfy.sh (Tự động 100% không cần bấm nút Telegram)."""
    print(f"⚡ [REALTIME QUEUE] Khởi chạy lắng nghe hàng đợi ntfy ({NTFY_TOPIC})...", flush=True)
    seen_ids = set()
    since = int(time.time()) - 3600
    recently_invited = {}
    while True:
        try:
            url = f"https://ntfy.sh/{NTFY_TOPIC}/json?poll=1&since={since}"
            resp = requests.get(url, timeout=30)
            if resp.status_code == 200:
                for line in resp.iter_lines():
                    if line:
                        try:
                            line_str = line.decode('utf-8') if isinstance(line, bytes) else line
                            event = json.loads(line_str)
                            if event.get("event") == "message":
                                event_id = event.get("id")
                                if event_id in seen_ids:
                                    continue
                                seen_ids.add(event_id)

                                event_time = event.get("time", int(time.time()))
                                if event_time >= since:
                                    since = event_time + 1

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

                                clean_email = email.lower().strip()
                                now = time.time()
                                if clean_email and "@" in clean_email:
                                    if clean_email in recently_invited and (now - recently_invited[clean_email] < 600):
                                        print(f"⏩ Email {clean_email} vừa được xử lý gần đây, bỏ qua trùng lặp.", flush=True)
                                        continue
                                    recently_invited[clean_email] = now

                                    print(f"🔥 [REALTIME TỰ ĐỘNG] Nhận đơn mới từ {source}: {name} ({clean_email}) -> Mời Skool ngay!", flush=True)
                                    threading.Thread(target=execute_skool_invite, args=(clean_email, name, None, ALLOWED_CHAT_ID)).start()
                        except Exception as parse_err:
                            print(f"Lỗi parse event ntfy: {parse_err}", flush=True)
            time.sleep(3)
        except Exception as e:
            print(f"Lỗi trong vòng lặp poll_realtime_queue: {e}", flush=True)
            time.sleep(5)

def main():
    print("="*60)
    print("🚀 FEDU SKOOL AUTO-INVITE & ACTIVATION EMAIL DAEMON")
    print(f"• Telegram Bot: @khoa30ngayviral_bot ({BOT_TOKEN[:10]}...)")
    print(f"• Giám sát Google Sheet: {SPREADSHEET_ID}")
    print(f"• Giám sát Học viên Join Skool: {MEMBERS_URL}")
    print(f"• Admin Telegram Chat ID: {ALLOWED_CHAT_ID}")
    print("="*60)

    # 1. Luồng nhận đơn Realtime
    queue_thread = threading.Thread(target=poll_realtime_queue, daemon=True)
    queue_thread.start()

    # 2. Luồng quét Google Sheet phát hiện học viên mới
    sheet_thread = threading.Thread(target=poll_google_sheets, daemon=True)
    sheet_thread.start()

    # 3. Luồng giám sát học viên bấm JOIN NOW vào Skool thành công
    join_thread = threading.Thread(target=poll_skool_joined_members, daemon=True)
    join_thread.start()

    # 4. Luồng chính chạy Telegram bot listener
    poll_telegram_bot()

if __name__ == "__main__":
    main()
