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
              {c.heroBadge || "KHÓA HỌC THỰC CHIẾN TIKTOK, REELS, SHORTS CHO NGƯỜI MỚI"}
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
              borderRadius: 12, padding: "6px 18px", marginTop: 4, maxWidth: "46ch", textWrap: "balance",
            }}>
              {c.heroHighlightPill || "Từ ý tưởng → Kịch bản → Góc quay → Edit → AI"}
            </span>
          </h1>

          {(c as any).heroPoem && (c as any).heroPoem.length > 0 && (
            <div style={{
              margin: "12px auto 36px",
              maxWidth: 580,
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
                fontFamily: t.fontDisplay, fontSize: "clamp(16px, 2.2vw, 19px)", fontStyle: "italic",
                fontWeight: 600, color: "var(--cl-accent)", lineHeight: 1.65, textAlign: "center",
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
              href="#core-pillars"
              onClick={(e) => { e.preventDefault(); document.getElementById("core-pillars")?.scrollIntoView({ behavior: "smooth" }); }}
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
    </>
  );
}
