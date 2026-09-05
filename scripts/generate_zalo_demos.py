import os
from playwright.sync_api import sync_playwright

OUTPUT_DIR = "/Users/vietmac/Documents/CODE/30ngayviral.fedu.vn/public/pillars"
os.makedirs(OUTPUT_DIR, exist_ok=True)

CHATS = [
    {
        "filename": "zalo_demo_1.png",
        "name": "KTS. Lê Minh",
        "avatar_bg": "#2563eb",
        "avatar_text": "LM",
        "status": "Vừa mới truy cập",
        "messages": [
            {
                "from": "them",
                "time": "14:15",
                "text": "Chào anh Việt, tình cờ lướt thấy video anh phân tích về bẫy chi phí phát sinh khi hoàn thiện chung cư. Thực sự xem xong em thấy nói đúng y những gì chủ nhà sợ nhất."
            },
            {
                "from": "them",
                "time": "14:16",
                "text": "Nhà em ở Park 7 Times City tầm 120m2 chuẩn bị nhận bàn giao. Em thích cách anh làm việc mộc mạc, không vẽ vời. Bên anh có nhận tư vấn thiết kế trọn gói không ạ?"
            },
            {
                "from": "me",
                "time": "14:22",
                "text": "Chào Minh, cảm ơn em đã tin tưởng theo dõi video. Bên anh chỉ nhận số lượng vừa phải để kiểm soát chất lượng thi công. Em có sẵn file mặt bằng CAD hoặc ảnh hiện trạng chưa?"
            },
            {
                "from": "them",
                "time": "14:25",
                "text": "Dạ em có sẵn mặt bằng CĐT giao rồi ạ! Em gửi anh file đính kèm với một số mong muốn của gia đình qua đây luôn anh nhé."
            }
        ]
    },
    {
        "filename": "zalo_demo_2.png",
        "name": "Chị Thu Hằng (Nội Thất An Phát)",
        "avatar_bg": "#059669",
        "avatar_text": "TH",
        "status": "Đang hoạt động",
        "messages": [
            {
                "from": "them",
                "time": "09:30",
                "text": "Thầy Việt ơi, xem video thầy nói về việc 'người làm nghề không cần diễn hề hay nhảy nhót mà vẫn hút khách xịn' hay quá! Team kỹ sư bên chị xem xong ai cũng đồng tình."
            },
            {
                "from": "them",
                "time": "09:32",
                "text": "Bên chị đang muốn tái cấu trúc lại kênh truyền thông cho xưởng sản xuất và đội ngũ kỹ thuật. Chiều mai thầy có tiện cafe ở Times City trao đổi khoảng 45 phút được không ạ?"
            },
            {
                "from": "me",
                "time": "09:45",
                "text": "Chào chị Hằng! Đúng tinh thần người làm nghề rồi chị. Chiều mai 15h em có hẹn ở sảnh Park 1, em mời chị cafe trao đổi định hướng luôn nhé."
            },
            {
                "from": "them",
                "time": "09:48",
                "text": "Tuyệt vời, chị chốt lịch 15h mai nhé thầy! Chị cho bạn phụ trách marketing đi cùng luôn. Cảm ơn thầy nhiều ạ."
            }
        ]
    },
    {
        "filename": "zalo_demo_3.png",
        "name": "Dr. Vũ Hải (Nha Khoa)",
        "avatar_bg": "#7c3aed",
        "avatar_text": "VH",
        "status": "Truy cập 15 phút trước",
        "messages": [
            {
                "from": "them",
                "time": "11:05",
                "text": "Chào anh Việt, em theo dõi kênh của anh gần 2 tháng nay rồi. Cách anh chia sẻ chân thành, điềm đạm làm người xem cảm giác rất yên tâm."
            },
            {
                "from": "them",
                "time": "11:08",
                "text": "Phòng khám nha khoa của em muốn cử 2 bác sĩ trẻ theo học lộ trình làm video chuẩn của FEDU để làm nội dung tư vấn chuẩn y khoa. Anh gửi giúp em thông tin chi phí nhé."
            },
            {
                "from": "me",
                "time": "11:20",
                "text": "Chào bác sĩ Hải. Rất vui vì anh em chung tư duy. Ngành y làm video đàng hoàng cực kỳ hút bệnh nhân vì người ta cần niềm tin chứ không cần giải trí nhảm. Anh gửi brochure chi tiết ở đây nhé."
            },
            {
                "from": "them",
                "time": "11:25",
                "text": "Dạ em nhận được rồi ạ! Chương trình thiết thực quá. Em đăng ký luôn cho 2 bạn, anh gửi em số tài khoản để bên em chuyển khoản giữ chỗ nhé."
            }
        ]
    },
    {
        "filename": "zalo_demo_4.png",
        "name": "Anh Hoàng (Xưởng Mộc Thủ Công)",
        "avatar_bg": "#d97706",
        "avatar_text": "TH",
        "status": "Đang hoạt động",
        "messages": [
            {
                "from": "them",
                "time": "16:40",
                "text": "Chú Việt ơi! Áp dụng đúng cách quay mộc mạc chú chỉ: quay tay thợ đục mộng với nói thật về chất gỗ sồi, tuần này clip anh lên được hơn 800 view."
            },
            {
                "from": "them",
                "time": "16:42",
                "text": "Bất ngờ là có 3 bác ở Vin Ocean Park nhắn tin hỏi thăm rồi qua tận xưởng xem gỗ. Chiều nay anh vừa ký xong hợp đồng trọn bộ tủ bếp với bàn ăn 6 ghế rồi chú ạ!"
            },
            {
                "from": "me",
                "time": "16:55",
                "text": "Tuyệt vời quá anh Hoàng! Đúng như em nói: 800 view của người đang xây nhà có giá trị gấp trăm lần 1 triệu view của mấy em học sinh. Chúc mừng anh!"
            },
            {
                "from": "them",
                "time": "16:58",
                "text": "Cảm ơn chú nhiều lắm! Không phải diễn hề nhảy nhót mà vẫn ra khách thật, anh em thợ trong xưởng mừng lắm chú ạ."
            }
        ]
    }
]

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  body {
    background: #0f1117;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 440px;
    height: 640px;
    padding: 14px;
  }
  .phone-card {
    width: 100%;
    height: 100%;
    background: #f1f5f9;
    border-radius: 24px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 40px -15px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.12);
  }
  /* Header Zalo Style */
  .zalo-header {
    background: linear-gradient(135deg, #0088ff 0%, #0068ff 100%);
    color: white;
    padding: 12px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 2px 8px rgba(0,104,255,0.25);
  }
  .back-btn {
    font-size: 20px;
    opacity: 0.9;
    line-height: 1;
  }
  .avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: __AVATAR_BG__;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 13.5px;
    color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.15);
    flex-shrink: 0;
  }
  .user-info {
    flex: 1;
    min-width: 0;
  }
  .user-name {
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .online-badge {
    width: 7px;
    height: 7px;
    background: #22c55e;
    border-radius: 50%;
    display: inline-block;
  }
  .user-status {
    font-size: 11px;
    opacity: 0.85;
    margin-top: 1px;
  }
  .header-actions {
    display: flex;
    gap: 12px;
    font-size: 16px;
    opacity: 0.9;
  }

  /* Chat Messages Container */
  .chat-body {
    flex: 1;
    padding: 12px 12px;
    display: flex;
    flex-direction: column;
    gap: 9px;
    background: #f8fafc;
    overflow: hidden;
  }
  .date-pill {
    align-self: center;
    background: rgba(0,0,0,0.06);
    color: #64748b;
    font-size: 10.5px;
    font-weight: 600;
    padding: 2px 9px;
    border-radius: 12px;
    margin: 0 0 2px;
  }

  .msg-row {
    display: flex;
    width: 100%;
  }
  .msg-row.them {
    justify-content: flex-start;
  }
  .msg-row.me {
    justify-content: flex-end;
  }

  .bubble {
    max-width: 84%;
    padding: 8px 12px;
    font-size: 12.5px;
    line-height: 1.45;
    position: relative;
    border-radius: 14px;
    word-break: break-word;
  }
  .msg-row.them .bubble {
    background: #ffffff;
    color: #1e293b;
    border-bottom-left-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    border: 1px solid rgba(0,0,0,0.05);
  }
  .msg-row.me .bubble {
    background: #dbeafe;
    color: #0f172a;
    border-bottom-right-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    border: 1px solid rgba(59,130,246,0.18);
  }
  .msg-time {
    font-size: 9.5px;
    margin-top: 3px;
    display: block;
    text-align: right;
  }
  .msg-row.them .msg-time {
    color: #94a3b8;
  }
  .msg-row.me .msg-time {
    color: #2563eb;
    font-weight: 500;
  }

  /* Footer bar */
  .chat-footer {
    background: #ffffff;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-top: 1px solid #e2e8f0;
  }
  .footer-icon {
    font-size: 16px;
    color: #64748b;
  }
  .input-fake {
    flex: 1;
    background: #f1f5f9;
    border-radius: 18px;
    padding: 6px 12px;
    font-size: 12px;
    color: #94a3b8;
  }
  .send-icon {
    font-size: 15px;
    color: #0068ff;
    font-weight: bold;
  }
</style>
</head>
<body>
  <div class="phone-card">
    <div class="zalo-header">
      <div class="back-btn">‹</div>
      <div class="avatar">__AVATAR_TEXT__</div>
      <div class="user-info">
        <div class="user-name">
          __NAME__
          <span class="online-badge"></span>
        </div>
        <div class="user-status">__STATUS__</div>
      </div>
      <div class="header-actions">
        <span>📞</span>
        <span>🎥</span>
      </div>
    </div>

    <div class="chat-body">
      <div class="date-pill">Hôm nay · Trao đổi từ video</div>
      __MESSAGES_HTML__
    </div>

    <div class="chat-footer">
      <span class="footer-icon">📷</span>
      <span class="footer-icon">📎</span>
      <div class="input-fake">Nhập tin nhắn...</div>
      <span class="send-icon">➤</span>
    </div>
  </div>
</body>
</html>
"""

def generate():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome")
        for chat in CHATS:
            msgs_html = ""
            for m in chat["messages"]:
                from_class = m["from"]
                time_str = m["time"]
                check = " ✓✓" if from_class == "me" else ""
                msgs_html += f"""
                <div class="msg-row {from_class}">
                  <div class="bubble">
                    {m["text"]}
                    <span class="msg-time">{time_str}{check}</span>
                  </div>
                </div>
                """
            html_content = (
                HTML_TEMPLATE
                .replace("__AVATAR_BG__", chat["avatar_bg"])
                .replace("__AVATAR_TEXT__", chat["avatar_text"])
                .replace("__NAME__", chat["name"])
                .replace("__STATUS__", chat["status"])
                .replace("__MESSAGES_HTML__", msgs_html)
            )
            page = browser.new_page(viewport={"width": 440, "height": 640}, device_scale_factor=2)
            page.set_content(html_content)
            out_path = os.path.join(OUTPUT_DIR, chat["filename"])
            page.screenshot(path=out_path)
            page.close()
            print(f"Generated {out_path}")
        browser.close()

if __name__ == "__main__":
    generate()
