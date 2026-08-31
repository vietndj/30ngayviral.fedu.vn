# Video Landing Page Design System Rules (Stripe Editorial × Linear Precision)

**Toàn bộ codebase bắt buộc phải sử dụng các class CSS toàn cục và Semantic Tokens thay vì viết inline styles hoặc màu hardcoded.**

## 1. Không Gian Khối (Layout Max-Width)
- **Single-Column**: Khóa cứng `maxWidth: 860px`. (Dùng class `.cl-sec`).
- **Grid / Card Rộng**: Khóa cứng `maxWidth: 960px - 1040px`. (Dùng class `.cl-sec--wide` hoặc `.cl-sec--full`).
- **Padding giữa các khối**: Luôn duy trì `padding-top: 100px - 120px` (được cấu hình trong `.cl-sec`).

## 2. Hệ Phông Chữ (Typography Stack)
- **Heading (Tiêu đề chính)**: `Noe Display` / `SVN-Acta` (`fontDisplay`). Độ đậm khóa cứng ở mức `500 (Medium)`, tuyệt đối không dùng 700/800/900.
- **Body (Văn bản dài, mô tả)**: `Aeonik` / `Inter` (`fontBody`). Độ đậm `400 (Regular)`.
- **Accent / Meta (Nhãn tag, Label, Header cột)**: `JetBrains Mono` / `Google Sans Code` (`fontMono`). Bắt buộc IN HOA và `letter-spacing: 0.15em` đến `0.18em`.

## 3. Tiêu đề & Cân bằng dọc (Vertical Rhythm)
- **Line-Height (Chiều cao dòng)**: Khóa ở mức `1.15` cho tiêu đề Noe Display.
- **Letter-Spacing (Khoảng cách chữ)**: Khóa ở mức `-0.018em` cho tiêu đề Noe Display.
- **Class bắt buộc**: Tất cả tiêu đề H1/H2 phải dùng class `.cl-sh`.

## 4. Màu Sắc & Tương Phản Chuẩn WCAG AAA (Ink Hierarchy)
- **Tiêu đề chính**: Đen than tuyền `#09090b` / `var(--cl-text-base)` (Tương phản 16:1 trên nền trắng).
- **Văn bản mô tả (Body)**: Đen than chì đậm nét `#27272a` / `var(--cl-text-body)`. **Tuyệt đối cấm tiệt dùng xám nhạt `#b0b0b0` hay `#888` gây mờ mắt.**
- **Ghi chú / Muted**: Xám Slate-500 `#64748b` / `var(--cl-text-muted)`.

## 5. Thẻ Khối, Viền & Hộp Chức Năng (Linear Precision)
- **Thẻ Card**: Dùng class `.cl-card`, bo góc `16px` (`var(--cl-radius)`), viền Hairline `1px solid var(--cl-line)` + bóng đổ 3 tầng Linear `var(--cl-shadow-card)`.
- **Hộp Nỗi đau / Lỗi (Negative/Danger)**: Bắt buộc dùng `.cl-callout--danger` (Nền `#fef2f2`, Viền `#fee2e2`, Vạch `#dc2626`, Chữ `#991b1b`).
- **Hộp Kết quả / Giải pháp (Positive/Success)**: Bắt buộc dùng `.cl-callout--success` (Nền `#f0fdf4`, Viền `#dcfce7`, Vạch `#16a34a`, Chữ `#14532d`).
- **Hộp Điểm nhấn (Accent/Note)**: Bắt buộc dùng `.cl-callout--accent` (Nền `#eff6ff`, Viền `#dbeafe`, Vạch `#1a73e8`, Chữ `#1e40af`).
- **Nút CTA**: Bo góc `12px`, padding `20px 48px`, font 700, bóng đổ xúc giác Linear.

## 6. Quy Tắc Kích Hoạt Mantra: "LỌC" (Viết Hoa)
Bất cứ khi nào người dùng nhắc đến từ **`LỌC`** (hoặc `hãy LỌC nội dung trên`, `LỌC lại đoạn này`, `LỌC khối...`), trợ lý tự động hiểu và thực hiện ngay quy trình 2 bước:
1. **Bóc trần lỗi văn mẫu AI**: Chỉ ra ngay các từ ngữ sáo rỗng, đao to búa lớn, thuật ngữ tiếng Anh/hàn lâm (`Visual Staging`, `Retention`, `Ma trận`, `Chiều sâu thị giác`, `Thần thái`, `Điều phối nhịp điệu`...).
2. **Viết lại thực chiến ngay lập tức**:
   - **Nói thẳng vào việc**: Hành động cụ thể mắt thấy tai nghe.
   - **Ngôn từ đời thường**: Giọng thực chiến như 2 người làm kinh doanh nói chuyện với nhau.
   - **Không thuật ngữ**: Thay bằng ví dụ thực tế (da sáng, mụn, góc quay mặt, cận cảnh chất kem/đường may/thao tác tay, nói vấp thì chèn ảnh feedback che lỗi...).
   - **Đọc hiểu ngay kết quả thực tế**: Người đọc thấy đúng vấn đề và áp dụng được ngay.
