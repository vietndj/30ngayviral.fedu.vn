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
  heroBadge: "✨ TÍCH HỢP AI 2026 — DÀNH CHO CREATOR, FREELANCER VÀ CHỦ KINH DOANH",
  heroHeadline1: "THOÁT KHỎI 'LỜI NGUYỀN 200 VIEW'.",
  heroHeadline2: "Lộ Trình 30 Ngày Làm Chủ Video Ngắn",
  heroPoem: [
    "Thuật toán không bóp, nó chỉ chọn lọc,",
    "Ai nắm bản thiết kế, người đó bứt phá."
  ],
  heroAccentLine: "Bạn không cần máy quay chục triệu, không cần ekip cồng kềnh hay ngoại hình xuất chúng.",
  heroSub: "Không cần kỹ xảo phức tạp, chỉ với chiếc điện thoại trên tay bạn sẽ làm chủ trọn vẹn: Cách đặt góc máy đẹp, mở đầu khiến người xem phải dừng lại và nhịp cắt ghép cuốn hút từ đầu đến cuối. Học bài nào — cầm máy lên ra ngay video chuẩn bài đó.",
  heroCta: "KHÁM PHÁ BẢN THIẾT KẾ 30 NGÀY →",
  heroVideoYoutubeId: "eg6T8-SekjQ",
  heroSubPrice: "Học Online trọn đời trên Skool — Trọn bộ công cụ & Chữa bài chuyên môn",

  // ── Pain (Nỗi đau) ──
  painLabel: "SỰ THẬT TÀN KHỐC",
  painHeading: "Thuật toán KHÔNG HỀ 'bóp tương tác'. Nó chỉ bảo vệ người xem khỏi sự nhàm chán.",
  painQuote: "Thời đại của việc 'cứ đăng là có view' đã kết thúc. Khoảng cách giữa video nghiệp dư và video triệu view không nằm ở thiết bị đắt tiền, mà nằm ở Bản thiết kế Giữ chân (Retention).",
  painSub: "Bạn có đang bị vắt kiệt sức lực trong vòng lặp bế tắc này?",
  pains: [
    "❌ Ám ảnh bởi kỹ xảo: Bỏ ra 4-5 tiếng nhét đủ thứ hiệu ứng chớp nhoáng, nhưng người xem lướt qua ngay giây thứ 2.",
    "❌ Cạn kiệt ý tưởng: Cầm máy lên là 'đơ', làm nội dung tùy hứng nay hài hước mai triết lý, kênh không có định vị rõ ràng.",
    "❌ Có view nhưng KHÔNG CÓ TIỀN: Đu trend thì có người xem, nhưng khi lồng ghép bán hàng thì không ai hỏi mua.",
    "❌ Đốt thời gian vô ích: Cặm cụi edit cả ngày, đăng lên lẹt đẹt vài chục view rồi hoang mang mất niềm tin vào chính mình."
  ],
  painConclusion: "", // Component handles conclusion

  // ── Attention (Khoảng cách vô hình) ──
  attentionLabel: "KHOẢNG CÁCH VÔ HÌNH",
  attentionHeading: "Sự khác biệt giữa Video Nghiệp Dư và Video Có Bản Thiết Kế Chuẩn",
  attentionPara: "Viral không phải may mắn. Nó là một bộ môn khoa học của Tâm lý hành vi, Nhịp điệu cắt dựng và Đọc vị thuật toán.",
  attentionItems: [
    {
      icon: "❌",
      title: "Mở đầu: 'Xin chào mọi người...'",
      desc: "🏆 Mở đầu bằng HOOK 3 GIÂY đâm thẳng vào tử huyệt tò mò của khán giả."
    },
    {
      icon: "❌",
      title: "Một góc máy tĩnh buồn ngủ từ đầu đến cuối",
      desc: "🏆 Chuyển cảnh linh hoạt (J-Cut, L-Cut) bóp nghẹt mọi khoảng chết nhàm chán."
    },
    {
      icon: "❌",
      title: "Kịch bản tự nghĩ, cảm hứng đến đâu làm đến đó",
      desc: "🏆 Áp dụng khung tâm lý Hook-Story-Offer dẫn dắt cảm xúc tự nhiên."
    },
    {
      icon: "❌",
      title: "Đăng bài cầu may mong được cắn xu hướng",
      desc: "🏆 Làm chủ chỉ số Retention để thuật toán chủ động đề xuất phân phối."
    }
  ],

  // ── Rule (Giải mã thuật toán) ──
  ruleLabel: "GIẢI MÃ THUẬT TOÁN 2026",
  ruleHeading: "3 Điều thuật toán TikTok/Reels/Shorts thực sự đo lường ở bạn",
  rulePara: "Nền tảng không bóp bạn. Nền tảng chỉ bảo vệ thời gian của người dùng. Làm chủ 3 chỉ số cốt lõi này để làm chủ đề xuất:",
  ruleItems: [
    { 
      fail: "Retention Rate (Tỷ lệ giữ chân) > 70%", 
      why: "Video giữ chân khán giả càng lâu = thuật toán càng đẩy mạnh. Đây là chỉ số SỐ 1 quyết định phân phối." 
    },
    { 
      fail: "Hook 3 Giây đầu tiên", 
      why: "80% khán giả quyết định ở lại hay lướt đi trong 3 giây đầu. Hook quyết định sự sống còn của video." 
    },
    { 
      fail: "Storytelling > Hard-selling", 
      why: "Video kể chuyện chạm cảm xúc được chia sẻ gấp 22 lần video bán hàng trực tiếp. Khung Hook-Story-Offer là chìa khóa chuyển đổi." 
    }
  ],
  ruleConclusion: "Lộ trình này trao cho bạn toàn bộ bản thiết kế để làm chủ cả 3 yếu tố trên — biến mỗi video thành cỗ máy hút view có chủ đích.",

  // ── Cycle (Vòng lặp bế tắc) ──
  cycleLabel: "VÒNG LẶP BẾ TẮC",
  cycleHeading: "Những 'lối tắt' vô tình đang giết chết kênh của bạn",
  cyclePara: "Khi rơi vào bế tắc view, đa số mọi người thường chọn cách:",
  cycleItems: [
    { 
      fail: "Xem tutorial dạy hiệu ứng giật gân", 
      why: "Chỉ giải quyết bề nổi thị giác mà không có chiều sâu nội dung. Khán giả thấy rối mắt rồi lướt đi." 
    },
    { 
      fail: "Bắt chước y hệt video đang trend", 
      why: "Kênh bị loãng tệp, mất định vị chuyên môn. Thuật toán không biết phân loại bạn vào nhóm khán giả nào." 
    },
    { 
      fail: "Học các khóa dạy bấm nút phần mềm", 
      why: "Khi app cập nhật hoặc bối cảnh thay đổi là lập tức bối rối vì thiếu TƯ DUY phân cảnh và nhịp điệu gốc." 
    }
  ],

  // ── Discovery (Khoảnh khắc giác ngộ) ──
  discoveryLabel: "KHOẢNH KHẮC GIÁC NGỘ",
  discoveryHeading: "Viral KHÔNG phải may mắn. Nó là khoa học của Nhịp điệu, Tâm lý và Thuật toán.",
  discoverySub: "Sau khi 'mổ xẻ' hàng ngàn video triệu view, tôi đóng gói thành 3 quy luật bất biến:",
  discoveryItems: [
    {
      title: "Hook 3s quyết định sống còn",
      desc: "80% khán giả quyết định ở lại trong 3 giây đầu. Không phải nội dung dài dòng nhất thắng, mà là nội dung CUỐN NHẤT từ giây đầu tiên thắng."
    },
    {
      title: "Nhịp điệu cắt dựng > Hiệu ứng màu mè",
      desc: "J-Cut, L-Cut, Jump Cut đúng nhịp tạo cảm giác 'cuốn' không dứt. Hiệu ứng lật trang 3D chỉ làm giảm giá trị khung hình."
    },
    {
      title: "Storytelling chuyển đổi gấp 22 lần Hard-sell",
      desc: "Khung Hook-Story-Offer biến video thành phễu chuyển đổi tự nhiên. Khán giả tin tưởng và mua hàng trong sự thoải mái."
    }
  ],

  // ── Solution (Giải pháp toàn diện) ──
  solutionLabel: "GIẢI PHÁP TOÀN DIỆN",
  solutionHeading: "Bạn không chỉ học kiến thức. Bạn sở hữu toàn bộ 'Hệ Sinh Thái Thực Chiến'.",
  solutionSub: "Mọi thứ đã được đóng gói thành bộ công cụ 'kéo thả ăn liền' giúp bạn cắt giảm 80% thời gian sản xuất:",
  solutionItems: [
    "❌ Edit 5 tiếng/clip ➞ ✅ Template CapCut 'One-Click': Thả video thô vào, hiệu ứng + text + âm thanh tự động khớp. Xuất file trong 15-30 phút.",
    "❌ Bí ý tưởng kịch bản ➞ ✅ 20+ Prompt AI Chuyên Dụng: Nhập chủ đề, AI nhả ra cấu trúc kịch bản 2 cột chuẩn xác từng giây.",
    "❌ Đăng bài tùy hứng ➞ ✅ Lịch Content Notion 30 ngày: Bản đồ rõ ràng — biết chính xác hôm nay quay gì, ngày mai đăng gì.",
    "❌ Lo bản quyền nhạc ➞ ✅ Kho 500+ Nhạc MasterClass & SFX Bản Quyền: Đậm chất điện ảnh, sạch bản quyền 100% vĩnh viễn."
  ],

  skillsLabel: "4 KỸ NĂNG THEN CHỐT TẠO VIDEO VIRAL",
  skillsHeading: "Bốn trụ cột cốt lõi tạo nên sự khác biệt giữa video nghiệp dư và chuyên nghiệp:",
  skillCards: [
    { n: "01", title: "Hook Sát Thủ 3 Giây", desc: "Giải phẫu ma trận Hook từ hàng ngàn video triệu view. Cách mở đầu khiến người xem đứng hình và không thể lướt qua.", gif: "/gifs/invisible-cut.gif" },
    { n: "02", title: "Retention Editing (Dựng giữ chân)", desc: "Kỹ thuật J-Cut, L-Cut, Jump Cut dồn dập. Đắp B-roll, Kinetic Typography cuốn hút để giữ tỷ lệ xem trọn vẹn.", gif: "/gifs/lighting-3d.gif" },
    { n: "03", title: "Sound Design (Thiết kế âm thanh)", desc: "Phối hợp Whoosh, Pop, Risers, Impact chuẩn điện ảnh để dẫn dắt cảm xúc. Âm thanh đúng chỗ tăng Retention thêm 40%.", gif: "/gifs/shot-sizes.gif" },
    { n: "04", title: "Hook-Story-Offer (Chuyển đổi)", desc: "Nghệ thuật lồng ghép Offer tinh tế. Biến người xem thành người mua hàng trung thành mà không tạo cảm giác chào mời ép buộc.", youtubeId: "Ew-yWd0riEQ", aspectRatio: "9 / 16" }
  ],

  // ── Mid CTA ──
  midCtaHeading: "Sẵn sàng làm chủ kỹ năng sản xuất video ngắn trong 30 ngày tới?",
  midCtaSub: "Sở hữu toàn bộ Bản thiết kế + Kho Template CapCut + Bộ Prompt AI + Không gian Skool chữa bài chuyên môn.",
  midCtaBtn: "SỞ HỮU BẢN THIẾT KẾ 30 NGÀY — CHỈ 999K",

  // ── Before & After ──
  baLabel: "KẾT QUẢ SAU 30 NGÀY",
  baHeading: "Sự khác biệt TRƯỚC và SAU khi có Bản Thiết Kế Chuẩn:",
  baSub: "",
  beforeLabel: "TRƯỚC (Thử Sai & Đốt Thời Gian)",
  afterLabel: "SAU (Có Hệ Thống & Tối Đa Kết Quả)",
  beforeItems: [
    "Edit 3-5 tiếng mỗi video, đăng lên lẹt đẹt vài chục view",
    "Cạn ý tưởng, ngồi vò đầu bứt tai trước ống kính",
    "Có lượt xem nhưng không ai hỏi mua hàng",
    "Lạm dụng hiệu ứng lấp lánh làm video bị nghiệp dư",
    "Đăng bài tùy hứng, kênh không có định vị rõ ràng",
    "Lo sợ bị quét bản quyền âm thanh và nhạc nền"
  ],
  afterItems: [
    "Template One-Click: Hoàn thiện video chỉn chu trong 30 phút",
    "AI sinh kịch bản Hook-Story-Offer chuẩn chỉnh trong 10 giây",
    "Lồng ghép Offer tinh tế, chuyển đổi người xem thành khách hàng",
    "Nhịp J-Cut, L-Cut mượt mà, tỷ lệ giữ chân (Retention) > 70%",
    "Lịch Notion 30 ngày: Luôn biết rõ hôm nay quay gì, đăng lúc nào",
    "Kho 500+ nhạc & SFX MasterClass sạch bản quyền vĩnh viễn"
  ],

  // ── Lộ trình tinh gọn ──
  roadmapLabel: "LỘ TRÌNH 30 NGÀY THỰC CHIẾN",
  roadmapHeading: "Không lý thuyết suông. Mỗi bài học: XEM XONG → ÁP DỤNG NGAY.",
  roadmapPreviewHeading: "Xem thử không gian bài học bên trong",
  roadmapPreviewDesc: "Video thực tế bên trong chương trình — trực quan, thực chiến, từng thao tác rõ ràng.",
  roadmapIframeUrl: "https://www.youtube.com/embed/NmazSvfOs84?rel=0&modestbranding=1",
  roadmapChaptersHeading: "3 Giai đoạn chinh phục từ con số 0 đến Video chuẩn điện ảnh:",
  stages: [
    { n: "Phase 1", title: "🚀 THAO TÚNG SỰ CHÚ Ý (Ngày 1-10)", desc: "Setup 'Studio Bỏ Túi' chuẩn điện ảnh chỉ bằng điện thoại. Thấu hiểu thuật toán 2026. Giải phẫu ma trận Hook 3s — mở đầu cuốn hút khiến người xem không thể lướt qua.", sub: "Mục tiêu: Xóa bỏ hình ảnh nghiệp dư, tạo ấn tượng mạnh mẽ ngay từ giây đầu." },
    { n: "Phase 2", title: "🪄 MA THUẬT GIỮ CHÂN — RETENTION EDITING (Ngày 11-20)", desc: "Làm chủ nhịp điệu CapCut: J-Cut, L-Cut, Jump Cut mượt mà. Đắp B-roll, Kinetic Typography và thiết kế âm thanh (Sound Design) dẫn dắt cảm xúc người xem.", sub: "Mục tiêu: Rút ngắn 80% thời gian dựng, ép tỷ lệ giữ chân người xem đến cuối video." },
    { n: "Phase 3", title: "💰 CỖ MÁY IN TIỀN — ĐÓNG GÓI & CHUYỂN ĐỔI (Ngày 21-30)", desc: "Xây dựng Series nội dung khiến khán giả theo dõi liên tục. Công thức lồng ghép Offer tự nhiên. Đọc đồ thị Analytics để liên tục tối ưu và nhân bản video thắng thế.", sub: "Mục tiêu: Kênh có định vị sắc bén, người xem tự động chuyển đổi thành khách hàng." }
  ],

  // ── Instructor ──
  instructorLabel: "NGƯỜI DẪN ĐƯỜNG",
  instructorHeading: "Tôi từng chuẩn bị bỏ cuộc...\nCho đến khi tìm ra 'Bản Thiết Kế' của sự Viral.",
  instructorInitials: "NĐV",
  instructorName: "Nguyễn Đức Việt",
  instructorTitle: "Kỹ sư Bách Khoa · 15 năm Giảng viên FPT Arena · Founder Fedu.vn",
  instructorBio: [
    "Tôi không bắt đầu bằng việc khoe nút Bạc hay Follower. Sự thật là, tôi đã từng thức tới 3h sáng cặm cụi cắt ghép từng frame hình, chèn đủ loại nhạc... để rồi sáng hôm sau đăng lên nhận về đúng 50 lượt xem.",
    "Tôi lùi lại và 'mổ xẻ' hàng ngàn video triệu view. Và tôi ngộ ra: Viral không phải may mắn. Nó là một bản thiết kế khoa học. Tôi đóng gói mọi thứ thành một LỘ TRÌNH RÕ RÀNG — giúp bạn không phải đi qua những bãi mìn mà tôi từng vấp phải.",
    "Bạn không cần mất thêm nhiều tháng thử sai đơn độc. Hãy đi trên con đường đã được kiểm chứng."
  ],

  // ── Bonus (Quà tặng từ video.fedu.vn) ──
  bonusLabel: "BỘ CÔNG CỤ TẶNG KÈM",
  bonusHeading: 'Sở hữu trọn bộ "vũ khí thực chiến" trị giá 3.750.000đ',
  bonusSub: "Đi kèm miễn phí khi đăng ký Lộ trình 30 ngày hôm nay — Không bán lẻ",
  bonusItems: [
    {
      id: "01",
      title: "Kho 50+ Âm Thanh Điện Ảnh (SFX) Chuyên Dụng",
      desc: 'Âm thanh có sẵn trong app thường đại trà và thiếu lực. Bộ SFX này mang đến các lớp âm thanh (layer) dày dặn, có lực và sạch 100% bản quyền.<br/><ul style="margin: 12px 0; padding-left: 20px; color: #cbd5e1; line-height: 1.8;"><li>🔥 <b>Âm thanh dày, sâu, đậm chất điện ảnh</b></li><li>🎧 <b>Sử dụng thoải mái trên mọi nền tảng (No Copyright)</b></li><li>✂️ <b>Chỉ cần đặt vào đúng điểm cắt, khung hình lập tức nâng tầm!</b></li></ul>'
    },
    {
      id: "02",
      title: 'Kho Nhạc Nền "MasterClass" Độc Bản',
      desc: 'Kho nhạc độc quyền được tạo riêng, giúp video của bạn toát lên sự đĩnh đạc, sang trọng và hoàn toàn không đụng hàng trên TikTok/Reels/Shorts.<br/><ul style="margin: 12px 0; padding-left: 20px; color: #cbd5e1; line-height: 1.8;"><li>🎼 <b>Giai điệu ĐỘC BẢN:</b> Cảm xúc mãnh liệt, không bị trùng lặp.</li><li>✅ <b>Sạch bản quyền 100%:</b> Hoàn toàn yên tâm trên mọi nền tảng.</li><li>🔄 <b>Cập nhật thường xuyên:</b> Bổ sung các bản phối mới định kỳ.</li></ul>',
      audioDemo: "/boardroom-siege.mp3"
    },
    {
      id: "03",
      title: "Bộ Template Text Motion Cao Cấp Cho CapCut",
      desc: 'Bộ chữ chuyển động kéo - thả giúp tiêu đề và phụ đề nổi bật tức thì mà không cần kiến thức kỹ xảo phức tạp.<br/><ul style="margin: 12px 0; padding-left: 20px; color: #cbd5e1; line-height: 1.8;"><li>🎬 <b>Đa dạng phong cách:</b> Tối giản sang trọng, Hiện đại công nghệ, Bắt mắt sinh động.</li><li>🚀 <b>Kéo - Thả dùng ngay:</b> Tương thích mọi tỉ lệ khung hình (9:16, 16:9).</li><li>💡 <b>Tạo ấn tượng 3s đầu:</b> Giữ chân người xem hiệu quả hơn.</li></ul>'
    },
    {
      id: "04",
      title: "Bộ 20+ Prompt AI Viết Kịch Bản & Phân Phân Cảnh (Shot-list)",
      desc: "Nhập chủ đề vào ChatGPT/Claude, AI sẽ tự động phân tách kịch bản thành bảng 2 cột kèm các cỡ cảnh (Toàn - Trung - Cận) chuẩn xác. Bạn chỉ việc vác máy lên quay."
    },
    {
      id: "05",
      title: "Cập Nhật Miễn Phí Quy Trình Edit Video Bằng AI Mới Nhất",
      desc: "Liên tục cập nhật miễn phí các quy trình ứng dụng AI mới nhất — giúp tự động hóa tạo phụ đề, lọc tạp âm và rút ngắn tối đa thời gian sản xuất.",
      gifDemo: "/edit-ai-promo.gif"
    }
  ],

  // ── Section 11: Final CTA ──
  urgencyBar: "⚠ HỌC PHÍ ƯU ĐÃI SẼ TỰ ĐỘNG ĐIỀU CHỈNH KHI ĐỦ SỐ LƯỢNG HỌC VIÊN",
  ctaLabel: "// ĐĂNG KÝ THAM GIA",
  ctaHeading: "Sẵn sàng biến điện thoại thành cỗ máy hút view & ra đơn?",
  ctaSub: "Sự lựa chọn là của bạn: Tiếp tục thử sai mất thời gian với những video không ai xem, hay sở hữu bản thiết kế chuẩn mực để bứt phá ngay hôm nay!",
  countdownLabel: "⏳ Ưu đãi kết thúc sau:",
  valueStackTitle: "TỔNG GIÁ TRỊ BẠN NHẬN ĐƯỢC:",
  valueStack: [
    { label: "Lộ Trình 30 Ngày Làm Chủ Video Ngắn", price: "3.500.000 VNĐ" },
    { label: "50+ Template CapCut One-Click", price: "1.500.000 VNĐ" },
    { label: "20+ Prompt AI Viết Kịch Bản & Phân Cảnh", price: "1.000.000 VNĐ" },
    { label: "Lịch Content Notion 30 Ngày", price: "500.000 VNĐ" },
    { label: "Kho 500+ Nhạc & SFX MasterClass Bản Quyền", price: "1.000.000 VNĐ" }
  ],
  guarantee: "⚡ Quy trình 1-Chạm: Thanh toán → Vào học NGAY LẬP TỨC trên Skool. Không form rườm rà, không chờ duyệt thủ công.",

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
