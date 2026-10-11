import { whatsappLink } from '@/lib/site'
import type { ProductTagKey } from '@/lib/site'
import type { Dictionary } from '@/lib/i18n/dictionaries/types'

/**
 * Arabic dictionary.
 *
 * Typed as `Dictionary`, which is derived from the French source of truth, so a
 * missing or misspelled key fails the type check. Brand and product names that
 * are internationally established (NOUR EL OUD, Sheikh Zayed Oud, Yara…) keep
 * their Latin form on the product data and are transliterated only where the
 * copy reads better in Arabic script.
 */
export const ar: Dictionary = {
  meta: {
    title: 'نور العود | عطور استثنائية',
    description:
      'دار نور العود تصنع عطوراً شرقية استثنائية. عود وعنبر ومسك تُنتقى بعناية في المغرب. توصيل إلى جميع مدن المغرب، والدفع عند الاستلام.',
    keywords: ['عطور العود', 'عطور عربية', 'عطور فاخرة', 'عنبر ومسك', 'نور العود'],
  },

  announcement: 'توصيل مجاني ابتداءً من 500 درهم · الدفع عند الاستلام',

  brand: {
    tagline: 'عطور استثنائية',
    origin: 'صُنع في المغرب',
  },

  nav: {
    ariaPrimary: 'التنقّل الرئيسي',
    ariaMobile: 'التنقّل على الهاتف',
    menuOpen: 'فتح القائمة',
    menuClose: 'إغلاق القائمة',
    newsCta: 'توصّل بأحدث إصداراتنا',
    items: {
      home: 'الرئيسية',
      oriental: 'العربية والعود',
      designer: 'الماركات',
      collections: 'المجموعات',
      men: 'رجالي',
      women: 'نسائي',
      about: 'عن الدار',
    },
  },

  header: {
    searchAria: 'بحث',
    searchLabel: 'ابحث عن عطر',
    searchPlaceholder: 'ابحث عن عطر أو نوتة عطرية أو عائلة…',
    cartAria: (count: number) =>
      `فتح السلة، ${count} ${count === 1 ? 'منتج' : 'منتجات'}`,
    languageLabel: 'اللغة',
    languageAria: 'اختيار اللغة',
  },

  hero: {
    eyebrow: 'دار عطور · الدار البيضاء',
    titleLine1: 'جوهر',
    titleLine2: 'الأناقة.',
    subtitle: 'اكتشف مجموعة عطور صُمّمت لتكشف عن توقيعك الخاص.',
    ctaPrimary: 'اكتشف المجموعة',
    ctaSecondary: 'شاهد الجديد',
    editionLabel: 'إصدار مميّز',
    editionName: 'عود رويال',
    scrollAria: 'اكتشف الدار',
    imageAlt: 'قارورة عطر نور العود محاطة بأخشاب نفيسة',
  },

  collection: {
    eyebrow: 'مجموعتنا',
    titleLead: 'اعثر على',
    titleEm: 'توقيعك',
    subtitle: 'كل قارورة تُركَّب من مواد أولية نفيسة، تُنتقى وتُجمَّع في المغرب.',
    genderAria: 'تصفية حسب الجنس',
    familyAria: 'تصفية حسب العائلة العطرية',
    results: (count: number, query?: string) => {
      const noun = count === 1 ? 'عطر' : 'عطور'
      return query ? `${count} ${noun} لـ « ${query} »` : `${count} ${noun}`
    },
    emptyTitle: 'لا يوجد عطر مطابق',
    emptyText: 'جرّب كلمة أخرى، أو امسح عوامل التصفية لتصفّح المجموعة كاملة.',
    reset: 'إعادة ضبط التصفية',
  },

  story: {
    eyebrow: 'فنّ العطر',
    titleLead: 'العطر لا يُلبَس، بل',
    titleEm: 'يُتعرَّف به',
    paragraphs: [
      'وُلدت نور العود من قناعة بسيطة: العطر الجيّد لا يُلاحَظ، بل يبقى في الذاكرة. يرافق من يلبسه ويكشف عمّا لا يقوله.',
      'من عود ميسور المدخّن إلى المسك الأبيض الكشميري، تُبنى كل تركيبة حول مادة نفيسة، موزونة لتبقى على البشرة من الصباح حتى الليل.',
    ],
    pillars: [
      {
        number: '01',
        title: 'مواد أولية نفيسة',
        text: 'يُنتقى عود ميسور والعنبر الدافئ والمسك الأبيض من منتجين شركاء، دون أي إعادة تركيب.',
      },
      {
        number: '02',
        title: 'طقس على المقاس',
        text: 'تحتاج مساعدة في الاختيار؟ فريقنا يرشدك عبر واتساب، بكل بساطة ودون أي التزام.',
      },
      {
        number: '03',
        title: 'تُجمَّع في المغرب',
        text: 'تُنهى قواريرنا وتُراقَب في الدار البيضاء، ثم تضمنها الدار مدى الحياة.',
      },
    ],
    cta: 'تحدّث إلى مستشار',
    imageAlt: 'قارورة مخصوص عود، القطعة المميّزة لدار نور العود',
  },

  categories: {
    eyebrow: 'استكشف',
    title: 'حسب العائلة',
    subtitle: 'لكل عائلة عطرية مزاجها الخاص. اعثر على مزاجك.',
    comingSoon: 'قريباً',
    viewCollection: 'شاهد المجموعة',
    items: {
      homme: {
        eyebrow: 'له',
        name: 'عطور رجالية',
        description:
          'عود مدخّن وعنبر غني وجلد. تركيبات رصينة لحضور لا ينتظر تأكيداً.',
      },
      femme: {
        eyebrow: 'لها',
        name: 'عطور نسائية',
        description:
          'ورد دمشقي وعنبر دافئ ومسك أبيض. زهور دافئة تدوم حتى آخر الليل.',
      },
      oud: {
        eyebrow: 'ملك العطور',
        name: 'العود',
        description:
          'خشب العود المدخّن، أعمق عائلات الدار وأكثرها ثباتاً. توقيعنا الخاص.',
      },
      unisex: {
        eyebrow: 'قريباً',
        name: 'للجنسين',
        description:
          'تركيبات مشتركة، مصمّمة ألا تنتمي لأحد بعينه. الافتتاح قريباً.',
      },
      coffrets: {
        eyebrow: 'قريباً',
        name: 'علب الهدايا',
        description:
          'علب اكتشاف وإصدارات هدايا، تُجمَّع يدوياً في الدار البيضاء. قريباً.',
      },
    },
  },

  /** عالَما الدار: بطاقتان كبيرتان في الرئيسية ومقدّمة كل صفحة قسم. */
  univers: {
    eyebrow: 'عالمَينا',
    title: 'عالَمان، ومعيار واحد',
    subtitle:
      'من عود الدار وأعنبرتها إلى التوقيعات العالمية الكبرى: اختر العالم الذي يشبهك.',
    discover: 'اكتشف',
    items: {
      orientaux: {
        eyebrow: 'الشرق · العود · العنبر',
        name: 'العطور العربية والعود',
        tagline: 'عود وعنبر ومسك وتركيبات عربية، منتقاة لثباتها.',
        description:
          'عود وعنبر ومسك وتركيبات عربية: العطور التي تصنع توقيع الدار. من الأخشاب المدخّنة إلى الأعنبرة المشرقة، كل قارورة منتقاة لثباتها ونُبلها.',
        metaTitle: 'العطور العربية والعود | نور العود',
        metaDescription:
          'اكتشف مجموعة العطور العربية والعود: عود وعنبر ومسك وتركيبات عربية. توصيل إلى جميع مدن المغرب والدفع عند الاستلام.',
      },
      marques: {
        eyebrow: 'ماركات عالمية',
        name: 'عطور الماركات والعطور الأخرى',
        tagline: 'برادا وأفنان 9PM ونايت بلو وغيرها من التوقيعات المعاصرة.',
        description:
          'برادا وأفنان 9PM ونايت بلو وغيرها من التوقيعات العالمية المعاصرة. هذه المراجع قيد التوفير: ننشرها بمجرد تأكيد السعر والتوفّر من مورّدينا.',
        metaTitle: 'عطور الماركات والعطور الأخرى | نور العود',
        metaDescription:
          'برادا وأفنان 9PM ونايت بلو وتوقيعات معاصرة أخرى لدى نور العود. استفسروا عن التوفّر والسعر عبر واتساب.',
      },
    },
  },

  /** نصوص خاصة بصفحات الأقسام. */
  category: {
    eyebrow: 'قسم',
    breadcrumbHome: 'الرئيسية',
    backToCollection: 'شاهد كل المجموعة',
    upcoming: {
      eyebrow: 'قريباً',
      title: 'مراجع قيد التأكيد',
      badge: 'معلومات قيد التأكيد',
      priceOnRequest: 'السعر عند الطلب',
      note:
        'نعمل حالياً على توفير هذه العطور. سننشر السعر والحجم والتوفّر بمجرد تأكيدها من مورّدينا. راسلونا لمعرفة المزيد.',
      inquire: 'استفسر',
    },
  },

  bestsellers: {
    eyebrow: 'الأكثر طلباً',
    title: 'الأكثر مبيعاً',
    cta: 'شاهد كل المجموعة',
  },

  promo: {
    eyebrow: 'إصدار محدود',
    title: 'عود رويال',
    description: 'مجموعة مختارة من أفضل ستة عطور عود لدينا، بسعر إطلاق لفترة محدودة.',
    details: [
      'توصيل مجاني ابتداءً من 500 درهم',
      'الدفع عند الاستلام',
      'قوارير 50 مل مضمونة',
    ],
    cta: 'اغتنم العرض',
    codeLabel: 'الرمز',
    imageAlt: 'قارورة عود أمبر نوار، إصدار محدود',
  },

  why: {
    eyebrow: 'لماذا نور العود',
    title: 'تجربة شراء بكل بساطة',
    items: {
      delivery: {
        title: 'توصيل إلى كل المغرب',
        description:
          'الإرسال إلى جميع مدن المغرب خلال 24 إلى 48 ساعة عمل، مع تتبّع الطلب عبر واتساب.',
      },
      payment: {
        title: 'الدفع عند الاستلام',
        description:
          'لا تدفع إلا عندما تصلك طلبك بين يديك. دون أي دفعة مقدّمة.',
      },
      selection: {
        title: 'منتجات منتقاة بعناية',
        description:
          'قوارير مُنهَاة ومراقَبة. جميع منتجاتنا مضمونة من الدار مدى الحياة.',
      },
      service: {
        title: 'خدمة العملاء',
        description:
          'فريق في الدار البيضاء يساعدك على اختيار العطر الذي يشبهك حقاً.',
      },
    },
  },

  testimonials: {
    eyebrow: 'يثقون بنا',
    title: 'شهادات العملاء',
    reviews: (count: number) => `${count} تقييماً موثّقاً`,
    ratingAria: (rating: number) => `التقييم: ${rating} من 5`,
    noticeTitle: 'محتوى مؤقّت',
    noticeText:
      'الشهادات أدناه نماذج توضيحية وليست تقييمات عملاء حقيقيين. يجب استبدالها بتقييمات موثّقة ومصرّح بها قبل الإطلاق.',
    items: {
      salma: {
        quote:
          'عطر شيخ زايد عود رائع بمعنى الكلمة. أهديته لأخي في زفافه ولم يتوقّف عن الحديث عنه.',
        name: 'سلمى ب.',
        city: 'الدار البيضاء',
      },
      youssef: {
        quote:
          'طلبت يوم الثلاثاء ووصلني يوم الأربعاء. القارورة ثقيلة والجودة حاضرة. خدمة ممتازة.',
        name: 'يوسف أ.',
        city: 'الرباط',
      },
      nadia: {
        quote:
          'كنت متردّدة بين العود والعنبر. نصحوني بعطر يارا عبر واتساب، وكان تماماً ما أبحث عنه.',
        name: 'نادية إ.',
        city: 'مراكش',
      },
    },
  },

  newsletter: {
    eyebrow: 'النشرة',
    title: 'ابقَ على اطلاع',
    subtitle:
      'أحدث التركيبات والإصدارات المحدودة ونصائح الدار، مباشرةً عبر واتساب.',
    emailLabel: 'بريدك الإلكتروني',
    emailPlaceholder: 'email@example.com',
    submit: 'اشترك',
    note: 'يتم الاشتراك عبر واتساب — لا يُخزَّن أي بريد إلكتروني.',
  },

  footer: {
    about:
      'دار عطور مغربية. عود وعنبر ومسك تُنتقى وتُجمَّع في الدار البيضاء.',
    columns: [
      {
        title: 'المجموعات',
        links: [
          { label: 'العطور العربية والعود', href: '/categories/parfums-orientaux-oud' },
          { label: 'عطور الماركات والعطور الأخرى', href: '/categories/parfums-de-marque' },
          { label: 'جميع العطور', href: '#collection' },
          { label: 'عطور رجالية', href: '#collection?genre=Homme' },
          { label: 'عطور نسائية', href: '#collection?genre=Femme' },
          { label: 'الأكثر مبيعاً', href: '#bestsellers' },
        ],
      },
      {
        title: 'الدار',
        links: [
          { label: 'عن الدار', href: '#histoire' },
          { label: 'قصتنا', href: '#histoire' },
          { label: 'خدمة العملاء', href: '#avantages' },
          { label: 'اتصل بنا', href: '#contact' },
        ],
      },
    ],
    contactTitle: 'تواصل',
    location: 'الدار البيضاء، المغرب',
    hours: 'الإثنين – السبت · 9:00 – 19:00',
    writeUs: 'راسلنا',
    copyright: (year: number) => `© ${year} نور العود. جميع الحقوق محفوظة.`,
    terms: 'الشروط',
    privacy: 'الخصوصية',
  },

  cart: {
    eyebrow: 'اختيارك',
    title: 'السلة',
    closeAria: 'إغلاق السلة',
    dialogAria: 'السلة',
    emptyTitle: 'سلتك فارغة',
    emptyText: 'تصفّح المجموعة وأضف عطورك المفضّلة.',
    browse: 'اكتشف المجموعة',
    remainingPrefix: 'باقي',
    remainingSuffix: 'للحصول على توصيل مجاني',
    freeShippingUnlocked: 'تم تأمين التوصيل المجاني',
    decreaseAria: (name: string) => `إنقاص كمية ${name}`,
    increaseAria: (name: string) => `زيادة كمية ${name}`,
    remove: 'إزالة',
    imageAlt: (name: string) => `عطر ${name}`,
    subtotal: 'المجموع الفرعي',
    shippingNote: 'تُحتسب تكاليف التوصيل عند تأكيد الطلب.',
    checkout: 'اطلب عبر واتساب',
  },

  quickview: {
    closeAria: 'إغلاق التفاصيل',
    notesLabel: 'النوتات العطرية',
    concentrationLabel: 'التركيز',
    concentrationValue: 'أو دو بارفان · 50 مل',
    reviewCount: (count: number) => `${count} تقييماً`,
    addToCart: 'أضف إلى السلة',
    added: 'أُضيف إلى السلة',
    viewCart: 'عرض السلة',
    orderWhatsApp: 'اطلب عبر واتساب',
    imageAlt: (name: string) => `قارورة عطر ${name}`,
  },

  product: {
    viewAria: (name: string) => `عرض عطر ${name}`,
    imageAlt: (name: string) => `قارورة عطر ${name}`,
    addAria: (name: string) => `أضف ${name} إلى السلة`,
    add: 'أضف',
    added: 'أُضيف',
    details: 'التفاصيل',
  },

  filters: {
    gender: {
      Tous: 'الكل',
      Homme: 'رجالي',
      Femme: 'نسائي',
    },
    family: {
      Toutes: 'كل العائلات',
      Oud: 'العود',
      Ambre: 'العنبر',
      Musc: 'المسك',
      Floral: 'زهري',
    },
  },

  tags: {
    Bestseller: 'الأكثر مبيعاً',
    Signature: 'توقيعنا',
    Doux: 'ناعم',
    Exclusif: 'حصري',
    Intense: 'قوي',
    Clean: 'نقي',
    'Coup de cœur': 'المفضّل',
    Frais: 'منعش',
    Premium: 'فاخر',
    Nouveau: 'جديد',
    Élégant: 'أنيق',
    Mystère: 'غموض',
    Classique: 'كلاسيكي',
    Prestige: 'راقٍ',
    Puissant: 'جسور',
  } satisfies Record<ProductTagKey, string>,

  notFound: {
    eyebrow: 'خطأ 404',
    title: 'الصفحة غير موجودة',
    text: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
    cta: 'العودة إلى الرئيسية',
  },

  wa: {
    order: (productName: string) =>
      whatsappLink(
        `السلام عليكم، أرغب في طلب ${productName}. أرجو تأكيد التوفّر والتوصيل.`,
      ),
    cart: (lines: { name: string; quantity: number; price: number }[]) => {
      const total = lines.reduce((sum, line) => sum + line.price * line.quantity, 0)
      const detail = lines
        .map((line) => `• ${line.name} ×${line.quantity} — ${line.price * line.quantity} DH`)
        .join('\n')
      return whatsappLink(
        `السلام عليكم، أرغب في طلب ما يلي :\n${detail}\n\nالمجموع : ${total} DH\nأرجو تأكيد التوفّر والتوصيل.`,
      )
    },
    newsletter: (email: string) =>
      whatsappLink(
        `السلام عليكم، أرغب في الاشتراك في النشرة البريدية لدار نور العود.\n\nبريدي الإلكتروني : ${email.trim()}`,
      ),
    inquire: (productName: string) =>
      whatsappLink(
        `السلام عليكم، أرغب في معلومات عن ${productName}: السعر والحجم والتوفّر.`,
      ),
    advice: whatsappLink('السلام عليكم، أرغب في نصيحة لاختيار عطر.'),
    question: whatsappLink('السلام عليكم نور العود، لديّ سؤال.'),
    info: whatsappLink('السلام عليكم نور العود، أرغب في مزيد من المعلومات.'),
  },
}
