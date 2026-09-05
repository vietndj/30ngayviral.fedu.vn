import { useState, useEffect } from "react";

export default function ZaloChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Tự động bung popup sau 3.5 giây nếu người dùng chưa tương tác
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setIsOpen(true);
      }
    }, 3500);
    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const ZALO_PHONE = "0934688632";
  const ZALO_LINK = `https://zalo.me/${ZALO_PHONE}`;

  return (
    <div style={{ position: "fixed", bottom: "clamp(16px, 3vw, 24px)", right: "clamp(16px, 3vw, 24px)", zIndex: 9999, fontFamily: "'Aeonik', 'Inter', -apple-system, sans-serif" }}>
      {/* POPUP BOX */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "74px",
            right: "0",
            width: "min(320px, calc(100vw - 32px))",
            background: "var(--cl-card, #ffffff)",
            color: "var(--cl-text-base, #111827)",
            border: "1.5px solid rgba(0, 104, 255, 0.35)",
            borderRadius: "20px",
            padding: "18px",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.2), 0 0 35px rgba(0, 104, 255, 0.15)",
            animation: "zalo-fade-in 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            transformOrigin: "bottom right"
          }}
        >
          {/* Header & Close */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ position: "relative" }}>
                <img 
                  src="/ava.jpg" 
                  alt="Nguyễn Đức Việt"
                  style={{ 
                    width: "48px", 
                    height: "48px", 
                    borderRadius: "50%", 
                    objectFit: "cover",
                    display: "block",
                    boxShadow: "0 4px 12px rgba(0, 104, 255, 0.3)"
                  }} 
                />
                <span style={{ 
                  position: "absolute", 
                  bottom: 1, 
                  right: 1, 
                  width: "10px", 
                  height: "10px", 
                  background: "#10B981", 
                  borderRadius: "50%", 
                  border: "2px solid var(--cl-card, #ffffff)" 
                }} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "var(--cl-text-head, #0f172a)" }}>
                  Nguyễn Đức Việt
                </h4>
                <span style={{ fontSize: "12px", color: "#10B981", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
                  Online hỗ trợ trực tiếp
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setHasInteracted(true);
              }}
              style={{ 
                background: "rgba(0,0,0,0.05)", 
                border: "none", 
                color: "var(--cl-text-muted, #64748B)", 
                width: 30,
                height: 30,
                borderRadius: "50%",
                fontSize: "18px", 
                cursor: "pointer", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              aria-label="Đóng chat"
            >
              ×
            </button>
          </div>

          {/* Greeting message */}
          <div style={{
            background: "rgba(0, 104, 255, 0.05)",
            border: "1px solid rgba(0, 104, 255, 0.12)",
            borderRadius: "12px",
            padding: "12px 14px",
            marginBottom: "14px"
          }}>
            <p style={{ margin: 0, fontSize: "13.5px", color: "var(--cl-text-body, #334155)", lineHeight: "1.5" }}>
              Lộ trình thực chiến từ số 0 trên chính điện thoại của bạn. Có bất kỳ câu hỏi nào trước khi vào lớp, nhắn Zalo mình hỗ trợ ngay nhé!
            </p>
          </div>

          {/* Main Direct Chat Button */}
          <a
            href={ZALO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setIsOpen(false);
              setHasInteracted(true);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              padding: "12px 16px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #0068FF, #0052CC)",
              color: "#FFFFFF",
              fontWeight: "700",
              fontSize: "14px",
              textDecoration: "none",
              boxShadow: "0 6px 20px rgba(0, 104, 255, 0.35)",
              transition: "all 0.2s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 104, 255, 0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 104, 255, 0.35)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M24 4C12.954 4 4 11.954 4 21.75C4 26.685 6.425 31.112 10.36 34.25L8.5 42L16.75 38.35C19.01 39.11 21.45 39.5 24 39.5C35.046 39.5 44 31.546 44 21.75C44 11.954 35.046 4 24 4Z" fill="#FFFFFF"/>
              <path d="M16 17.5H23V20H18.5V21.5H22V24H18.5V26H23V28.5H16V17.5Z" fill="#0068FF"/>
            </svg>
            <span>Nhắn Zalo trực tiếp (0934.688.632)</span>
          </a>
        </div>
      )}

      {/* MAIN ZALO FLOATING BUTTON */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasInteracted(true);
        }}
        aria-label="Chat Zalo hỗ trợ cùng Nguyễn Đức Việt"
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #0068FF, #00C6FF)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 25px rgba(0, 104, 255, 0.45)",
          transition: "transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          position: "relative",
          animation: "zalo-pulse 2.5s infinite"
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {/* ZALO LOGO SVG */}
        <svg width="30" height="30" viewBox="0 0 54 54" fill="none">
          <path d="M27 0C12.088 0 0 10.89 0 24.326c0 6.643 2.946 12.67 7.747 17.062L5.01 49.33c-.266.837.59 1.624 1.402 1.29l9.324-3.834C19.23 47.96 23.018 48.65 27 48.65c14.912 0 27-10.888 27-24.325C54 10.89 41.912 0 27 0z" fill="#0068FF"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M37.5 35.5c-1.5 0-8.5-2.5-12.5-6.5s-6.5-11-6.5-12.5c0-1.5 1-2.5 2.5-2.5s2.5 1 3 2.5c.5 1.5.5 2.5 0 3.5s-1.5 2-1 3c1 2 4 5 6 6s2-.5 3-1 2-.5 3.5 0c1.5.5 2.5 1.5 2.5 2.5s-1 2.5-2.5 2.5z" fill="#FFFFFF"/>
          <text x="13" y="32" fill="#FFFFFF" fontSize="16" fontWeight="bold" fontFamily="sans-serif">zalo</text>
        </svg>

        {/* NOTIFICATION BADGE */}
        <span
          style={{
            position: "absolute",
            top: "-2px",
            right: "-2px",
            width: "18px",
            height: "18px",
            background: "#FF3B30",
            color: "#FFFFFF",
            borderRadius: "50%",
            fontSize: "11px",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #ffffff",
            boxShadow: "0 2px 6px rgba(255, 59, 48, 0.5)"
          }}
        >
          1
        </span>
      </button>

      {/* KEYFRAME ANIMATIONS */}
      <style>{`
        @keyframes zalo-pulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 104, 255, 0.6), 0 8px 25px rgba(0, 104, 255, 0.4); }
          70% { box-shadow: 0 0 0 14px rgba(0, 104, 255, 0), 0 8px 25px rgba(0, 104, 255, 0.4); }
          100% { box-shadow: 0 0 0 0 rgba(0, 104, 255, 0), 0 8px 25px rgba(0, 104, 255, 0.4); }
        }
        @keyframes zalo-fade-in {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
