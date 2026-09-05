import React, { useState, useEffect } from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, MediaSection } from "../components/ui";

export function HeroSection() {
  const c = useContent();
  const t = useTheme();
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 60);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ── KHỐI 1: HERO ABOVE-THE-FOLD (Tinh gọn, giữ chân 3s, tập trung chuyển đổi) ── */}
      <section
        style={{
          position: "relative",
          textAlign: "center",
          padding: "72px 24px 36px",
          maxWidth: 860,
          margin: "0 auto",
        }}
      >
        {/* Subtle grid background */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: `linear-gradient(${t.accent}08 1px, transparent 1px), linear-gradient(90deg, ${t.accent}08 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            opacity: heroReady ? 1 : 0,
            transform: heroReady ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {/* Tầng 1: Badge định vị đối tượng người mới & chủ kinh doanh */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(0, 0, 0, 0.03)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              borderRadius: 100,
              padding: "7px 18px",
              marginBottom: 24,
            }}
          >
            <span style={{ fontSize: 13, color: "var(--cl-accent)" }}>⚡</span>
            <span
              style={{
                fontFamily: t.fontMono,
                fontSize: 12.5,
                fontWeight: 600,
                color: "var(--cl-text-muted, #6b7280)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {c.heroBadge || "DÀNH CHO NGƯỜI MỚI & CHỦ KINH DOANH"}
            </span>
          </div>

          {/* Tầng 2: H1 Tiêu đề chính - Chuẩn Noe Display 500, line-height 1.15 */}
          <h1
            className="cl-sh"
            style={{
              fontSize: "clamp(28px, 4.6vw, 50px)",
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: "-0.018em",
              color: "var(--cl-text-base, #111827)",
              margin: "0 auto 20px",
              maxWidth: 860,
            }}
          >
            <span style={{ display: "block" }}>
              Lộ Trình 30 Ngày Tự Làm <span style={{ whiteSpace: "nowrap" }}>Video Ngắn</span>
            </span>
            <span
              style={{
                color: "var(--cl-accent)",
                display: "block",
                marginTop: "0.08em",
              }}
            >
              {c.heroHeadlineAccent || "Bán Hàng & Chuyển Đổi Cao"}
            </span>
          </h1>

          {/* Tầng 3: Sub-headline giải tỏa nỗi sợ và định vị AI là đòn bẩy (Tách nhịp & Nhấn trọng tâm) */}
          <div className="cl-hero__sub-wrap">
            {/* Nhịp 1: Xóa bỏ rào cản - Micro Badges tinh tế */}
            <div className="cl-hero__tags-row">
              {(c.heroBarriers && c.heroBarriers.length > 0
                ? c.heroBarriers
                : ["Không cần máy quay đắt tiền", "Không cần biết kỹ thuật từ trước"]
              ).map((barrier, idx) => (
                <span key={idx} className="cl-hero__pill-tag">
                  <span className="cl-hero__pill-icon">✕</span> {barrier}
                </span>
              ))}
            </div>

            {/* Nhịp 2: Khẳng định giá trị & Đòn bẩy AI - Độ tương phản cao, nhấn từ khóa */}
            <p className="cl-hero__sub-pitch">
              Bạn học cách làm chủ{" "}
              <strong>góc quay &amp; kịch bản giữ chân người xem</strong> bằng{" "}
              <strong>chiếc điện thoại</strong>
              <span className="cl-hero__pitch-sep">—</span>
              kết hợp{" "}
              <span className="cl-hero__ai-tag">
                ⚡ trợ lực AI
              </span>{" "}
              giúp rút ngắn{" "}
              <strong className="cl-hero__accent-highlight">
                80% thời gian dựng video
              </strong>
              .
            </p>
          </div>

          {/* Tầng 4: CTA Button xuất hiện ngay trên màn hình đầu tiên */}
          <div className="cl-hero__cta-wrap">
            <a
              href="#content-layer"
              onClick={(e) => {
                e.preventDefault();
                const target =
                  document.getElementById("content-layer") ||
                  document.getElementById("sec-video") ||
                  document.getElementById("sec-pillars");
                target?.scrollIntoView({ behavior: "smooth" });
              }}
              className="cl-btn cl-btn--solid"
              style={{
                fontSize: 16,
                fontWeight: 700,
                padding: "20px 48px",
                borderRadius: 12,
                boxShadow: "0 10px 28px -4px rgba(26, 115, 232, 0.35)",
              }}
            >
              {c.heroCta || "KHÁM PHÁ LỘ TRÌNH 30 NGÀY →"}
            </a>
            {c.heroSubPrice && (
              <p
                style={{
                  marginTop: 14,
                  fontSize: 14,
                  color: "var(--cl-text-muted, #6b7280)",
                  fontFamily: t.fontBody,
                }}
              >
                {c.heroSubPrice}
              </p>
            )}
          </div>
        </div>
      </section>
      <MediaSection blockId="hero" />
    </>
  );
}
