import { useEffect, useState, useCallback } from "react";
import { useTheme } from "./theme";
import { useContent } from "./content";
import LiveSocialProof from "./LiveSocialProof";
import ZaloChatWidget from "./ZaloChatWidget";
import { IconCheck } from "./components/ui";

function useIsMobile(breakpoint = 680) {
  const [mobile, setMobile] = useState(() => window.innerWidth < breakpoint);
  const update = useCallback(() => setMobile(window.innerWidth < breakpoint), [breakpoint]);
  useEffect(() => {
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);
  return mobile;
}

const GREEN = "#10b981"; // Emerald green for success states



function Ck({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
      <span style={{ color: GREEN, fontWeight: 700, flexShrink: 0, fontSize: 16 }}>✓</span>
      <span style={{ fontSize: 15, lineHeight: 1.65, color: "var(--cl-text-body, #374151)" }}>{children}</span>
    </div>
  );
}

function Card({ children, highlight = false, style: extraStyle = {} }: { children: React.ReactNode; highlight?: boolean; style?: React.CSSProperties }) {
  const t = useTheme();
  return (
    <div style={{
      background: highlight ? "#ffffff" : "var(--cl-card, #ffffff)",
      border: highlight ? `1.5px solid ${t.accent}55` : "1px solid var(--cl-line, #e2e8f0)",
      borderRadius: "var(--cl-radius, 16px)",
      padding: "24px 20px",
      boxShadow: highlight ? "0 8px 30px rgba(26, 115, 232, 0.08)" : "0 2px 8px rgba(0, 0, 0, 0.03)",
      ...extraStyle,
    }}>
      {children}
    </div>
  );
}

function Lbl({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return (
    <div style={{
      fontFamily: t.fontMono,
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.14em",
      color: t.accent,
      textTransform: "uppercase" as const,
      marginBottom: 10
    }}>
      {children}
    </div>
  );
}

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="cl-sh" style={{ fontSize: "clamp(18px, 3vw, 24px)", margin: "0 0 18px", color: "var(--cl-text-base, #111827)" }}>
      {children}
    </h2>
  );
}

function PaymentSuccessModal({ onClose }: { onClose: () => void }) {
  const t = useTheme();
  const c = useContent();
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
      animation: "fadeIn 0.3s ease",
    }}>
      <div style={{
        background: "#ffffff",
        border: `1.5px solid ${GREEN}`,
        borderRadius: "var(--cl-radius, 16px)", padding: "40px 28px",
        maxWidth: 480, width: "100%", textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
      }}>
        <div style={{
          width: 68, height: 68, borderRadius: 16, margin: "0 auto 20px",
          background: "rgba(16, 185, 129, 0.1)",
          border: `1.5px solid ${GREEN}44`,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ transform: "scale(1.2)" }}>
            <IconCheck accent={GREEN} />
          </div>
        </div>
        <h2 className="cl-sh" style={{ fontSize: "clamp(22px,4vw,28px)", color: "var(--cl-text-base, #111827)", margin: "0 0 12px" }}>
          Chào mừng bạn đến với lớp học!
        </h2>
        <p style={{ fontSize: 15, color: "var(--cl-text-body, #374151)", lineHeight: 1.75, margin: "0 0 24px" }}>
          Mình đã nhận được chuyển khoản thành công của bạn rồi nhé.
        </p>
        <div style={{ background: "#f8fafc", border: "1px solid var(--cl-line, #e2e8f0)", borderRadius: 12, padding: "18px 20px", marginBottom: 20 }}>
          <p style={{ fontSize: 14.5, color: "var(--cl-text-base, #111827)", marginBottom: 6, fontWeight: 700 }}>📧 Tài khoản Skool &amp; 4 Tủ đồ nghề thực chiến:</p>
          <p style={{ fontSize: 15.5, fontWeight: 700, color: GREEN, margin: "0 0 4px" }}>Đã gửi thẳng vào email của bạn</p>
          <p style={{ fontSize: 13, color: "var(--cl-text-muted, #64748b)" }}>Mở hòm thư (kiểm tra cả mục Spam/Quảng cáo) để kích hoạt tài khoản và vào chào anh em nhé!</p>
        </div>
        <div style={{ background: "#f1f5f9", borderRadius: 10, padding: "14px 18px", marginBottom: 24 }}>
          {[
            `🎬 ${c.courseName || "Lộ Trình 30 Ngày Làm Chủ Video Ngắn"}`,
            "🎁 Trọn bộ 4 Tủ đồ nghề thực chiến (Nhạc AI, SFX, Prompt, 30 Hook)",
            "♾ Sở hữu trọn đời & Cập nhật kỹ thuật AI mới liên tục"
          ].map((item) => (
            <div key={item} style={{ fontSize: 14, color: "var(--cl-text-body, #374151)", padding: "4px 0", textAlign: "left" }}>{item}</div>
          ))}
        </div>
        <button onClick={() => window.location.href = "/"} style={{
          background: t.accent, color: t.accentText, border: "none",
          borderRadius: "var(--cl-radius-btn, 12px)", padding: "14px 36px",
          fontSize: 15, fontWeight: 700, cursor: "pointer",
          boxShadow: `0 4px 18px ${t.accent}44`,
        }}>
          Đóng & Bắt đầu học ngay
        </button>
      </div>
    </div>
  );
}

function ConfirmBanner({ onReset }: { onReset: () => void }) {
  const t = useTheme();
  const c = useContent();
  return (
    <div style={{ textAlign: "center", padding: "40px 20px", background: "#ffffff", border: `1.5px solid ${GREEN}55`, borderRadius: "var(--cl-radius, 16px)", boxShadow: "0 8px 30px rgba(16, 185, 129, 0.08)" }}>
      <div style={{
        width: 64, height: 64, borderRadius: 16, margin: "0 auto 16px",
        background: "rgba(16, 185, 129, 0.1)",
        border: `1.5px solid ${GREEN}44`,
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <IconCheck accent={GREEN} />
      </div>
      <h2 className="cl-sh" style={{ fontSize: "clamp(22px, 4vw, 28px)", marginBottom: 12, color: "var(--cl-text-base, #111827)" }}>
        Mình đã ghi nhận chuyển khoản của bạn!
      </h2>
      <p style={{ fontSize: 15, color: "var(--cl-text-body, #374151)", lineHeight: 1.75, maxWidth: 460, margin: "0 auto 24px" }}>
        Hệ thống đang tự động đối soát giao dịch. Tài khoản Skool và bộ đồ nghề sẽ được gửi thẳng vào email của bạn <strong style={{ color: "var(--cl-text-base, #111827)" }}>trong vòng 1 - 2 phút</strong>.
      </p>
      <div style={{ display: "inline-flex", flexDirection: "column", gap: 10, background: "#f8fafc", border: "1px solid var(--cl-line, #e2e8f0)", borderRadius: 12, padding: "18px 22px", marginBottom: 20, textAlign: "left" }}>
        {[
          `🎬 ${c.courseName || "Lộ Trình 30 Ngày Làm Chủ Video Ngắn"}`,
          "🎁 Trọn bộ 4 Tủ đồ nghề thực chiến (Nhạc AI, SFX, Prompt, 30 Hook)",
          "♾ Sở hữu trọn đời & Cập nhật kỹ thuật AI mới liên tục"
        ].map((item) => (
          <span key={item} style={{ fontSize: 14.5, color: "var(--cl-text-body, #374151)" }}>{item}</span>
        ))}
      </div>
      <p style={{ fontSize: 14, color: "var(--cl-text-muted, #64748b)", lineHeight: 1.6 }}>Cần hỗ trợ gấp hoặc sau 5 phút chưa thấy email? Nhắn thẳng Zalo Việt: <a href="https://zalo.me/0934688632" style={{ color: t.accent, fontWeight: 700 }}>0934.688.632</a> (hỗ trợ ngay)</p>
      <button onClick={onReset} style={{ marginTop: 20, background: "transparent", border: `1px solid ${t.line}`, borderRadius: t.btnRadius, padding: "10px 24px", color: t.textMuted ?? "#555", fontSize: 13, cursor: "pointer" }}>
        Quay lại trang thanh toán
      </button>
    </div>
  );
}

type BankInfo = { name: string; account: string; holder: string; amount: string; content: string };

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* silent */
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      style={{
        background: copied ? "rgba(16, 185, 129, 0.12)" : "#f1f5f9",
        color: copied ? "#10b981" : "#475569",
        border: `1px solid ${copied ? "#10b981" : "#cbd5e1"}`,
        borderRadius: 6,
        padding: "2px 8px",
        fontSize: 11.5,
        fontWeight: 600,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        transition: "all 0.15s ease",
      }}
      title="Sao chép"
    >
      {copied ? "✓ Đã copy" : label}
    </button>
  );
}

function PaymentPanel({ bank, qrUrl, onConfirm, onVideoClick }: { bank: BankInfo; qrUrl: string; onConfirm: () => void; onVideoClick: () => void }) {
  const c = useContent();
  const t = useTheme();
  const priceVal = parseInt(c.price.replace(/\./g, ""), 10);
  const originalVal = parseInt(c.value.replace(/\./g, ""), 10);
  const savingVal = originalVal - priceVal;
  const formattedSaving = new Intl.NumberFormat("vi-VN").format(savingVal);
  const prefix = (c as any).transferPrefix || "VIDEO";

  return (
    <Card highlight style={{ padding: "24px 20px" }}>


      <Lbl>Quét mã vào lớp</Lbl>

      {/* ✨ [POSITION 2 BADGE] */}
      <div style={{
        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.14), rgba(16, 185, 129, 0.04))",
        border: "1px solid rgba(16, 185, 129, 0.4)",
        borderRadius: 12,
        padding: "10px 14px",
        marginBottom: 16,
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(16, 185, 129, 0.15)"
      }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#10b981", letterSpacing: "0.03em", textTransform: "uppercase" }}>
          ✨ BẢO CHỨNG CHÍNH CHỦ TỪ THẦY NGUYỄN ĐỨC VIỆT
        </div>
        <div style={{ fontSize: 12, color: "var(--cl-text-body, #374151)", marginTop: 3 }}>
          Đồng hành chữa bài trực tiếp trên Skool · Bản cập nhật 2026
        </div>
      </div>

      {/* Pricing block */}
      <div style={{ textAlign: "center", marginBottom: 18, paddingBottom: 18, borderBottom: "1px solid var(--cl-line, #e2e8f0)" }}>
        <div style={{ fontSize: 15, color: "var(--cl-text-muted, #64748b)", textDecoration: "line-through" }}>{c.value} VNĐ</div>
        <div style={{ fontSize: 36, fontWeight: 700, color: "var(--cl-text-base, #111827)" }}>{c.price} <span style={{ fontSize: 16 }}>VNĐ</span></div>
        <div style={{ fontSize: 14.5, color: t.accent, fontWeight: 700 }}>Tiết kiệm {formattedSaving} VNĐ</div>
      </div>

      {/* 📱 [Khối Mã QR & Thanh Toán] (Ở giữa, to nhất - Không có chữ VIET QR) */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: t.accent, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          📱 QUÉT MÃ VÀO LỚP NGAY
        </p>
        <div style={{ 
          width: "100%",
          maxWidth: 320,
          margin: "0 auto",
          background: "#fff", 
          borderRadius: 16, 
          boxShadow: `0 4px 24px rgba(0, 0, 0, 0.06)`,
          border: `1px solid var(--cl-line, #e2e8f0)`,
          overflow: "hidden",
          padding: "16px 16px 18px",
          textAlign: "center"
        }}>
          <div style={{ width: "100%", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img
              src={qrUrl}
              alt="Mã QR chuyển khoản Khóa học"
              style={{ 
                display: "block", 
                width: "100%", 
                height: "100%",
                objectFit: "contain",
                borderRadius: 8 
              }}
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.style.display = "none";
                const parent = img.parentElement;
                if (parent) {
                  parent.innerHTML = `<div style="width:100%;aspect-ratio:1;display:flex;align-items:center;justify-content:center;background:#141417;border-radius:8px;font-size:12px;color:#fff;text-align:center;padding:16px;">QR lỗi</div>`;
                }
              }}
            />
          </div>

          <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #e2e8f0", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#0284c7", letterSpacing: "0.04em" }}>NAPAS 247</span>
              <span style={{ color: "#cbd5e1" }}>|</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#ea580c", letterSpacing: "0.02em" }}>TPBank</span>
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.02em" }}>
              {bank.holder}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 4 }}>
              <span style={{ fontSize: 14.5, fontWeight: 700, color: "#0f172a", letterSpacing: "0.03em" }}>
                {bank.account}
              </span>
              <CopyButton text={bank.account} label="Copy STK" />
            </div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
              Số tiền: <strong style={{ color: "#0f172a", fontWeight: 700 }}>{bank.amount} VNĐ</strong>
            </div>
          </div>
        </div>
        <p style={{ fontSize: 13.5, color: "var(--cl-text-muted, #64748b)", marginTop: 10 }}>Tương thích: Mọi app ngân hàng &amp; Ví Momo (quét là tự điền đúng tiền và cú pháp)</p>
      </div>

      {/* 2-STEP INSTRUCTIONS */}
      <div style={{ marginBottom: 18, background: "#f8fafc", borderRadius: 12, padding: "14px 16px", border: "1px solid var(--cl-line, #e2e8f0)" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--cl-text-muted, #64748b)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Hướng dẫn 2 bước</p>
        <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center" }}>
          <span style={{ background: t.accent, color: "#ffffff", fontSize: 12, fontWeight: 700, borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>1</span>
          <span style={{ fontSize: 14.5, color: "var(--cl-text-body, #374151)" }}>Mở app ngân hàng quét mã QR (đã tự điền đúng {c.price}đ).</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ background: t.accent, color: "#ffffff", fontSize: 12, fontWeight: 700, borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>2</span>
            <span style={{ fontSize: 14.5, color: "var(--cl-text-body, #374151)" }}>
              Kiểm tra nội dung: <strong style={{ color: "var(--cl-text-base, #111827)", wordBreak: "break-all" }}>{bank.content}</strong>
            </span>
          </div>
          <CopyButton text={bank.content} label="Copy cú pháp" />
        </div>
      </div>

      <button
        onClick={onConfirm}
        style={{
          width: "100%", background: t.accent, color: t.accentText, border: "none",
          borderRadius: "var(--cl-radius-btn, 12px)", padding: "16px 16px",
          fontSize: 15, fontWeight: 700, cursor: "pointer",
          letterSpacing: "0.04em", textTransform: "uppercase",
          boxShadow: `0 4px 20px ${t.accent}44`,
          transition: "all 0.15s ease",
        }}
      >
        ✅ TÔI ĐÃ CHUYỂN KHOẢN XONG
      </button>

      <p style={{ fontSize: 13.5, color: t.textMuted ?? "#64748b", textAlign: "center", marginTop: 14, marginBottom: 14, lineHeight: 1.5 }}>
        ⚡ Hệ thống tự động kích hoạt tài khoản Skool qua Email &amp; SMS ngay khi ngân hàng báo có (thường mất 1 - 2 phút).
      </p>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", paddingTop: 14, borderTop: `1px solid ${t.line}`, flexWrap: "wrap" }}>
        {[["🔒", "Thanh toán bảo mật 24/7"], ["🤝", "Đồng hành thật, người thật"], ["⚡", "Vào học ngay"]].map(([icon, label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: t.textMuted ?? "#64748b", fontWeight: 500 }}>
            <span>{icon}</span><span>{label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function CheckoutContent() {
  const t = useTheme();
  const c = useContent();
  const priceVal = parseInt(c.price.replace(/\./g, ""), 10);
  const originalVal = parseInt(c.value.replace(/\./g, ""), 10);
  const savingVal = originalVal - priceVal;
  const formattedSaving = new Intl.NumberFormat("vi-VN").format(savingVal);
  const [confirmed, setConfirmed] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const isMobile = useIsMobile();

  const rawCustomer = localStorage.getItem("video_customer");
  const customer = rawCustomer ? JSON.parse(rawCustomer) as { phone?: string } : {};
  const phone = customer.phone || "[SĐT CỦA BẠN]";
  const prefix = (c as any).transferPrefix || "VIDEO";
  const transferContent = `${prefix} ${phone}`;

  const BANK: BankInfo = { name: "TPBank", account: "88804101986", holder: "NGUYEN DUC VIET", amount: c.price, content: transferContent };
  const QR_URL = `https://img.vietqr.io/image/TPB-${BANK.account}-qr_only.png?amount=${c.price.replace(/\./g, "")}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(BANK.holder)}`;

  // Bắn sự kiện InitiateCheckout khi truy cập trang thanh toán
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        value: priceVal || 999000,
        currency: 'VND',
        content_name: (c.courseName || 'Lộ Trình 30 Ngày Làm Chủ Video Ngắn') + ' - Fedu.vn'
      });
    }
  }, [priceVal, c.courseName]);

  const handleManualConfirm = async () => {
    setConfirmed(true);

    // Bắn sự kiện Purchase Meta Pixel khi xác nhận thủ công
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: priceVal || 999000,
        currency: 'VND',
        content_name: (c.courseName || 'Lộ Trình 30 Ngày Làm Chủ Video Ngắn') + ' - Fedu.vn'
      });
    }

    try {
      const raw = localStorage.getItem("video_customer");
      const cust = raw ? JSON.parse(raw) as { name?: string; phone?: string; email?: string; url?: string } : {};
      const rowIndex = parseInt(localStorage.getItem("video_row") ?? "0", 10) || undefined;
      await fetch("/api/payment/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cust.name ?? "",
          phone: cust.phone ?? "",
          email: cust.email ?? "",
          url: cust.url ?? "",
          transactionId: "MANUAL_" + Date.now(),
          rowIndex,
        }),
      });
    } catch { /* silent */ }
  };

  // Polling: detect payment automatically via SePay
  useEffect(() => {
    let since = localStorage.getItem("video_payment_since");
    if (!since) {
      since = Date.now().toString();
      localStorage.setItem("video_payment_since", since);
    }
    let active = true;

    const poll = async () => {
      if (!active || paymentSuccess) return;
      try {
        const res = await fetch(`/api/payment/check?since=${since}&phone=${phone}`);
        if (!res.ok) return;
        const data = await res.json() as { found: boolean; transaction?: { id: string } };
        if (data.found && active && !paymentSuccess) {
          setPaymentSuccess(true);
          setShowModal(true);
          localStorage.removeItem("video_payment_since");
          
          // Bắn sự kiện Purchase Meta Pixel khi tự động kiểm tra thấy thanh toán thành công
          if (typeof window !== "undefined" && (window as any).fbq) {
            (window as any).fbq('track', 'Purchase', {
              value: priceVal || 999000,
              currency: 'VND',
              content_name: (c.courseName || 'Lộ Trình 30 Ngày Làm Chủ Video Ngắn') + ' - Fedu.vn'
            });
          }

          const raw = localStorage.getItem("video_customer");
          const customer = raw ? JSON.parse(raw) as { name?: string; phone?: string; email?: string; url?: string } : {};
          const rowIndex = parseInt(localStorage.getItem("video_row") ?? "0", 10) || undefined;
          await fetch("/api/payment/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: customer.name ?? "",
              phone: customer.phone ?? "",
              email: customer.email ?? "",
              url: customer.url ?? "",
              transactionId: data.transaction?.id ?? "",
              rowIndex,
            }),
          });
        }
      } catch { /* silent */ }
    };

    const id = setInterval(poll, 5000);
    poll();
    return () => { active = false; clearInterval(id); };
  }, [paymentSuccess, phone, priceVal]);

  return (
    <div style={{ background: t.bg, color: t.textBase ?? "#fff", fontFamily: t.fontBody, minHeight: "100vh" }}>
      {showModal && <PaymentSuccessModal onClose={() => setShowModal(false)} />}
      {showVideoModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99999,
          background: "rgba(0,0,0,0.92)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 16,
        }}
        onClick={() => setShowVideoModal(false)}
        >
          <div style={{
            position: "relative",
            maxWidth: 800,
            width: "100%",
            aspectRatio: "16 / 9",
            background: "#000",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 0 50px rgba(0,0,0,0.8)",
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/CaDZiACYrV8?autoplay=1" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              style={{ border: "none" }}
            />
            <button 
              onClick={() => setShowVideoModal(false)}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "rgba(0,0,0,0.6)",
                border: "none",
                color: "#fff",
                fontSize: 20,
                cursor: "pointer",
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <header style={{ borderBottom: `1px solid ${t.line}`, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 500 }}>
          {c.footerBrand || "30NGÀY"}<span style={{ color: t.accent }}>{c.footerDot || "."}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>🔒</span>
          <span style={{ fontSize: 15, color: t.textMuted ?? "#555" }}>Thanh toán bảo mật</span>
        </div>
      </header>

      {/* ── URGENCY BAR ── */}
      <div style={{ background: t.accent, padding: "10px 16px", textAlign: "center" }}>
        <p style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", lineHeight: 1.4, color: t.accentText }}>
          ⚡ SUẤT HỌC ĐỒNG HÀNH 30 NGÀY CÙNG THẦY VIỆT — QUÉT MÃ ĐỂ KÍCH HOẠT TÀI KHOẢN SKOOL &amp; NHẬN BỘ ĐỒ NGHỀ HÔM NAY
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px 80px" }}>

        {/* ── DECISION CONFIRMATION ── */}
        <div style={{ textAlign: "center", padding: "40px 0 0" }}>
          <Lbl>Bước cuối vào lớp</Lbl>
          <h1 className="cl-sh" style={{ fontSize: "clamp(22px, 4.2vw, 38px)", margin: "0 0 14px", color: "var(--cl-text-base, #111827)" }}>
            {c.checkoutTitle ? <span dangerouslySetInnerHTML={{ __html: c.checkoutTitle }} /> : (
              <>
                Bạn chỉ còn cách video đầu tiên<br />
                <em style={{ color: t.accent, fontStyle: "normal", fontWeight: 500 }}>đúng một lượt quét mã.</em>
              </>
            )}
          </h1>
          <p style={{ fontSize: 15.5, color: "var(--cl-text-muted, #64748b)", maxWidth: 520, margin: "0 auto 14px", lineHeight: 1.65 }}>
            {c.checkoutSub || "Mình giữ chỗ này cho bạn rồi. Chuyển khoản xong là hệ thống gửi tài khoản vào thẳng Skool, kéo ghế ngồi xuống là mình cùng bắt tay vào làm luôn, không phải chờ đợi."}
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(16, 185, 129, 0.08)", border: `1.5px solid ${GREEN}44`, borderRadius: 50, padding: "8px 20px" }}>
            <span style={{ color: GREEN, fontSize: 14, fontWeight: 700 }}>✓</span>
            <span style={{ fontSize: 14.5, color: "var(--cl-text-body, #374151)", fontWeight: 500 }}>Đã giữ mức giá ưu đãi {c.price}đ — Hoàn tất chuyển khoản để vào lớp ngay</span>
          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr min(360px, 100%)",
          gap: 20,
          marginTop: 36,
          alignItems: "start",
        }}>

          {/* MOBILE: QR panel first */}
          {isMobile && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {confirmed
                ? <ConfirmBanner onReset={() => setConfirmed(false)} />
                : <PaymentPanel bank={BANK} qrUrl={QR_URL} onConfirm={handleManualConfirm} onVideoClick={() => setShowVideoModal(true)} />
              }
            </div>
          )}

          {/* LEFT column — order details */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            
            {/* PRICING TABLE CARD */}
            <Card>
              <Lbl>Thông tin đơn hàng</Lbl>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 17, color: t.textBase ?? "#fff" }}>{c.courseName || "Lộ Trình 30 Ngày Làm Chủ Video Ngắn"}</div>
                  <div style={{ fontSize: 14, color: t.textMuted ?? "#666", marginTop: 4 }}>5 chặng thực chiến từ bóc kịch bản đời thường đến dựng CapCut Pro &amp; trợ lực AI</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 13, color: t.accent, fontWeight: 600 }}>Tiết kiệm {formattedSaving} VNĐ</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: t.textBase ?? "#fff" }}>{c.price}<span style={{ fontSize: 15, fontWeight: 500 }}> VNĐ</span></div>
                </div>
              </div>
            </Card>

            {/* WHAT YOU GET */}
            <Card>
              <Lbl>Quyền lợi thành viên</Lbl>
              <H>Nội dung bàn giao khi vào lớp</H>
              {(c.checkoutFeatures || [
                "Lộ trình 5 chặng thực hành: Tự làm chủ từ kịch bản đời thường đến cắt dựng CapCut trên 1 điện thoại",
                "Tài khoản học trọn đời trên Skool: Tự do học theo tiến độ cá nhân, cập nhật kỹ thuật AI mới liên tục",
                "Kênh góp ý sửa bài thực tế: Nộp video lên nhóm để được chỉ rõ nhịp cắt thừa và chỉnh lại góc quay",
                "Bộ công cụ dựng nhanh đi kèm: Mẫu preset phụ đề 2 dòng, prompt AI lọc văn mẫu và kho nhạc sạch bản quyền"
              ]).map((item: string, i: number) => <Ck key={i}>{item}</Ck>)}
            </Card>

            {/* INSTRUCTOR MENTORSHIP PLEDGE */}
            <div style={{
              background: "linear-gradient(135deg, rgba(0, 104, 255, 0.07), rgba(0, 104, 255, 0.02))",
              border: "1.5px solid rgba(0, 104, 255, 0.22)",
              borderRadius: "var(--cl-radius, 16px)",
              padding: "20px 22px",
              display: "flex",
              gap: 16,
              alignItems: "center"
            }}>
              <img
                src="/ava.jpg"
                alt="Nguyễn Đức Việt"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  objectFit: "cover",
                  flexShrink: 0,
                  boxShadow: "0 4px 14px rgba(0, 104, 255, 0.25)",
                  border: "2px solid rgba(255, 255, 255, 0.9)"
                }}
              />
              <div>
                <p style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--cl-text-head, #0f172a)",
                  margin: "0 0 6px"
                }}>
                  Nguyễn Đức Việt • Đồng hành trực tiếp
                </p>
                <p style={{
                  fontSize: 15.5,
                  color: "var(--cl-text-body, #334155)",
                  lineHeight: 1.65,
                  margin: 0
                }}>
                  "Vào lớp rồi, việc của bạn chỉ là cầm máy lên và làm. Quay xong bài nào, bạn cứ <strong style={{ color: "var(--cl-text-head, #0f172a)", fontWeight: 700 }}>gửi thẳng qua Zalo riêng cho mình</strong> (hoặc đăng lên nhóm lớp nếu muốn giao lưu) — mình xem và chỉ bạn cách gọt lại từng nhịp cắt, góc quay cho đàng hoàng."
                </p>
              </div>
            </div>

            {/* AUDITED CHECKOUT FAQ ACCORDION — RICH UI/UX */}
            <Card>
              <Lbl>Câu hỏi thường gặp</Lbl>
              <H>Giải đáp nhanh trước khi vào lớp</H>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  {
                    q: "Khóa học diễn ra theo hình thức nào, có bị cố định giờ học không?",
                    intro: "Khóa học được thiết kế học 100% online theo tiến độ cá nhân trên nền tảng Skool, hoàn toàn không gò bó lịch học:",
                    blocks: [
                      {
                        badge: "THỰC HÀNH NGAY",
                        badgeBg: "rgba(0, 104, 255, 0.1)",
                        badgeColor: "#0068FF",
                        title: "⏱ Bài giảng ngắn 5–7 phút",
                        desc: "Quay trực tiếp từng thao tác trên màn hình. Học mẹo nào, bạn cầm máy thực hành luôn mẹo đó trong 15 phút nghỉ trưa."
                      },
                      {
                        badge: "TRỌN ĐỜI",
                        badgeBg: "rgba(16, 185, 129, 0.1)",
                        badgeColor: "#10B981",
                        title: "♾ Xem lại bất kỳ lúc nào 24/7",
                        desc: "Linh hoạt học trên cả điện thoại và máy tính. Tự do học theo thời gian rảnh, nhận cập nhật kỹ thuật AI mới liên tục."
                      }
                    ]
                  },
                  {
                    q: "Khóa học hướng dẫn dựng trên điện thoại hay máy tính (CapCut PC)?",
                    intro: "Khóa học hướng dẫn chi tiết cả 2 nền tảng để bạn linh hoạt sử dụng theo đúng thiết bị đang có:",
                    blocks: [
                      {
                        badge: "MOBILE",
                        badgeBg: "rgba(0, 104, 255, 0.1)",
                        badgeColor: "#0068FF",
                        title: "📱 Trên điện thoại (Làm nhanh & Cơ động)",
                        desc: "Quay xong dựng liền mọi lúc mọi nơi. Máy đời cũ, iPhone hay Android đều thực hành được ngay trên app CapCut miễn phí."
                      },
                      {
                        badge: "CAPCUT PC",
                        badgeBg: "rgba(139, 92, 246, 0.1)",
                        badgeColor: "#8B5CF6",
                        title: "💻 Trên máy tính (Xử lý nâng cao & Xuất nét)",
                        desc: "Dành cho bạn muốn quản lý thư mục footage khoa học, tinh chỉnh chi tiết âm thanh/màu sắc và xuất video ở độ nét cao nhất, không lo bị vỡ hình khi đăng tải."
                      }
                    ]
                  },
                  {
                    q: "Sau khi chuyển khoản, tôi nhận tài khoản và vào học bằng cách nào?",
                    intro: "Quy trình kích hoạt diễn ra tự động trong 1–2 phút và luôn có người thật hỗ trợ sát bên:",
                    blocks: [
                      {
                        badge: "BƯỚC 1",
                        badgeBg: "rgba(0, 104, 255, 0.1)",
                        badgeColor: "#0068FF",
                        title: "✉️ Kích hoạt tự động qua Email",
                        desc: "Ngay khi ngân hàng báo có, hệ thống tự động gửi email kèm link đăng nhập Skool. Bạn mở email bấm vào link là vào lớp học ngay."
                      },
                      {
                        badge: "BƯỚC 2",
                        badgeBg: "rgba(16, 185, 129, 0.1)",
                        badgeColor: "#10B981",
                        title: "💬 Xác nhận trực tiếp qua Zalo",
                        desc: "Việt cũng nhận được thông báo đơn hàng và sẽ chủ động nhắn Zalo cho bạn để xác nhận và hướng dẫn bạn nhập lớp suôn sẻ."
                      }
                    ]
                  },
                  {
                    q: "Trong quá trình học và làm video, nếu gặp vướng mắc thì hỏi ai?",
                    intro: "Bạn có 2 kênh hỗ trợ song song — đặc biệt ưu tiên giải đáp riêng tư, bảo mật:",
                    blocks: [
                      {
                        badge: "ƯU TIÊN 1-1",
                        badgeBg: "rgba(0, 104, 255, 0.1)",
                        badgeColor: "#0068FF",
                        title: "🔒 Nhắn riêng 1-1 qua Zalo",
                        desc: "Quay xong bài nào, bạn cứ gửi thẳng file hoặc link cho Việt. Mình xem và chỉ bạn cách gọt lại từng nhịp cắt, góc quay hoặc tư vấn riêng hướng kênh — hoàn toàn riêng tư, không ngại đám đông."
                      },
                      {
                        badge: "CỘNG ĐỒNG",
                        badgeBg: "rgba(100, 116, 139, 0.1)",
                        badgeColor: "#64748B",
                        title: "👥 Nhóm lớp Skool (725+ thành viên)",
                        desc: "Nơi nộp bài tập chung, xem bài mẫu của các học viên khác và giao lưu học hỏi kinh nghiệm thực tế."
                      }
                    ],
                    cta: {
                      text: "💬 Nhắn Zalo riêng cho Việt (0934.688.632)",
                      link: "https://zalo.me/0934688632"
                    },
                    image: "/skool-community.webp",
                    imageCaption: "Hình ảnh thực tế không gian nhóm lớp Skool (725+ thành viên chia sẻ và sửa bài mỗi ngày)"
                  }
                ].map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={i}
                      style={{
                        borderBottom: i < 3 ? `1px solid ${t.line}` : "none",
                        padding: "4px 0"
                      }}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        style={{
                          width: "100%",
                          background: "none",
                          border: "none",
                          color: isOpen ? t.accent : "var(--cl-text-head, #0f172a)",
                          cursor: "pointer",
                          padding: "16px 0",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 12,
                          textAlign: "left",
                          fontSize: 16.5,
                          fontWeight: 600,
                          lineHeight: 1.45,
                          fontFamily: "inherit",
                          transition: "color 0.15s ease"
                        }}
                      >
                        <span style={{ flex: 1 }}>
                          {i + 1}. "{faq.q}"
                        </span>
                        <span
                          style={{
                            color: isOpen ? t.accent : (t.textMuted ?? "#64748b"),
                            fontSize: 20,
                            fontWeight: 700,
                            flexShrink: 0,
                            transition: "transform 0.2s",
                            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)"
                          }}
                        >
                          +
                        </span>
                      </button>
                      {isOpen && (
                        <div
                          style={{
                            padding: "0 0 18px",
                            animation: "fadeIn 0.2s ease"
                          }}
                        >
                          <div style={{
                            background: "rgba(0, 104, 255, 0.03)",
                            border: "1px solid rgba(0, 104, 255, 0.14)",
                            borderRadius: 14,
                            padding: "16px 18px"
                          }}>
                            {/* Intro text */}
                            <p style={{
                              fontSize: 16,
                              color: "var(--cl-text-body, #334155)",
                              lineHeight: 1.6,
                              margin: "0 0 14px",
                              fontWeight: 500
                            }}>
                              {faq.intro}
                            </p>

                            {/* Structured Sub-Cards */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                              {faq.blocks?.map((block, bIdx) => (
                                <div
                                  key={bIdx}
                                  style={{
                                    background: "var(--cl-card, #ffffff)",
                                    border: "1px solid var(--cl-line, #e2e8f0)",
                                    borderRadius: 12,
                                    padding: "14px 16px",
                                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.03)"
                                  }}
                                >
                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                                    <span style={{ fontSize: 16, fontWeight: 700, color: "var(--cl-text-head, #0f172a)" }}>
                                      {block.title}
                                    </span>
                                    {block.badge && (
                                      <span style={{
                                        fontSize: 11,
                                        fontWeight: 700,
                                        letterSpacing: "0.08em",
                                        textTransform: "uppercase",
                                        padding: "3px 8px",
                                        borderRadius: 6,
                                        background: block.badgeBg,
                                        color: block.badgeColor
                                      }}>
                                        {block.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p style={{
                                    fontSize: 15.5,
                                    color: "var(--cl-text-body, #334155)",
                                    lineHeight: 1.65,
                                    margin: 0
                                  }}>
                                    {block.desc}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {/* Zalo Direct Button */}
                            {faq.cta && (
                              <div style={{ marginTop: 14 }}>
                                <a
                                  href={faq.cta.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "10px 18px",
                                    background: "linear-gradient(135deg, #0068FF, #0052CC)",
                                    color: "#fff",
                                    borderRadius: 10,
                                    fontSize: 15,
                                    fontWeight: 700,
                                    textDecoration: "none",
                                    boxShadow: "0 4px 14px rgba(0, 104, 255, 0.3)",
                                    transition: "all 0.15s ease"
                                  }}
                                  onMouseOver={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                    e.currentTarget.style.boxShadow = "0 6px 18px rgba(0, 104, 255, 0.45)";
                                  }}
                                  onMouseOut={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 4px 14px rgba(0, 104, 255, 0.3)";
                                  }}
                                >
                                  {faq.cta.text}
                                </a>
                              </div>
                            )}

                            {/* Skool Proof Image */}
                            {faq.image && (
                              <div style={{
                                marginTop: 14,
                                borderRadius: 12,
                                overflow: "hidden",
                                border: "1.5px solid var(--cl-line, #e2e8f0)",
                                background: "#ffffff",
                                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)"
                              }}>
                                <img
                                  src={faq.image}
                                  alt="Cộng đồng học viên Skool"
                                  style={{ width: "100%", height: "auto", display: "block" }}
                                  loading="lazy"
                                />
                                <div style={{
                                  padding: "10px 14px",
                                  fontSize: 13,
                                  color: "var(--cl-text-muted, #64748b)",
                                  background: "rgba(0, 0, 0, 0.02)",
                                  borderTop: "1px solid var(--cl-line, #e2e8f0)",
                                  fontWeight: 500,
                                  textAlign: "center"
                                }}>
                                  {faq.imageCaption}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

          </div>

          {/* RIGHT column — desktop only */}
          {!isMobile && (
            <div style={{ position: "sticky", top: 20, display: "flex", flexDirection: "column", gap: 16 }}>
              {confirmed
                ? <ConfirmBanner onReset={() => setConfirmed(false)} />
                : <PaymentPanel bank={BANK} qrUrl={QR_URL} onConfirm={handleManualConfirm} onVideoClick={() => setShowVideoModal(true)} />
              }
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
        <div style={{ textAlign: "center", paddingTop: 48, borderTop: `1px solid ${t.line}`, marginTop: 40 }}>
          <div style={{ fontFamily: t.fontDisplay, fontSize: 20, fontWeight: 500, marginBottom: 12, color: t.textBase ?? "#fff" }}>
            {c.footerBrand || "30NGÀY"}<span style={{ color: t.accent }}>{c.footerDot || "."}</span>
          </div>
          <p style={{ fontSize: 15, color: t.textMuted ?? "#444", lineHeight: 1.8 }}>
            © 2026 {c.courseName || "Lộ Trình 30 Ngày Làm Chủ Video Ngắn"} · fedu.vn · Mọi quyền được bảo lưu.<br />
            <a href="mailto:vietndj@gmail.com" style={{ color: t.textMuted ?? "#555" }}>vietndj@gmail.com</a> | Zalo: 0934.688.632
          </p>
        </div>
      </div>
      <ZaloChatWidget />
    </div>
  );
}

export default function Checkout() {
  return <CheckoutContent />;
}
