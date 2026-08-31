import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, SH, Sec, AppYTEmbed } from "../components/ui";
import "./SkillsSection.css";

const SKILL_METAS = [
  { tag: "FRAME RATE: 24FPS", spec: "00:00:03 HOOK POINT" },
  { tag: "J-CUT & L-CUT", spec: "AUDIO LEAD-IN" },
  { tag: "CINEMA SFX", spec: "48kHz 24-BIT STEREO" },
  { tag: "CONVERSION ENGINE", spec: "CALL-TO-ACTION FLOW" },
];

export function SkillsSection() {
  const c = useContent();
  const t = useTheme();

  return (
    <Sec id="skills" maxWidth={920}>
      <div>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span className="cl-badge--cinema">
                <span className="cl-badge--cinema-rec" />
                4 NGUYÊN LÝ ĐIỆN ẢNH & DỰNG PHIM
              </span>
            </div>
            <SH typed>{c.skillsHeading}</SH>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          {/* ── 4 THẺ BÀI HỌC CỐT LÕI (CLEAN LINEAR STACK) ── */}
          <div className="cl-skills-cards-list">
            {c.skillCards.map((card, i) => {
              const isReversed = i % 2 !== 0;
              const meta = SKILL_METAS[i] || { tag: "DIRECTOR SPEC", spec: "FRAME ACCURATE" };

              return (
                <div
                  key={i}
                  className={`cl-skill-card-alt ${isReversed ? "cl-skill-card-alt--reversed" : ""} cl-card`}
                  style={{
                    borderRadius: t.cardRadius,
                    borderLeft: `4px solid var(--cl-accent)`,
                    background: "var(--cl-card)",
                  }}
                >
                  <div className="cl-skill-content">
                    <div className="cl-skill-meta-bar">
                      <span className="cl-badge--mono cl-badge--mono-accent">
                        PHASE {card.n}
                      </span>
                      <span className="cl-skill-spec-tag">
                        {meta.tag} · {meta.spec}
                      </span>
                    </div>

                    <h4
                      style={{
                        fontFamily: t.fontDisplay,
                        fontSize: "clamp(20px, 3.2vw, 26px)",
                        lineHeight: 1.2,
                        letterSpacing: "-0.018em",
                        fontWeight: 500,
                        color: "var(--cl-text-base)",
                        margin: "14px 0 16px 0",
                      }}
                    >
                      {card.title}
                    </h4>

                    <p
                      style={{
                        fontSize: "clamp(15px, 2.2vw, 17px)",
                        lineHeight: 1.75,
                        color: "var(--cl-text-body)",
                        margin: 0,
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>

                  <div
                    className="cl-skill-media"
                    style={{ aspectRatio: card.aspectRatio || "4 / 3" }}
                  >
                    {card.gif && (
                      <img
                        src={card.gif}
                        alt={card.title}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    )}
                    {card.youtubeId && (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ width: "100%", height: "100%", position: "relative" }}>
                          <AppYTEmbed url={`https://youtube.com/shorts/${card.youtubeId}`} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </Sec>
  );
}
