import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec } from "../components/ui";

export function AttentionSection() {
  const c = useContent();
  const t = useTheme();

  const choices = [
    {
      badge: "Lựa chọn 1",
      title: "Tự mày mò & làm một mình",
      cost: "Mất 3 - 6 tháng + Cạn năng lượng",
      desc: "Xem video hướng dẫn miễn phí rải rác trên mạng. Bắt chước hiệu ứng nhảm nhí, đăng lên nhận về 50 view. Không có môi trường thực hành, không ai chỉ ra sai lầm.",
      isBest: false,
      tag: "❌ Mất thời gian"
    },
    {
      badge: "Lựa chọn 2",
      title: "Thuê ekip media / mua thiết bị đắt tiền",
      cost: "10.000.000 – 20.000.000 VNĐ",
      desc: "Sắm máy ảnh đắt tiền, thuê thợ quay dựng nhưng không có định vị nội dung rõ ràng. Hình ảnh có thể đẹp nhưng vẫn không có người xem và không tạo ra doanh thu.",
      isBest: false,
      tag: "⚠️ Tốn chi phí"
    },
    {
      badge: "Lựa chọn 3 — KHUYÊN DÙNG",
      title: "Lộ trình 30 ngày làm chủ video ngắn",
      cost: "Chỉ 999.000 VNĐ (Tổng giá trị 7.5M)",
      desc: "Sở hữu toàn bộ bản thiết kế kịch bản + bộ 50+ template CapCut kéo thả + 20+ prompt AI + đặc quyền tham gia Skool Hub & được Thầy Việt review gỡ lỗi chuyên môn.",
      isBest: true,
      tag: "🏆 Tối ưu nhất"
    }
  ];

  return (
    <Sec maxWidth={960}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Label>{c.attentionLabel}</Label>
          <SH typed>{c.attentionHeading}</SH>
          <p style={{ fontSize: 17, color: "var(--cl-text-muted, #64748b)", maxWidth: 680, margin: "-16px auto 0", lineHeight: 1.75 }}>
            {c.attentionPara}
          </p>
        </div>
      </FadeIn>

      {/* ── 3 Choices Comparison Cards ── */}
      <FadeIn delay={100}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
          marginBottom: 56
        }}>
          {choices.map((item, idx) => (
            <div
              key={idx}
              className="cl-card"
              style={{
                background: item.isBest ? "var(--cl-callout-accent-bg, #eff6ff)" : "var(--cl-card)",
                border: item.isBest ? `2px solid var(--cl-accent)` : `1px solid var(--cl-line)`,
                borderRadius: 20,
                padding: "32px 24px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                boxShadow: item.isBest ? `0 20px 40px -12px rgba(225, 29, 72, 0.25)` : "var(--cl-shadow-card)",
                transform: item.isBest ? "scale(1.02)" : "none",
                transition: "all 0.3s ease"
              }}
            >
              {item.isBest && (
                <div style={{
                  position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                  background: t.accent, color: "#fff", padding: "4px 16px", borderRadius: 20,
                  fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase"
                }}>
                  GIẢI PHÁP TỐI ƯU NHẤT
                </div>
              )}
              <div style={{ fontFamily: t.fontMono, fontSize: 12, fontWeight: 700, color: item.isBest ? t.accent : "var(--cl-text-muted, #64748b)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                {item.badge}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--cl-text-base, #09090b)", marginBottom: 12, lineHeight: 1.3 }}>
                {item.title}
              </h3>
              <div style={{
                fontSize: 15, fontWeight: 700, color: item.isBest ? "var(--cl-accent)" : "var(--cl-text-muted, #64748b)",
                background: item.isBest ? "rgba(225, 29, 72, 0.1)" : "var(--cl-card2, #f8fafc)",
                padding: "8px 14px", borderRadius: 10, marginBottom: 16, display: "inline-block",
                border: `1px solid ${item.isBest ? "rgba(225, 29, 72, 0.2)" : "var(--cl-line)"}`
              }}>
                {item.cost}
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--cl-text-body, #27272a)", margin: 0, flexGrow: 1 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* ── Key Differences Checklist ── */}
      <FadeIn delay={200}>
        <div className="cl-card" style={{ padding: "36px clamp(20px, 4vw, 40px)", maxWidth: 760, margin: "0 auto" }}>
          <h4 style={{ textAlign: "center", fontSize: 18, fontWeight: 700, color: "var(--cl-text-base, #09090b)", marginBottom: 24 }}>
            Bảng so sánh kỹ thuật: Video nghiệp dư vs Video có bản thiết kế chuẩn
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {c.attentionItems.map((item, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                paddingBottom: 16,
                borderBottom: i < c.attentionItems.length - 1 ? `1px solid var(--cl-line)` : "none"
              }}>
                <div style={{
                  padding: "6px 12px", borderRadius: 8, background: "var(--cl-callout-danger-bg, #fef2f2)",
                  border: "1px solid var(--cl-callout-danger-border, #fee2e2)",
                  color: "var(--cl-callout-danger-accent, #dc2626)", fontSize: 13, fontWeight: 700, flexShrink: 0,
                  fontFamily: t.fontMono
                }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 15.5, lineHeight: 1.6, color: "var(--cl-text-body, #27272a)", fontWeight: 500 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </Sec>
  );
}
