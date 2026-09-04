import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec } from "../components/ui";

export function InstructorSection() {
  const c = useContent();
  const t = useTheme();

  const stats = c.instructorStats || [];

  const defaultStory = [
    {
      tag: "01 · CÚ VẤP ĐẦU NĂM",
      title: "15 năm dạy quay dựng, video đầu tiên nhận về đúng 40 view",
      desc: "Dạy ở FPT Arena 15 năm, nhưng mãi đầu năm nay tôi mới tự lập kênh cá nhân. Đêm đầu thức tới 3h sáng căn từng nhịp cắt, sáng ra nhận đúng 40 lượt xem. Thấy ngượng chứ! Nhưng nhờ cú ngã đó, tôi mới hiểu thấu cảm giác run tay, nghẹn lời và sợ bị phán xét của một người mới bước lên mạng.",
      highlight: "Thức tới 3h sáng, nhận đúng 40 view"
    },
    {
      tag: "02 · ĐIỂM NGỘ NGHỀ NGHIỆP",
      title: "Màn hình điện thoại phẳng lì ghét nhất là sự giả trân",
      desc: "Kỹ xảo màu mè không giữ chân được ai. Khán giả không cần MC truyền hình hay lý thuyết hàn lâm. Người xem chỉ dừng lại khi 3 giây đầu bạn chạm đúng rắc rối có thật của họ — và toát lên sự đàng hoàng qua một góc quay sáng rõ, âm thanh sạch tiếng.",
      highlight: "Khán giả ghét nhất sự giả trân"
    },
    {
      tag: "03 · LỜI HỨA CỦA ÔNG GIÁO",
      title: "Không dạy đời trên bục giảng — Tôi kéo ghế ngồi lại cùng bạn",
      desc: "Tôi đóng gói chính những gì mình vừa tự sửa cho bản thân thành lộ trình này. Tôi trực tiếp soi từng timeline trên CapCut, chỉ thẳng chỗ nào thừa hình, câu nào nói vấp để bạn tự tin xuất xưởng video có người hỏi mua hàng mà không phải mò mẫm đơn độc.",
      highlight: "Kéo chiếc ghế ngồi lại sửa cùng bạn"
    }
  ];

  const storyList = (c.instructorStory && c.instructorStory.length > 0) ? c.instructorStory : defaultStory;
  const insightQuote = c.instructorInsight || "Khán giả không cần bạn hoàn hảo như MC truyền hình. Họ ghét nhất sự giả trân. Họ chỉ cần bạn nói thật — và một khung hình sạch sẽ.";

  return (
    <Sec maxWidth={1020} id="instructor">
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Label>{c.instructorLabel || "NGƯỜI ĐỒNG HÀNH CÙNG BẠN"}</Label>
          <SH typed>{c.instructorHeading || "Tôi từng chuẩn bị bỏ cuộc... Cho đến khi tìm ra Bản Thiết Kế của sự Viral."}</SH>
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "clamp(24px, 4vw, 40px)",
          alignItems: "start",
        }}>
          {/* ════════ CỘT TRÁI: PROFILE ĐĨNH ĐẠC (TINH GỌN, KHÔNG NHỒI HỘP) ════════ */}
          <div
            style={{
              background: "var(--cl-card, #ffffff)",
              border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
              borderRadius: t.cardRadius || 20,
              padding: "clamp(24px, 3.5vw, 32px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              boxShadow: "0 4px 20px -8px rgba(0, 0, 0, 0.05)",
              position: "sticky",
              top: 24,
            }}
          >
            {/* Ảnh đại diện */}
            <div style={{
              width: 160,
              height: 160,
              borderRadius: 18,
              overflow: "hidden",
              border: `1.5px solid var(--cl-line, rgba(0, 0, 0, 0.1))`,
              boxShadow: "0 8px 24px -6px rgba(0, 0, 0, 0.08)",
              marginBottom: 16,
              background: "var(--cl-card2, #f1f3f4)",
              flexShrink: 0,
            }}>
              <img
                src={c.instructorPhoto ?? "/instructor.jpg"}
                loading="lazy"
                alt={c.instructorName}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Tên & Chức danh */}
            <h3 style={{
              fontFamily: t.fontDisplay,
              fontSize: 23,
              fontWeight: 500,
              color: "var(--cl-text-base, #111827)",
              margin: "0 0 6px",
              lineHeight: 1.25,
            }}>
              {c.instructorName}
            </h3>
            <div style={{
              fontSize: 13.5,
              color: "var(--cl-text-muted, #6b7280)",
              lineHeight: 1.5,
              marginBottom: 16,
              maxWidth: 260,
            }}>
              {c.instructorTitle}
            </div>

            {/* Badge Mentoring 1-1 */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              borderRadius: 100,
              padding: "4px 12px",
              fontSize: 12,
              color: "#059669",
              fontWeight: 600,
              marginBottom: 22,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
              Trực Tiếp Mentoring 1 kèm 1
            </div>

            {/* 3 Chỉ Số Thực Tế (Text Stack Tối Giản, Không Hộp Xám Rời Rạc) */}
            <div style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              paddingTop: 18,
              borderTop: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
              textAlign: "left",
            }}>
              {stats.map((st, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <span style={{ fontSize: 13, color: "var(--cl-text-muted, #6b7280)", lineHeight: 1.4 }}>
                    {st.label}
                  </span>
                  <span style={{
                    fontFamily: t.fontMono,
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--cl-accent, #1a73e8)",
                    flexShrink: 0,
                  }}>
                    {st.num}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ════════ CỘT PHẢI: DÒNG CHẢY TỰ SỰ (EDITORIAL MEMOIR - DỄ ĐỌC 100%) ════════ */}
          <div style={{
            background: "var(--cl-card, #ffffff)",
            border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
            borderRadius: t.cardRadius || 20,
            padding: "clamp(24px, 4vw, 36px)",
            display: "flex",
            flexDirection: "column",
            gap: 28,
            boxShadow: "0 4px 20px -8px rgba(0, 0, 0, 0.04)",
          }}>
            {/* Lời Đề Từ: Triết Lý Mộc Mạc Của Người Làm Nghề */}
            <div style={{
              borderLeft: `3px solid var(--cl-accent, #1a73e8)`,
              paddingLeft: 18,
              paddingTop: 2,
              paddingBottom: 2,
            }}>
              <span style={{
                fontFamily: t.fontMono,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--cl-accent, #1a73e8)",
                display: "block",
                marginBottom: 8,
              }}>
                // TRIẾT LÝ TỪ ÔNG GIÁO
              </span>
              <blockquote style={{
                fontFamily: t.fontDisplay,
                fontStyle: "italic",
                fontSize: "clamp(17px, 2.2vw, 20px)",
                lineHeight: 1.55,
                color: "var(--cl-text-base, #111827)",
                margin: 0,
                fontWeight: 500,
              }}>
                “{insightQuote}”
              </blockquote>
            </div>

            {/* Vạch Phân Cách Trang Nhã */}
            <div style={{ height: 1, background: "var(--cl-line, rgba(0, 0, 0, 0.08))", width: "100%" }} />

            {/* 3 Đoạn Tự Sự Liền Mạch (Không Đóng Khung Nhỏ, Đọc Cực Êm) */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {storyList.map((item, idx) => (
                <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {/* Tiêu Đề Bài Học Kèm Số Thứ Tự Nhẹ Nhàng */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span style={{
                      fontFamily: t.fontMono,
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--cl-accent, #1a73e8)",
                      opacity: 0.65,
                      letterSpacing: "0.08em",
                      flexShrink: 0,
                    }}>
                      0{idx + 1}.
                    </span>
                    <h4 style={{
                      fontFamily: t.fontBody,
                      fontSize: "clamp(16.5px, 1.9vw, 18.5px)",
                      fontWeight: 700,
                      lineHeight: 1.4,
                      color: "var(--cl-text-base, #111827)",
                      margin: 0,
                    }}>
                      {item.title}
                    </h4>
                  </div>

                  {/* Nội Dung Trải Lòng Đời Thực */}
                  <p style={{
                    fontFamily: t.fontBody,
                    fontSize: "clamp(15px, 1.6vw, 16px)",
                    lineHeight: 1.8,
                    color: "var(--cl-text-body, #4b5563)",
                    margin: "2px 0 0 0",
                    paddingLeft: 24,
                  }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </Sec>
  );
}

