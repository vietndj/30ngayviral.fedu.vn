import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec } from "../components/ui";

export function InstructorSection() {
  const c = useContent();
  const t = useTheme();

  const stats = [
    { num: "1.000+", label: "Học viên & Creator ứng dụng" },
    { num: "15 năm", label: "Giảng viên FPT Arena Multimedia" },
    { num: "10.000+", label: "Video triệu view được phân giải" },
  ];

  return (
    <Sec maxWidth={900}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Label>{c.instructorLabel}</Label>
          <SH typed>{c.instructorHeading}</SH>
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="cl-glow-card" style={{
          padding: "clamp(24px, 6vw, 48px)",
          display: "flex",
          gap: "clamp(24px, 5vw, 44px)",
          alignItems: "center",
          flexWrap: "wrap",
        }}>
          {/* Avatar / Profile Column */}
          <div style={{ flexShrink: 0, textAlign: "center", width: 220, margin: "0 auto" }}>
            <div style={{
              borderRadius: 24,
              overflow: "hidden",
              border: `2px solid ${t.accent}66`,
              boxShadow: `0 0 35px -8px ${t.accent}44`,
              marginBottom: 16,
              background: "#14151f"
            }}>
              <img
                src={c.instructorPhoto ?? "/instructor.jpg"}
                loading="lazy"
                alt={c.instructorName}
                style={{ width: "100%", display: "block" }}
              />
            </div>
            <div style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
              {c.instructorName}
            </div>
            <div style={{ fontSize: 13, color: t.accent, fontWeight: 600, marginBottom: 12 }}>
              {c.instructorTitle}
            </div>
            <div style={{
              display: "inline-block", background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.4)",
              borderRadius: 30, padding: "4px 12px", fontSize: 12, color: "#10b981", fontWeight: 600,
            }}>
              ✨ Trực Tiếp Mentoring 1-1
            </div>
          </div>

          {/* Details & Quote Column */}
          <div style={{ flex: 1, minWidth: 280, display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Playfair Display Serif Quote */}
            <div style={{
              background: "rgba(243, 103, 22, 0.05)",
              borderLeft: `4px solid ${t.accent}`,
              padding: "16px 20px",
              borderRadius: "0 16px 16px 0",
            }}>
              <p style={{
                fontFamily: t.fontAccent,
                fontStyle: "italic",
                fontSize: "clamp(16px, 2.2vw, 19px)",
                lineHeight: 1.6,
                color: "#ffffff",
                fontWeight: 600,
                margin: 0,
              }}>
                "Bán hàng giỏi cho bạn doanh thu hôm nay. Thương hiệu cá nhân &amp; Hệ thống Video Viral cho bạn sự lựa chọn cho ngày mai."
              </p>
            </div>

            {/* Bio paragraphs */}
            {c.instructorBio.map((paragraph, i) => (
              <p key={i} style={{ fontSize: 15, lineHeight: 1.7, color: "var(--cl-text-body, #b0b0b0)", margin: 0 }}>
                {paragraph}
              </p>
            ))}

            {/* Stats Row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              marginTop: 12,
              paddingTop: 20,
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              textAlign: "center"
            }}>
              {stats.map((st, i) => (
                <div key={i}>
                  <div style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 800, color: t.accent }}>
                    {st.num}
                  </div>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 2, lineHeight: 1.3 }}>
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </Sec>
  );
}
