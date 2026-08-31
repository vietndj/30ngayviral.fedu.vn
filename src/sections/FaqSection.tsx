import React, { useState } from "react";
import { useTheme } from "../theme";
import { useContent } from "../content";
import { FadeIn, Label, SH, Sec } from "../components/ui";

export function FaqSection() {
  const t = useTheme();
  const c = useContent();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Tôi không rành công nghệ, thao tác chậm thì có theo được không?",
      a: "Đừng lo. Lộ trình đi từ căn bản. Mọi thao tác được quay màn hình chi tiết từng bước. Hơn nữa, với 50+ template CapCut có sẵn, bạn chỉ việc kéo thả video vào là tự động khớp hiệu ứng."
    },
    {
      q: "Tôi ngại ống kính, nói vấp, diễn đơ thì phải làm sao?",
      a: "Không cần nhảy múa hay làm trò lố. Chương trình có hướng dẫn làm video dạng không lộ mặt kết hợp giọng đọc AI và cảnh phụ B-roll cực kỳ cuốn hút. Ngoài ra, kỹ thuật góc chéo 3/4 giúp bạn thoải mái như đang trò chuyện."
    },
    {
      q: "Tôi bận đi làm cả ngày, sợ mua về không có thời gian học?",
      a: "Lộ trình thiết kế dạng bài học ngắn (10-15 phút/bài), đi thẳng vào thực hành. Kết hợp prompt AI và template có sẵn, thời gian làm 1 video giảm từ 3 tiếng xuống còn 30-45 phút."
    },
    {
      q: "Tôi không giỏi văn, sợ bí ý tưởng, không biết viết kịch bản?",
      a: "Đó là lý do bạn được tặng kèm 20+ prompt AI. Chỉ cần gõ chủ đề của bạn, AI sẽ đóng vai biên kịch, nhả ra cấu trúc kịch bản 2 cột chuẩn xác từng giây."
    },
    {
      q: "Sợ AI phát triển sẽ thay thế người làm video?",
      a: "AI sinh ra để thay thế thợ bấm nút. Nội dung công nghiệp vô hồn sẽ bị đào thải. Chương trình này dạy bạn đứng trên vai AI — dùng AI làm trợ lý và dùng tư duy kể chuyện của bạn để thâu tóm sự chú ý."
    }
  ];

  return (
    <Sec maxWidth={860}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Label>5 CÂU HỎI THƯỜNG GẶP</Label>
          <SH typed>"Liệu chương trình này có phù hợp với bạn?"</SH>
          <p style={{ color: "var(--cl-text-muted, #64748b)", marginTop: -16, fontSize: 17, lineHeight: 1.7 }}>
            Giải quyết 5 nỗi sợ lớn nhất đang ngăn cản bạn:
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="cl-card"
                style={{
                  border: `1px solid ${isOpen ? t.accent : "var(--cl-line)"}`,
                  borderRadius: 14,
                  overflow: "hidden",
                  transition: "all 0.25s ease",
                  boxShadow: isOpen ? "0 4px 16px rgba(225, 29, 72, 0.12)" : "var(--cl-shadow-sm)"
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "none",
                    border: "none",
                    color: "var(--cl-text-base, #09090b)",
                    fontSize: 16.5,
                    fontWeight: 600,
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: t.fontBody
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 20 }}>🛡️</span>
                    {faq.q}
                  </div>
                  <span style={{ 
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", 
                    transition: "transform 0.3s ease",
                    color: t.accent,
                    fontSize: 18,
                    fontWeight: 700
                  }}>
                    ↓
                  </span>
                </button>
                
                <div style={{ 
                  maxHeight: isOpen ? 500 : 0, 
                  opacity: isOpen ? 1 : 0,
                  transition: "all 0.3s ease",
                  padding: isOpen ? "0 24px 20px 24px" : "0 24px",
                  color: "var(--cl-text-body, #27272a)",
                  lineHeight: 1.7,
                  fontSize: 15.5,
                  paddingLeft: 56
                }}>
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </Sec>
  );
}
