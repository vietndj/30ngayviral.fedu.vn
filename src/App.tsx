import React, { useState, useEffect, useRef } from "react";
import { useContent } from "./content";
import { useTheme } from "./theme";
import { ThemeSyncer, Div, CtaButton } from "./components/ui";
import { useHeroScrollTransition } from "./utils/useHeroScrollSnap";
import { HeroSection } from "./sections/HeroSection";
import { VideoPreviewSection } from "./sections/VideoPreviewSection";
import { PainSection } from "./sections/PainSection";
import { CorePillarsSection } from "./sections/CorePillarsSection";
import { ModulesSection } from "./sections/ModulesSection";
import { AttentionSection } from "./sections/AttentionSection";
import { RuleSection } from "./sections/RuleSection";
import { CycleSection } from "./sections/CycleSection";
import { DiscoverySection, SolutionsSection } from "./sections/DiscoverySection";
import { SolutionSection } from "./sections/DiscoverySection";
import { SkillsSection } from "./sections/SkillsSection";
import { MidCtaSection } from "./sections/MidCtaSection";
import { BeforeAfterSection } from "./sections/BeforeAfterSection";
import { RoadmapSection } from "./sections/RoadmapSection";
import { InstructorSection } from "./sections/InstructorSection";
import { BonusSection } from "./sections/BonusSection";
import { FaqSection } from "./sections/FaqSection";
import { CtaSection } from "./sections/CtaSection";
import LiveSocialProof from "./LiveSocialProof";
import ParticleCanvas from "./components/ParticleCanvas";
import "./landing.css";

function StickyRegisterBar() {
  const t = useTheme();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 24,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 99999,
      maxWidth: "calc(100% - 32px)",
      width: 560,
      background: "rgba(255, 255, 255, 0.95)",
      border: "1px solid rgba(0, 0, 0, 0.08)",
      borderRadius: 100,
      padding: "10px 14px 10px 22px",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      boxShadow: "0 16px 40px -10px rgba(0, 0, 0, 0.08), 0 0 24px rgba(26, 115, 232, 0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      animation: "fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: "#111827", lineHeight: 1.25, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          📱 Lộ Trình 30 Ngày Làm Chủ Video Ngắn
        </div>
        <div style={{ fontSize: 12, color: "#16a34a", fontWeight: 600, display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
          <span>🛡️</span> Cam kết hoàn tiền 100% trong 7 ngày
        </div>
      </div>
      <a
        href="#dang-ky"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("dang-ky")?.scrollIntoView({ behavior: "smooth" });
        }}
        style={{
          background: "#1a73e8",
          color: "#ffffff",
          padding: "11px 22px",
          borderRadius: 100,
          fontWeight: 700,
          fontSize: 13,
          textDecoration: "none",
          boxShadow: "0 4px 16px rgba(26, 115, 232, 0.3)",
          whiteSpace: "nowrap",
          flexShrink: 0,
          transition: "transform 0.2s ease, background-color 0.2s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1557b0"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1a73e8"; }}
      >
        SỞ HỮU LỘ TRÌNH 999K →
      </a>
    </div>
  );
}

// ── Dynamic Section Registry (Tập trung toàn bộ khối tại một nơi) ──
export const SECTION_COMPONENTS: Record<string, React.ComponentType<any>> = {
  hero: HeroSection,
  video: VideoPreviewSection,
  preview: VideoPreviewSection,
  pain: PainSection,
  philosophy: CorePillarsSection,
  pillars: CorePillarsSection,
  modules: ModulesSection,
  skills: SkillsSection,
  "before-after": BeforeAfterSection,
  attention: AttentionSection,
  midCta: MidCtaSection,
  instructor: InstructorSection,
  bonus: BonusSection,
  faq: FaqSection,
  cta: CtaSection,
  // Các khối cũ vẫn giữ trong registry để không gãy fallback:
  rule: RuleSection,
  cycle: CycleSection,
  discovery: DiscoverySection,
  solutions: SolutionsSection,
  solution: SolutionSection,
  roadmap: RoadmapSection,
};

export const DEFAULT_SECTION_ORDER = [
  "hero",
  "video",
  "pain",
  "pillars",
  "modules",
  "instructor",
  "before-after",
  "attention",
  "bonus",
  "faq",
  "cta",
];

export default function App() {
  const t = useTheme();
  const c = useContent();
  const isHidden = (id: string) => c.blocksMeta?.hidden?.includes(id) ?? false;

  // Ensure video section is included right after hero if not explicitly listed
  let baseOrder = (c.blocksMeta?.order?.length) ? [...c.blocksMeta.order] : DEFAULT_SECTION_ORDER;
  if (!baseOrder.includes("video") && !baseOrder.includes("preview")) {
    const heroIdx = baseOrder.indexOf("hero");
    if (heroIdx !== -1) {
      baseOrder.splice(heroIdx + 1, 0, "video");
    } else {
      baseOrder.unshift("video");
    }
  }
  const sectionOrder = baseOrder;
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth <= 768 : false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const heroContentRef = useRef<HTMLDivElement>(null);
  const contentLayerRef = useRef<HTMLDivElement>(null);
  const demoCardRef = useRef<HTMLDivElement>(null);

  useHeroScrollTransition(heroContentRef, contentLayerRef, demoCardRef);

  const hasHero = !isHidden("hero") && sectionOrder.includes("hero");
  const contentSections = sectionOrder.filter((k) => k !== "hero");

  return (
    <div style={{ position: "relative", background: t.bg, color: t.textBase ?? "#111827", fontFamily: t.fontBody, minHeight: "100vh", overflowX: "clip" }}>
      <ThemeSyncer />
      <ParticleCanvas />

      {/* 1. HERO - RESPONSIVE: NATURAL FLOW ON MOBILE, ELEGANT LAYER ON DESKTOP */}
      {hasHero && (
        isMobile ? (
          <div ref={heroContentRef} style={{ width: "100%", position: "relative", zIndex: 1 }}>
            <HeroSection />
          </div>
        ) : (
          <>
            <div
              className="cl-hero-fixed-layer"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                width: "100%",
                height: "100vh",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                pointerEvents: "auto",
              }}
            >
              <div
                ref={heroContentRef}
                style={{
                  width: "100%",
                  willChange: "transform, opacity",
                  transformOrigin: "center 42%",
                }}
              >
                <HeroSection />
              </div>
            </div>
            {/* Desktop spacer: lets Hero occupy 100vh above the fold */}
            <div aria-hidden className="cl-hero-spacer" style={{ height: "100vh", pointerEvents: "none" }} />
          </>
        )
      )}

      {/* 2. THE CONTENT LAYER - Stacked Card Layer that physically overlaps Hero with Zebra Striping */}
      <div
        id="content-layer"
        ref={contentLayerRef}
        className="cl-stacked-layer--light"
        style={{
          position: "relative",
          zIndex: 10,
          background: "#ffffff",
          borderRadius: isMobile ? 0 : "40px 40px 0 0",
          borderTop: isMobile ? "none" : "1px solid rgba(0, 0, 0, 0.06)",
          boxShadow: isMobile ? "none" : "0 -25px 60px -10px rgba(0, 0, 0, 0.12), 0 -4px 20px rgba(0, 0, 0, 0.04)",
          willChange: "box-shadow",
        }}
      >
        {contentSections.map((key, i) => {
          const Comp = SECTION_COMPONENTS[key];
          if (!Comp || isHidden(key)) return null;
          const isZebra = i % 2 === 1;

          return (
            <div
              key={key}
              id={`sec-${key}`}
              data-section={key}
              className={`cl-zebra-section ${isZebra ? "cl-zebra--tint" : "cl-zebra--light"}`}
            >
              <Comp {...(key === "video" || key === "preview" ? { demoCardRef } : {})} />
            </div>
          );
        })}

        {!isHidden("footer") && (
          <footer
            className="cl-footer"
            style={{
              borderTop: `1px solid ${t.line}`,
              fontFamily: t.fontBody,
              background: "var(--cl-bg, #ffffff)",
              marginTop: 0,
            }}
          >
            <div
              className="cl-footer__brand"
              style={{
                fontFamily: t.fontDisplay,
                fontSize: "clamp(28px, 6vw, 42px)",
                letterSpacing: "-0.02em",
                color: "var(--cl-text-base, #111827)",
              }}
            >
              {c.footerBrand}<span style={{ color: t.accent }}>{c.footerDot}</span>VIDEO
            </div>
            <p
              className="cl-footer__tagline"
              style={{
                whiteSpace: "pre-line",
                fontSize: "16px",
                lineHeight: 1.8,
                fontStyle: "italic",
                marginTop: 16,
                color: "var(--cl-text-body, #4b5563)",
              }}
            >
              {c.footerTagline}
            </p>
            <div
              className="cl-footer__links"
              style={{
                marginTop: 24,
                display: "flex",
                gap: 14,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://www.facebook.com/nguyenducviet.video"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 18px",
                  borderRadius: 30,
                  background: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#334155",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "var(--cl-accent)";
                  e.currentTarget.style.color = "#09090b";
                  e.currentTarget.style.background = "#e2e8f0";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.color = "#334155";
                  e.currentTarget.style.background = "#f1f5f9";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook Fanpage</span>
              </a>

              <a
                href="https://www.facebook.com/nddviet"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 18px",
                  borderRadius: 30,
                  background: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#334155",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "var(--cl-accent)";
                  e.currentTarget.style.color = "#09090b";
                  e.currentTarget.style.background = "#e2e8f0";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.color = "#334155";
                  e.currentTarget.style.background = "#f1f5f9";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook Cá Nhân</span>
              </a>
            </div>
            <p className="cl-footer__copy" style={{ color: "var(--cl-text-muted, #64748b)" }}>
              {c.footerCopyright}
              <span style={{ opacity: 0.5, fontSize: "0.85em", marginLeft: 8 }}>(zalo : 0934.688.632)</span>
            </p>
          </footer>
        )}
      </div>

      <StickyRegisterBar />
      {/* <LiveSocialProof /> */}
    </div>
  );
}
