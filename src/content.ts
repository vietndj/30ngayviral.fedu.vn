import { createContext, useContext, createElement } from "react";
import type { ReactNode } from "react";
import courseConfig from "../course.config.json";

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

export interface PainItem {
  title: string;
  desc: string;
  highlight?: string;
}

export interface FailedSolution {
  icon: string;
  title: string;
  desc: string;
}

export interface InstructorStoryItem {
  tag: string;
  title: string;
  desc: string;
  highlight?: string;
}

export interface ModuleVideoItem {
  title: string;
  desc?: string;
  url: string;
}

export interface ModuleItem {
  id: string;
  tag: string;
  title: string;
  hook: string;
  outcome: string;
  items: string[];
  videos?: ModuleVideoItem[];
  youtubeId?: string;
  videoUrl?: string;
  videoCaption?: string;
  gif?: string;
  poster?: string;
  badge?: string;
  stepName?: string;
}

export interface GoalCarouselItem {
  id: string;
  tag: string;
  title: string;
  desc: string;
  image: string;
}

export interface GoalContrast {
  badTitle: string;
  badViews: string;
  badItems: string[];
  badConclusion: string;
  goodTitle: string;
  goodViews: string;
  goodItems: string[];
  goodConclusion: string;
}

export interface GoalItem {
  id: string;
  tag: string;
  title: string;
  desc: string;
  image?: string;
  video?: string;
  videoCaption?: string;
  highlight?: string;
  bullets?: string[];
  contrast?: GoalContrast;
  carousel?: GoalCarouselItem[];
  carouselNote?: string;
}

export interface PillarItem {
  id: string;
  tag: string;
  title: string;
  desc: string;
  image?: string;
  highlight?: string;
}

export interface PageContent {
  _v?: number;
  price: string;
  value: string;

  heroBadge: string;
  heroHeadline1: string;
  heroHeadline2: string;
  heroHighlightPill?: string;
  heroFlow?: string[];
  heroDesc1?: string;
  heroDescUnderline?: string;
  heroDesc2?: string;
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
  painItems?: PainItem[];
  failedSolutionsHeading?: string;
  failedSolutionsSub?: string;
  failedSolutions?: FailedSolution[];
  painReframeHeading?: string;
  painReframeBody?: string;
  painConclusion?: string;

  // ── Core Goals & 3 Pillars (2 Mục tiêu sống còn & 3 Trụ cột) ──
  coreGoalsLabel?: string;
  coreGoalsHeading?: string;
  coreGoalsSub?: string;
  coreGoalsLeftTitle?: string;
  coreGoalsRightTitle?: string;
  corePillarsLabel?: string;
  corePillarsBadge?: string;
  coreGoals?: GoalItem[];
  corePillars?: PillarItem[];

  // ── 5 Khóa học Thực Chiến ──
  modulesLabel?: string;
  modulesHeading?: string;
  modulesSub?: string;
  modulesSidebarTag?: string;
  modulesSidebarTitle?: string;
  modulesSidebarDesc?: string;
  modules?: ModuleItem[];
  modulesGuaranteeTitle?: string;
  modulesGuaranteePoints?: string[];
  modulesBadges?: string[];

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
  instructorStory?: InstructorStoryItem[];
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
  bonusItems: { id: string; badge?: string; title: string; desc: string; audioDemo?: string; youtubeDemo?: string; gifDemo?: string; videoDemo?: string }[];
  footerCopyright: string;

  // ── Checkout & Course Meta (Single Source of Truth) ──
  courseName?: string;
  checkoutTitle?: string;
  checkoutSub?: string;
  checkoutFeatures?: string[];

  // ── Extracted Components Data (Single Source of Truth) ──
  philosophyFoundations?: { icon: string; tag: string; title: string; desc: string }[];
  attentionChoices?: { badge: string; title: string; cost: string; desc: string; isBest: boolean; tag: string }[];
  solutionsTabs?: { title: string; subtitle: string; pain: string; solution: string; leftLabel: string; leftDesc: string; rightLabel: string; rightDesc: string; icon: string }[];
  instructorStats?: { num: string; label: string }[];
  faqBadge?: string;
  faqHeading?: string;
  faqSub?: string;
  faqItems?: { q: string; a: string }[];

  blocksMeta: BlocksMeta;
}

const CONTENT_SCHEMA_VERSION = 8;

export const DEFAULT_CONTENT: PageContent = {
  _v: CONTENT_SCHEMA_VERSION,
  price: courseConfig.price,
  value: courseConfig.originalPrice,

  // ── Checkout & Program Single Source of Truth ──
  courseName: courseConfig.courseName,
  checkoutTitle: `Bạn chỉ còn cách video đầu tiên<br /><span style="color: var(--cl-accent)">đúng một lượt quét mã</span>`,
  checkoutSub: `Mình giữ chỗ này cho bạn rồi. Chuyển khoản xong là hệ thống gửi tài khoản vào thẳng Skool, kéo ghế ngồi xuống là mình cùng bắt tay vào làm luôn, không phải chờ đợi.`,
  checkoutFeatures: courseConfig.checkoutFeatures,

  // ── Hero ──
  heroBadge: "TÍCH HỢP AI 2026 — DÀNH CHO NGƯỜI MỚI & CHỦ KINH DOANH",
  heroHeadline1: "TỰ LÀM VIDEO NGẮN CHUYỂN ĐỔI CAO.",
  heroHeadline2: "Lộ Trình 30 Ngày Làm Chủ Video Ngắn",
  heroHighlightPill: "Từ ý tưởng → Kịch bản → Góc quay → Edit → AI",
  heroPoem: [
    "Khóa học thực chiến từ giảng viên FPT Arena Multimedia,",
    "Không cần giỏi quay dựng từ trước — Chỉ cần chiếc điện thoại là bắt đầu ra đơn."
  ],
  heroAccentLine: "Bạn không cần máy quay chục triệu, không cần ekip cồng kềnh hay ngoại hình xuất chúng.",
  heroSub: "Không cần kỹ xảo phức tạp, chỉ với chiếc điện thoại trên tay bạn sẽ làm chủ trọn vẹn: Cách đặt góc máy đẹp, mở đầu khiến người xem phải dừng lại và nhịp cắt ghép cuốn hút từ đầu đến cuối. Học bài nào — cầm máy lên ra ngay video chuẩn bài đó.",
  heroCta: "KHÁM PHÁ LỘ TRÌNH 30 NGÀY →",
  heroVideoYoutubeId: "pmEpqI2gFpo",
  heroSubPrice: "Học Online trọn đời trên Skool — Trọn bộ công cụ & Chữa bài chuyên môn",

  // ── Pain (Nỗi đau & 6 bế tắc chuẩn Tầng 2.5 - Văn phong Anh Việt) ──
  painLabel: "// NỖI KHỔ NGƯỜI CÓ NGHỀ",
  painHeading: "Ngoài đời làm nghề rất giỏi, nhưng lên mạng lại chẳng ai biết bạn là ai?",
  painSub: "Cái khó của người lớn đi làm không phải là thiếu chữ. Mà là muốn giữ cái chất đàng hoàng của mình... nhưng nếu không làm video thì không có khách.",
  painItems: [
    {
      title: "Ngoài đời nói vanh vách, bật camera lên là cứng họng:",
      desc: "Ngồi cà phê tư vấn khách hàng cả tiếng không hết chuyện. Nhưng cứ chĩa máy vào mặt là quên sạch chữ, nói câu nào nghe cũng đơ đơ như đang trả bài.",
      highlight: "cứng họng"
    },
    {
      title: "Nói sâu thì không ai xem, làm trò lố thì tự mình thấy ngượng:",
      desc: "Chia sẻ kiến thức thật thì video lẹt đẹt; bảo giật tít câu view nhảm nhí thì bản thân không cho phép mình làm rác mạng. Cứ dùng dằng mãi rồi lại cất máy vào túi.",
      highlight: "thấy ngượng"
    },
    {
      title: "Ngoài đời đĩnh đạc, lên video nhìn ngô nghê như học việc:",
      desc: "Bao năm làm nghề có uy tín với khách. Tự quay xong xem lại thấy mặt tối om, mắt đảo như rang lạc, dáng ngồi co ro... chỉ sợ người quen nhìn thấy họ cười cho.",
      highlight: "nhìn ngô nghê"
    },
    {
      title: "Cặm cụi làm cả buổi tối, nhận về vài chục view... thấy ức chứ!",
      desc: "Bỏ cả buổi căn từng câu, cắt từng đoạn. Đăng lên lén lút F5 liên tục... vẫn đứng im lẹt đẹt. Nhìn sang mấy clip nhảy nhót xàm xí view triệu triệu, vừa nản vừa tức.",
      highlight: "thấy ức chứ!"
    },
    {
      title: "Ngại bán hàng vì sợ mang tiếng, nhưng không bán thì lấy gì nuôi quân?",
      desc: "Chia sẻ thì có người like dạo, nhưng hễ nhắc đến bán hàng là người ta lướt ngay. Sợ bị mang tiếng chèo kéo lùa gà, nhưng tiền nhà, tiền lương nhân viên mỗi tháng có đợi ai đâu?",
      highlight: "lấy gì nuôi quân?"
    },
    {
      title: "Mua khóa học về vứt đó, vì không có ai ngồi sửa bài cùng:",
      desc: "Xem video quay sẵn thì gật gù hay đấy, đến lúc làm cho ngành mình thì tắc tị. Người lớn ngại hỏi sợ mang tiếng ngây ngô, tự mò một mình thì làm ra clip vẫn phèn nguyên.",
      highlight: "không có ai ngồi sửa bài"
    }
  ],
  pains: [],
  painQuote: "Thời đại của việc 'cứ đăng là có view' đã kết thúc. Khoảng cách giữa video nghiệp dư và video triệu view không nằm ở thiết bị đắt tiền, mà nằm ở việc 3 giây đầu bạn có giữ chân được người xem hay không.",

  // ── Failed Solutions (4 Ngõ cụt) ──
  failedSolutionsHeading: "Có phải bạn cũng từng thử đủ cách này rồi... nhưng đâu vẫn hoàn đấy?",
  failedSolutionsSub: "Những cách chắp vá chỉ làm bạn mất thêm thời gian và thêm nản lòng.",
  failedSolutions: [
    {
      icon: "📺",
      title: "Cày nát YouTube học mót từng mẹo",
      desc: "Xem thì thấy người ta làm dễ ợt, đến lượt mình cầm máy lên là tắc. Toàn mẹo vặt chắp vá, không thành bài bản."
    },
    {
      icon: "💸",
      title: "Thuê ngoài làm hộ cho nhanh",
      desc: "Tốn tiền triệu mỗi tháng nhưng nhận về toàn video công nghiệp vô hồn. Họ có hiểu sản phẩm với khách của bạn đâu mà nói trúng được."
    },
    {
      icon: "👥",
      title: "Lên mạng hỏi han trong mấy hội nhóm",
      desc: "Đăng bài thì gặp mồi chài bán tool kéo view; đọc bình luận thì toàn khoe tiền tỷ. Càng đọc càng thấy hoang mang."
    },
    {
      icon: "🤖",
      title: "Nhờ AI viết hộ kịch bản",
      desc: "Bấm một nút nó nhả ra cả trang văn mẫu sáo rỗng. Đem đi quay nghe giả trân, khán giả ngửi thấy mùi AI là họ lướt ngay trong 1 giây."
    }
  ],
  painReframeHeading: "...Và kết quả cuối cùng vẫn là con số 0 tròn trĩnh?",
  painReframeBody: "Bạn chưa làm được video không phải vì bạn dở, và càng không phải do bạn thiếu chuyên môn. Bạn chỉ đang thiếu đúng 2 thứ: biết cách mở đầu trong 3 giây đầu để người ta chịu dừng lại nghe bạn nói — và một người làm nghề ngồi cạnh, soi từng khung hình và chỉ thẳng cho bạn biết mình đang vấp ở giây nào.",
  painConclusion: "",

  // ── Core Goals & 3 Pillars (2 Mục tiêu sống còn & 3 Đòn bẩy thực chiến) ──
  coreGoalsLabel: "KHÔNG CẦN LÀ CHUYÊN GIA",
  coreGoalsHeading: "Bạn không cần khiếu ăn nói hay máy ảnh đắt tiền để có một video chuyên nghiệp.",
  coreGoalsSub: "Rào cản lớn nhất khi làm video không phải là thiết bị, mà là cảm giác sợ bị 'gượng': Ngoài đời tư vấn chắc tay bao nhiêu, đứng trước máy lại gồng mình bấy nhiêu.\n\nBạn không cần đổi vai diễn và càng không cần đánh đổi uy tín lấy vài cái view nhảm. Người mua hàng chỉ cần thấy một người làm nghề đàng hoàng, nói đúng việc trong khung hình sáng sủa. Lộ trình này chỉ tập trung vào 2 kết quả thực tế:",
  coreGoalsLeftTitle: "2 KẾT QUẢ ĐẦU RA THỰC TẾ",
  coreGoalsRightTitle: "Làm video đàng hoàng không cần phải gồng",
  corePillarsLabel: "3 ĐIỂM TỰA THỰC CHIẾN",
  corePillarsBadge: "Dễ làm · Đỡ ngại · Không tốn kém",
  coreGoals: [
    {
      id: "01",
      tag: "MỤC TIÊU 01",
      highlight: "XÓA SẠCH TỰ TI · KHÔNG CẦN LỘ MẶT",
      title: "Tự tay làm được video đầu tay, tự tin bấm máy",
      desc: "Không cần nhớ kịch bản dài dòng, không sợ nói vấp, không sợ người quen chê cười. Xuất xưởng ngay sản phẩm đầu tay không còn thấy ngượng ngùng.",
      video: "https://youtube.com/shorts/lG4Q518RIdw",
      videoCaption: "Thầy Việt thị phạm: Tự tin bấm máy & quay B-roll mộc mạc",
      bullets: [
        "Làm chủ cách quay 'không cần lộ mặt' hoặc nói chuyện tự nhiên như đang thở",
        "Xóa bỏ hoàn toàn nỗi sợ bị người quen hay đối tác xì xào phán xét",
        "Xuất xưởng ngay video đầu tay: Có sản phẩm thực tế đăng kênh ngay tuần đầu tiên",
      ]
    },
    {
      id: "02",
      tag: "MỤC TIÊU 02",
      highlight: "KẾT QUẢ THẬT · KHÁCH HÀNG TÔN TRỌNG",
      title: "Kênh có khách hàng thật, ra đơn đàng hoàng trên Zalo",
      desc: "Đừng đánh đổi thể diện 10 năm làm nghề lấy vài cái view nhảm của những người xem chùa rồi lướt. Người có tiền cần một chuyên gia tử tế và đáng tin cậy. Chỉ cần 300 – 500 view đúng tệp, khách sẽ chủ động nhắn tin Zalo xin tư vấn lịch thiệp.",
      bullets: [
        "Giữ trọn phong thái chuyên môn: Đĩnh đạc, tử tế, không đánh đổi uy tín lấy vài giây lướt qua",
        "Khách tự tìm đến Zalo: Khách hỏi tư vấn lịch sự, không chèo kéo, không kỳ kèo mặc cả",
        "Ra đơn thực tế: Mỗi video là một lời chào đàng hoàng, bền bỉ mang khách về Zalo cả khi bạn đang ngủ",
      ],
      contrast: {
        badTitle: "ĐUA VIEW ĐẠI TRÀ",
        badViews: "1.000.000+ lượt xem",
        badItems: [
          "Theo đuổi trào lưu giải trí: Gượng ép làm nội dung giật gân, không phản ánh đúng chuyên môn thực tế",
          "Khán giả xem lướt: Dừng lại vài giây giải trí rồi lướt qua, không đọng lại sự tin tưởng",
          "Tổn hại uy tín nghề nghiệp: Cảm giác ngượng ngùng khi gặp lại khách hàng, đối tác ngoài đời",
        ],
        badConclusion: "➔ Lượt xem ảo · Không mang lại khách hàng thật",
        goodTitle: "CHUYỂN ĐỔI CHUYÊN SÂU",
        goodViews: "300 – 500 lượt xem đúng tệp",
        goodItems: [
          "Nói đúng chuyên môn: Phong thái đĩnh đạc, chia sẻ mộc mạc bài toán thực tế khách đang vướng",
          "Khách hàng tôn trọng: Nhận ra năng lực thật của bạn, xem kỹ từng phút và ghi nhận giá trị",
          "Ra đơn thực tế qua Zalo: Khách chủ động nhắn tin kết nối, xin tư vấn lịch thiệp và sẵn sàng chi trả",
        ],
        goodConclusion: "➔ Khách hàng thật · Uy tín chuyên môn bền vững",
      },
      carousel: [
        {
          id: "01",
          tag: "CASE 01 · RA ĐƠN ĐÀNG HOÀNG",
          title: "Học viên đăng ký sách Typo & mua tiếp khóa học",
          desc: "Khách xem video so sánh thực tế: Mua bên khác giá cao không hiểu chân lý bằng bên thầy. Chủ động chuyển khoản mua thêm sách typo và khóa học chuyên sâu.",
          image: "/pillars/zalo_proof_1.png",
        },
        {
          id: "02",
          tag: "CASE 02 · ĐỒNG HÀNH TẬN TÂM",
          title: "Chỉ dẫn thu âm thủ thỉ & quay dựng trên điện thoại",
          desc: "Hướng dẫn tỉ mỉ từng câu thu âm cảm xúc. Quay riêng bài giảng Skool cho học viên làm trên điện thoại, đồng hành từng bước cầm tay chỉ việc.",
          image: "/pillars/zalo_proof_2.png",
        },
        {
          id: "03",
          tag: "CASE 03 · CHỈNH TỪNG GÓC MÁY",
          title: "Sửa kỹ thuật đổi cỡ cảnh & góc lệch 30 độ",
          desc: "Chỉ rõ quy tắc đổi góc máy 30 độ, chuyển cỡ cảnh và cô đọng dưới 1p40s để thuật toán ưu tiên phân phối trước khi làm video dài.",
          image: "/pillars/zalo_proof_3.png",
        },
        {
          id: "04",
          tag: "CASE 04 · CHỮA BÀI THỰC TẾ",
          title: "Học viên quầy thuốc gửi video, hỗ trợ Video Call 1-1",
          desc: "Quay thực tế tại quầy lúng túng chưa tìm ra lỗi, Thầy sẵn sàng mở Video Call 1-1 trực tiếp tháo gỡ điểm nghẽn ngay trong ngày.",
          image: "/pillars/zalo_proof_4.png",
        },
        {
          id: "05",
          tag: "CASE 05 · TƯ VẤN CHUYỂN ĐỔI",
          title: "Chủ nhà hàng gửi video: Tư vấn Hook AI & B-roll ẩm thực",
          desc: "Đóng gói trải nghiệm thật: Hướng dẫn kỹ thuật Hook 5s đầu giữ chân người xem bằng AI và thu thập cảnh trám ẩm thực chuyển liên tục mỗi 2 giây.",
          image: "/pillars/zalo_proof_5.png",
        },
      ],
      carouselNote: "5 hội thoại Zalo thực tế: Học viên & khách hàng thật, ra đơn đàng hoàng, đồng hành chữa bài 1-1 tận tâm.",
    }
  ],
  corePillars: [
    {
      id: "01",
      tag: "01 · NÓI NHƯ THỞ",
      title: "Bỏ văn mẫu, nói như đang ngồi uống trà",
      desc: "Đừng cố nhớ cả trang giấy như đi thi học sinh giỏi. Kịch bản bẻ nhỏ từng câu ngắn, liếc một từ khóa là tuôn trào kiến thức thật của mình ra, mộc mạc mà thuyết phục.",
      image: "/pillars/pillar_story.png",
      highlight: "Không sợ cứng họng"
    },
    {
      id: "02",
      tag: "02 · GÓC HÌNH THẬT",
      title: "Chiếc điện thoại và góc bàn sạch sẽ",
      desc: "Người ta mua hàng vì tin chuyên môn của bạn chứ chẳng ai soi độ phân giải máy cơ. Một chỗ ngồi đủ sáng, khung hình gọn gàng là đủ phong thái của người làm nghề tử tế.",
      image: "/pillars/pillar_visual.png",
      highlight: "Khỏi mua máy xịn"
    },
    {
      id: "03",
      tag: "03 · DỰNG THÔNG MINH",
      title: "Nói vấp thì chèn hình che lại",
      desc: "Đừng bắt mình phải nói trơn tru một lèo từ đầu đến cuối như phát thanh viên. Nói sai chỗ nào, cắt cúp rồi đắp tư liệu đè lên. Vừa giấu sạch lỗi vấp, video xem lại sinh động hơn.",
      image: "/pillars/pillar_edit.png",
      highlight: "Không sợ quê"
    }
  ],

  // ── Modules (Lộ trình 5 bước thực hành ra video chuyển đổi) ──
  modulesLabel: "LỘ TRÌNH 5 BƯỚC THỰC HÀNH",
  modulesHeading: "Trọn bộ 5 bước làm chủ video ngắn — Từ kịch bản, chuyển cảnh đến kể chuyện ra đơn:",
  modulesSub: "Đừng học mót từng mẹo vặt trên mạng rồi chắp vá không ra đâu vào đâu. Bạn cần một quy trình 5 bước thực hành chắc tay: cầm máy lên nói tự nhiên, đặt góc máy sáng rõ, nối cảnh tàng hình, biên tập tinh gọn bằng AI và kể câu chuyện thật để khách chủ động tìm đến.",
  modulesSidebarTag: "5 BƯỚC THỰC HÀNH",
  modulesSidebarTitle: "Lộ Trình Tự Chủ",
  modulesSidebarDesc: "Bấm từng bước để xem cách làm thực tế:",
  modules: [
    {
      id: "01",
      tag: "#BƯỚC 01 · KHÓA HỌC KỊCH BẢN",
      title: "Kịch bản 1 dòng — Mở máy lên là nói tự nhiên như thở",
      hook: "Dứt điểm cảm giác ngập ngừng trước ống kính. Không cần học thuộc lòng cả trang giấy, liếc mắt đến đâu nói tự nhiên đến đó.",
      outcome: "Cầm kịch bản 60 giây nói trôi chảy ngay lần quay đầu tiên, phong thái mộc mạc và điềm đạm.",
      items: [
        "Kỹ thuật ngắt câu theo nhịp thở: Bẻ nhỏ lời thoại thành từng câu 5–7 từ. Nói hết một ý ngắn thì dừng lại lấy hơi, xóa sạch áp lực phải nhớ văn bản dài dòng.",
        "Mở đầu 3 giây Hook đâm thẳng vào điểm đau: Khán giả chỉ cho bạn 3 giây đầu tiên. Đánh trúng khúc mắc thực tế của họ để giữ chân ngay lập tức, không chào hỏi vòng vo.",
        "Chuyển hóa chuyên môn thành lời tâm sự: Bỏ hoàn toàn giọng điệu rao giảng hay văn mẫu AI. Nói chuyện mộc mạc như khi bạn ngồi kéo ghế uống trà tư vấn cho khách ngoài đời."
      ],
      videos: [
        {
          title: "Cách ngắt câu theo nhịp thở để không bị đơ",
          desc: "Bẻ nhỏ lời thoại thành từng câu 5–7 từ. Nói hết một ý thì dừng lại lấy hơi, không sợ quên chữ.",
          url: "https://www.facebook.com/reel/24909527728721206/"
        },
        {
          title: "Mẹo mở đầu 3 giây không chào hỏi vòng vo",
          desc: "Bỏ qua các câu chào hỏi xã giao, đâm thẳng vào khúc mắc thực tế của khách hàng.",
          url: "https://www.facebook.com/reel/2091869361559299/"
        }
      ]
    },
    {
      id: "02",
      tag: "#BƯỚC 02 · KHÓA HỌC GÓC MÁY",
      title: "Góc máy, bố cục & ánh sáng — Khung hình sáng rõ, toát phong thái làm nghề",
      hook: "Không cần mua máy ảnh hay dàn đèn studio đắt tiền — Chiếc smartphone trong túi và góc bàn sạch sẽ là đủ tạo dựng niềm tin.",
      outcome: "Tự setup góc quay gọn gàng, đón sáng tự nhiên, toát lên sự đĩnh đạc và đáng tin cậy của một người làm nghề lâu năm.",
      items: [
        "Quy tắc 1 sải tay & ánh sáng tự nhiên: Đặt điện thoại ngang tầm mắt cách 60cm, ngồi chéo 45° đón nguồn sáng cửa sổ. Gương mặt sáng rõ, khung hình có chiều sâu mà không tốn tiền mua đèn.",
        "3 bố cục hình ảnh chuẩn mực: Góc chính diện đĩnh đạc tạo uy tín, góc chéo trò chuyện thân tình kéo gần khoảng cách, và góc cận đặc tả thao tác tay hoặc sản phẩm thực tế.",
        "Giải pháp quay Faceless (Không lộ mặt): Dành cho người ngại xuất hiện trước camera — tập trung ghi lại quy trình làm việc, bản vẽ, thao tác tay mà vẫn tạo dựng trọn vẹn niềm tin."
      ],
      videos: [
        {
          title: "Quy tắc 3 cảnh Toàn – Trung – Cận bằng 1 điện thoại",
          desc: "Chỉ với một chiếc điện thoại, luân chuyển 3 cỡ cảnh để video sinh động mà không cần máy cơ.",
          url: "https://www.facebook.com/reel/775157861537584/"
        },
        {
          title: "Mẹo căn khung hình chuẩn bằng camera sau",
          desc: "Tận dụng camera sau sắc nét, cách căn góc ngồi và đón sáng tự nhiên không bị lệch hình.",
          url: "https://www.facebook.com/reel/1417987499856423/"
        }
      ]
    },
    {
      id: "03",
      tag: "#BƯỚC 03 · KHÓA HỌC CHUYỂN CẢNH",
      title: "Kỹ nghệ chuyển cảnh tàng hình — Thước phim mượt mà không kỹ xảo màu mè",
      hook: "Vứt bỏ hiệu ứng lật trang 3D sến súa của app. Mượn chuyển động cơ học tự nhiên để nối cảnh mượt đến vô lý chỉ bằng 1 điện thoại.",
      outcome: "Làm chủ tư duy nối cảnh điện ảnh, video trôi chảy như một dòng nước, giữ chặt mắt người xem từ đầu đến cuối.",
      items: [
        "Nguyên lý Cut-on-Action (Nối cảnh bằng chuyển động): Mượn chuyển động vật lý thật (vung tay, lướt vật thể qua ống kính, bước chân) làm cầu nối giấu nhẹm vết cắt giữa 2 bối cảnh.",
        "Điều phối không gian qua 3 cỡ cảnh (Toàn - Trung - Cận): Phá bỏ góc máy tĩnh gây buồn ngủ. Luân chuyển cỡ cảnh đúng nhịp điệu mỗi 3 giây để người xem liên tục có điểm nhìn mới.",
        "Bằng chứng thị giác B-roll che sạch lỗi vấp: Lỡ nói ngắc ngứ? Không cần quay lại từ đầu. Chèn cảnh thao tác thực tế đè lên vết cắt, âm thanh vẫn liền mạch mà video trông cực kỳ chỉn chu."
      ],
      videos: [
        {
          title: "Match Cut: Mượn chuyển động thật để giấu vết cắt",
          desc: "Lấy hướng chuyển động của tay hoặc đồ vật làm điểm nối, hai cảnh tự động khớp nhau êm ru.",
          url: "https://www.facebook.com/reel/1735902844239442/"
        },
        {
          title: "Bằng chứng thị giác B-roll che sạch lỗi nói vấp",
          desc: "Lỡ nói vấp không cần quay lại từ đầu, chèn cảnh thao tác tay thực tế đè lên vết cắt.",
          url: "https://youtube.com/shorts/Ew-yWd0riEQ"
        }
      ]
    },
    {
      id: "04",
      tag: "#BƯỚC 04 · KHÓA HỌC CAPCUT & AI",
      title: "Biên tập CapCut & Trợ lý AI — Tinh gọn 2 nút, tiết kiệm 80% thời gian",
      hook: "Nói vấp thoải mái, hậu kỳ xử lý êm ru. Kết hợp trợ lý AI gọt giũa kịch bản đúng giọng của bạn, giải phóng bạn khỏi cảnh thức trắng đêm mò mẫm.",
      outcome: "Xuất xưởng video hoàn chỉnh trong 30–45 phút, không phụ thuộc người dựng ngoài, tự chủ 100% kênh cá nhân.",
      items: [
        "Dựng CapCut với đúng 2 thao tác (Tách & Xóa): Dẹp bỏ các menu phức tạp. Chỉ cần phóng to dòng thời gian để cắt bỏ đoạn ngập ngừng, thở dài trong vài giây.",
        "Tạo phụ đề tự động chuẩn tiếng Việt: 1 chạm nhận diện giọng nói, căn chỉnh vùng hiển thị an toàn không rách chữ, không che mất chi tiết quan trọng trên màn hình.",
        "Luyện AI viết sườn bài theo giọng nói đời thường: Bộ câu lệnh ép AI bỏ văn mẫu sáo rỗng, tự động gợi ý 30 chủ đề bám sát câu hỏi thực tế của khách hàng."
      ],
      videos: [
        {
          title: "Dùng AI làm cảnh trám B-roll và chuyển cảnh nhanh",
          desc: "Tận dụng AI tạo cảnh minh họa theo nội dung, kết hợp cắt ghép tinh gọn tiết kiệm thời gian.",
          url: "https://www.facebook.com/reel/2162457291248635/"
        },
        {
          title: "2 thao tác Tách & Xóa xử lý video trong 15 phút",
          desc: "Phóng to dòng thời gian để cắt bỏ đoạn ngập ngừng, xuất xưởng video gọn gàng ngay trên điện thoại.",
          url: "https://www.facebook.com/reel/1946728119575375/"
        }
      ]
    },
    {
      id: "05",
      tag: "#BƯỚC 05 · VIDEO STORYTELLING",
      title: "Video Storytelling — Kể chuyện chạm cảm xúc để ra đơn Zalo lịch thiệp",
      hook: "Người có tiền không mua hàng vì lời nài nỉ hay quảng cáo tính năng. Họ mua vì câu chuyện nghề nghiệp chân thật chạm đúng khúc mắc của họ.",
      outcome: "Khách xem xong thấu hiểu chuyên môn và sự tận tâm của bạn, chủ động nhắn tin Zalo xin tư vấn lịch thiệp và sẵn sàng chi trả.",
      items: [
        "Mô hình kể chuyện Walk & Talk mộc mạc: Vừa đi vừa tâm sự trong bối cảnh làm việc đời thực. Phá vỡ cảm giác bán hàng gượng gạo, tạo dựng cảm giác an toàn và gần gũi.",
        "Công thức bóc trần sự thật ngượng miệng: Kể lại câu chuyện giải quyết vấn đề cho một khách hàng cụ thể — bẫy chi phí họ từng gặp, nỗi sợ hớ hênh khi làm nghề, và cách bạn tháo gỡ.",
        "Thiết lập cầu nối chuyển đổi về Zalo: Lời ngỏ tự nhiên, không chèo kéo, biến mỗi thước phim thành lời chào đàng hoàng để khách muốn kết nối ngay."
      ],
      videos: [
        {
          title: "Kể chuyện từ trải nghiệm thật để tìm ngách riêng",
          desc: "Không đi sao chép của ai. Chia sẻ câu chuyện và góc nhìn thật từ công việc để hút đúng tệp khách cần mình.",
          url: "https://www.facebook.com/reel/1629161828132946/"
        },
        {
          title: "Lời ngỏ tinh tế dẫn khách về Zalo nói chuyện riêng",
          desc: "Tạo lối kết nối lịch thiệp, khách có việc cần giải quyết sẽ chủ động nhắn tin Zalo xin tư vấn.",
          url: "https://www.facebook.com/reel/969746899486934/"
        }
      ]
    }
  ],
  modulesGuaranteeTitle: "ĐIỂM KHÁC BIỆT DUY NHẤT: BẠN KHÔNG PHẢI TỰ BƠI MỘT MÌNH",
  modulesGuaranteePoints: [
    "Không bán bài giảng quay sẵn rồi bỏ mặc: Mỗi bài học đều có bài tập thực tế. Bạn làm xong nộp lên lớp học trên Skool.",
    "Tôi trực tiếp ngồi soi timeline chữa từng clip: Chỉ rõ câu nào thừa, góc nào tối, chỗ nào ngập ngừng cần cắt để bạn sửa ngay tại chỗ.",
    "Học bài nào ra video bài đó: Không dạy lý thuyết suông. Hoàn thành 5 khóa học là bạn có sẵn cả dàn video hoàn chỉnh đăng lên kênh của mình."
  ],
  modulesBadges: [
    "Thực hành trên chính sản phẩm của bạn",
    "100% bằng điện thoại & CapCut",
    "Thầy 15 năm FPT Arena chữa bài"
  ],

  // ── Attention (Bài toán kinh tế & 3 lựa chọn) ──
  attentionLabel: "BÀI TOÁN KINH TẾ",
  attentionHeading: "999.000đ là đắt hay rẻ? Hãy đặt 3 con đường này lên bàn cân:",
  attentionPara: "Tiền bạc mất đi có thể kiếm lại được, nhưng 3–6 tháng mò mẫm trong bế tắc thì không ai bù đắp cho bạn:",
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
  solutionHeading: "Bạn không chỉ học kiến thức. Bạn được chuyển giao toàn bộ 'Bộ Đồ Nghề Thực Chiến'.",
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
  baHeading: "Sau 30 ngày, bạn không còn phải thức tới 3h sáng để đổi lấy vài chục view.",
  baSub: "Không phải làm nhiều hơn để kiệt sức — Mà là làm đúng quy trình để mỗi video làm ra đều đàng hoàng và có người hỏi mua.",
  beforeLabel: "TRƯỚC ĐÂY · THỬ SAI & ĐỐT SỨC",
  afterLabel: "SAU 30 NGÀY · CÓ QUY TRÌNH THỰC CHIẾN",
  beforeItems: [
    "Mất 3–4 tiếng mò mẫm cắt ghép: Cặm cụi từng khung hình, xuất video xong là kiệt sức rồi bỏ bẵng kênh cả tuần không ra nổi clip mới.",
    "Cứng họng, mắt đảo lia lịa: Càng cố học thuộc lòng kịch bản thì mặt càng đơ, giọng gượng gạo như trả bài, thiếu tự nhiên.",
    "Nói vấp 1 từ là xóa quay lại: Bấm quay rồi xóa cả chục lần, mất hàng giờ đồng hồ khiến tâm lý phát bực và nản lòng buông xuôi.",
    "Góc máy như 'camera an ninh': Đèn trần rọi phẳng lì làm mặt bóng dầu, khung hình lộn xộn khiến video nhìn rẻ tiền và thiếu uy tín.",
    "Đăng bài cầu may, lẹt đẹt vài view: Đốt bao nhiêu công sức nhưng không một ai bấm nhắn tin hỏi mua hay xin tư vấn, kênh chết yểu."
  ],
  afterItems: [
    "Chỉ mất 45 phút/clip hoàn chỉnh: Quy trình tinh gọn từ quay đến dựng nhờ có sẵn kịch bản 1 dòng và template CapCut kéo-thả.",
    "Bật máy lên là nói tự nhiên: Kịch bản 1 dòng ngắt nhịp theo hơi thở, nói chuyện lưu loát, gần gũi như đang ngồi uống trà tâm sự.",
    "Đắp B-roll 2–3s che 100% lỗi vấp: Che sạch hoàn toàn chỗ nói vấp hoặc ngập ngừng bằng cảnh chèn thao tác thực tế, clip sinh động gấp đôi.",
    "Setup 1 sải tay, ánh sáng nổi khối 3D: Khung hình sạch sẽ, sáng rõ, toát lên sự đĩnh đạc và uy tín của một người làm nghề lâu năm.",
    "Khách chủ động nhắn tin Zalo: Lời mở đầu đánh trúng nỗi đau thật, biến video thành nhân viên tư vấn tự động kéo khách lịch thiệp."
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
  instructorLabel: "NGƯỜI ĐỒNG HÀNH",
  instructorHeading: "Tôi đi dạy 15 năm... nhưng video đầu tiên tự đăng cũng chỉ có đúng 40 view.",
  instructorInitials: "NĐV",
  instructorName: "Nguyễn Đức Việt",
  instructorTitle: "Kỹ sư Bách Khoa · 15 năm Giảng viên FPT Arena · Founder Fedu.vn",
  instructorInsight: "Khán giả không cần bạn hoàn hảo như MC truyền hình. Họ ghét nhất sự giả trân. Họ chỉ cần bạn nói thật — và một khung hình sạch sẽ.",
  instructorStory: [
    {
      tag: "01 · CÚ VẤP ĐẦU NĂM",
      title: "15 năm dạy quay dựng, video đầu tiên nhận về đúng 40 view",
      desc: "Dạy ở FPT Arena 15 năm, nhưng mãi đầu năm nay tôi mới tự lập kênh cá nhân. Đêm đầu thức tới 3h sáng căn từng nhịp cắt, sáng ra nhận đúng 40 lượt xem. Thấy ngượng chứ! Nhưng nhờ cú ngã đó, tôi mới hiểu thấu cảm giác run tay, nghẹn lời và sợ bị phán xét của một người mới bước lên mạng.",
      highlight: "Thức tới 3h sáng, nhận đúng 40 view"
    },
    {
      tag: "02 · ĐIỂM NGỘ NGHỀ NGHIỆP",
      title: "Màn hình điện thoại phẳng lì ghét nhất sự giả trân",
      desc: "Kỹ xảo màu mè không giữ chân được ai. Khán giả không cần MC truyền hình hay lý thuyết hàn lâm. Người xem chỉ dừng lại khi 3 giây đầu bạn chạm đúng rắc rối có thật của họ — và toát lên sự đàng hoàng qua một góc quay sáng rõ, âm thanh sạch tiếng.",
      highlight: "Khán giả ghét nhất sự giả trân"
    },
    {
      tag: "03 · LỜI HỨA CỦA ÔNG GIÁO",
      title: "Không dạy đời trên bục giảng — Tôi kéo ghế ngồi lại cùng bạn",
      desc: "Tôi đóng gói chính những gì mình vừa tự sửa cho bản thân thành lộ trình này. Tôi trực tiếp soi từng timeline trên CapCut, chỉ thẳng chỗ nào thừa hình, câu nào nói vấp để bạn tự tin xuất xưởng video có người hỏi mua hàng mà không phải mò mẫm đơn độc.",
      highlight: "Kéo chiếc ghế ngồi lại sửa cùng bạn"
    }
  ],
  instructorBio: [
    "Dạy ở FPT Arena 15 năm, nhưng mãi đầu năm nay tôi mới tự lập kênh cá nhân. Đêm đầu thức tới 3h sáng căn từng nhịp cắt, sáng ra nhận đúng 40 view. Thấy ngượng chứ! Nhưng nhờ cú ngã đó, tôi mới hiểu thấu cảm giác run tay, nghẹn lời và sợ bị phán xét của một người mới.",
    "Màn hình điện thoại ghét nhất sự giả trân. Người xem chỉ dừng lại khi bạn chạm đúng rắc rối thật của họ — qua một góc quay sáng rõ và lời thoại tự nhiên.",
    "Tôi không đứng trên bục giảng dạy lý thuyết. Tôi kéo ghế ngồi lại cùng bạn, trực tiếp sửa từng timeline để bạn tự tin ra video có chuyển đổi."
  ],

  // ── Bonus (Đồ nghề thực chiến đi kèm) ──
  bonusLabel: "TỦ ĐỒ NGHỀ THỰC CHIẾN ĐI KÈM",
  bonusHeading: "Mở máy lên là có sẵn đồ nghề để làm — Khỏi mất công đi nhặt nhạnh từng file rác trên mạng",
  bonusSub: "Làm video nản nhất không phải là quay, mà là lúc dựng thiếu bản nhạc phải đi tìm, tải font về thì gãy dấu tiếng Việt, đăng lên kênh thì bị nền tảng tắt tiếng vì dính bản quyền. Toàn bộ đồ nghề này tôi đã gom sẵn 1 link Drive gọn gàng, bạn chỉ việc tải về và kéo vào CapCut dùng ngay:",
  bonusItems: courseConfig.bonuses,

  // ── Section 11: Final CTA ──
  urgencyBar: "⚠ HỌC PHÍ ƯU ĐÃI CHỈ DÀNH CHO LỚP THỰC CHIẾN THÁNG NÀY (GIỚI HẠN SỐ LƯỢNG ĐỂ THẦY SOI TIMELINE)",
  ctaLabel: "// BẮT ĐẦU HÀNH TRÌNH",
  ctaHeading: "Tự làm chủ kỹ năng video ngắn — Không còn phụ thuộc vào ai",
  ctaSub: "Một bữa lẩu bạn ăn rồi cũng hết. Nhưng 999.000đ đầu tư cho kỹ năng này sẽ giúp bạn tự tin làm video cả đời, có khách hàng thật và tự tay xây dựng tài sản cho chính mình.",
  countdownLabel: "⏳ Ưu đãi kết thúc sau:",
  valueStackTitle: "TỔNG GIÁ TRỊ THỰC TẾ BẠN NHẬN ĐƯỢC:",
  valueStack: [
    { label: "Trọn bộ 5 Khóa học thực chiến (Kịch bản, Góc máy, CapCut, AI, Ra đơn)", price: "2.500.000 VNĐ" },
    { label: "Đặc quyền nộp bài & Thầy Nguyễn Đức Việt trực tiếp soi timeline trên Skool", price: "2.000.000 VNĐ" },
    { label: "Tủ đồ nghề 4 món (Nhạc sạch, Preset CapCut, Prompt AI, 30 Hook)", price: "ĐI KÈM MIỄN PHÍ" }
  ],
  guarantee: "⚡ Quy trình 1-Chạm: Chuyển khoản xong → Vào học NGAY LẬP TỨC trên Skool. Thầy kèm cặp thực hành trực tiếp.",

  // ── Footer ──
  footerBrand: "30NGÀY",
  footerDot: ".",
  footerTagline: "\"Làm video không phải may mắn.\nLàm đúng quy trình, tự khắc video sẽ đàng hoàng và có người mua.\"",
  footerLinks: [],
  footerCopyright: "COPYRIGHT 2026 | 30NGAYVIRAL.FEDU.VN — FEDU EDUCATION",

  // ── Extracted Components Data (Single Source of Truth) ──
  philosophyFoundations: [
    {
      icon: "🎬",
      tag: "NỀN TẢNG 01: QUAY DỰNG CUỐN HÚT",
      title: "Cắt Ghép Chỉn Chu",
      desc: "Làm chủ tư duy phân cảnh và nhịp điệu cắt ghép mượt mà, loại bỏ hoàn toàn các khoảng chết gây nhàm chán."
    },
    {
      icon: "💡",
      tag: "NỀN TẢNG 02: BỐI CẢNH & ÁNH SÁNG",
      title: "Góc Quay & Hướng Sáng Chuẩn",
      desc: "Tận dụng ánh sáng tự nhiên và cách đặt máy thông minh giúp khung hình điện thoại luôn nét căng, có chiều sâu."
    }
  ],

  attentionChoices: [
    {
      badge: "LỰA CHỌN 1",
      title: "Tự Mày Mò Một Mình",
      cost: "0 VNĐ TIỀN MẶT",
      desc: "Xem video mẹo vặt rải rác trên mạng, tải đủ app về thử rồi ngồi vò đầu bứt tai trước ống kính. Đăng lên nhận đúng 40 view. Không ai chỉ cho câu nào nói thừa, góc nào bị tối. Sau 3 tháng dậm chân tại chỗ, vừa nản vừa bỏ hoang kênh.",
      isBest: false,
      tag: "⏳ Mất 3–6 tháng cạn sức"
    },
    {
      badge: "LỰA CHỌN 2",
      title: "Thuê Ngoài Hoặc Mua Máy Cơ",
      cost: "15 – 30 Triệu / Tháng",
      desc: "Thuê thợ quay dựng tốn kém mà họ chỉ biết bấm máy chứ không hiểu sản phẩm của bạn. Mua máy ảnh cơ chục triệu về lỉnh kỉnh, bối rối thông số không biết chỉnh lại vứt xó tủ đóng bụi.",
      isBest: false,
      tag: "⚠️ Tốn kém & Luôn bị động"
    },
    {
      badge: "LỰA CHỌN 3 — KHUYÊN DÙNG",
      title: "Làm Chủ Trên Điện Thoại Cùng Thầy Việt",
      cost: "Chỉ 999.000 VNĐ (Bằng 1 bữa lẩu)",
      desc: "Tự làm chủ trọn vẹn từ Kịch bản 1 dòng → Góc sáng 3D → Dựng CapCut → AI ngay trên chiếc điện thoại. Có Thầy Việt trực tiếp soi timeline gỡ lỗi 1-1. Bạn sở hữu kỹ năng làm video ra đơn cả đời.",
      isBest: true,
      tag: "🏆 Lựa chọn khôn ngoan nhất"
    }
  ],

  solutionsTabs: [
    {
      title: "🤖 Chủ Shop / SMEs (Bán Ads)",
      subtitle: "Thoát cảnh quảng cáo lôm côm không ra đơn",
      pain: "Quay video bán hàng đặt máy chết một góc, review như đọc vẹt. Sản phẩm nhìn kém sang, 'hàng chợ', đổ tiền chạy quảng cáo là lỗ.",
      solution: "Dạy Ma trận Cỡ Cảnh (Toàn - Trung - Cận) để điều hướng mắt khán giả. Dùng Cảnh Cận (Close-up - Nam châm chi tiết) để khoe giá trị tinh hoa của sản phẩm, kích thích sự khao khát. Dùng ánh sáng khối làm sản phẩm nhìn đắt tiền. Dùng B-roll làm bằng chứng chốt sale.",
      leftLabel: "LÔM CÔM / HÀNG CHỢ",
      leftDesc: "Đặt máy từ xa góc tĩnh, nói đều đều, đánh sáng phòng phẳng lì rọi thẳng mặt.",
      rightLabel: "CHỈN CHU / ĐẤT TIỀN",
      rightDesc: "Luân chuyển cỡ cảnh theo nhịp nói, cận cảnh đặc tả giọt nước/đường nét sắc nét, setup ánh sáng ven nổi khối.",
      icon: "🏪"
    },
    {
      title: "🧠 Chuyên gia / KOC (Nhân hiệu)",
      subtitle: "Hệ thống sản xuất nhàn hạ, tự nhiên",
      pain: "Tự nghĩ kịch bản, tự setup lỉnh kỉnh mỗi ngày dẫn đến kiệt sức rồi bỏ hoang kênh. Đứng trước ống kính là bị đơ cứng, gượng gạo.",
      solution: "Setup định dạng Talking Head cố định bối cảnh 1 lần dùng mãi mãi. Dùng AI viết kịch bản 2 cột trong 1 phút. Áp dụng góc quay chéo 3/4 (giả lập cuộc hội thoại) kết hợp hành động vật lý (pha trà, lật sách) để cơ thể hát cùng ngôn từ tự nhiên, toát lên sự đĩnh đạc.",
      leftLabel: "LÊN HÌNH ĐƠ CỨNG",
      leftDesc: "Mắt nhìn chằm chằm trực diện vào camera gây áp lực lớn cho người xem, nói vấp phải quay lại nhiều lần.",
      rightLabel: "ĐĨNH ĐẠC & TỰ NHIÊN",
      rightDesc: "Góc quay chéo 3/4 thoải mái, cơ thể chuyển động theo hành động vật lý tự nhiên, đắp B-roll che lỗi vấp mượt mà.",
      icon: "🧠"
    },
    {
      title: "🎬 Editor / Tự học (Thẩm mỹ xịn)",
      subtitle: "Có tư duy hình ảnh để x5 thu nhập",
      pain: "Lầm tưởng video đẹp là lạm dụng nhiều hiệu ứng lật trang 3D, giật chớp. Kết quả làm video bị rối mắt, sến sẩm và mất định vị chuyên nghiệp.",
      solution: "Đập tan ảo giác về phần mềm. Dạy kỹ thuật Cut on Action (chuyển cảnh vật lý tàng hình) và chuyển động cơ học tự nhiên (vung tay, lướt vật thể qua camera) giúp video mượt mà như một dòng chảy liên tục.",
      leftLabel: "HIỆU ỨNG SẾN SẨM",
      leftDesc: "Chèn hiệu ứng lật trang 3D lòe loẹt, chuyển cảnh giật cục phá vỡ sự thoải mái thị giác.",
      rightLabel: "CHUYỂN CẢNH TÀNG HÌNH",
      rightDesc: "Nối cảnh mượt mà bằng chuyển động vật lý cơ học, người xem không nhận ra vết cắt nhưng không thể rời mắt.",
      icon: "🎬"
    }
  ],

  instructorStats: [
    { num: "15 năm", label: "Giảng dạy tại FPT Arena" },
    { num: "1.000+", label: "Học viên & Creator đã đào tạo" },
    { num: "1 kèm 1", label: "Trực tiếp soi timeline & sửa bài" },
  ],

  faqBadge: "HỎI ĐÁP THỰC TẾ",
  faqHeading: "Những điều người mới hay băn khoăn trước khi bắt đầu:",
  faqSub: "Giải đáp thẳng thắn, không né tránh để bạn hoàn toàn yên tâm trước khi vào lớp:",
  faqItems: [
    {
      q: "Tôi không biết gì về công nghệ, dùng điện thoại còn lóng ngóng thì có làm được không?",
      a: "Khóa học đi từ vỡ lòng, từng thao tác bấm trên điện thoại đều được quay lại rõ ràng. Bạn chỉ cần xem xong, bấm dừng video lại và làm theo đúng từng bước trên máy của mình. Chỗ nào chưa rõ, cứ nhắn lên lớp học Skool để được hướng dẫn trực tiếp."
    },
    {
      q: "Tôi rất ngại lên hình, đứng trước camera là run và quên hết chữ thì phải làm sao?",
      a: "Bạn không cần phải làm diễn viên hay nói lưu loát ngay từ đầu. Trong khóa học, tôi dạy bạn kỹ thuật bẻ kịch bản thành từng câu 1 dòng (5-7 từ), nói câu nào xong thì nghỉ câu đó, rồi dùng kỹ thuật đắp hình ảnh B-roll để che sạch 100% các đoạn nói vấp. Người xem sẽ thấy video cực kỳ mượt mà."
    },
    {
      q: "Điện thoại đời cũ, không có máy ảnh xịn hay đèn studio thì video có bị mờ tối không?",
      a: "Toàn bộ bài giảng trong khóa học này tôi đều thị phạm bằng chính chiếc điện thoại thông thường. Chỉ cần biết cách kê máy cách mặt 1 sải tay và tận dụng ánh sáng tự nhiên từ cửa sổ, khung hình của bạn đã sáng rõ và nổi khối 3D đĩnh đạc hơn rất nhiều người mua đèn đắt tiền."
    },
    {
      q: "Mỗi ngày tôi bận đi làm / kinh doanh, chỉ rảnh 30-45 phút thì có theo kịp lớp không?",
      a: "Mỗi bài học được thiết kế cô đọng trong 10–15 phút, vào thẳng vấn đề không lý thuyết dài dòng. Quy trình 45 phút/clip giúp bạn tận dụng đúng giờ nghỉ trưa hoặc buổi tối là có thể hoàn thành xong 1 video để nộp bài."
    },
    {
      q: "Sau khi thanh toán xong thì tôi bắt đầu học như thế nào và ai hỗ trợ tôi?",
      a: "Sau khi chuyển khoản, hệ thống tự động kích hoạt tài khoản để bạn vào lớp học ngay lập tức trên Skool. Bạn làm xong bài tập nào thì đăng trực tiếp lên đó. Tôi là người trực tiếp xem bài, soi từng đoạn timeline để chỉ cho bạn chỗ cần sửa cho đến khi video chuẩn mới thôi."
    }
  ],

  blocksMeta: {
    order: ["hero", "pain", "pillars", "modules", "instructor", "before-after", "attention", "bonus", "faq", "cta"],
    hidden: ["skills"],
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
