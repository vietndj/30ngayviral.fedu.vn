# 🗺️ BẢN ĐỒ SECTION & QUY CHUẨN TỐC ĐỘ SỬA ĐỔI (SECTIONS MAP)

Tài liệu này là **kim chỉ nam** giúp lập trình viên và AI định vị chính xác vị trí, file component và biến nội dung trong 0.1 giây mà không cần quét toàn bộ codebase.

---

## ⚡ HƯỚNG DẪN THAO TÁC NHANH

### 1. Đổi thứ tự các khối trên trang (Mất 2 giây)
* Mở file: [`src/content.ts`](file:///Users/vietmac/Documents/CODE/30ngayviral.fedu.vn/src/content.ts)
* Tìm mảng `blocksMeta.order` (hoặc `DEFAULT_SECTION_ORDER` trong [`src/App.tsx`](file:///Users/vietmac/Documents/CODE/30ngayviral.fedu.vn/src/App.tsx)).
* Chỉ cần **tráo đổi vị trí tên ID** trong mảng. Không đụng vào code JSX!

### 2. Sửa nội dung câu chữ (Mất 5 giây)
* 100% nội dung chữ đã được gom về [`src/content.ts`](file:///Users/vietmac/Documents/CODE/30ngayviral.fedu.vn/src/content.ts).
* Nhìn bảng bên dưới để biết tên biến cần sửa, mở file `content.ts` sửa trực tiếp. Trình duyệt cập nhật ngay tức thì qua Vite HMR (không cần build lại).

---

## 📋 BẢNG CHỈ MỤC TẤT CẢ CÁC KHỐI TRÊN LANDING PAGE

| # | ID Khối (`#id`) | Tên Giao Diện (Tiêu đề nhận diện) | File Component (.tsx) | Biến Dữ Liệu Trong `content.ts` |
| :-: | :--- | :--- | :--- | :--- |
| **01** | `hero` | **Header & Video Giới Thiệu** | `src/sections/HeroSection.tsx` | `heroBadge`, `heroHeadline1`, `heroHeadline2`, `heroVideoYoutubeId`, `heroCta` |
| **02** | `pain` | **Sự Thật Tàn Khốc** (6 bế tắc & bẻ lái) | `src/sections/PainSection.tsx` | `painHeading`, `painSub`, `painItems`, `failedSolutions`, `painReframeBody` |
| **03** | `philosophy` | **Triết Lý Quay Dựng** (2 nền tảng) | `src/sections/PhilosophySection.tsx` | `heroAccentLine`, `heroSub`, `philosophyFoundations` |
| **04** | `attention` | **3 Lựa Chọn & So Sánh Nghiệp Dư/Viral** | `src/sections/AttentionSection.tsx` | `attentionLabel`, `attentionHeading`, `attentionChoices`, `attentionItems` |
| **05** | `rule` | **Giải Mã Thuật Toán 2026** (3 chỉ số) | `src/sections/RuleSection.tsx` | `ruleLabel`, `ruleHeading`, `ruleItems`, `ruleConclusion` |
| **06** | `cycle` | **Vòng Lặp Bế Tắc** (3 lối tắt giết kênh) | `src/sections/CycleSection.tsx` | `cycleLabel`, `cycleHeading`, `cycleItems` |
| **07** | `discovery` | **Khoảnh Khắc Giác Ngộ** (3 nguyên lý) | `src/sections/DiscoverySection.tsx` | `discoveryLabel`, `discoveryHeading`, `discoveryItems` |
| **08** | `solutions` | **Chọn Giải Pháp Cho Bạn** (3 tab đối tượng) | `src/sections/DiscoverySection.tsx` | `solutionsTabs` |
| **09** | `solution` | **Hệ Sinh Thái Thực Chiến** (Checklist bộ quà) | `src/sections/DiscoverySection.tsx` | `solutionHeading`, `solutionItems` |
| **10** | `skills` | **4 Nguyên Lý Kiến Trúc Khung Hình** | `src/sections/SkillsSection.tsx` | `skillsHeading`, `skillCards` |
| **11** | `midCta` | **Kêu Gọi Hành Động Giữa Trang** | `src/sections/MidCtaSection.tsx` | `midCtaHeading`, `midCtaSub`, `midCtaBtn` |
| **12** | `before-after` | **Trước & Sau Khi Có Bản Thiết Kế** | `src/sections/BeforeAfterSection.tsx` | `baHeading`, `beforeItems`, `afterItems` |
| **13** | `roadmap` | **Lộ Trình 30 Ngày** (3 Phase) | `src/sections/RoadmapSection.tsx` | `roadmapHeading`, `stages` |
| **14** | `instructor` | **Thông Tin Giảng Viên** (Anh Việt) | `src/sections/InstructorSection.tsx` | `instructorName`, `instructorTitle`, `instructorBio`, `instructorStats` |
| **15** | `bonus` | **5 Quà Tặng Độc Quyền** (Template, Prompt) | `src/sections/BonusSection.tsx` | `bonusHeading`, `bonusItems` |
| **16** | `faq` | **5 Câu Hỏi Thường Gặp** | `src/sections/FaqSection.tsx` | `faqHeading`, `faqSub`, `faqItems` |
| **17** | `cta` | **Khối Đăng Ký & Bảng Giá Cuối Trang** | `src/sections/CtaSection.tsx` | `ctaHeading`, `valueStack`, `price`, `value` |
| **18** | `footer` | **Chân Trang** | `src/App.tsx` | `footerBrand`, `footerTagline`, `footerCopyright` |

---

## 💡 CÚ PHÁP GIAO TIẾP TỐI ƯU TỐC ĐỘ

Khi cần yêu cầu chỉnh sửa, chỉ cần dùng mã ID `#...` để không mất thời gian suy đoán:
* Ví dụ đổi thứ tự: `"Đổi #pain lên trước #hero"` hoặc `"Chuyển #faq lên trước #bonus"`.
* Ví dụ sửa nội dung: `"Sửa câu hỏi 1 trong #faq thành..."` hoặc `"Sửa số liệu trong #instructor thành..."`.
