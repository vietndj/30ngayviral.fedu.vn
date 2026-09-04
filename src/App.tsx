import React, { useState, useEffect } from "react";
import { useContent } from "./content";
import { useTheme } from "./theme";
import { ThemeSyncer, Div, CtaButton } from "./components/ui";
import { HeroSection } from "./sections/HeroSection";
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
export const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  hero: HeroSection,
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
  const sectionOrder = (c.blocksMeta?.order?.length) ? c.blocksMeta.order : DEFAULT_SECTION_ORDER;

  return (
    <div style={{ position: "relative", background: t.bg, color: t.textBase ?? "#f0f0f0", fontFamily: t.fontBody, minHeight: "100vh", overflowX: "clip" }}>
      <ThemeSyncer />
      <ParticleCanvas />

      {sectionOrder.map((key, i) => {
        const Comp = SECTION_COMPONENTS[key];
        if (!Comp || isHidden(key)) return null;
        return (
          <React.Fragment key={key}>
            {i > 0 && <Div />}
            <div id={`sec-${key}`} data-section={key}>
              <Comp />
            </div>
          </React.Fragment>
        );
      })}

      {!isHidden("footer") && (
        <footer className="cl-footer" style={{ borderTop: `1px solid ${t.line}`, fontFamily: t.fontBody }}>
          <div className="cl-footer__brand" style={{ fontFamily: t.fontDisplay, fontSize: "clamp(28px, 6vw, 42px)", letterSpacing: "-0.02em" }}>
            {c.footerBrand}<span style={{ color: t.accent }}>{c.footerDot}</span>VIDEO
          </div>
          <p className="cl-footer__tagline" style={{ whiteSpace: "pre-line", fontSize: "16px", lineHeight: 1.8, fontStyle: "italic", marginTop: 16 }}>
            {c.footerTagline}
          </p>
          <div className="cl-footer__links" style={{ marginTop: 24, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
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
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--cl-text-body, #b0b0b0)",
                textDecoration: "none",
                transition: "all 0.2s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "var(--cl-accent)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.color = "var(--cl-text-body, #b0b0b0)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
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
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--cl-text-body, #b0b0b0)",
                textDecoration: "none",
                transition: "all 0.2s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "var(--cl-accent)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.color = "var(--cl-text-body, #b0b0b0)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook Cá Nhân</span>
            </a>
          </div>
          <p className="cl-footer__copy">
            {c.footerCopyright}
            <span style={{ opacity: 0.15, fontSize: "0.85em", marginLeft: 8 }}>(zalo : 0934.688.632)</span>
          </p>
        </footer>
      )}
      <StickyRegisterBar />
      {/* <LiveSocialProof /> */}
    </div>
  );
}
