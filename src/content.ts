import { createContext, useContext, createElement } from "react";
import type { ReactNode } from "react";

export interface BlocksMeta {
  order: string[];
  hidden: string[];
  media: Record<string, any[]>;
  custom: Record<string, { title: string; body: string }>;
}

export interface SkillCard {
  n: string;
  title: string;
  desc: string;
  warn?: string;
  gif?: string;
  youtubeId?: string;
  aspectRatio?: string;
}
export interface Stage { n: string; title: string; sub?: string; desc?: string; gif?: string }
export interface ValueLine { label: string; price: string }

export interface PageContent {
  _v?: number;
  price: string;
  value: string;

  heroBadge: string;
  heroHeadline1: string;
  heroHeadline2: string;
  heroAccentLine: string;
  heroSub: string;
  heroCta: string;
  heroSubPrice?: string;
  heroVideoYoutubeId?: string;
  heroPoem?: string[];

  painLabel: string;
  painHeading: string;
  painQuote: string;
  painSub: string;
  pains: string[];
  painConclusion?: string;

  // ── Attention (3 cách gây chú ý) ──
  attentionLabel: string;
  attentionHeading: string;
  attentionPara: string;
  attentionItems: { icon: string; title: string; desc: string }[];

  // ── Rule 7-11-4 ──
  ruleLabel: string;
  ruleHeading: string;
  rulePara: string;
  ruleItems: { fail: string; why: string }[];
  ruleConclusion: string;

  cycleLabel: string;
  cycleHeading: string;
  cyclePara: string;
  cycleItems: { fail: string; why: string }[];
  
  discoveryLabel: string;
  discoveryHeading: string;
  discoverySub: string;
  discoveryItems: { title: string; desc: string; gif?: string; placeholderLabel?: string }[];

  solutionLabel: string;
  solutionHeading: string;
  solutionSub: string;
  solutionItems: string[];

  skillsLabel: string;
  skillsHeading: string;
  skillCards: SkillCard[];

  midCtaHeading: string;
  midCtaSub: string;
  midCtaBtn: string;

  baLabel: string;
  baHeading: string;
  baSub: string;
  baBeforeMedia?: string;
  baAfterMedia?: string;
  beforeLabel: string;
  afterLabel: string;
  beforeItems: string[];
  afterItems: string[];

  roadmapLabel: string;
  roadmapHeading: string;
  roadmapPreviewHeading?: string;
  roadmapPreviewDesc?: string;
  roadmapIframeUrl?: string;
  roadmapChaptersHeading?: string;
  stages: Stage[];
  roadmapChaptersGif?: string;

  instructorLabel: string;
  instructorHeading: string;
  instructorInitials: string;
  instructorName: string;
  instructorTitle: string;
  instructorBio: string[];
  instructorInsight?: string;
  instructorPhoto?: string;

  urgencyBar: string;
  ctaLabel: string;
  ctaHeading: string;
  ctaSub: string;
  countdownLabel: string;
  valueStackTitle: string;
  valueStack: ValueLine[];
  guarantee: string;

  footerBrand: string;
  footerDot: string;
  footerTagline: string;
  footerLinks: string[];
  bonusLabel: string;
  bonusHeading: string;
  bonusSub: string;
  bonusItems: { id: string; title: string; desc: string; audioDemo?: string; youtubeDemo?: string; gifDemo?: string }[];
  footerCopyright: string;

  blocksMeta: BlocksMeta;
}

const CONTENT_SCHEMA_VERSION = 8;

export const DEFAULT_CONTENT: PageContent = {
  _v: CONTENT_SCHEMA_VERSION,
  price: "999.000",
  value: "7.500.000",

  // ── Hero ──
  heroBadge: "✨ DÀNH CHO NGƯỜI KINH DOANH MUỐN TỰ LÀM VIDEO BÁN HÀNG BẰNG ĐIỆN THOẠI",
  heroHeadline1: "KHÔNG CẦN LỘ MẶT. KHÔNG CẦN NÓI HAY.",
  heroHeadline2: "30 ngày — từ sợ ống kính đến tự tin ra video bán hàng mỗi ngày.",
  heroPoem: [
    "Không cần máy ảnh cồng kềnh,",
    "Cầm điện thoại lên, ra kênh — ra tiền."
  ],
  heroAccentLine: "Bạn không cần máy quay chục triệu, không cần ekip, không cần ngoại hình xuất chúng hay kỹ năng nói trước ống kính.",
  heroSub: "Chỉ cần 1 chiếc điện thoại và quy trình đúng — bạn sẽ tự quay, tự dựng, tự đăng video bán hàng chỉn chu trong 30 phút. Dù bạn bán Bất Động Sản, đồ ăn, mỹ phẩm, dạy học hay làm dịch vụ Spa — lộ trình này dành cho bạn.",
  heroCta: "XEM LỘ TRÌNH 30 NGÀY CỦA TÔI →",
  heroVideoYoutubeId: "eg6T8-SekjQ",
  heroSubPrice: "Học online trọn đời — Có thầy chữa bài 1-1 qua Zalo & Zoom",

  // ── Pain (Nỗi đau) ──
  painLabel: "CÓ PHẢI BẠN ĐANG NHƯ THẾ NÀY?",
  painHeading: "Bạn biết video quan trọng. Nhưng mỗi lần cầm điện thoại lên là... không biết bắt đầu từ đâu.",
  painQuote: "Vấn đề không phải bạn dở. Vấn đề là chưa ai chỉ cho bạn quy trình đúng — từ nghĩ ra ý tưởng, đến cầm máy quay, đến cắt ghép xong trong 30 phút.",
  painSub: "Nghe quen không? Đây là 4 bế tắc phổ biến nhất của người kinh doanh khi bắt đầu làm video:",
  pains: [
    "❌ Cầm máy lên là đơ: Nói trước ống kính bị gượng, quay đi quay lại 5-6 lần rồi nản bỏ. Hoặc ngại lộ mặt, sợ người quen đánh giá.",
    "❌ Không biết hôm nay quay gì: Mở điện thoại ra rồi lại cất vào. Bí ý tưởng, không có kịch bản, làm nội dung tùy hứng nay hài hước mai triết lý.",
    "❌ Có đăng video nhưng không ai hỏi mua: Bạn bè vào like ủng hộ, nhưng không ai gọi điện, không ai đặt hàng. Video không ra tiền.",
    "❌ Sợ mua khóa học online rồi tự bơi: Từng mua khóa học video trên mạng, xem được 2 bài là bỏ xó vì không ai giải đáp, không biết áp dụng vào ngành mình."
  ],
  painConclusion: "", // Component handles conclusion

  // ── Attention (Khoảng cách vô hình) ──
  attentionLabel: "3 LỰA CHỌN TRƯỚC MẶT BẠN",
  attentionHeading: "Bạn đang ở ngã ba đường. Mỗi lựa chọn cho kết quả rất khác nhau.",
  attentionPara: "Hầu hết người kinh doanh khi muốn làm video đều rơi vào 1 trong 3 con đường này:",
  attentionItems: [
    {
      icon: "❌",
      title: "Tự mày mò trên YouTube, TikTok",
      desc: "Mỗi người dạy 1 kiểu, càng xem càng rối. 6 tháng sau vẫn chưa đăng được clip nào tử tế. Tốn thời gian mà không ra kết quả."
    },
    {
      icon: "❌",
      title: "Thuê người quay — tốn 3-5 triệu/tháng",
      desc: "Họ quay xong bạn không biết sửa, không biết định hướng nội dung. Ngày nào không thuê là ngày đó kênh im lặng. Phụ thuộc hoàn toàn."
    },
    {
      icon: "✅",
      title: "Lộ trình 30 ngày — 999K một lần duy nhất",
      desc: "Có quy trình rõ ràng từ A đến Z. Sau 30 ngày bạn tự quay, tự dựng, tự đăng — mỗi ngày 30 phút ra 1 video bán hàng. Không phụ thuộc ai."
    },
    {
      icon: "💡",
      title: "So sánh nhanh: Video nghiệp dư vs Video có quy trình",
      desc: "Nghiệp dư: Mở đầu 'Xin chào mọi người...', 1 góc máy buồn ngủ, kịch bản tùy hứng. → Có quy trình: Mở đầu cuốn hút trong 3 giây, chuyển cảnh mượt mà, lồng ghép bán hàng tự nhiên."
    }
  ],

  // ── Rule (3 điều khách hàng quyết định trong 3 giây) ──
  ruleLabel: "VÌ SAO VIDEO CỦA BẠN CHƯA RA ĐƠN?",
  ruleHeading: "3 điều khách hàng quyết định trong 3 giây khi xem video của bạn",
  rulePara: "Không phải thuật toán bóp bạn. Khách hàng tự quyết định có xem tiếp hay lướt đi — dựa trên 3 thứ rất đơn giản:",
  ruleItems: [
    { 
      fail: "Giây 1-3: \"Cái này cho mình không?\"", 
      why: "Nếu hình ảnh đầu tiên không liên quan đến họ — họ lướt. Vì sao bạn cần biết cách mở đầu video khiến khách dừng lại ngay." 
    },
    { 
      fail: "Giây 3-7: \"Người này đáng tin không?\"", 
      why: "Nếu ánh sáng tối, phông bừa bộn, giọng nói run — khách không tin. Vì sao bạn cần biết setup ánh sáng và góc quay đơn giản nhưng sạch sẽ." 
    },
    { 
      fail: "Giây 7-15: \"Tôi có muốn mua / liên hệ không?\"", 
      why: "Nếu video không có lời kêu gọi hành động tự nhiên — khách xem xong quên luôn. Vì sao bạn cần biết cách lồng ghép bán hàng mà không ép buộc." 
    }
  ],
  ruleConclusion: "Lộ trình 30 ngày giải quyết trọn vẹn cả 3 điều trên — giúp bạn ra video mà khách hàng thấy là dừng lại, tin tưởng, và liên hệ mua hàng.",

  // ── Cycle (Vòng lặp bế tắc) ──
  cycleLabel: "CẠM BẪY PHỔ BIẾN",
  cycleHeading: "3 cách làm video sai lầm khiến bạn càng cố càng nản",
  cyclePara: "Khi bế tắc, đa số người kinh doanh thường chọn 1 trong 3 cách này — và cả 3 đều không ra kết quả:",
  cycleItems: [
    { 
      fail: "Lên YouTube xem hàng trăm video dạy quay miễn phí", 
      why: "Mỗi người dạy 1 kiểu, không ai chỉ quy trình đầu-cuối cho ngành của bạn. Xem xong càng rối hơn, cuối cùng vẫn không quay được video nào." 
    },
    { 
      fail: "Bắt chước y hệt video đang trend trên TikTok", 
      why: "Video trend của người khác không liên quan đến sản phẩm/dịch vụ của bạn. Khách hàng thật không tìm được bạn, chỉ thấy bạn đang đu trend." 
    },
    { 
      fail: "Mua khóa học dạy bấm nút phần mềm", 
      why: "Học xong biết bấm nút nhưng không biết quay gì, nói gì, kịch bản thế nào. Vẫn bí ý tưởng như cũ." 
    }
  ],

  // ── Discovery (Giác ngộ) ──
  discoveryLabel: "SỰ THẬT ĐƠN GIẢN",
  discoveryHeading: "Video bán được hàng không cần kỹ xảo phức tạp. Chỉ cần 3 thứ này.",
  discoverySub: "Sau khi phân tích hàng ngàn video bán hàng hiệu quả, tôi đúc kết thành 3 nguyên tắc bất biến:",
  discoveryItems: [
    {
      title: "Mở đầu cuốn hút trong 3 giây",
      desc: "Khách hàng quyết định xem tiếp hay lướt đi trong 3 giây đầu tiên. Không phải video dài nhất thắng — mà video cuốn nhất từ giây đầu tiên thắng."
    },
    {
      title: "Cắt ghép mượt mà — nói vấp thoải mái",
      desc: "Chèn cảnh phụ (B-roll) đè lên chỗ nói vấp. Video mượt như quay một lần duy nhất. Không cần nói hay — chỉ cần cắt đúng chỗ."
    },
    {
      title: "Bán hàng mà không 'bán hàng'",
      desc: "Kể câu chuyện thật về sản phẩm, chia sẻ kinh nghiệm, rồi gợi ý nhẹ nhàng. Khách xem xong tự hỏi mua — không ai thích bị ép."
    }
  ],

  // ── Solution (Giải pháp) ──
  solutionLabel: "QUY TRÌNH 30 PHÚT RA VIDEO",
  solutionHeading: "Bạn không chỉ học kiến thức. Bạn nhận luôn bộ công cụ 'bấm nút là chạy'.",
  solutionSub: "Mọi thứ đã được đóng gói sẵn — bạn chỉ việc thay nội dung của mình vào và xuất video:",
  solutionItems: [
    "❌ Bí ý tưởng, không biết nói gì ➞ ✅ Dán thông tin sản phẩm vào AI → Nhận kịch bản chi tiết trong 10 giây. Không cần giỏi văn.",
    "❌ Cắt ghép mất 4-5 tiếng ➞ ✅ Template CapCut kéo thả: Thả video thô vào → chữ, nhạc, hiệu ứng tự động khớp. Xong trong 15-30 phút.",
    "❌ Hôm nay đăng, mai lại bí ➞ ✅ Lịch content Notion 30 ngày: Mở ra biết rõ hôm nay quay gì, mai đăng gì. Không bao giờ bí.",
    "❌ Sợ bị gỡ video vì nhạc ➞ ✅ Kho 500+ nhạc & âm thanh sạch bản quyền. Đăng TikTok, Reels, YouTube thoải mái."
  ],

  skillsLabel: "4 KỸ NĂNG CỐT LÕI BẠN SẼ LÀM CHỦ",
  skillsHeading: "Sau 30 ngày, bạn sẽ tự tin làm được 4 điều này chỉ với điện thoại:",
  skillCards: [
    { n: "01", title: "Mở đầu video — 3 giây đầu quyết định tất cả", desc: "Học cách mở đầu khiến khách hàng dừng lại ngay giây đầu tiên. Không phải nói hay — mà nói đúng thứ họ đang quan tâm.", gif: "/gifs/invisible-cut.gif" },
    { n: "02", title: "Cắt ghép mượt — nói vấp thoải mái, chèn cảnh phụ đè lên", desc: "Quay xong, cắt bỏ chỗ vấp, chèn cảnh sản phẩm/cửa hàng đè lên. Video mượt mà như quay một lần. Ai xem cũng tưởng thuê người làm.", gif: "/gifs/lighting-3d.gif" },
    { n: "03", title: "Âm thanh có lực — thêm 1 tiếng 'bụp' nhỏ, video khác hẳn", desc: "Đặt đúng 1 tiếng động nhỏ vào điểm chuyển cảnh — video từ bình thường lên chuyên nghiệp ngay lập tức. Kho âm thanh có sẵn, kéo thả vào là xong.", gif: "/gifs/shot-sizes.gif" },
    { n: "04", title: "Bán hàng không bán hàng — khách xem xong tự hỏi mua", desc: "Kể câu chuyện sản phẩm một cách tự nhiên, lồng ghép lời mời mua nhẹ nhàng. Khách thấy thật, tin tưởng và chủ động liên hệ.", youtubeId: "Ew-yWd0riEQ", aspectRatio: "9 / 16" }
  ],

  // ── Mid CTA ──
  midCtaHeading: "Sẵn sàng tự làm video bán hàng chuyên nghiệp chỉ với điện thoại?",
  midCtaSub: "Toàn bộ quy trình + template CapCut + kịch bản AI + thầy chữa bài 1-1. Một lần đầu tư — dùng cả đời.",
  midCtaBtn: "SỞ HỮU LỘ TRÌNH 30 NGÀY — CHỈ 999K",

  // ── Before & After ──
  baLabel: "TRƯỚC VÀ SAU 30 NGÀY",
  baHeading: "Sự khác biệt rõ rệt sau khi có quy trình đúng:",
  baSub: "",
  beforeLabel: "TRƯỚC (Tự mày mò, tốn thời gian)",
  afterLabel: "SAU 30 NGÀY (Có quy trình, ra kết quả)",
  beforeItems: [
    "Cầm máy lên là đơ, quay đi quay lại 5-6 lần rồi bỏ",
    "Bí ý tưởng, ngồi cả buổi không biết nói gì, quay gì",
    "Có đăng video nhưng chỉ bạn bè like, không ai hỏi mua",
    "Cắt ghép mất 4-5 tiếng, đăng lên vẫn bị sượng",
    "Đăng bài tùy hứng, kênh không có định hướng rõ ràng",
    "Sợ bản quyền nhạc, sợ bị gỡ video"
  ],
  afterItems: [
    "Quay 1 lần, nói vấp thoải mái — chèn cảnh phụ đè lên là mượt",
    "Dán thông tin sản phẩm vào AI → Có kịch bản chi tiết trong 10 giây",
    "Lồng ghép bán hàng tự nhiên — khách xem xong chủ động hỏi mua",
    "Template kéo thả: Thả video thô vào → Xuất video chỉn chu trong 30 phút",
    "Lịch Notion 30 ngày: Mở ra biết hôm nay quay gì, đăng lúc nào",
    "Kho 500+ nhạc & âm thanh sạch bản quyền — đăng thoải mái mọi nền tảng"
  ],

  // ── Lộ trình 30 ngày ──
  roadmapLabel: "LỘ TRÌNH 30 NGÀY THỰC CHIẾN",
  roadmapHeading: "Không lý thuyết suông. Mỗi bài học: XEM XONG → CẦM MÁY LÊN QUAY NGAY.",
  roadmapPreviewHeading: "Xem thử không gian bài học bên trong",
  roadmapPreviewDesc: "Video thực tế bên trong chương trình — trực quan, thực chiến, từng thao tác rõ ràng.",
  roadmapIframeUrl: "https://www.youtube.com/embed/NmazSvfOs84?rel=0&modestbranding=1",
  roadmapChaptersHeading: "3 giai đoạn — từ chưa biết gì đến tự tin ra video bán hàng mỗi ngày:",
  stages: [
    { n: "Tuần 1-2", title: "📱 SETUP — Bật đèn, đặt máy, quay được video sạch đầu tiên", desc: "Cách setup góc quay và ánh sáng bằng đồ có sẵn trong nhà. Cách mở đầu video cuốn hút trong 3 giây. Cách đặt máy cho từng ngành: BĐS, F&B, Spa, Giáo dục.", sub: "Mục tiêu: Ra được video đầu tiên sạch sẽ, sáng rõ, mở đầu cuốn hút — chỉ bằng điện thoại." },
    { n: "Tuần 2-3", title: "✂️ CẮT DỰNG — Biến đoạn quay thô thành video mượt trong 30 phút", desc: "Cắt bỏ chỗ nói vấp, chèn cảnh phụ (B-roll) đè lên. Thêm chữ, nhạc, âm thanh bằng template CapCut kéo thả. Dùng AI viết kịch bản tự động.", sub: "Mục tiêu: Tự dựng video chỉn chu trong 30 phút — không cần biết edit từ trước." },
    { n: "Tuần 3-4", title: "💰 BÁN HÀNG — Lồng ghép sản phẩm/dịch vụ vào video tự nhiên", desc: "Công thức kể chuyện sản phẩm khiến khách tự hỏi mua. Cách xây series nội dung để khách quay lại mỗi ngày. Đọc số liệu đơn giản để biết video nào đang hiệu quả và nhân bản.", sub: "Mục tiêu: Video ra đơn hàng thật, khách gọi điện hỏi mua, tuyển sinh được học viên." }
  ],

  // ── Instructor ──
  instructorLabel: "NGƯỜI ĐỒNG HÀNH",
  instructorHeading: "Tôi từng quay 50 video chỉ để nhận được... 50 lượt xem.\nCho đến khi tôi tìm ra quy trình.",
  instructorInitials: "NĐV",
  instructorName: "Nguyễn Đức Việt",
  instructorTitle: "Kỹ sư Bách Khoa · 15 năm Giảng viên FPT Arena · Founder Fedu.vn",
  instructorBio: [
    "Sự thật là — tôi đã từng thức tới 3h sáng cặm cụi cắt ghép, chèn nhạc, chỉnh màu... để sáng hôm sau đăng lên nhận về đúng 50 lượt xem. Tôi hiểu cảm giác đó.",
    "Tôi lùi lại, phân tích hàng ngàn video bán hàng hiệu quả, và nhận ra: Video ra đơn không cần kỹ xảo phức tạp. Nó cần quy trình đúng. Tôi đóng gói mọi thứ thành lộ trình rõ ràng — để bạn không phải mất thêm nhiều tháng tự mò.",
    "Và tôi không chỉ đưa bài học rồi để bạn tự bơi. Tôi sẽ xem video bạn quay, chỉ ra chính xác cần sửa gì — qua Zalo và Zoom — cho đến khi bạn tự tin ra video bán hàng mỗi ngày."
  ],

  // ── Bonus (Quà tặng đóng gói lại) ──
  bonusLabel: "HỘP CÔNG CỤ LÀM VIDEO 30 PHÚT",
  bonusHeading: "Nhận trọn bộ công cụ trị giá 3.750.000đ — dùng ngay, không cần cài đặt phức tạp",
  bonusSub: "Đi kèm miễn phí khi đăng ký hôm nay — Không bán lẻ, không bán riêng",
  bonusItems: [
    {
      id: "01",
      title: "50+ Template CapCut \"Kéo-Thả-Xong\"",
      desc: "Thả video thô vào template, chữ - nhạc - hiệu ứng tự khớp. Xuất video chỉn chu trong 15-30 phút.<br/><ul style=\"margin: 12px 0; padding-left: 20px; color: #cbd5e1; line-height: 1.8;\"><li>🎬 <b>Có sẵn template theo ngành:</b> BĐS, Ẩm Thực, Spa, Giáo Dục</li><li>🚀 <b>Kéo - Thả dùng ngay:</b> Không cần biết edit từ trước</li><li>💡 <b>Tiết kiệm 80% thời gian:</b> Việc 5 tiếng giờ xong trong 30 phút</li></ul>"
    },
    {
      id: "02",
      title: "20+ Prompt AI \"Nhả Kịch Bản 10 Giây\"",
      desc: "Dán thông tin sản phẩm/dịch vụ vào AI → Nhận kịch bản chi tiết 2 cột (Cảnh quay gì + Nói gì). Không cần giỏi văn, không cần nghĩ nhiều.<br/><ul style=\"margin: 12px 0; padding-left: 20px; color: #cbd5e1; line-height: 1.8;\"><li>🤖 <b>Prompt theo từng ngành:</b> BĐS, F&B, Spa, Thời trang, Giáo dục</li><li>⚡ <b>10 giây ra kịch bản:</b> Thay vì ngồi nghĩ cả buổi</li><li>📋 <b>Kịch bản 2 cột rõ ràng:</b> Cột trái = Cảnh quay, Cột phải = Lời nói</li></ul>"
    },
    {
      id: "03",
      title: "Lịch Content Notion 30 Ngày",
      desc: "Mở ra biết rõ hôm nay quay gì, mai đăng gì. Không bao giờ bí ý tưởng. Có sẵn chủ đề, góc quay gợi ý, và thời điểm đăng tối ưu cho từng ngày."
    },
    {
      id: "04",
      title: "Kho 500+ Nhạc & Âm Thanh sạch bản quyền",
      desc: "Đăng TikTok, Reels, YouTube thoải mái — không lo bị gỡ, không lo bị phạt bản quyền. Âm thanh chất lượng cao, đậm chất chuyên nghiệp.",
      audioDemo: "/boardroom-siege.mp3"
    },
    {
      id: "05",
      title: "🎁 TẶNG THÊM: 3 Bộ Công Cụ AI FEDU (Trị giá 499.000đ)",
      desc: "Bộ công cụ AI độc quyền chạy trên Google Gemini — chỉ có tại FEDU, không nơi nào khác:<br/><ul style=\"margin: 12px 0; padding-left: 20px; color: #cbd5e1; line-height: 1.8;\"><li>🔍 <b>AI Bóc Kịch Bản Clip Hay:</b> Dán link video viral bất kỳ → AI phân tích ra kịch bản 2 cột trong 5 phút. Bạn chỉ việc quay theo.</li><li>✂️ <b>AI Trợ Lý Dựng Video:</b> Tự gọt ngập ngừng, làm phụ đề tiếng Việt chuẩn, chèn cảnh trám tự động.</li><li>📝 <b>AI Viết Kịch Bản Bán Hàng Theo Ngành:</b> Nhập ngành nghề + sản phẩm → AI nhả kịch bản bán hàng riêng cho bạn.</li></ul>",
      gifDemo: "/edit-ai-promo.gif"
    }
  ],

  // ── Section 11: Final CTA ──
  urgencyBar: "⚠ SỐ LƯỢNG CÓ HẠN — HỌC PHÍ SẼ TĂNG KHI ĐỦ HỌC VIÊN",
  ctaLabel: "// BẮT ĐẦU NGAY HÔM NAY",
  ctaHeading: "Sẵn sàng tự làm video bán hàng — không cần thuê ai, không cần nói hay?",
  ctaSub: "Bạn có 2 lựa chọn: Tiếp tục tự mày mò mất hàng tháng — hoặc bắt đầu đúng cách ngay hôm nay với quy trình đã được 1.000+ học viên kiểm chứng.",
  countdownLabel: "⏳ Ưu đãi kết thúc sau:",
  valueStackTitle: "TỔNG GIÁ TRỊ BẠN NHẬN ĐƯỢC:",
  valueStack: [
    { label: "Lộ trình 30 ngày + Thầy chữa bài 1-1", price: "3.500.000 VNĐ" },
    { label: "50+ Template CapCut kéo thả theo ngành", price: "1.500.000 VNĐ" },
    { label: "20+ Prompt AI viết kịch bản bán hàng", price: "1.000.000 VNĐ" },
    { label: "Lịch content Notion 30 ngày", price: "500.000 VNĐ" },
    { label: "Kho 500+ nhạc & âm thanh sạch bản quyền", price: "1.000.000 VNĐ" },
    { label: "🎁 3 Bộ Công Cụ AI FEDU (Độc quyền)", price: "499.000 VNĐ" }
  ],
  guarantee: "⚡ Thanh toán → Vào học NGAY LẬP TỨC. Không chờ duyệt. Hoàn tiền 100% trong 7 ngày nếu không hài lòng.",

  // ── Footer ──
  footerBrand: "FEDU",
  footerDot: ".",
  footerTagline: "\"Bạn không cần trở thành chuyên gia dựng phim.\nBạn chỉ cần ra được video bán hàng mỗi ngày.\"",
  footerLinks: [],
  footerCopyright: "COPYRIGHT 2026 | 30NGAYVIRAL.FEDU.VN — FEDU EDUCATION",

  blocksMeta: {
    order: ["hero", "pain", "attention", "rule", "cycle", "discovery", "solution", "skills", "midCta", "before-after", "roadmap", "instructor", "bonus", "cta", "footer"],
    hidden: [],
    media: {},
    custom: {},
  },
};

export const ContentCtx = createContext<PageContent>(DEFAULT_CONTENT);

export function useContent(): PageContent {
  return useContext(ContentCtx);
}

export function ContentProvider({ children }: { children: ReactNode }) {
  return createElement(ContentCtx.Provider, { value: DEFAULT_CONTENT }, children);
}
