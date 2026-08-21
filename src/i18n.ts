export type Lang = 'en' | 'ar';

export interface ColorOption {
  id: 'white' | 'black';
  en: string;
  ar: string;
  hex: string;
  ring: string;
}

export const COLORS: ColorOption[] = [
  { id: 'white', en: 'White', ar: 'أبيض', hex: '#f5f5f5', ring: '#d4d4d8' },
  { id: 'black', en: 'Black', ar: 'أسود', hex: '#0a0a0b', ring: '#3f3f46' },
];

export const CITIES = [
  { id: 'irbid', en: 'Irbid', ar: 'إربد' },
  { id: 'amman', en: 'Amman', ar: 'عمان' },
  { id: 'zarqa', en: 'Zarqa', ar: 'الزرقاء' },
  { id: 'balqa', en: 'Balqa', ar: 'البلقاء' },
  { id: 'madaba', en: 'Madaba', ar: 'مادبا' },
  { id: 'karak', en: 'Karak', ar: 'الكرك' },
  { id: 'tafila', en: 'Tafilah', ar: 'الطفيلة' },
  { id: 'maan', en: 'Maan', ar: 'معان' },
  { id: 'aqaba', en: 'Aqaba', ar: 'العقبة' },
  { id: 'jerash', en: 'Jerash', ar: 'جرش' },
  { id: 'ajloun', en: 'Ajloun', ar: 'عجلون' },
  { id: 'mafraq', en: 'Mafraq', ar: 'المفرق' },
];

export const STORY_AR = `بدأت رحلة AURA بفكرة بسيطة من شاب عمره 16 سنة ، كان عنده طموح يبني براند بيمثّل جيله وبقدم منتج حقيقي يغير روتين يومهم. بفضل ثقة ودعم العائلة ، بدأت الرحلة الفردية! من الصفر، ومن غرفتي الصغيرة؛ استلمت كل خطوة بنفسي: تواصلت مع المصانع في الصين لضمان أعلى جودة ستانلس ستيل، صممت اللوجو، برمجت الموقع اللي بتشوفوه هسا، وأدرت صفحات السوشيال ميديا والتسويق، وحتى التغليف والبيع والتوصل مع زباينا. AURA مش مجرد مطرة مياه؛ هي نتاج تعب، وشغف، وإصرار على تقديم منتج فخم، عملي، ومواكب للتكنولوجيا (زي ميزة الماغ سيف). لما تشتري من براندنا، أنت مش بس بتدعم براند محلي، أنت بتشارك في قصة طموح لسه في أولها!`;

export interface Copy {
  // Gate
  gateTitle: string;
  gateSubtitle: string;
  gateArabic: string;
  gateEnglish: string;
  gateEnter: string;
  // Nav
  navStory: string;
  navFor: string;
  navSpecs: string;
  navOrder: string;
  // Hero
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDesc: string;
  heroCta: string;
  heroScroll: string;
  // Marquee
  marquee: string[];
  // MagSafe feature
  magTitle: string;
  magDesc: string;
  magPoint1: string;
  magPoint2: string;
  magPoint3: string;
  // Specs
  specsTitle: string;
  specsSubtitle: string;
  specs: { label: string; value: string }[];
  // Pricing
  priceTitle: string;
  priceProduct: string;
  priceDelivery: string;
  priceTotal: string;
  priceCurrency: string;
  // Story
  storyTitle: string;
  storySubtitle: string;
  // Who is it for
  forTitle: string;
  forSubtitle: string;
  forCards: { icon: string; title: string; desc: string }[];
  // Checkout
  checkoutTitle: string;
  checkoutSubtitle: string;
  colorLabel: string;
  qtyLabel: string;
  qtyMax: string;
  formName: string;
  formNamePh: string;
  formPhone: string;
  formPhonePh: string;
  formPhoneErr: string;
  formCity: string;
  formCityPh: string;
  formAddress: string;
  formAddressPh: string;
  formNotes: string;
  formNotesPh: string;
  codTitle: string;
  codDesc: string;
  submitBtn: string;
  submitting: string;
  successToast: string;
  errorToast: string;
  // Footer
  footerTagline: string;
  footerRights: string;
  footerLinks: string[];
}

export const COPY: Record<Lang, Copy> = {
  en: {
    gateTitle: 'Choose Your Language',
    gateSubtitle: 'Select your preferred language to begin',
    gateArabic: 'العربية',
    gateEnglish: 'English',
    gateEnter: 'Enter',
    navStory: 'Our Story',
    navFor: 'Who It Is For',
    navSpecs: 'Specs',
    navOrder: 'Order Now',
    heroBadge: 'Premium MagSafe Water Bottle',
    heroTitle1: 'Hydration,',
    heroTitle2: 'Reimagined.',
       heroDesc: 'AURA is a 1.2L stainless steel bottle with a built-in magnetic ring that snaps your phone to the top. Keeps cold for up to 24 hours, hot for up to 12 hours — engineered for the way you actually live.',
    heroCta: 'Order Now',
    heroScroll: 'Scroll',
    marquee: ['MagSafe Technology', '1.2L Capacity', '304 Stainless Steel', '12h Cold', '12h Hot', 'BPA-Free', 'Leak-Proof Lid', 'Cash on Delivery'],
    magTitle: 'MagSafe. Your phone, magnetically held.',
    magDesc: 'A precision-engineered magnetic ring sits flush in the lid. Snap your phone to the top of the bottle — for video calls at the gym, recipes in the kitchen, or navigation on the trail. No stand, no clip, no compromise.',
    magPoint1: 'Snaps MagSafe-compatible phones securely',
    magPoint2: 'Perfect angle for video & navigation',
    magPoint3: 'Flush mount — doubles as a normal lid',
    specsTitle: 'Built to a higher standard.',
    specsSubtitle: 'Every spec, obsessed over.',
    specs: [
      { label: 'Material', value: '304 Stainless Steel · BPA-free · Rust-resistant · Anti-slip coating' },
      { label: 'Heat Retention — Hot', value: '85–95°C at 1–4h · 55–60°C at 6h · above 45°C up to 12h' },
          { label: 'Cooling — Cold', value: '4–7°C at 1–6h · 8–10°C at 12h · below 15°C up to 24h' },
      { label: 'Capacity & Lid', value: '≈1.2L · Dual-function leak-proof lid for ice & cleaning' },
      { label: 'Hero Feature', value: 'Premium Magnetic Ring (MagSafe)' },
    ],
    priceTitle: 'Simple, honest pricing.',
    priceProduct: 'AURA Bottle',
    priceDelivery: 'Delivery',
    priceTotal: 'Total',
    priceCurrency: 'JOD',
    storyTitle: 'OUR STORY',
    storySubtitle: 'A brand built by a 16-year-old with a vision.',
    forTitle: 'One bottle. Endless lifestyles.',
    forSubtitle: 'Who is AURA for?',
    forCards: [
      { icon: 'dumbbell', title: 'Athletes', desc: 'Stay hydrated through every set and sprint. Cold water that lasts your entire workout.' },
      { icon: 'heart', title: 'Mothers', desc: 'Keep milk warm for hours — no microwave needed. Warmth ready when your baby is.' },
      { icon: 'footprints', title: 'Runners', desc: 'Lightweight, leak-proof on the move. Magnetic ring holds your phone while you push limits.' },
      { icon: 'sun', title: 'Daily Life', desc: 'From morning coffee to late-night tea — one bottle, all day, zero compromise.' },
      { icon: 'graduation', title: 'Students', desc: 'Long lectures, study marathons, campus commutes. AURA keeps up with your schedule.' },
      { icon: 'gift', title: 'Perfect Gift', desc: 'Elegant packaging, premium feel. A gift they will actually use every single day.' },
    ],
    checkoutTitle: 'Order your AURA',
    checkoutSubtitle: 'Cash on delivery — pay only when it arrives.',
    colorLabel: 'Choose your color',
    qtyLabel: 'Quantity',
    qtyMax: 'Max 25 per color',
    formName: 'Full Name',
    formNamePh: 'Your full name',
    formPhone: 'Phone Number',
    formPhonePh: '07XXXXXXXX',
    formPhoneErr: 'Enter a valid Jordanian number (07XXXXXXXX)',
    formCity: 'City',
    formCityPh: 'Select your city',
    formAddress: 'Delivery Address',
    formAddressPh: 'Detailed delivery address',
    formNotes: 'Notes (Optional)',
    formNotesPh: 'Any extra details…',
    codTitle: 'Cash on Delivery',
    codDesc: 'Pay when you receive your AURA bottle.',
    submitBtn: 'Place Order',
    submitting: 'Placing order…',
    successToast: 'Order placed! We will call you shortly to confirm.',
    errorToast: 'Something went wrong. Please try again.',
    footerTagline: 'Premium MagSafe hydration, built for your generation.',
    footerRights: 'All rights reserved.',
    footerLinks: ['Privacy', 'Terms', 'Warranty', 'Contact'],
  },
  ar: {
    gateTitle: 'اختر لغتك',
    gateSubtitle: 'اختر لغتك المفضلة للبدء',
    gateArabic: 'العربية',
    gateEnglish: 'English',
    gateEnter: 'دخول',
    navStory: 'قصتنا',
    navFor: 'لمن',
    navSpecs: 'المواصفات',
    navOrder: 'اطلب الآن',
    heroBadge: 'مطرة ماغ سيف الفاخرة',
    heroTitle1: 'الترطيب،',
    heroTitle2: 'بحلّ جديد.',
    heroDesc: 'AURA مطرة ستانلس ستيل سعة 1.2 لتر مع حلقة مغناطيسية مدمجة تثبت هاتفك على الأعلى. تحافظ على البرودة حتى 24 ساعة والحرارة حتى 12 ساعة — مصممة لطريقة عيشك الحقيقية.',
    heroCta: 'اطلب الآن',
    heroScroll: 'مرّر',
    marquee: ['تقنية ماغ سيف', 'سعة 1.2 لتر', 'ستانلس ستيل 304', '12 ساعة برودة', '12 ساعة حرارة', 'خالٍ من BPA', 'غطاء مانع للتسرب', 'الدفع عند الاستلام'],
    magTitle: 'ماغ سيف. هاتفك، ثابت مغناطيسياً.',
    magDesc: 'حلقة مغناطيسية دقيقة مدمجة في الغطاء. ثبت هاتفك على أعلى المطرة — لمكالمات الفيديو في الجيم، أو الوصفات في المطبخ، أو الملاحة على الطريق. بدون حامل، بدون مشبك، بدون تنازل.',
    magPoint1: 'يثبت هاتفك بقوة بميزة الماغ سيف من السقوط',
    magPoint2: 'زاوية مثالية للفيديو والملاحة',
    magPoint3: 'تصميم مسطّح — يعمل كغطاء عادي أيضاً',
    specsTitle: 'مصنوعة بمعايير أعلى.',
    specsSubtitle: 'كل مواصفة، مدروسة بعناية.',
    specs: [
      { label: 'الخامة', value: 'ستانلس ستيل 304 · خالٍ من BPA · مقاوم للصدأ · طبقة مانعة للانزلاق' },
          { label: 'العزل — ساخن', value: '85-95°م خلال 1-4 ساعات · 55-60°م عند 6 ساعات · أعلى من 45°م حتى 12 ساعة' },
           { label: 'العزل — بارد', value: '4-7°م خلال 1-6 ساعات · 8-10°م عند 12 ساعة · أقل من 15°م حتى 24 ساعة' },
      { label: 'السعة والغطاء', value: '≈1.2 لتر · غطاء مزدوج الوظيفة مانع للتسرب للثلج والتنظيف' },
      { label: 'الميزة الرئيسية', value: 'حلقة مغناطيسية فاخرة (ماغ سيف)' },
    ],
    priceTitle: 'تسعير بسيط وصادق.',
    priceProduct: 'مطرة AURA',
    priceDelivery: 'التوصيل',
    priceTotal: 'الإجمالي',
    priceCurrency: 'دينار',
    storyTitle: 'قصتنا',
    storySubtitle: 'براند بناه شاب بعمر 16 سنة برؤية.',
    forTitle: 'مطرة واحدة. حيوات لا نهائية.',
    forSubtitle: 'لمَن AURA؟',
    forCards: [
      { icon: 'dumbbell', title: 'الرياضيون', desc: 'ابقَ مرطّباً عبر كل مجموعة وعدوة. مياه باردة تدوم طوال تمرينك.' },
      { icon: 'heart', title: 'الأمهات', desc: 'حافظي على دفء الحليب لساعات — بدون مايكروويف. الدفء جاهز عندما يكون طفلك كذلك.' },
      { icon: 'footprints', title: 'العداؤون', desc: 'خفيفة، مانعة للتسرب أثناء الحركة. الحلقة المغناطيسية تثبت هاتفك بينما تتحدى حدودك.' },
      { icon: 'sun', title: 'الحياة اليومية', desc: 'من قهوة الصباح إلى شاي آخر الليل — مطرة واحدة، طوال اليوم، بلا تنازل.' },
      { icon: 'graduation', title: 'الطلاب', desc: 'محاضرات طويلة، ماراثونات دراسة، تنقلات حرم الجامعة. AURA تواكب جدولك.' },
      { icon: 'gift', title: 'هدية مثالية', desc: 'تغليف أنيق، إحساس فاخر. هدية سيستخدمونها فعلاً كل يوم.' },
    ],
    checkoutTitle: 'اطلب AURA الخاصة بك',
    checkoutSubtitle: 'الدفع عند الاستلام — ادفع فقط عند وصولها.',
    colorLabel: 'اختر لونك',
    qtyLabel: 'الكمية',
    qtyMax: 'الحد الأقصى 25 لكل لون',
    formName: 'الاسم الكامل',
    formNamePh: 'اسمك الكامل',
    formPhone: 'رقم الهاتف',
    formPhonePh: '07XXXXXXXX',
    formPhoneErr: 'أدخل رقم أردني صحيح (07XXXXXXXX)',
    formCity: 'المدينة',
    formCityPh: 'اختر مدينتك',
    formAddress: 'عنوان التوصيل بالتفصيل',
    formAddressPh: 'عنوان التوصيل بالتفصيل',
    formNotes: 'ملاحظات إضافية',
    formNotesPh: 'أي تفاصيل إضافية…',
    codTitle: 'الدفع عند الاستلام',
    codDesc: 'ادفع عند استلام مطرة AURA الخاصة بك.',
    submitBtn: 'تأكيد الطلب',
    submitting: 'جارٍ تأكيد الطلب…',
    successToast: 'تم تأكيد الطلب! سنتصل بك قريباً للتأكيد.',
    errorToast: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
    footerTagline: 'ترطيب ماغ سيف فاخر، مصنوع لجيلك.',
    footerRights: 'جميع الحقوق محفوظة.',
    footerLinks: ['الخصوصية', 'الشروط', 'الضمان', 'تواصل'],
  },
};
