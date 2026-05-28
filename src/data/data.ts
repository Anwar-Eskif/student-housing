// import { offers } from './../pages/Platform/pages/MyOffers/mock';

const NAV_LINKS = [
    { path: '/', label: 'الصفحة الرئيسية' },
    { path: '/offers', label: 'تصفح العروض' }
];

const AUTH_TEXT = {
    student: 'طالب',
    landlord: 'مالك عقار',
    student_description: 'كطالب، يمكنك البحث عن السكن المناسب.',
    landlord_description: 'كمالك عقار، يمكنك عرض عقارك وإدارته.',
    username: 'اسم المستخدم',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirm_password: 'تأكيد كلمة المرور',
    login: 'تسجيل الدخول',
    registering: 'جاري تسجيل ',
    register_now: 'ليس لديك حساب؟ سجل الآن',
    login_now: 'لديك حساب بالفعل؟ سجل دخولك هنا',
    join_us: 'انضم إلينا الأن',
    welcome_back: 'أهلا بك مجددا'
};

const ERROR_MESSAGES = {
    server_error: "حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.",
};

const FEATURED_OFFERS_TEXT = {
    title: 'اكتشف أفضل أماكن الإقامة',
    description: 'استكشف بيوت الطلاب الأكثر شهرة بالقرب من كبرى الجامعات. تم اختيارها بعناية للراحة والأمان والمجتمع.',
    browse_all: 'تصفح كافة العقارات'
};

const HERO_SECTION_TEXT = {
    safety_title: 'الأمان أولاً دائماً',
    safety_description: 'يتم فحص خلفية كل مؤجر على منصتنا.',
    badge: 'سكنات موثقة',
    title_part1: 'سكن يشعرك وكأنك في',
    title_part2: 'منزلك.',
    description: 'الطريقة الأذكى للطلاب للعثور على سكن آمن وموثق بالقرب من الجامعة. لا توجد رسوم خفية، فقط إقامة رائعة.'
};

const HOME_CARD_TEXT = {
    monthly: '/شهرياً'
};

const SEARCH_INPUT_TEXT = {
    placeholder: 'ابحث عن مكان',
    button: 'ابحث عن مكان'
};

const BOOKING_CARD_TEXT = {
    monthly: '/شهرياً',
    request_to_book: 'إرسال طلب زيارة',
    no_charge_now: 'لن يتم خصم أي مبالغ الآن - فقط إرسال طلبك إلى المؤجر لترتيب موعد للزيارة.',
    rent: 'الإيجار',
    register_first : 'يرجى تسجيل الدخول أولاً لإرسال طلب الحجز.'
};

const BOOKING_CONFIRMATION_POPUP_TEXT = {
    success_title: 'تم الحجز بنجاح!',
    success_message: 'لقد تم تأكيد طلب الحجز الخاص بك. سيتواصل معك المؤجر قريباً.',
    ok_button: 'حسنًا'
};

const LANDLORD_PROFILE_CARD_TEXT = {
    title: 'قابل المؤجر',
    name: 'سارة جنكينز',
    contact_button: 'تواصل مع المؤجر'
};

const OFFER_DETAILS_TEXT = {
    reviews: 'تقييم',
    about: 'عن هذا المسكن',
    amenities: 'ما يقدمه هذا المكان',
    user_reviews: 'تقييمات المستخدمين',
    add_review : 'أضف تقييمك',
    no_reviews:"لا توجد تقييمات بعد"
};

const REVIEW_POPUP_TEXT = {
    add_review_title: 'أضف تقييمك',
    rating: 'التقييم',
    comment: 'تعليق',
    share_experience: 'شارك تجربتك...',
    cancel: 'إلغاء',
    submit_review: 'إرسال التقييم'
};

const FILTER_SIDEBAR_TEXT = {
    title: 'تصفية النتائج',
    description: 'حدد خيارات البحث المناسبة',
    price: 'السعر',
    max_price: 'الأعلى',
    min_price: 'الأدنى',
    amenities_label: 'المرفقات',
    amenities: {
        wifi: 'واي فاي',
        laundry: 'غسيل ملابس',
        air_conditioner: 'تكييف',
        parking: 'مواقف سيارات',
        gym: 'صالة رياضية',
        kitchen: 'يحتوي على مطبخ'
    },
    gym: 'صالة رياضية',
    kitchen: 'يحتوي على مطبخ',
    apply_filters: 'تطبيق الفلاتر'
};

const OFFERS_PAGE_TEXT = {
    search_results: 'نتائج البحث',
    property: 'عقار',
    search_placeholder: 'ابحث عن مكان',
    sort_by: 'ترتيب حسب:',
    latest: 'الأحدث',
    price_low_to_high: 'السعر: من الأقل للأعلى',
    highest_rated: 'الأعلى تقييماً'
};

const OFFER_CARD_TEXT = {
    monthly: '/ شهرياً',
    view_details: 'عرض التفاصيل'
};

// Mock Data
const OFFERS_DATA = [
  {
    id: 1,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCskjpFXS9DyvUss-xoDogsfPG0K8SXexIj0yQtTXFHSHCmeYutQm9HWkJBVHDj8IK7wyEiUx4XslkYK2HhFzt94KLCDQbeIsmyN1ZxhjI1dHl23XeNo7f5zuBPfqtR3ii379JVP8Ck1ICuX5Vyl-Z3DaX4z6oUW1JpxGybzIIZr5CY7Iu7-m9iPIZonIRIRp0jk-sM3Vq3ZTNw6rG-WEM_EvhvZTBMvoqcnRdo4cFa-sfyxwSRsz9P29cHkITKalA8YkPGRNsvwM8",
    price: 850,
    title: "سكن حديثة بالقرب من الجامعة",
    rating: 4.9,
    tags: [{ label: "واي فاي" }],
    isFavorite: true,
  },
  {
    id: 2,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuM1eTDib6a6mQH9ut-ZoDFT0V_FJylBDYZZEEc_VXQVM8AUfJo2gkelUPI8Y-YqwiGYnyg804VKnCxpxmbkeiU84BvK3-yraQpGzG4hb36MRLjkBWhyBz8Zwa7YQ4dcvH4c2MwYM62mo4u3gFbJaDem0jbl5MR3CaSJl2G2MiRLP8j2C_kJzs7BI8_GmnYZMB-Yitw6IQk8_Dnkpw1e1mYj0-BOZXfkYXsEUmw3Nao5nsoofxnEF6ooc2V-1-tnM5ZJ8QRcryW18",
    price: 1200,
    title: "سكن فاخر متكامل",
    rating: 4.7,
    tags: [{ label: "مواقف سيارات" }, { label: "صالة رياضية" }],
    isFavorite: false,
  },
  {
    id: 3,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCohPP80Vu8SQIMRrSK79FeUh6VKagnNBsz_EgGkAF4BjbIk-cUXTklPrRmu7tM62-WJvZeMxY_N63ejYGOCtVGh5T_G74IdtiB_0Bq5ATDfqlbtYr-jvJcLYjMa0bvLBujMxj9T8TXELCdJLDcfjET5nhOTPfbghQGvPZEqs23oHSmdDH9UDOm6VDzPiSKzz1JhDXUA3WO7cqgeEYiMIxhUj-Vgz3Y7wGLuBznyZ3NonWQD4gtjiuhH4xlf5k8BAe3-_oaYl8WjCQ",
    price: 600,
    title: "غرفة مريحة",
    rating: 4.5,
    tags: [{ label: "يوجد مطبخ" }],
    isFavorite: false,
  },
  {
    id: 4,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWkh9r9F8TebrZ_LAu2ym17r2NmGcXBoQcjiGw32xIT8OqhaNf7n3Qwe5J9T81SjIKjAWMObkGIphS2CxeZTruM-jGv8I_k_bMP_Ib8DQ6UmGlFXReVZsJ88aBgUdb5_EDVFPKNW31bMnMK5qxTzjhnbuzfEeqXjEcEgvBvY6Xy2Ql5IMRr_REbGPgUquYrJzdGN4UBRQwG3Gg9WlkFWCWRZsIIJZJW94f88hqEfkSAwSLzz2e_84LubE-RvGSyW3AUvdCziD26n8",
    price: 950,
    title: "سكن طلابي",
    rating: 4.8,
    tags: [{ label: "خدمة غسيل" }, { label: "مفروش بالكامل" }],
    isFavorite: false,
  },
  {
    id: 5,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDs-nbbOVT9JMHNJs0zEzqv56scEZ_N_Ks9eMn9nj2MxK5EHYGCymUMkY1FWSadM6pgRGq03dwivGHYeONUom_xh8u-w0cRyQAN9lj0TAc2PeK3rz9jSBmYQZeDWAihybQhI4o5z2PSN08oOUTNAxfzsTrqgLASaIC-LsOegOUjpuOSBHr39H6eKgJYZ9mXpMab7j-QEO8vD62chFivGRj_nnl2oNGbQC8kzOMxURbh_gzST5V0xL2_SCUfyV-SQj0a6qPYr9Bl_kA",
    price: 1500,
    title: "شقة كاملة لثلاثة طلاب",
    rating: 4.6,
    tags: [{ label: "يوجد مطبخ" }, { label: "واي فاي" }],
    isFavorite: false,
  },
  {
    id: 6,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCskjpFXS9DyvUss-xoDogsfPG0K8SXexIj0yQtTXFHSHCmeYutQm9HWkJBVHDj8IK7wyEiUx4XslkYK2HhFzt94KLCDQbeIsmyN1ZxhjI1dHl23XeNo7f5zuBPfqtR3ii379JVP8Ck1ICuX5Vyl-Z3DaX4z6oUW1JpxGybzIIZr5CY7Iu7-m9iPIZonIRIRp0jk-sM3Vq3ZTNw6rG-WEM_EvhvZTBMvoqcnRdo4cFa-sfyxwSRsz9P29cHkITKalA8YkPGRNsvwM8",
    price: 750,
    title: "غرفة",
    rating: 4.4,
    tags: [{ label: "يوجد مطبخ"}],
    isFavorite: false,
  },
];

const HOME_CARD_DATA = [
    {
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGtXvOYhFUYfKAwHdaBKLt33FPToAuFyDN3TUoLNjWsrWsCVKF4mwr_8gXiuAE7mc2CgMUbbghOctz4SXeZbIJFOzlQxHp1inNzWOSxBtFjOrMdMVo4Rx2tf08q6NRwZeDcJUUSukcIjeIa4T2ZpM3ALlkvy-9S6XM4xrUYvXLMrCDHZ05RbUmj2Ag42qCDk0hi8XFM285q3gAURTSH8USPBEgwGhSZTZK6awQhnorrouU3AFpB7AObEpPA_mV8Ji6b3DbUbN8mZo",
        price: "$850",
        rating: "4.9",
        title: "سكن حديث",
        features: [
            { text: "موقف سيارات" },
            { text: "واي فاي" }
        ]
    },
    {
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuC__iELnUHAvVuOyN-o3TEinS7pDROzqhGvszpZcB_WyWCVKiCp3mdKSBON8fqM7LIZIgOUFMYaSoIbpOvk8FJyWDmlgi8pgh7g4J3dGco2LDgQnwY1noxkbAOgDlHh_ih3TN9_NBIZ13gytK6HehrkADM8q3ELVFrGIK7C6J_EOoTIcTPDZwggp6RM5e_7wZtiJuNv_zdv5spNHNgJdPQXX4UeLixtmNgyJ9Z9E__ZLuHYjxUugJNQNDjRR0WnLkH-IiqfiQtpoow",
        price: "$1,100",
        rating: "4.8",
        title: "سكن طلابي مريح",
        features: [
            {  text: "مفروش بالكامل" },
            {  text: "يوجد مطبخ" }
        ]
    },
    {
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9kNfoKc_ajJnt-Yfto8nOptfG437n8EXRBtE0xCr4Hd3F52ssHXFz2jn1S8swHyzILbc0TaFeYZu9-y1lpiemh5T1cZoGNPqiP77IPjac70woZMmPatmtimqiYxEzRdWLEROBbIZvmugpTzhmzy6ImWk25dEfLE0aqOkr0TWTEsIOfMs-i59YccaJ00tQrQHlEUyYF8KQS4dtKZf_-jTCiRvaGtppfaUP4oUrYULjWqkIfb-ZkDMjcunaE_HumyPidD5Fp3jjNdk",
        price: "$650",
        rating: "4.7",
        title: "سكن قريب من الجامعة",
        features: [
            {  text: "تكييف مركزي" }
        ]
    }
];

const OFFER_DETAILS_DATA = {
  title: "منزل حديث بـ 4 غرف نوم بالقرب من الجامعة",
  address: "123 شارع الكلية، مدينة الجامعة",
  rating: 4.9,
  reviews: 24,
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAHIf3HHihS1xCGrt4sWER7Mczyj_HF3qJGeZGJl2sTHFlAZYoUP0rdUO1BmrptW7qLytANGzb79CgKXjLIuGQwDzUbbf4-JF-YY24KoMcGkSD0m8DQoCjD4aqQ1pimduMXxgb4apmQG0uq_1Okjtz_lJCR8PgdGPqJfs27KqulpIml_Fxs3d_3MpgfgHdGWJTPO72vNziYQJ3CO3AKWh8gq0Aog3xu8TVp0mH0VqqV84a1e20m1-1z5AgQOQapIvzKPDMT822qVGI",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDVqQjhxy-yIyViNu0qcKrCwjL1cJujWdNBAAEVpjoZD3GCREYbP_5ZLq6YIcdNeN6cKQWZ9wVCF1702szlxZolDQz6rGXHsLYPYU-mylRJhORdYBAO6wUZbLJXJUMPpxkmnbqJpKNCjmvwc22G4PtdrJf2ruQkOJmlTEs9nOW-YcT4mVIHVjP46s8Ck_oyeTTwmgWLIYsRvo7LeqjrvS2MunLklWr1SQ3Oor5jCp4YUuiSnflRc9Xw6TecnkeCfDnyWK9PBd4Hu1w",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAXIT9PB1QA3ZqZHchyJcPl-ZNIKFYv7wvoz0RMHcF65qwH9-wV-2-6yN5IqLNgJ-sl7l5qwHXYSVNFY9HZfz-KH5gjYsQXV7y8CbwcVEoUhirzgESltyjmeTYMHj-8I3jjkKRe0hw0w0m4WN16cGbo5vhR_AGiEaUdOHfiSqb6b75mHCT0zrHRJLnIsGzV46epD-OUFBJdi7iT8IcUjgbddbx4bYe25CbTWOAzHiV-wLyVhn_BsF_assZj69lxb6iqD8OVnM_AjQU",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCzDNkiWFbgpXkAJPlcYjS6IJOTyxZK0mBaXgThZqLotBRJKVlBX6jnkyC7zMm7werVNSXCXbdTzmI83MktwgdCX32i9gDaz4XjILvzWe834jQq1G6tQtBc0it850fb9hs8qFpy9fwhQBirKL9zC8vSxYNi4XQxENPMkCl0kXtczyLqlg0TsZ939bSTSl94ejJCSgToBW7TrELz9s-AY2k9P8iBaZCGHnrg9q1BF5hTNOyYQHV4Mo-FMp3FLk44bTAiNY1SSV-g0Ng",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDsj_zBciL04g8N06xUKiEK95BrwM0vtqSoROFF9xp-VRRB3ugl1xSmd1sdvle3SW7co3a7dGK8RhPWTqMzzD60gHE6p8oNOauYZCU_T7MGAQTEra-63ze0Vp0VWO2zpMGhl_3QWICeyu05pT_QrN0tHtWcjdlEZ81Zcqc86UE-ZBZ79O16-dadP_4n6T2ptap4h9WHjPCGHTpCO-pJ35zbs-S06sQj7C06nHFKfZXxoOtmCOa3Z7x-nGrjWKfbrGjOANHirRxzTWU",
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  description: [
    "منزل واسع ومفروش بالكامل بـ 4 غرف نوم يقع على بعد 10 دقائق فقط سيراً على الأقدام من الحرم الجامعي. مثالي لمجموعة من الطلاب الذين يبحثون عن مساحة معيشة مريحة ومناسبة. يتميز العقار بغرفة معيشة كبيرة مثالية لمجموعات الدراسة أو ليالي الأفلام، ومطبخ حديث مع أجهزة حديثة من الستانلس ستيل (بما في ذلك غسالة أطباق)، وغسالة ومجفف داخل الوحدة.",
    "جميع المرافق، بما في ذلك الإنترنت بالألياف الضوئية عالي السرعة، مشمولة في الإيجار. يتوفر موقف سيارات بعيداً عن الشارع لسيارتين. الفناء الخلفي مسور ويتضمن منطقة جلوس صغيرة.",
  ],
  amenities: [
    "واي فاي عالي السرعة",
    "تكييف مركزي",
    "مفروش بالكامل",
    "غسالة/مجفف داخل الوحدة",
    "مطبخ حديث",
    "موقف سيارات",
    "فناء/شرفة",
    "صديق للحيوانات الأليفة",
  ],
  reviewsData: [
    {
      author: "أحمد محمد",
      date: "منذ يومين",
      rating: 5,
      comment:
        "المكان رائع جداً وقريب من الجامعة. سارة كانت متعاونة للغاية في تسهيل إجراءات الانتقال.",
    },
    {
      author: "ليلى علي",
      date: "منذ أسبوع",
      rating: 4,
      comment:
        "تجربة سكن ممتازة، البيت نظيف والإنترنت سريع جداً كما هو موضح في الوصف.",
    },
  ],
};

export { NAV_LINKS, AUTH_TEXT, ERROR_MESSAGES, OFFERS_DATA , HOME_CARD_DATA, FEATURED_OFFERS_TEXT, HERO_SECTION_TEXT, HOME_CARD_TEXT, SEARCH_INPUT_TEXT, BOOKING_CARD_TEXT, BOOKING_CONFIRMATION_POPUP_TEXT, LANDLORD_PROFILE_CARD_TEXT, OFFER_DETAILS_DATA, OFFER_DETAILS_TEXT, REVIEW_POPUP_TEXT, FILTER_SIDEBAR_TEXT, OFFERS_PAGE_TEXT, OFFER_CARD_TEXT }