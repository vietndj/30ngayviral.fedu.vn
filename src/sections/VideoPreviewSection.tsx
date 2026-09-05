import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, MediaSection } from "../components/ui";

interface VideoPreviewSectionProps {
  demoCardRef?: React.RefObject<HTMLDivElement | null>;
}

export function VideoPreviewSection({ demoCardRef }: VideoPreviewSectionProps) {
  const c = useContent();
  const t = useTheme();

  if (!c.heroVideoYoutubeId) return null;

  return (
    <Sec maxWidth={860} id="hero-preview" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Label>{c.heroVideoLabel || "// XEM TRƯỚC BÀI GIẢNG THỰC TẾ"}</Label>
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
              "Xem video 90 giây: Quy trình quay dựng thực tế từ số 0 của anh Nguyễn Đức Việt — Tự tay làm video hoàn chỉnh mà không cần máy cơ hay kỹ thuật phức tạp."}
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
            background: "#ffffff",
            border: "clamp(6px, 1.6vw, 10px) solid #e2e8f0",
            borderRadius: "clamp(32px, 5.5vw, 46px)",
            padding: 0,
            boxShadow:
              "0 24px 60px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04), 0 0 35px -8px rgba(26, 115, 232, 0.12)",
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
              zIndex: 10,
              border: "1px solid rgba(255, 255, 255, 0.2)",
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
