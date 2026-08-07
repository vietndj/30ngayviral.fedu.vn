import React, { useState } from "react";
import { useTheme } from "../theme";
import { useContent } from "../content";

export function FaqSection() {
  const t = useTheme();
  const c = useContent();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Tôi mù công nghệ, thao tác cực chậm thì có theo được không?",
      a: "Đừng lo. Lộ trình đi từ 'vỡ lòng'. Mọi thao tác được quay màn hình chi tiết 'Click-by-click'. Hơn nữa, với 50+ Template CapCut có sẵn, bạn chỉ việc 'Kéo-Thả' video vào là tự động khớp hiệu ứng."
    },
    {
      q: "Tôi ngại ống kính, nói vấp, diễn đơ thì phải làm sao?",
      a: "Không cần nhảy múa hay làm trò lố. Khóa học có module hướng dẫn làm video dạng 'Faceless' (Không lộ mặt) kết hợp AI Voice và B-roll cực kỳ cuốn hút. Ngoài ra, kỹ thuật góc chéo 3/4 giúp bạn thoải mái như đang trò chuyện."
    },
    {
      q: "Tôi bận đi làm cả ngày, sợ mua về vứt đó không học?",
      a: "Lộ trình thiết kế dạng Micro-learning (10-15 phút/bài), đi thẳng vào thực hành. Kết hợp Prompt AI và Template có sẵn, thời gian làm 1 video giảm từ 3 tiếng xuống còn 45 phút."
    },
    {
      q: "Tôi không giỏi văn, sợ bí ý tưởng, không biết viết kịch bản?",
      a: "Đó là lý do bạn được tặng kèm 20+ Prompt AI. Chỉ cần gõ: 'Tôi bán mỹ phẩm', AI sẽ đóng vai biên kịch, nhả ra cấu trúc Hook-Story-Offer chuẩn xác từng giây."
    },
    {
      q: "Sợ AI phát triển sẽ thay thế con người làm content?",
      a: "AI sinh ra để thay thế 'thợ bấm nút'. Nội dung công nghiệp vô hồn sẽ bị đào thải. Khóa học này dạy bạn 'Đứng trên vai AI' — dùng AI làm trợ lý và dùng tư duy Storytelling của bạn để thâu tóm sự chú ý."
    }
  ];

  return (
    <section className="cl-section" style={{ background: t.bg }}>
      <div className="cl-container">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ 
            display: "inline-block", 
            padding: "6px 12px", 
            background: "rgba(255, 255, 255, 0.05)",
            border: `1px solid ${t.line}`,
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            color: t.accent,
            marginBottom: 16,
            letterSpacing: 1
          }}>
            5 CÂU HỎI THƯỜNG GẶP
          </div>
          <h2 className="cl-heading" style={{ fontFamily: t.fontDisplay, color: t.textBase }}>
            "Liệu chương trình này có phù hợp với tôi không?"
          </h2>
          <p style={{ color: t.textMuted, marginTop: 12, fontSize: 16 }}>
            Giải quyết 5 nỗi sợ lớn nhất đang ngăn cản bạn:
          </p>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: `1px solid ${isOpen ? t.accent : t.line}`,
                  borderRadius: 16,
                  overflow: "hidden",
                  transition: "all 0.3s ease"
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
                    color: t.textBase,
                    fontSize: 16,
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
                    fontSize: 20,
                    fontWeight: 300
                  }}>
                    ↓
                  </span>
                </button>
                
                <div style={{ 
                  maxHeight: isOpen ? 500 : 0, 
                  opacity: isOpen ? 1 : 0,
                  transition: "all 0.3s ease",
                  padding: isOpen ? "0 24px 20px 24px" : "0 24px",
                  color: t.textMuted,
                  lineHeight: 1.6,
                  fontSize: 15,
                  paddingLeft: 56
                }}>
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
