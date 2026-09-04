import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec } from "../components/ui";

function FailedIcon({ index, color = "var(--cl-danger, #d93025)" }: { index: number; color?: string }) {
  if (index === 0) {
    // 0: Cày nát YouTube học mót từng mẹo -> Monitor with play & broken puzzle lines
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <polygon points="10 8 16 11 10 14 10 8" fill={`${color}22`} stroke={color} strokeWidth="1.5" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <line x1="19" y1="5" x2="20" y2="5" strokeDasharray="1 1" />
      </svg>
    );
  }
  if (index === 1) {
    // 1: Thuê ngoài làm hộ cho nhanh -> Outward leaking cash & arrow disconnect
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="3" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <path d="M15 15l4-4" />
        <path d="M15 11h4v4" />
        <circle cx="7" cy="15" r="1.5" fill={color} />
      </svg>
    );
  }
  if (index === 2) {
    // 2: Lên mạng hỏi han trong mấy hội nhóm -> Tangled chat bubbles / conflicting noise
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        <line x1="8" y1="12" x2="11" y2="12" strokeDasharray="1.5 1.5" />
        <line x1="13" y1="12" x2="16" y2="12" />
      </svg>
    );
  }
  // 3: Nhờ AI viết hộ kịch bản -> Robotic CPU template / sterile code
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="7" width="16" height="12" rx="3" />
      <line x1="12" y1="3" x2="12" y2="7" />
      <circle cx="12" cy="3" r="1" fill={color} />
      <line x1="2" y1="13" x2="4" y2="13" />
      <line x1="20" y1="13" x2="22" y2="13" />
      <circle cx="9" cy="11.5" r="1.2" fill={color} />
      <circle cx="15" cy="11.5" r="1.2" fill={color} />
      <line x1="8" y1="15.5" x2="16" y2="15.5" strokeDasharray="2 1.5" />
    </svg>
  );
}

export function PainSection() {
  const c = useContent();
  const t = useTheme();

  return (
    <Sec maxWidth={1020}>
      {/* ── Phần 1: 6 Bế Tắc Thực Tế ── */}
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Label>{c.painLabel || "// NỖI KHỔ NGƯỜI CÓ NGHỀ"}</Label>
          <SH typed>{c.painHeading || "Ngoài đời làm nghề rất giỏi, nhưng lên mạng lại chẳng ai biết bạn là ai?"}</SH>
          {c.painSub && (
            <p style={{
              fontFamily: t.fontBody,
              fontSize: "clamp(16px, 1.8vw, 18px)",
              lineHeight: 1.8,
              color: "var(--cl-text-body, #4b5563)",
              maxWidth: 720,
              margin: "16px auto 0",
              textWrap: "balance",
            }}>
              {c.painSub}
            </p>
          )}
        </div>
      </FadeIn>

      {/* Grid 6 Thẻ Bế Tắc */}
      <FadeIn delay={100}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
          gap: 20,
          marginBottom: 72,
        }}>
          {c.painItems?.map((item, i) => (
            <div
              key={i}
              style={{
                background: "var(--cl-card, #f8f9fa)",
                border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
                borderRadius: t.cardRadius || 16,
                padding: "24px 28px",
                display: "flex",
                gap: 18,
                alignItems: "flex-start",
                textAlign: "left",
                transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <div style={{
                flexShrink: 0,
                width: 32,
                height: 32,
                borderRadius: 10,
                background: "rgba(217, 48, 37, 0.08)",
                border: "1px solid rgba(217, 48, 37, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#d93025",
                marginTop: 2,
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="3" x2="11" y2="11" />
                  <line x1="11" y1="3" x2="3" y2="11" />
                </svg>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <h3 style={{
                  fontFamily: t.fontBody,
                  fontSize: "clamp(17px, 1.9vw, 19px)",
                  fontWeight: 700,
                  color: "var(--cl-text-base, #111827)",
                  margin: 0,
                  lineHeight: 1.45,
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: t.fontBody,
                  fontSize: "clamp(16px, 1.6vw, 17px)",
                  lineHeight: 1.75,
                  color: "var(--cl-text-body, #4b5563)",
                  margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* ── Phần 2: 4 Ngõ Cụt Đã Thử ── */}
      <FadeIn delay={150}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span style={{
            fontFamily: t.fontMono,
            fontSize: 13,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--cl-accent, #1a73e8)",
            fontWeight: 700,
            display: "inline-block",
            marginBottom: 12,
          }}>
            // NHỮNG LỐI TẮT BẾ TẮC
          </span>
          <h3 style={{
            fontFamily: t.fontDisplay,
            fontSize: "clamp(24px, 3.2vw, 36px)",
            fontWeight: 500,
            color: "var(--cl-text-base, #111827)",
            margin: "0 0 12px",
            lineHeight: 1.25,
            letterSpacing: "-0.018em",
          }}>
            {c.failedSolutionsHeading || "Có phải bạn cũng từng thử đủ cách này rồi... nhưng đâu vẫn hoàn đấy?"}
          </h3>
          <p style={{
            fontFamily: t.fontBody,
            fontSize: "clamp(16px, 1.7vw, 17px)",
            color: "var(--cl-text-body, #4b5563)",
            maxWidth: 660,
            margin: "0 auto",
            fontStyle: "italic",
            lineHeight: 1.75,
          }}>
            {c.failedSolutionsSub || "Những cách chắp vá chỉ làm bạn mất thêm thời gian và thêm nản lòng."}
          </p>
        </div>

        {/* Grid 4 Thẻ Giải Pháp Sai */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          gap: 16,
          marginBottom: 52,
        }}>
          {c.failedSolutions?.map((sol, i) => (
            <div
              key={i}
              style={{
                background: "var(--cl-card, #f8f9fa)",
                border: "1px solid var(--cl-line, rgba(0, 0, 0, 0.08))",
                borderRadius: t.cardRadius || 16,
                padding: "26px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                textAlign: "left",
                transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              {/* Icon Container đồng bộ với style web */}
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(217, 48, 37, 0.06)",
                border: "1px solid rgba(217, 48, 37, 0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#d93025",
                flexShrink: 0,
              }}>
                <FailedIcon index={i} color="#d93025" />
              </div>

              <h4 style={{
                fontFamily: t.fontBody,
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--cl-text-base, #111827)",
                margin: 0,
                lineHeight: 1.4,
              }}>
                {sol.title}
              </h4>
              <p style={{
                fontFamily: t.fontBody,
                fontSize: "16px",
                lineHeight: 1.75,
                color: "var(--cl-text-body, #4b5563)",
                margin: 0,
              }}>
                {sol.desc}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* ── Phần 3: Cú Bẻ Lái & Tẩy Trắng Tội Lỗi (The Reframe) ── */}
      {c.painReframeBody && (
        <FadeIn delay={200}>
          <div style={{
            margin: "0 auto",
            maxWidth: 860,
            background: "rgba(26, 115, 232, 0.03)",
            border: `1px dashed ${t.accent}44`,
            borderRadius: 16,
            padding: "36px clamp(20px, 4vw, 44px)",
            textAlign: "center",
            position: "relative",
          }}>
            <h4 style={{
              fontFamily: t.fontDisplay,
              fontSize: "clamp(22px, 2.8vw, 28px)",
              fontWeight: 600,
              color: "#d93025",
              margin: "0 0 16px",
              fontStyle: "italic",
              lineHeight: 1.35,
            }}>
              {c.painReframeHeading || "...Và kết quả cuối cùng vẫn là con số 0 tròn trĩnh?"}
            </h4>
            <p style={{
              fontFamily: t.fontBody,
              fontSize: "clamp(17px, 1.9vw, 19px)",
              lineHeight: 1.85,
              color: "var(--cl-text-base, #111827)",
              margin: 0,
              textWrap: "balance",
            }}>
              {c.painReframeBody}
            </p>
          </div>
        </FadeIn>
      )}
    </Sec>
  );
}

