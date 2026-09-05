import React, { useState, useRef } from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, MediaSection } from "../components/ui";

interface VideoPreviewSectionProps {
  demoCardRef?: React.RefObject<HTMLDivElement | null>;
}

export function VideoPreviewSection({ demoCardRef }: VideoPreviewSectionProps) {
  const c = useContent();
  const t = useTheme();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Cần ít nhất 1 nguồn video: MP4 URL hoặc Youtube ID
  if (!c.heroVideoUrl && !c.heroVideoYoutubeId) return null;

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <Sec maxWidth={860} id="hero-preview" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Label>{c.heroVideoLabel || "// XEM TRƯỚC LỘ TRÌNH THỰC CHIẾN"}</Label>
          <SH>{c.heroVideoHeading || "Chỉ cần chiếc điện thoại trên tay — Đây là cách bạn bắt đầu ra đơn"}</SH>
          <p
            style={{
              fontFamily: t.fontBody,
              fontSize: "clamp(15px, 1.7vw, 17px)",
              lineHeight: 1.8,
              color: "var(--cl-text-body, #4b5563)",
              maxWidth: 640,
              margin: "14px auto 0",
              textWrap: "balance",
            }}
          >
            {c.heroVideoSub ||
              "Xem video 75 giây: Quy trình 5 chặng thực tế từ giảng viên FPT 15 năm kinh nghiệm — Tự tay làm video hoàn chỉnh mà không cần máy cơ hay kỹ thuật phức tạp."}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <div
          ref={demoCardRef}
          style={{
            maxWidth: 400,
            width: "100%",
            margin: "0 auto",
            background: "#000000",
            border: "clamp(6px, 1.6vw, 10px) solid #e2e8f0",
            borderRadius: "clamp(32px, 5.5vw, 46px)",
            padding: 0,
            boxShadow:
              "0 24px 60px -12px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.06), 0 0 35px -8px rgba(26, 115, 232, 0.16)",
            position: "relative",
            overflow: "hidden",
            willChange: "transform, opacity",
            transition: "transform 0.3s ease, opacity 0.3s ease",
          }}
        >
          {/* Dynamic Island */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: "50%",
              transform: "translateX(-50%)",
              width: 80,
              height: 16,
              background: "#1e293b",
              borderRadius: 10,
              zIndex: 30,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              paddingBottom: "177.78%",
              height: 0,
              overflow: "hidden",
              borderRadius: "clamp(24px, 4.5vw, 36px)",
              background: "#0f172a",
            }}
          >
            {c.heroVideoUrl ? (
              <>
                <video
                  ref={videoRef}
                  src={c.heroVideoUrl}
                  poster={c.heroVideoPoster || "/assets/video_intro_poster.jpg"}
                  playsInline
                  controls={isPlaying}
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "inherit",
                    backgroundColor: "#000000",
                    cursor: "pointer",
                  }}
                  onClick={handlePlayClick}
                />

                {/* Nút Play Kính Mờ Trọng Tâm khi chưa phát */}
                {!isPlaying && (
                  <div
                    onClick={handlePlayClick}
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "radial-gradient(circle, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)",
                      cursor: "pointer",
                      zIndex: 20,
                      transition: "opacity 0.25s ease",
                    }}
                  >
                    <button
                      type="button"
                      aria-label="Phát video lộ trình"
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        background: "rgba(26, 115, 232, 0.92)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "2px solid rgba(255, 255, 255, 0.8)",
                        boxShadow: "0 16px 36px rgba(26, 115, 232, 0.5), 0 0 0 8px rgba(255, 255, 255, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff" style={{ marginLeft: 3 }}>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <span
                      style={{
                        marginTop: 14,
                        fontFamily: t.fontBody,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#ffffff",
                        letterSpacing: "0.02em",
                        textShadow: "0 2px 8px rgba(0,0,0,0.7)",
                        background: "rgba(0,0,0,0.4)",
                        padding: "4px 12px",
                        borderRadius: 100,
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      Bấm để xem video 75s
                    </span>
                  </div>
                )}
              </>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${c.heroVideoYoutubeId}?rel=0&modestbranding=1&showinfo=0`}
                title="Giới thiệu khóa học thực chiến"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 18,
            fontSize: 13,
            fontFamily: t.fontMono,
            letterSpacing: "0.04em",
            color: "var(--cl-text-muted, #6b7280)",
          }}
        >
          {c.heroVideoNote ||
            "🎥 100% cảnh quay và edit thực hiện trên điện thoại cá nhân · Trợ lực kịch bản AI"}
        </p>
      </FadeIn>

      <MediaSection blockId="video" />
    </Sec>
  );
}
