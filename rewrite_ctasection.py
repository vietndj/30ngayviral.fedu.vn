import re

with open('/Users/vietmac/Documents/CODE/30ngayviral.fedu.vn/src/sections/CtaSection.tsx', 'r') as f:
    content = f.read()

# Replace the Form block
new_form = """function RegisterForm() {
  const [form, setForm] = useState({ name: "", phone: "", note: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (!form.name || !form.phone) {
      setErrorMsg("Vui lòng điền họ tên và số điện thoại.");
      setLoading(false);
      return;
    }

    try {
      const botToken = "8796389265:AAH-QkaZNIrOKiMLJexprI5EboUJplL7a3c";
      const chatId = "2050406425";
      const payload = {
        chat_id: chatId,
        text: `🔥 <b>CÓ KHÁCH CẦN TƯ VẤN! (30ngayviral)</b>\\n\\n👤 Tên: ${form.name}\\n📞 SĐT: ${form.phone}\\n📝 Vấn đề: ${form.note}`,
        parse_mode: "HTML",
      };

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      setSuccess(true);
    } catch {
      setErrorMsg("Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 16 }}>
        <div style={{ fontSize: 50, marginBottom: 15 }}>✅</div>
        <h3 style={{ fontSize: 20, color: "#166534", margin: "0 0 10px 0" }}>ĐĂNG KÝ TƯ VẤN THÀNH CÔNG</h3>
        <p style={{ fontSize: 15, color: "#15803d", lineHeight: 1.5 }}>
          Đội ngũ của Nguyễn Đức Việt đã nhận được thông tin và sẽ gọi điện tư vấn lộ trình sớm nhất cho bạn.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {[
        { name: "name", label: "Họ và tên *", type: "text", placeholder: "Nguyễn Văn A", required: true },
        { name: "phone", label: "Số điện thoại (Zalo) *", type: "tel", placeholder: "0912 345 678", required: true },
      ].map((f) => (
        <div key={f.name}>
          <label
            htmlFor={`reg-${f.name}`}
            style={{
              display: "block",
              fontSize: 13.5,
              fontWeight: 600,
              color: "#334155",
              marginBottom: 6,
              textAlign: "left",
            }}
          >
            {f.label}
          </label>
          <input
            id={`reg-${f.name}`}
            name={f.name}
            type={f.type}
            placeholder={f.placeholder}
            required={f.required}
            value={form[f.name as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
            className="cl-form-input"
          />
        </div>
      ))}
      <div>
        <label htmlFor="reg-note" style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "#334155", marginBottom: 6, textAlign: "left" }}>
          Vấn đề lớn nhất của bạn hiện tại là gì?
        </label>
        <textarea
          id="reg-note"
          placeholder="Tụt năng lượng khi tự quay, muốn tuyển F1, xây thương hiệu cá nhân..."
          rows={3}
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          className="cl-form-input"
          style={{ fontFamily: "inherit" }}
        />
      </div>

      {errorMsg && (
        <div style={{
          background: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: 100,
          padding: "12px 18px",
          color: "#dc2626",
          fontSize: 14,
          lineHeight: 1.5,
          textAlign: "center",
          fontWeight: 500,
        }}>
          {errorMsg}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        style={{
          background: loading ? "#0a5560" : "var(--cl-accent, #1a73e8)",
          color: "var(--cl-accent-text, #ffffff)",
          border: "none",
          borderRadius: 100,
          padding: "18px 36px",
          fontSize: 16,
          fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer",
          letterSpacing: "0.04em",
          boxShadow: loading ? "none" : "0 4px 20px rgba(26, 115, 232, 0.35)",
          marginTop: 8,
          opacity: loading ? 0.7 : 1,
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseOver={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#1557b0"; }}
        onMouseOut={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "var(--cl-accent, #1a73e8)"; }}
      >
        {loading ? "⏳ ĐANG GỬI..." : "🚀 NHẬN TƯ VẤN NGAY"}
      </button>
      <p style={{ textAlign: "center", fontSize: 13, color: "#64748b", fontStyle: "italic", marginTop: 4 }}>
        🔒 Thông tin của bạn được bảo mật 100%
      </p>
    </form>
  );
}"""

pattern = re.compile(r'function RegisterForm\(\) \{.*?^\}', re.MULTILINE | re.DOTALL)
new_content = pattern.sub(new_form, content, count=1)

with open('/Users/vietmac/Documents/CODE/30ngayviral.fedu.vn/src/sections/CtaSection.tsx', 'w') as f:
    f.write(new_content)

