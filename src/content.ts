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

const CONTENT_SCHEMA_VERSION = 7;

export const DEFAULT_CONTENT: PageContent = {
  _v: CONTENT_SCHEMA_VERSION,
  price: "999.000",
  value: "7.500.000",

  // ── Hero ──
  heroBadge: "🚨 DÀNH CHO CREATOR, FREELANCER VÀ CHỦ KINH DOANH MUỐN XÂY KÊNH TỪ CON SỐ 0",
  heroHeadline1: "THOÁT KHỎI 'LỜI NGUYỀN 200 VIEW'.",
  heroHeadline2: "Hệ Thống Edit Video Viral & Xây Kênh Tốc Độ Cao Trong 30 Ngày Tới.",
  heroPoem: [
    "Thuật toán không bóp, nó đang chọn lọc,",
    "Ai hiểu được cách, người đó bùng nổ."
  ],
  heroAccentLine: "Bạn không cần máy quay chục triệu, không cần ekip hay ngoại hình xuất chúng.",
  heroSub: "Khám phá vũ khí thao túng thuật toán TikTok/Reels/Shorts bằng Cấu trúc Hook-Story-Offer và kỹ năng Edit giữ chân (Retention). Biến chiếc điện thoại của bạn thành cỗ máy hút 10.000+ Followers trung thành và tự động tạo ra chuyển đổi.",
  heroCta: "THANH TOÁN & VÀO HỌC NGAY LẬP TỨC!",
  heroVideoYoutubeId: "CaDZiACYrV8",
  heroSubPrice: "(🔒 Thanh toán bảo mật — Truy cập tức thì 24/7 không cần chờ duyệt)",

  // ── Pain (Nỗi đau) ──
  painLabel: "SỰ THẬT TÀN KHỐC",
  painHeading: "Thuật toán KHÔNG HỀ 'Bóp Tương Tác' của bạn. Nó chỉ bảo vệ người xem khỏi sự nhàm chán.",
  painQuote: "Thời đại của việc 'cứ đăng là có view' đã kết thúc. Khoảng cách giữa bạn và những Top Creator không nằm ở thiết bị. Nó nằm ở Hệ Thống Giữ Chân (Retention).",
  painSub: "Bạn có đang bị vắt kiệt sức lực trong vòng lặp bế tắc này?",
  pains: [
    "❌ Ám ảnh bởi 'hiệu ứng': Bỏ ra 5 tiếng nhét đủ thứ transition chớp nhoáng, nhưng đăng lên lẹt đẹt 200 view vì người xem lướt qua ngay giây thứ 2.",
    "❌ Lạc lối ý tưởng: Cầm máy lên là 'đơ', làm content tùy hứng nay hài hước mai triết lý. Kênh không có định vị rõ ràng.",
    "❌ Follow cao nhưng KHÔNG CÓ TIỀN: Đu trend nhảy múa thì lên xu hướng, nhưng khi lồng ghép bán hàng thì không ai thèm mua.",
    "❌ Đốt thời gian vô ích: Mất 3-5 tiếng cặm cụi edit 1 video, đăng lên 50 view, rồi mất niềm tin vào chính mình."
  ],
  painConclusion: "", // Component handles conclusion

  // ── Attention (Khoảng cách vô hình) ──
  attentionLabel: "KHOẢNG CÁCH VÔ HÌNH",
  attentionHeading: "Sự khác biệt giữa Video Nghiệp Dư và Video Viral có hệ thống",
  attentionPara: "Viral không phải là may mắn. Nó là một bộ môn khoa học của Tâm lý hành vi, Nhịp điệu cắt dựng và Đọc vị thuật toán.",
  attentionItems: [
    {
      icon: "❌",
      title: "Mở đầu: 'Xin chào mọi người...'",
      desc: "🏆 Mở đầu bằng HOOK 3 GIÂY đâm thẳng vào tử huyệt tò mò."
    },
    {
      icon: "❌",
      title: "Một góc máy tĩnh buồn ngủ từ đầu đến cuối",
      desc: "🏆 Chuyển cảnh dồn dập (J-Cut, L-Cut) bóp nghẹt sự nhàm chán."
    },
    {
      icon: "❌",
      title: "Kịch bản tự nghĩ, cảm hứng đến đâu làm đến đó",
      desc: "🏆 Áp dụng khung tâm lý Hook-Story-Offer chuẩn quốc tế."
    },
    {
      icon: "❌",
      title: "Đăng bài cầu may mong được đề xuất",
      desc: "🏆 Hiểu rõ thuật toán để chủ động điều hướng Views."
    }
  ],

  // ── Rule (Giải mã thuật toán) ──
  ruleLabel: "GIẢI MÃ THUẬT TOÁN 2026",
  ruleHeading: "3 Điều thuật toán TikTok/Reels/Shorts thực sự muốn ở bạn",
  rulePara: "Nền tảng không bóp bạn. Nền tảng chỉ đang bảo vệ trải nghiệm người dùng. Hiểu được 3 điều này, bạn sẽ chủ động 'hack' đề xuất:",
  ruleItems: [
    { 
      fail: "Retention Rate (Tỷ lệ giữ chân) > 70%", 
      why: "Video giữ được khán giả càng lâu = thuật toán càng đẩy mạnh. Đây là chỉ số SỐ 1." 
    },
    { 
      fail: "Hook 3 Giây đầu tiên", 
      why: "80% người xem quyết định ở lại hay lướt đi trong 3 giây đầu. Hook quyết định sống còn." 
    },
    { 
      fail: "Storytelling > Selling", 
      why: "Video kể chuyện hay được share gấp 22 lần video bán hàng trực tiếp. Khung Hook-Story-Offer là vũ khí tối thượng." 
    }
  ],
  ruleConclusion: "Khóa học này dạy bạn làm chủ cả 3 yếu tố trên — biến mỗi video thành một cỗ máy hút view tự động.",

  // ── Cycle (Vòng lặp bế tắc) ──
  cycleLabel: "VÒNG LẶP BẾ TẮC",
  cycleHeading: "Những 'lối tắt' vô tình đang giết chết kênh của bạn",
  cyclePara: "Để đối phó với bế tắc, nhiều người chọn cách:",
  cycleItems: [
    { 
      fail: "Xem tutorial dạy hiệu ứng giật gân", 
      why: "Chỉ giải quyết phần nhìn, không tạo ra giá trị nội dung. Khán giả ấn tượng 1 lần rồi lướt." 
    },
    { 
      fail: "Bắt chước y hệt video đang trend", 
      why: "Kênh bị loãng, không định hình được chuyên môn. Thuật toán không biết phân loại bạn vào tệp nào." 
    },
    { 
      fail: "Mua khóa học dạy bấm nút phần mềm", 
      why: "Khi phần mềm cập nhật hoặc kịch bản thay đổi, lập tức mất phương hướng. Thiếu TƯ DUY gốc." 
    }
  ],

  // ── Discovery (Khoảnh khắc giác ngộ) ──
  discoveryLabel: "KHOẢNH KHẮC GIÁC NGỘ",
  discoveryHeading: "Viral KHÔNG phải may mắn. Nó là khoa học của Nhịp điệu, Tâm lý và Thuật toán.",
  discoverySub: "Sau khi 'mổ xẻ' hàng ngàn video triệu view, tôi tìm ra 3 quy luật bất biến:",
  discoveryItems: [
    {
      title: "Hook 3s quyết định sống còn",
      desc: "80% khán giả quyết định trong 3 giây đầu. Không phải nội dung hay nhất thắng, mà là nội dung CUỐN NHẤT từ giây đầu tiên thắng."
    },
    {
      title: "Nhịp điệu cắt dựng > Hiệu ứng lấp lánh",
      desc: "J-Cut, L-Cut, Jump Cut có nhịp điệu tạo cảm giác 'nghiện' xem tiếp. Hiệu ứng lật trang 3D chỉ gây mệt mắt."
    },
    {
      title: "Storytelling chuyển đổi gấp 22 lần Hard-sell",
      desc: "Khung Hook-Story-Offer biến mỗi video thành phễu bán hàng tự nhiên. Khán giả mua mà không nhận ra họ đang bị bán hàng."
    }
  ],

  // ── Solution (Giải pháp toàn diện) ──
  solutionLabel: "GIẢI PHÁP TOÀN DIỆN",
  solutionHeading: "Bạn không chỉ mua khóa học. Bạn sở hữu toàn bộ 'Vũ Khí' để bắt đầu ngay lập tức.",
  solutionSub: "Tôi đã đóng gói mọi thứ thành một 'Hệ sinh thái ăn sẵn' giúp bạn cắt giảm 80% khối lượng công việc:",
  solutionItems: [
    "❌ Edit 5 tiếng/clip ➞ ✅ Template CapCut 'One-Click': Thả video thô vào, hiệu ứng + text + âm thanh tự động khớp. Xuất file trong 15 phút.",
    "❌ Bí ý tưởng kịch bản ➞ ✅ 20+ Prompt AI: Gõ 'Tôi bán mỹ phẩm', AI nhả ra cấu trúc Hook-Story-Offer chuẩn xác từng giây.",
    "❌ Đăng bài tùy hứng ➞ ✅ Lịch Content Notion 30 ngày: Biết chính xác hôm nay quay gì, ngày mai đăng gì.",
    "❌ Lo bản quyền nhạc ➞ ✅ Kho 500+ Nhạc & SFX bản quyền: Trend nhất, bốc nhất, không bao giờ bị đánh gậy."
  ],

  skillsLabel: "4 KỸ NĂNG THEN CHỐT TẠO VIDEO VIRAL",
  skillsHeading: "Bốn kỹ năng cốt lõi mà các khóa học dạy bấm nút phần mềm không hề cung cấp:",
  skillCards: [
    { n: "01", title: "Hook Sát Thủ 3 Giây", desc: "Giải phẫu ma trận Hook từ hàng ngàn video triệu view. Cách viết câu chào đầu khiến não bộ người xem phải đứng hình, không thể lướt qua.", gif: "/gifs/invisible-cut.gif" },
    { n: "02", title: "Retention Editing (Dựng giữ chân)", desc: "Kỹ thuật J-Cut, L-Cut, Jump Cut dồn dập. Chèn B-roll, Kinetic Typography cuốn hút. Ép khán giả xem đến giây cuối cùng.", gif: "/gifs/lighting-3d.gif" },
    { n: "03", title: "Sound Design (Thiết kế âm thanh)", desc: "Dùng Whoosh, Pop, Risers, Impact để điều hướng cảm xúc. Âm thanh đúng chỗ tăng Retention lên 40%. Kho 500+ SFX sẵn sàng.", gif: "/gifs/shot-sizes.gif" },
    { n: "04", title: "Hook-Story-Offer (Chuyển đổi)", desc: "Nghệ thuật lồng Offer tinh tế. Biến khán giả thành khách hàng mà không gây phản cảm. Kênh vừa tăng follow vừa ra đơn.", youtubeId: "Ew-yWd0riEQ", aspectRatio: "9 / 16" }
  ],

  // ── Mid CTA ──
  midCtaHeading: "Sẵn sàng thoát khỏi 'Lời nguyền 200 view' trong 30 ngày tới?",
  midCtaSub: "Sở hữu toàn bộ Hệ thống Viral + Template + Prompt AI + Cộng đồng Support. Bắt đầu ngay lập tức.",
  midCtaBtn: "THANH TOÁN & VÀO HỌC NGAY — CHỈ 399K",

  // ── Before & After ──
  baLabel: "KẾT QUẢ SAU 30 NGÀY",
  baHeading: "Sự khác biệt TRƯỚC và SAU khi áp dụng Hệ Thống Viral:",
  baSub: "",
  beforeLabel: "TRƯỚC (Đốt Thời Gian)",
  afterLabel: "SAU (Tối Đa Kết Quả)",
  beforeItems: [
    "Edit 3-5 tiếng mỗi video, đăng lên 50 view",
    "Cạn ý tưởng, ngồi vò đầu bứt tai mỗi ngày",
    "Follow tăng nhưng không ai mua hàng",
    "Lạm dụng hiệu ứng lấp lánh, mắt khán giả mệt mỏi",
    "Đăng bài tùy hứng, kênh không có định vị",
    "Lo lắng bị đánh gậy bản quyền nhạc"
  ],
  afterItems: [
    "Template One-Click: Xuất video chất lượng trong 45 phút",
    "AI nhả kịch bản Hook-Story-Offer trong 10 giây",
    "Lồng Offer tinh tế, follower chuyển đổi thành khách hàng",
    "Nhịp J-Cut L-Cut dồn dập, Retention > 70%",
    "Lịch Notion 30 ngày: Biết quay gì, đăng lúc nào",
    "Kho 500+ nhạc & SFX sạch bản quyền vĩnh viễn"
  ],

  // ── Lộ trình tinh gọn ──
  roadmapLabel: "LỘ TRÌNH LỘT XÁC 30 NGÀY",
  roadmapHeading: "Không lý thuyết suông. Mỗi bài học XEM XONG → ÁP DỤNG NGAY.",
  roadmapPreviewHeading: "Xem thử 1 bài học mẫu",
  roadmapPreviewDesc: "Đây là video thực tế bên trong chương trình — trực quan, thực chiến, không lý thuyết suông.",
  roadmapIframeUrl: "https://www.youtube.com/embed/NmazSvfOs84?rel=0&modestbranding=1",
  roadmapChaptersHeading: "3 Giai đoạn chinh phục từ Nghiệp Dư đến Video Viral:",
  stages: [
    { n: "Phase 1", title: "🚀 THAO TÚNG SỰ CHÚ Ý (Ngày 1-10)", desc: "Setup 'Studio Bỏ Túi' chuẩn điện ảnh chỉ bằng điện thoại. Thấu hiểu thuật toán 2026. Giải phẫu ma trận Hook 3s — cách viết câu chào đầu khiến não bộ người xem phải đứng hình.", sub: "Kết quả: Xóa bỏ hình ảnh nghiệp dư. Khán giả bị 'thôi miên' không thể lướt qua." },
    { n: "Phase 2", title: "🪄 MA THUẬT GIỮ CHÂN — RETENTION EDITING (Ngày 11-20)", desc: "Bàn tay phù thủy CapCut: J-Cut, L-Cut, Jump Cut dồn dập. Chèn B-roll, Kinetic Typography cuốn hút. Thiết kế âm thanh (Sound Design) điều hướng cảm xúc.", sub: "Kết quả: Edit nhanh gấp 3 lần. Video mượt mà, ép khán giả xem đến giây cuối." },
    { n: "Phase 3", title: "💰 CỖ MÁY IN TIỀN — ĐÓNG GÓI & CHUYỂN ĐỔI (Ngày 21-30)", desc: "Xây Series Nội dung khiến khán giả 'cày' kênh như cày Netflix. Nghệ thuật lồng Offer tinh tế. Tối ưu Analytics: Đọc đồ thị Retention để tự phá kỷ lục view.", sub: "Kết quả: Kênh có nhân hiệu sắc bén, Follower trung thành tự động chuyển đổi." }
  ],

  // ── Instructor ──
  instructorLabel: "NGƯỜI DẪN ĐƯỜNG",
  instructorHeading: "Tôi từng chuẩn bị bỏ cuộc...\nCho đến khi tìm ra 'Mã Code' của sự Viral.",
  instructorInitials: "NĐV",
  instructorName: "Nguyễn Đức Việt",
  instructorTitle: "Kỹ sư Bách Khoa · 15 năm Giảng viên FPT Arena · Founder Fedu.vn",
  instructorBio: [
    "Tôi không bắt đầu bằng việc khoe nút Bạc hay Follower. Sự thật là, tôi đã từng thức tới 3h sáng cặm cụi cắt ghép từng frame hình, chèn đủ loại nhạc... để rồi sáng hôm sau đăng lên nhận về đúng 50 lượt xem.",
    "Tôi lùi lại và 'mổ xẻ' hàng ngàn video triệu view. Và tôi ngộ ra: Viral không phải may mắn. Nó là khoa học. Tôi đóng gói mọi thứ thành một HỆ THỐNG — và giúp hàng ngàn người thoát khỏi vũng lầy bế tắc.",
    "Tôi đã đi qua bãi mìn, tôi biết chỗ nào có bom. Việc của bạn rất đơn giản: Không cần đi đường vòng, hãy bước theo dấu chân của tôi."
  ],

  // ── Bonus (Quà tặng) ──
  bonusLabel: "BỘ VŨ KHÍ BẠN SỞ HỮU NGAY LẬP TỨC",
  bonusHeading: "Tổng giá trị thực tế: 7.500.000 VNĐ — Bạn chỉ trả 399.000đ",
  bonusSub: "Mọi thứ đã được đóng gói thành 'Hệ sinh thái ăn sẵn' — cắt giảm 80% công sức",
  bonusItems: [
    { id: "01", title: "🎬 Masterclass '30 Ngày Viral' Toàn Tập", desc: "Lộ trình từ A-Z: 3 Phase hoàn chỉnh. Update trọn đời. Xem đi xem lại không giới hạn.<br/><b>Giá trị: 3.500.000 VNĐ</b>" },
    { id: "02", title: "🪄 Bộ 50+ Template CapCut 'One-Click'", desc: "Đã setup sẵn hiệu ứng, text, âm thanh. Bạn chỉ cần thả video thô vào là xuất file! Tiết kiệm 80% thời gian edit.<br/><b>Giá trị: 1.500.000 VNĐ</b>" },
    { id: "03", title: "🤖 Bộ 20+ Prompt AI Viết Kịch Bản", desc: "Bí ý tưởng? AI đóng vai biên kịch, nhả ra cấu trúc Hook-Story-Offer chuẩn xác trong 10 giây. Chỉ cần gõ chủ đề.<br/><b>Giá trị: 1.000.000 VNĐ</b>" },
    { id: "04", title: "📅 Lịch Quản Trị Content 30 Ngày (Notion)", desc: "Biết chính xác hôm nay quay gì, ngày mai đăng gì. Không còn vò đầu bứt tai tìm ý tưởng.<br/><b>Giá trị: 500.000 VNĐ</b>" },
    { id: "05", title: "🎵 Kho 500+ Nhạc & SFX Bản Quyền", desc: "Trend nhất, bốc nhất, không bao giờ lo bị đánh gậy. Cập nhật liên tục theo xu hướng mới nhất.<br/><b>Giá trị: 1.000.000 VNĐ</b>", audioDemo: "/boardroom-siege.mp3" },
    { id: "06", title: "🤝 ĐẶC QUYỀN VIP: Cộng đồng Skool", desc: "Nơi Thầy Việt trực tiếp sửa bài, feedback video và support bạn mỗi ngày. Học hỏi từ Case Study thật của các học viên khác.<br/><b>Giá trị: VÔ GIÁ</b>", gifDemo: "/edit-ai-promo.gif" }
  ],

  // ── Section 11: Final CTA ──
  urgencyBar: "⚠ HỌC PHÍ SẼ TỰ ĐỘNG TĂNG VỀ GIÁ GỐC KHI CỘNG ĐỒNG ĐẠT 200 THÀNH VIÊN",
  ctaLabel: "// ĐĂNG KÝ THAM GIA",
  ctaHeading: "Sẵn sàng để kênh của bạn bùng nổ trong 30 ngày tới?",
  ctaSub: "Sự lựa chọn là của bạn: Tiếp tục mất thời gian với những video tàng hình, hay áp dụng hệ thống chuẩn mực để bứt phá!",
  countdownLabel: "⏳ Ưu đãi Early Bird kết thúc sau:",
  valueStackTitle: "TỔNG GIÁ TRỊ BẠN NHẬN ĐƯỢC:",
  valueStack: [
    { label: "Masterclass '30 Ngày Viral' Toàn Tập", price: "3.500.000 VNĐ" },
    { label: "50+ Template CapCut One-Click", price: "1.500.000 VNĐ" },
    { label: "20+ Prompt AI Viết Kịch Bản", price: "1.000.000 VNĐ" },
    { label: "Lịch Content Notion 30 Ngày", price: "500.000 VNĐ" },
    { label: "Kho 500+ Nhạc & SFX Bản Quyền", price: "1.000.000 VNĐ" }
  ],
  guarantee: "⚡ Quy trình 1-Chạm: Thanh toán → Vào học NGAY LẬP TỨC trên Skool. Không form, không chờ duyệt, không gọi điện.",

  // ── Footer ──
  footerBrand: "30NGÀY",
  footerDot: ".",
  footerTagline: "\"Viral không phải may mắn.\nNó là khoa học — và bạn đang cầm bản thiết kế.\"",
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
