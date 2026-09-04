import React, { useState } from "react";
import { useTheme } from "../theme";
import { useContent } from "../content";
import { FadeIn, Label, SH, Sec } from "../components/ui";

export function FaqSection() {
  const t = useTheme();
  const c = useContent();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = c.faqItems || [];

  return (
    <Sec maxWidth={860} id="faq">
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Label>{c.faqBadge || "5 CÂU HỎI THƯỜNG GẶP"}</Label>
          <SH typed>{c.faqHeading || "Liệu chương trình này có phù hợp với bạn không?"}</SH>
          <p style={{
            fontFamily: t.fontBody,
            fontSize: "clamp(16px, 1.8vw, 18px)",
            color: "var(--cl-text-muted, #64748b)",
            maxWidth: 680,
            margin: "16px auto 0",
            lineHeight: 1.75,
          }}>
            {c.faqSub || "Giải đáp thẳng thắn những băn khoăn thật mà người mới hay ngượng ngùng không dám hỏi:"}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="cl-glow-card"
                style={{
                  background: "var(--cl-card, #ffffff)",
                  border: isOpen ? `1.5px solid ${t.accent}` : "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
                  borderRadius: "var(--cl-radius, 16px)",
                  overflow: "hidden",
                  transition: "all 0.25s ease",
                  boxShadow: isOpen ? `0 8px 24px -6px ${t.accent}22` : "none",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    background: "none",
                    border: "none",
                    color: "var(--cl-text-head, #0f172a)",
                    fontSize: "clamp(16px, 1.8vw, 17.5px)",
                    fontWeight: 600,
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: t.fontBody,
                  }}
                  aria-expanded={isOpen}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <span style={{ color: t.accent, fontSize: 18, marginTop: 1, flexShrink: 0 }}>✦</span>
                    <span>{faq.q}</span>
                  </div>
                  <span style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.25s ease",
                    color: t.accent,
                    fontSize: 18,
                    fontWeight: 400,
                    flexShrink: 0,
                  }}>
                    ↓
                  </span>
                </button>

                {isOpen && (
                  <div style={{
                    padding: "0 24px 22px 52px",
                    color: "var(--cl-text-body, #475569)",
                    lineHeight: 1.8,
                    fontSize: "16px",
                    fontFamily: t.fontBody,
                    borderTop: "1px dashed var(--cl-line, rgba(0, 0, 0, 0.06))",
                    paddingTop: 16,
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </FadeIn>
    </Sec>
  );
}
