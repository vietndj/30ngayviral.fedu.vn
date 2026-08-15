import React, { useState, useEffect } from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, ScrollTypewriter, CtaButton, AppYTEmbed, MediaSection } from "../components/ui";

export function HeroSection() {
  const c = useContent();
  const t = useTheme();
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => { const timer = setTimeout(() => setHeroReady(true), 80); return () => clearTimeout(timer); }, []);

  return (
    <>
      <section style={{ position: "relative", textAlign: "center", padding: "64px 20px 0", maxWidth: 960, margin: "0 auto" }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(${t.accent}08 1px, transparent 1px), linear-gradient(90deg, ${t.accent}08 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }} />
        <div style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          {/* 1 Clean Capsule Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(26, 115, 232, 0.06)",
            border: "1px solid rgba(26, 115, 232, 0.2)",
            borderRadius: 100, padding: "8px 20px", marginBottom: 28,
            boxShadow: "0 2px 12px rgba(26, 115, 232, 0.06)",
          }}>
            <span style={{ fontSize: 13, color: "#1a73e8" }}>✨</span>
            <span style={{
              fontFamily: t.fontMono, fontSize: 13, fontWeight: 600,
              color: "#1a73e8", letterSpacing: "0.06em", textTransform: "uppercase",
            }}>
              TÍCH HỢP AI 2026 — DÀNH CHO CREATOR & CHỦ KINH DOANH
            </span>
          </div>

          <h1 className="cl-hero__h1" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            {c.heroHeadline1 && (
              <span className="cl-hero__eyebrow-span" style={{ display: "block", fontSize: "clamp(22px, 3.8vw, 38px)", color: "#1a73e8", fontFamily: t.fontAccent, fontStyle: "italic", fontWeight: 300, margin: 0, letterSpacing: "-0.01em" }}>
                {c.heroHeadline1}
              </span>
            )}
            <span style={{
              fontSize: "clamp(28px, 4.5vw, 50px)", lineHeight: 1.2,
              fontWeight: 800, letterSpacing: "-0.02em",
              color: "var(--cl-text-base, #111827)", fontFamily: t.fontBody,
              maxWidth: "24ch", textWrap: "balance", textAlign: "center",
            }}>
              {c.heroHeadline2 || "Lộ Trình 30 Ngày Làm Chủ Video Ngắn"}
            </span>
            <span style={{
              fontFamily: t.fontAccent, fontStyle: "italic", fontWeight: 400,
              fontSize: "clamp(16px, 2.2vw, 22px)", color: "#1a73e8", display: "inline-block",
              background: "rgba(26, 115, 232, 0.07)", border: "1px solid rgba(26, 115, 232, 0.18)",
              borderRadius: 12, padding: "6px 18px", marginTop: 4, maxWidth: "34ch", textWrap: "balance",
            }}>
              Bản thiết kế từng bước biến điện thoại thành cỗ máy hút view & ra đơn
            </span>
          </h1>

          {(c as any).heroPoem && (c as any).heroPoem.length > 0 && (
            <div style={{
              margin: "8px auto 36px",
              maxWidth: 480,
              background: "rgba(255, 255, 255, 0.01)",
              border: `1px dashed ${t.accent}33`,
              borderRadius: 16,
              padding: "22px clamp(16px, 4vw, 30px)",
              position: "relative",
              backdropFilter: "blur(8px)",
              boxShadow: `0 8px 32px -8px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)`,
            }}>
              <span style={{ position: "absolute", top: 4, left: 16, fontSize: 36, fontFamily: "Georgia, serif", color: `${t.accent}33`, lineHeight: 1, userSelect: "none" }}>“</span>
              <div style={{
                fontFamily: t.fontDisplay, fontSize: "clamp(17px, 2.4vw, 21px)", fontStyle: "italic",
                fontWeight: 600, color: "var(--cl-accent)", lineHeight: 1.6, textAlign: "center",
                display: "flex", flexDirection: "column", gap: 6, position: "relative", zIndex: 2,
              }}>
                {(c as any).heroPoem.map((line: string, i: number) => (
                  <span key={i}>{line}</span>
                ))}
              </div>
              <span style={{ position: "absolute", bottom: -16, right: 16, fontSize: 36, fontFamily: "Georgia, serif", color: `${t.accent}33`, lineHeight: 1, userSelect: "none" }}>”</span>
            </div>
          )}

          {(c as any).heroVideoYoutubeId && (
            <div style={{
              maxWidth: 460, width: "100%", margin: "48px auto 72px",
              background: "#08080a", border: "clamp(4px, 2vw, 10px) solid #141416", borderRadius: "clamp(24px, 6vw, 48px)",
              padding: 0, boxShadow: `0 32px 80px -16px rgba(0,0,0,0.9), 0 0 40px -10px ${t.accent}22`,
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)",
                width: 90, height: 20, background: "#000", borderRadius: 10, zIndex: 10, border: "1.5px solid #222228",
              }} />
              <div style={{ position: "relative", paddingBottom: "177.78%", height: 0, overflow: "hidden", borderRadius: 38, background: "#000" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${(c as any).heroVideoYoutubeId}?rel=0&modestbranding=1&showinfo=0`}
                  title="Giới thiệu khóa học"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          <div className="cl-hero__cta-wrap">
            <a
              href="#roadmap"
              onClick={(e) => { e.preventDefault(); document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth" }); }}
              className="cl-btn cl-btn--solid"
              style={{ fontSize: 16, padding: "16px 36px" }}
            >
              {c.heroCta}
            </a>
            <p className="cl-hero__sub-price" style={{ marginTop: 12, fontSize: 14 }}>
              {c.heroSubPrice}
            </p>
          </div>
        </div>
      </section>
      <MediaSection blockId="hero" />

      {/* 1B: Triết lý */}
      <section style={{ 
        position: "relative", padding: "clamp(48px, 10vw, 100px) clamp(16px, 4vw, 24px)", maxWidth: 800, margin: "0 auto", 
        textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(${t.accent}04 1px, transparent 1px), linear-gradient(90deg, ${t.accent}04 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)",
        }} />
        <FadeIn>
          <div className="cl-label">
            <span style={{ opacity: 0.4 }}>// </span>Triết lý quay dựng
          </div>
          <h2 className="cl-sh" style={{ fontFamily: t.fontDisplay }}>
            <ScrollTypewriter text={c.heroAccentLine} speed={7} />
          </h2>
          <p style={{
            fontFamily: t.fontBody, fontSize: "clamp(16px, 1.8vw, 19px)", lineHeight: 1.9,
            color: "var(--cl-text-body, #b0b0b0)", maxWidth: "62ch", margin: "0 auto", textWrap: "balance",
          }}>
            {c.heroSub}
          </p>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 24,
            width: "100%", maxWidth: 820, margin: "48px auto 0", textAlign: "left",
          }}>
            {/* Foundation 1 */}
            <div style={{
              background: "var(--cl-card)", border: `1px solid var(--cl-line)`, borderLeft: `3px solid var(--cl-accent)`,
              borderRadius: t.cardRadius, padding: "clamp(20px, 5vw, 32px) clamp(16px, 4vw, 28px)", display: "flex", flexDirection: "column", gap: 12,
              transition: "transform 0.2s ease, border-color 0.2s ease",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>🎬</span>
                <span style={{ fontFamily: t.fontMono, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--cl-accent)", fontWeight: 600 }}>
                  NỀN TẢNG 01: QUAY DỰNG CUỐN HÚT
                </span>
              </div>
              <h3 style={{ fontFamily: t.fontBody, fontSize: "clamp(19px, 5vw, 24px)", fontWeight: 700, color: "var(--cl-text-base)", margin: "4px 0 0", letterSpacing: "-0.015em" }}>
                Cắt Ghép Chỉn Chu
              </h3>
              <p style={{ fontSize: "clamp(15px, 3.8vw, 17px)", lineHeight: 1.75, color: "var(--cl-text-body)", margin: 0 }}>
                Làm chủ tư duy phân cảnh và nhịp điệu cắt ghép mượt mà, loại bỏ hoàn toàn các khoảng chết gây nhàm chán.
              </p>
            </div>

            {/* Foundation 2 */}
            <div style={{
              background: "var(--cl-card)", border: `1px solid var(--cl-line)`, borderLeft: `3px solid var(--cl-accent)`,
              borderRadius: t.cardRadius, padding: "clamp(20px, 5vw, 32px) clamp(16px, 4vw, 28px)", display: "flex", flexDirection: "column", gap: 12,
              transition: "transform 0.2s ease, border-color 0.2s ease",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>💡</span>
                <span style={{ fontFamily: t.fontMono, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--cl-accent)", fontWeight: 600 }}>
                  NỀN TẢNG 02: BỐI CẢNH & ÁNH SÁNG
                </span>
              </div>
              <h3 style={{ fontFamily: t.fontBody, fontSize: "clamp(19px, 5vw, 24px)", fontWeight: 700, color: "var(--cl-text-base)", margin: "4px 0 0", letterSpacing: "-0.015em" }}>
                Góc Quay & Hướng Sáng Chuẩn
              </h3>
              <p style={{ fontSize: "clamp(15px, 3.8vw, 17px)", lineHeight: 1.75, color: "var(--cl-text-body)", margin: 0 }}>
                Tận dụng ánh sáng tự nhiên và cách đặt máy thông minh giúp khung hình điện thoại luôn nét căng, có chiều sâu.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
