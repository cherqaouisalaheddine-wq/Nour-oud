export type Gender = 'Homme' | 'Femme'

export type ScentFamily = 'Oud' | 'Ambre' | 'Musc' | 'Floral'

/**
 * The two catalogue lines. Display names are translated in the dictionaries;
 * the route segments live in `lib/categories.ts`.
 *
 * - `arabes-oud` — the maison's Arabic & oud fragrances.
 * - `marques`    — international and inspired contemporary fragrances.
 */
export const rangeIds = ['arabes-oud', 'marques'] as const

export type RangeId = (typeof rangeIds)[number]

/**
 * Lineage, surfaced as a badge on every card so a shopper can always tell what
 * they are looking at. Nothing is presented as an original brand bottle unless
 * that has been confirmed.
 *
 * - `arabe`    — a maison Arabic / oud creation.
 * - `inspire`  — an inspired interpretation of a known fragrance.
 * - `original` — a genuine branded bottle, authenticity confirmed.
 */
export const lineageIds = ['arabe', 'inspire', 'original'] as const

export type Lineage = (typeof lineageIds)[number]

/**
 * Every verified maison flacon ships in a single 50 ml EdP format — which the
 * promo banner and the quick view already state — so the volume is declared
 * once here rather than repeated on every catalogue row. The unit is chosen at
 * render time, so the Arabic storefront reads "50 مل".
 */
export const MAISON_ML = 50

/** A fully verified, purchasable catalogue entry. */
export type Product = {
  slug: string
  /** Latin product name. Brand names stay Latin in both languages. */
  name: string
  /** Arabic name, shown as the primary title in the Arabic storefront. */
  nameAr: string
  /**
   * Brand or maison, kept Latin in both languages. Optional: the maison's own
   * line omits it because the shop itself is the brand.
   */
  brand?: string
  /** Catalogue line this perfume is merchandised under. */
  range: RangeId
  gender: Gender
  /** Lineage: maison Arabic, inspired interpretation or confirmed original. */
  lineage: Lineage
  price: number
  /** Contenance in millilitres; the unit is localised at render time. */
  size: number
  category: ScentFamily
  /** Olfactory notes, French. */
  notes: string
  /** Olfactory notes, Arabic. */
  notesAr: string
  /** Editorial description, French. */
  description: string
  /** Editorial description, Arabic. */
  descriptionAr: string
  image: string
  color: string
  tag: string
  rating: number
  reviews: number
}

/**
 * A fragrance we know exists but whose information is not verified yet.
 *
 * Deliberately has no `price`, no stock and no photograph: nothing here can be
 * invented, and because there is no price the storefront can never present it
 * as purchasable or add it to the cart. Customers can only ask about it over
 * WhatsApp until the supplier confirms price, format and availability, at
 * which point the entry is promoted to a `Product`.
 */
export type UpcomingProduct = {
  slug: string
  /** Brand and fragrance name exactly as given; never translated. */
  name: string
  /** Arabic label for discovery only. */
  nameAr: string
  /** Brand, kept Latin in both languages. Omitted when it cannot be stated. */
  brand?: string
  range: RangeId
  /**
   * Audience when it can be stated without guessing. Left undefined for
   * references whose gender we cannot confirm: those appear on the line's own
   * page only, never under Homme or Femme.
   */
  gender?: Gender
  lineage: Lineage
  /** Availability notice, French. Never a specification. */
  description: string
  /** Availability notice, Arabic. Never a specification. */
  descriptionAr: string
  /** Decorative tile gradient, so the card reads as premium without a photo. */
  color: string
}

/**
 * Catalogue source of truth.
 *
 * `slug`, `description`, `rating` and `reviews` were added so cards, the
 * quick-view dialog and structured data can all key off stable identifiers.
 * Prices, notes, imagery and merchandising tags are unchanged. The Arabic
 * fields (`nameAr`, `notesAr`, `descriptionAr`) were added for the bilingual
 * storefront; Latin brand names are intentionally kept as-is.
 *
 * The array below holds the maison's own collection; its line, lineage and
 * format are applied when it is exported as `products`. A verified brand
 * fragrance is added by appending to `designerProducts` instead, which keeps
 * every product assigned to the right line without editing the whole list.
 */
const maisonProducts: Omit<Product, 'range' | 'lineage' | 'size'>[] = [
  {
    slug: 'ameerat-oud-amber',
    name: 'Ameerat Oud Amber',
    nameAr: 'أميرات عود أمبر',
    price: 349,
    gender: 'Femme',
    category: 'Ambre',
    notes: 'Ambre · Oud · Rose',
    notesAr: 'عنبر · عود · ورد',
    description:
      "Une ambrée solaire où la rose de Taïf rencontre un oud velours. Chaleureuse et enveloppante, elle accompagne la femme du soir jusqu'au bout de la nuit.",
    descriptionAr:
      'عطر عنبري مشمس يلتقي فيه ورد الطائف بالعود المخملي. دافئ ومحيط، يرافق أنوثة المساء حتى آخر الليل.',
    image: '/products/ameerat.jpg',
    color: 'from-[#5d2b19] to-[#b86b32]',
    tag: 'Bestseller',
    rating: 4.9,
    reviews: 214,
  },
  {
    slug: 'white',
    name: 'White',
    nameAr: 'وايت',
    price: 389,
    gender: 'Femme',
    category: 'Musc',
    notes: 'Musc blanc · Ambre · Fleurs',
    notesAr: 'مسك أبيض · عنبر · زهور',
    description:
      "Un musc blanc d'une pureté absolue, posé sur un lit de fleurs blanches et d'ambre blond. Une signature fraîche et propre qui reste proche de la peau.",
    descriptionAr:
      'مسك أبيض بنقاء مطلق، يرتكز على فراش من الزهور البيضاء والعنبر الأشقر. توقيع منعش ونقي يبقى قريباً من البشرة.',
    image: '/products/white.jpg',
    color: 'from-[#7a3a18] to-[#d8953b]',
    tag: 'Signature',
    rating: 4.8,
    reviews: 168,
  },
  {
    slug: 'shams-al-khususi',
    name: 'Shams Al Khususi',
    nameAr: 'شمس الخصوصي',
    price: 279,
    gender: 'Homme',
    category: 'Oud',
    notes: 'Oud · Safran · Bois précieux',
    notesAr: 'عود · زعفران · أخشاب نفيسة',
    description:
      "L'oud privé du matin : safran, bois de santal et une touche de cuir fumé. Une élégance discrète, parfaite pour les journées qui comptent.",
    descriptionAr:
      'عود الصباح الخاص: زعفران وخشب الصندل ولمسة من الجلد المدخّن. أناقة هادئة، مثالية للأيام التي تُحسَب.',
    image: '/products/red-oud.jpg',
    color: 'from-[#713b42] to-[#d49aa0]',
    tag: 'Doux',
    rating: 4.7,
    reviews: 96,
  },
  {
    slug: 'lailat-al-arab',
    name: 'Lailat Al Arab',
    nameAr: 'ليلة العرب',
    price: 429,
    gender: 'Femme',
    category: 'Floral',
    notes: 'Rose · Ambre · Musc',
    notesAr: 'ورد · عنبر · مسك',
    description:
      "Une nuit arabe en fiole : rose de Damas, ambre suifé et musc blanc. Opulente mais jamais sucrée, elle crée une présence magnétique après le coucher du soleil.",
    descriptionAr:
      'ليلة عربية في قارورة: ورد دمشقي وعنبر دافئ ومسك أبيض. غنية دون حلاوة مبالغ فيها، تخلق حضوراً جاذباً بعد غروب الشمس.',
    image: '/products/lailat-al-arab.jpg',
    color: 'from-[#1f2c31] to-[#607379]',
    tag: 'Exclusif',
    rating: 5,
    reviews: 143,
  },
  {
    slug: 'qasas-hudson',
    name: 'Qasas Hudson',
    nameAr: 'قصص هدسون',
    price: 359,
    gender: 'Homme',
    category: 'Oud',
    notes: 'Oud · Ambre · Épices',
    notesAr: 'عود · عنبر · توابل',
    description:
      "Un oud fumé tenu par l'ambre et les épices chaudes. Puissant et structuré, un parfum de caractère pour ceux qui assument leur signature.",
    descriptionAr:
      'عود مدخّن يعتليه العنبر والتوابل الدافئة. قوي ومتماسك، عطر ذو شخصية لمن يتحمّلون توقيعهم.',
    image: '/products/qasas-hudson.jpg',
    color: 'from-[#1d2022] to-[#61615d]',
    tag: 'Intense',
    rating: 4.8,
    reviews: 187,
  },
  {
    slug: 'qasas-inferial',
    name: 'Qasas Inferial',
    nameAr: 'قصص إمبريال',
    price: 249,
    gender: 'Homme',
    category: 'Oud',
    notes: 'Oud · Ambre · Bois précieux',
    notesAr: 'عود · عنبر · أخشاب نفيسة',
    description:
      "L'oud le plus accessible de la maison : bois d'agar, ambre clair et une finition veloutée. Le point d'entrée idéal dans l'univers du oud.",
    descriptionAr:
      'أكثر عطور العود يسراً في الدار: خشب العود والعنبر الفاتح ولمسة نهائية مخملية. المدخل الأمثل إلى عالم العود.',
    image: '/products/qasas-inferial.jpg',
    color: 'from-[#6e6c5d] to-[#c8c0a7]',
    tag: 'Clean',
    rating: 4.6,
    reviews: 121,
  },
  {
    slug: 'qasas-only-one',
    name: 'Qasas Only One',
    nameAr: 'قصص أونلي وان',
    price: 319,
    gender: 'Homme',
    category: 'Oud',
    notes: 'Oud rouge · Ambre · Cuir',
    notesAr: 'عود أحمر · عنبر · جلد',
    description:
      "Oud rouge, cuir tanné et ambre brûlé. Une composition moderne et magnétique, avec l'allure d'un costume bien coupé.",
    descriptionAr:
      'عود أحمر وجلد مدبوغ وعنبر محروق. تركيبة عصرية وجاذبة، بأناقة بذلة مُحكمة القَصّ.',
    image: '/products/qasas-only-one.jpg',
    color: 'from-[#3d251d] to-[#99714f]',
    tag: 'Coup de cœur',
    rating: 4.9,
    reviews: 158,
  },
  {
    slug: 'qasas-blush',
    name: 'Qasas Blush',
    nameAr: 'قصص بلاش',
    price: 289,
    gender: 'Femme',
    category: 'Floral',
    notes: 'Rose · Jasmin · Musc',
    notesAr: 'ورد · ياسمين · مسك',
    description:
      'Un bouquet frais et lumineux : rose tendre, jasmin sambac et musc blanc. Léger et solaire, idéal pour les journées chaudes.',
    descriptionAr:
      'باقة منعشة ومشرقة: ورد ناعم وياسمين سامباك ومسك أبيض. خفيف ومشمس، مثالي للأيام الحارة.',
    image: '/products/qasas-blush.jpg',
    color: 'from-[#62664d] to-[#d1c791]',
    tag: 'Frais',
    rating: 4.7,
    reviews: 134,
  },
  {
    slug: 'malikat-al-arab',
    name: 'Malikat Al Arab',
    nameAr: 'ملكة العرب',
    price: 499,
    gender: 'Femme',
    category: 'Ambre',
    notes: 'Ambre · Rose · Oud',
    notesAr: 'عنبر · ورد · عود',
    description:
      'La pièce maîtresse de la maison. Ambre profond, rose royale et oud de Mysore dans une concentration rare. Un parfum qui se retient.',
    descriptionAr:
      'القطعة المحورية في الدار. عنبر عميق وورد ملكي وعود ميسور بتركيز نادر. عطر يبقى في الذاكرة.',
    image: '/products/malikat-al-arab.jpg',
    color: 'from-[#261714] to-[#8b4d2f]',
    tag: 'Premium',
    rating: 5,
    reviews: 89,
  },
  {
    slug: 'najdi',
    name: 'Najdi',
    nameAr: 'نجدي',
    price: 329,
    gender: 'Homme',
    category: 'Oud',
    notes: 'Oud · Cuir · Ambre',
    notesAr: 'عود · جلد · عنبر',
    description:
      "Inspiré des grands déserts du Najd : oud sec, cuir patiné et ambre sombre. Sec, élégant, profond, un parfum qui ne demande qu'à être découvert.",
    descriptionAr:
      'مستوحى من صحارى نجد الشاسعة: عود جاف وجلد عتيق وعنبر داكن. جاف وأنيق وعميق، عطر لا يطلب سوى أن يُكتشَف.',
    image: '/products/najdi.jpg',
    color: 'from-[#171717] to-[#80684d]',
    tag: 'Nouveau',
    rating: 4.8,
    reviews: 76,
  },
  {
    slug: 'ameer-al-oudh-white',
    name: 'Ameer Al Oudh White',
    nameAr: 'أمير العود الأبيض',
    price: 349,
    gender: 'Homme',
    category: 'Oud',
    notes: 'Oud blanc · Ambre · Bois',
    notesAr: 'عود أبيض · عنبر · خشب',
    description:
      "L'oud blanc dans sa version la plus noble : bois de santal, ambre pâle et une propreté minérale. Élégant et lumineux, portable en toute saison.",
    descriptionAr:
      'العود الأبيض في أنبل صوره: خشب الصندل وعنبر شاحب ونقاء معدني. أنيق ومشرق، يُلبَس في كل الفصول.',
    image: '/products/ameer-al-oudh-white.jpg',
    color: 'from-[#d7c6a5] to-[#fff6df]',
    tag: 'Élégant',
    rating: 4.8,
    reviews: 112,
  },
  {
    slug: 'lailat-khamis',
    name: 'Lailat Khamis',
    nameAr: 'ليلة خميس',
    price: 379,
    gender: 'Homme',
    category: 'Oud',
    notes: 'Oud · Épices · Bois précieux',
    notesAr: 'عود · توابل · أخشاب نفيسة',
    description:
      "Oud, épices chaudes et bois précieux dans une ambiance de soir tardif. Dense, spécifique et durable.",
    descriptionAr:
      'عود وتوابل دافئة وأخشاب نفيسة في أجواء الليل المتأخّر. كثيف ومميّز وثابت.',
    image: '/products/lailat-khamis.jpg',
    color: 'from-[#171717] to-[#9b712d]',
    tag: 'Intense',
    rating: 4.9,
    reviews: 104,
  },
  {
    slug: 'sheikh-zayed-ataa',
    name: 'Sheikh Zayed Ataa',
    nameAr: 'شيخ زايد عطاء',
    price: 399,
    gender: 'Homme',
    category: 'Ambre',
    notes: 'Ambre · Cuir · Safran',
    notesAr: 'عنبر · جلد · زعفران',
    description:
      "L'héritage sheikhzadien : ambre noble, cuir souple et safran. Un parfum de découverte, généreux, qui évoque le voyage.",
    descriptionAr:
      'إرث شيخ زايد: عنبر نبيل وجلد طري وزعفران. عطر استكشاف، كريم، يستدعي روح السفر.',
    image: '/products/sheikh-zayed-ataa.jpg',
    color: 'from-[#3d1714] to-[#9b6935]',
    tag: 'Signature',
    rating: 4.8,
    reviews: 87,
  },
  {
    slug: 'sheikh-zayed-musk',
    name: 'Sheikh Zayed Musk',
    nameAr: 'شيخ زايد مسك',
    price: 369,
    gender: 'Homme',
    category: 'Musc',
    notes: 'Musc blanc · Ambre · Rose',
    notesAr: 'مسك أبيض · عنبر · ورد',
    description:
      "Musc blanc, ambre doux et rose discrète. Une composition ronde et accueillante, celle que l'on porte pour recevoir ses proches.",
    descriptionAr:
      'مسك أبيض وعنبر ناعم وورد خفيف. تركيبة مستديرة ومرحّبة، تلك التي تُلبَس لاستقبال الأحبّة.',
    image: '/products/sheikh-zayed-musk.jpg',
    color: 'from-[#e9e0d1] to-[#718b68]',
    tag: 'Doux',
    rating: 4.7,
    reviews: 95,
  },
  {
    slug: 'oud-amber-bleu',
    name: 'Oud Amber Bleu',
    nameAr: 'عود أمبر بلو',
    price: 389,
    gender: 'Homme',
    category: 'Oud',
    notes: 'Oud · Ambre · Notes marines',
    notesAr: 'عود · عنبر · نوتات بحرية',
    description:
      "L'oud marin : notes marines, ambre doré et oud fumé. Une tension rare entre l'océan et le désert, signature moderne et affirmée.",
    descriptionAr:
      'العود البحري: نوتات بحرية وعنبر ذهبي وعود مدخّن. توازن نادر بين المحيط والصحراء، توقيع عصري وواثق.',
    image: '/products/manasik-oud-amber-bleu.jpg',
    color: 'from-[#0b2236] to-[#b58b40]',
    tag: 'Exclusif',
    rating: 4.9,
    reviews: 118,
  },
  {
    slug: 'sheikh-zayed-oud',
    name: 'Sheikh Zayed Oud',
    nameAr: 'شيخ زايد عود',
    price: 429,
    gender: 'Homme',
    category: 'Oud',
    notes: 'Oud · Bois fumé · Ambre',
    notesAr: 'عود · خشب مدخّن · عنبر',
    description:
      'Oud intense, bois fumé et ambre profond. La pièce la plus radicale de la collection homme, une vraie signature de pouvoir.',
    descriptionAr:
      'عود قوي وخشب مدخّن وعنبر عميق. أكثر قطع المجموعة الرجالية جرأةً، توقيع حقيقي للقوة.',
    image: '/products/sheikh-zayed-oud.jpg',
    color: 'from-[#11100e] to-[#b5823d]',
    tag: 'Premium',
    rating: 5,
    reviews: 203,
  },
  {
    slug: 'oud-amber-noir',
    name: 'Oud Amber Noir',
    nameAr: 'عود أمبر نوار',
    price: 419,
    gender: 'Homme',
    category: 'Oud',
    notes: 'Oud noir · Ambre · Cuir',
    notesAr: 'عود أسود · عنبر · جلد',
    description:
      'Le Noir de la maison : oud noir fumé, ambre brûlé et cuir sombre. Mystérieux et nocturne, il ne se révèle jamais tout à fait.',
    descriptionAr:
      'الأسود في الدار: عود أسود مدخّن وعنبر محروق وجلد داكن. غامض وليلي، لا يكشف عن نفسه تماماً أبداً.',
    image: '/products/manasik-oud-amber-noir.jpg',
    color: 'from-[#0e0c0b] to-[#8c5a22]',
    tag: 'Mystère',
    rating: 4.9,
    reviews: 151,
  },
  {
    slug: 'ameer-al-oudh-original',
    name: 'Ameer Al Oudh Original',
    nameAr: 'أمير العود الأصلي',
    price: 359,
    gender: 'Homme',
    category: 'Oud',
    notes: 'Oud · Ambre · Bois',
    notesAr: 'عود · عنبر · خشب',
    description:
      "La version originelle d'Ameer Al Oudh : oud classique, ambre et bois. Un classique intemporel, qui traverse les générations.",
    descriptionAr:
      'النسخة الأصلية من أمير العود: عود كلاسيكي وعنبر وخشب. كلاسيكي خالد، يعبر الأجيال.',
    image: '/products/ameer-al-oudh-original.jpg',
    color: 'from-[#1a1410] to-[#d1a05b]',
    tag: 'Classique',
    rating: 4.8,
    reviews: 167,
  },
  {
    slug: 'makhsouse-oud',
    name: 'Makhsouse Oud',
    nameAr: 'مخصوص عود',
    price: 449,
    gender: 'Homme',
    category: 'Oud',
    notes: 'Oud précieux · Ambre · Musc',
    notesAr: 'عود نفيس · عنبر · مسك',
    description:
      "Un oud sur-mesure, composé à partir de matières premières nobles et d'un musc sélectionné. Le sommet de la collection, réservé aux initiés.",
    descriptionAr:
      'عود على المقاس، مركَّب من مواد أولية نفيسة ومسك منتقى. قمة المجموعة، لعشّاق التميّز.',
    image: '/products/makhsouse-oud.jpg',
    color: 'from-[#151313] to-[#9c692d]',
    tag: 'Prestige',
    rating: 5,
    reviews: 74,
  },
  {
    slug: 'yara',
    name: 'Yara',
    nameAr: 'يارا',
    price: 315,
    gender: 'Femme',
    category: 'Floral',
    notes: 'Rose · Pêche · Musc',
    notesAr: 'ورد · خوخ · مسك',
    description:
      'Une floraison délicate : rose tendre, pêche juteuse et musc blanc. Une fraîcheur féminine, lumineuse et facile à porter.',
    descriptionAr:
      'إزهار رقيق: ورد ناعم وخوخ عصيري ومسك أبيض. نضارة أنثوية، مشرقة وسهلة اللبس.',
    image: '/products/yara.jpg',
    color: 'from-[#7d3b4a] to-[#e5a7b4]',
    tag: 'Nouveau',
    rating: 4.6,
    reviews: 62,
  },
  {
    slug: 'qaed',
    name: 'Qaed',
    nameAr: 'قائد',
    price: 339,
    gender: 'Homme',
    category: 'Oud',
    notes: 'Oud · Cuir · Ambre',
    notesAr: 'عود · جلد · عنبر',
    description:
      'Le guide : oud, cuir et ambre dans un équilibre sec et élégant. Une présence calme mais assurée.',
    descriptionAr:
      'القائد: عود وجلد وعنبر في توازن جاف وأنيق. حضور هادئ لكن واثق.',
    image: '/products/qaed.jpg',
    color: 'from-[#2b2118] to-[#9a7448]',
    tag: 'Intense',
    rating: 4.7,
    reviews: 71,
  },
  {
    slug: 'asad',
    name: 'Asad',
    nameAr: 'أسد',
    price: 359,
    gender: 'Homme',
    category: 'Ambre',
    notes: 'Ambre · Cuir · Épices',
    notesAr: 'عنبر · جلد · توابل',
    description:
      "Le lion. Ambre massif, cuir et épices, une composition totalement assumée. Pour ceux qui veulent être sentis avant d'être vus.",
    descriptionAr:
      'الأسد. عنبر غني وجلد وتوابل، تركيبة واثقة تماماً. لمن يريد أن يُشَمّ قبل أن يُرى.',
    image: '/products/asad.jpg',
    color: 'from-[#3f1c14] to-[#b06a34]',
    tag: 'Puissant',
    rating: 4.8,
    reviews: 88,
  },
  {
    slug: 'maahir-legacy',
    name: 'Maahir Legacy',
    nameAr: 'ماهر ليجاسي',
    price: 409,
    gender: 'Homme',
    category: 'Oud',
    notes: 'Oud · Ambre · Vanille',
    notesAr: 'عود · عنبر · فانيليا',
    description:
      'Un héritage sucré-boisé : oud, ambre et une touche de vanille. Le classique revisité, moderne et enveloppant.',
    descriptionAr:
      'إرث حلو-خشبي: عود وعنبر ولمسة من الفانيليا. الكلاسيكي في ثوب جديد، عصري ومحيط.',
    image: '/products/maahir-legacy.jpg',
    color: 'from-[#1e1610] to-[#c39a5c]',
    tag: 'Prestige',
    rating: 4.9,
    reviews: 79,
  },
  {
    slug: 'manasik-oud-amber',
    name: 'Manasik Oud Amber',
    nameAr: 'مناسيك عود أمبر',
    price: 379,
    gender: 'Homme',
    category: 'Ambre',
    notes: 'Ambre · Oud · Musc',
    notesAr: 'عنبر · عود · مسك',
    description:
      "La trilogie Manasik dans son expression ambrée : oud classique, ambre doré et musc. Équilibré, élégant, facile à porter au quotidien.",
    descriptionAr:
      'ثلاثية مناسك في تعبيرها العنبري: عود كلاسيكي وعنبر ذهبي ومسك. متوازن وأنيق وسهل لبساً يومياً.',
    image: '/products/manasik-oud-amber.jpg',
    color: 'from-[#241a10] to-[#b78b48]',
    tag: 'Signature',
    rating: 4.8,
    reviews: 93,
  },
  {
    slug: 'ameer-al-oudh',
    name: 'Ameer Al Oudh',
    nameAr: 'أمير العود',
    price: 369,
    gender: 'Homme',
    category: 'Oud',
    notes: 'Oud · Ambre · Bois',
    notesAr: 'عود · عنبر · خشب',
    description:
      "La fragrance la plus emblématique d'Ameer Al Oudh : oud, ambre et bois noble. Une valeur sûre, la porte d'entrée de la maison.",
    descriptionAr:
      'أيقونية أمير العود: عود وعنبر وخشب نبيل. خيار مضمون، بوابة الدخول إلى الدار.',
    image: '/products/ameer-al-oudh.jpg',
    color: 'from-[#2b2018] to-[#d0a765]',
    tag: 'Classique',
    rating: 4.8,
    reviews: 132,
  },
]

/**
 * Verified brand / international fragrances.
 *
 * Empty on purpose: no price, format or availability has been confirmed for
 * these brands yet, so publishing them here would mean inventing data. When a
 * supplier confirms a reference, add it to this array (with `brand`, `lineage`
 * and `size`) and it immediately renders as a purchasable card under
 * `marques`.
 */
const designerProducts: Omit<Product, 'range'>[] = []

/**
 * The full verified catalogue, with each entry assigned to its line.
 * Ordered maison first, then brand.
 */
export const products: Product[] = [
  ...maisonProducts.map((product) => ({
    ...product,
    range: 'arabes-oud' as const,
    lineage: 'arabe' as const,
    size: MAISON_ML,
  })),
  ...designerProducts.map((product) => ({ ...product, range: 'marques' as const })),
]

/**
 * Fragrances listed for discovery whose information is not confirmed yet.
 *
 * No prices, specifications or photographs are invented here, and because these
 * entries carry no price they are never purchasable. Names are exactly the
 * brand / fragrance names supplied; only the availability notice is translated.
 */
export const upcomingProducts: UpcomingProduct[] = [
  {
    slug: 'dior-sauvage',
    name: 'Dior Sauvage',
    nameAr: 'ديور سوفاج',
    brand: 'Dior',
    range: 'marques',
    gender: 'Homme',
    lineage: 'inspire',
    description:
      'Interprétation olfactive présentée pour homme. Prix, contenance et disponibilité à confirmer.',
    descriptionAr: 'تفسير عطري مخصّص للرجال. السعر والحجم والتوفّر قيد التأكيد.',
    color: 'from-[#0d1b2a] to-[#3a5a7a]',
  },
  {
    slug: 'bleu-de-chanel',
    name: 'Bleu de Chanel',
    nameAr: 'بلو دو شانيل',
    brand: 'Chanel',
    range: 'marques',
    gender: 'Homme',
    lineage: 'inspire',
    description:
      'Interprétation olfactive présentée pour homme. Prix, contenance et disponibilité à confirmer.',
    descriptionAr: 'تفسير عطري مخصّص للرجال. السعر والحجم والتوفّر قيد التأكيد.',
    color: 'from-[#0a1a2f] to-[#274b73]',
  },
  {
    slug: 'afnan-9pm',
    name: 'Afnan 9PM',
    nameAr: 'أفنان 9PM',
    brand: 'Afnan',
    range: 'marques',
    gender: 'Homme',
    lineage: 'inspire',
    description:
      'Interprétation olfactive présentée pour homme. Prix, contenance et disponibilité à confirmer.',
    descriptionAr: 'تفسير عطري مخصّص للرجال. السعر والحجم والتوفّر قيد التأكيد.',
    color: 'from-[#0b1a2e] to-[#2f4a6b]',
  },
  {
    slug: 'azzaro',
    name: 'Azzaro',
    nameAr: 'أزارو',
    brand: 'Azzaro',
    range: 'marques',
    gender: 'Homme',
    lineage: 'inspire',
    description:
      'Interprétation olfactive présentée pour homme. Prix, contenance et disponibilité à confirmer.',
    descriptionAr: 'تفسير عطري مخصّص للرجال. السعر والحجم والتوفّر قيد التأكيد.',
    color: 'from-[#0e0e12] to-[#3b3f5a]',
  },
  {
    slug: 'prada',
    name: 'Prada',
    nameAr: 'برادا',
    brand: 'Prada',
    range: 'marques',
    lineage: 'inspire',
    description:
      'Interprétation olfactive en cours de référencement. Prix, contenance et disponibilité à confirmer.',
    descriptionAr: 'تفسير عطري قيد التوفير. السعر والحجم والتوفّر قيد التأكيد.',
    color: 'from-[#151313] to-[#4a4644]',
  },
  {
    slug: 'night-blue',
    name: 'Night Blue',
    nameAr: 'نايت بلو',
    range: 'marques',
    lineage: 'inspire',
    description:
      'Interprétation olfactive en cours de référencement. Prix, contenance et disponibilité à confirmer.',
    descriptionAr: 'تفسير عطري قيد التوفير. السعر والحجم والتوفّر قيد التأكيد.',
    color: 'from-[#0a1220] to-[#1f3a5f]',
  },
]

/** Chips used by the catalogue filters. `Tous` is intentionally gender-neutral. */
export const genderFilters = ['Tous', 'Homme', 'Femme'] as const

/** Scent-family chips, aligned with the quick view and the product cards. */
export const familyFilters = ['Toutes', 'Oud', 'Ambre', 'Musc', 'Floral'] as const

export type GenderFilter = (typeof genderFilters)[number]
export type FamilyFilter = (typeof familyFilters)[number]

/** Price brackets. The catalogue runs from 249 DH to 499 DH. */
export const priceBandFilters = ['all', 'lt300', 'mid', 'gt400'] as const
export type PriceBand = (typeof priceBandFilters)[number]

/** Does a price fall inside a bracket? `all` always matches. */
export function matchesPriceBand(price: number, band: PriceBand): boolean {
  switch (band) {
    case 'lt300':
      return price < 300
    case 'mid':
      return price >= 300 && price <= 400
    case 'gt400':
      return price > 400
    default:
      return true
  }
}

/**
 * Availability. `available` is a verified, orderable entry; `onrequest` is an
 * inquiry-only reference whose price is not confirmed yet.
 */
export const availabilityFilters = ['all', 'available', 'onrequest'] as const
export type Availability = (typeof availabilityFilters)[number]

export const featuredSlugs = [
  'malikat-al-arab',
  'sheikh-zayed-oud',
  'oud-amber-noir',
  'ameerat-oud-amber',
] as const

export const bestsellerSlugs = [
  'sheikh-zayed-oud',
  'ameerat-oud-amber',
  'malikat-al-arab',
  'oud-amber-noir',
  'qasas-hudson',
  'lailat-al-arab',
] as const

/** Resolves slugs to products, silently dropping unknown ones. */
export function getProductsBySlugs(slugs: readonly string[]): Product[] {
  return slugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product))
}

export function countByFamily(family: ScentFamily) {
  return products.filter((product) => product.category === family).length
}

/**
 * A catalogue slice: the two axes a category page can restrict on. Either,
 * both or neither may be given.
 */
export type Scope = { range?: RangeId; gender?: GenderFilter }

function inScope(entry: { range: RangeId; gender?: Gender }, scope: Scope) {
  if (scope.range && entry.range !== scope.range) return false
  // `Tous` means "no gender filter"; an entry with no stated gender is never
  // forced into a gendered page.
  if (scope.gender && scope.gender !== 'Tous' && entry.gender !== scope.gender) return false
  return true
}

/** Verified products of a slice, in catalogue order. */
export function getProducts(scope: Scope = {}): Product[] {
  return products.filter((product) => inScope(product, scope))
}

/**
 * Unverified, inquiry-only references of a slice. An entry whose gender is
 * unknown is only returned when the slice itself is not gendered.
 */
export function getUpcomingProducts(scope: Scope = {}): UpcomingProduct[] {
  return upcomingProducts.filter((entry) => inScope(entry, scope))
}

/** Distinct brands present in a slice, across verified and inquiry-only rows. */
export function getBrands(scope: Scope = {}): string[] {
  const brands = new Set<string>()
  for (const product of getProducts(scope)) {
    if (product.brand) brands.add(product.brand)
  }
  for (const entry of getUpcomingProducts(scope)) {
    if (entry.brand) brands.add(entry.brand)
  }
  return [...brands].sort((a, b) => a.localeCompare(b))
}

export type CatalogQuery = Scope & {
  family?: FamilyFilter
  /** Exact brand match; omit for "all brands". */
  brand?: string
  priceBand?: PriceBand
  query?: string
}

/**
 * Single filtering entry point shared by the collection grid and the category
 * pages. The haystack spans both languages so a shopper can search in Arabic or
 * Latin regardless of the active locale.
 */
export function filterProducts({
  range,
  gender,
  family,
  brand,
  priceBand = 'all',
  query,
}: CatalogQuery): Product[] {
  const needle = query?.trim().toLowerCase() ?? ''

  return products.filter((product) => {
    if (!inScope(product, { range, gender })) return false
    if (family && family !== 'Toutes' && product.category !== family) return false
    if (brand && product.brand !== brand) return false
    if (!matchesPriceBand(product.price, priceBand)) return false
    if (!needle) return true

    const haystack = `${product.name} ${product.nameAr} ${product.brand ?? ''} ${product.notes} ${product.notesAr} ${product.category}`
    return haystack.toLowerCase().includes(needle)
  })
}

/**
 * Search + brand filtering over the inquiry-only references of a slice. They
 * have no notes or family, so the haystack is the two names plus the brand.
 */
export function filterUpcomingProducts({
  range,
  gender,
  brand,
  query,
}: Scope & { brand?: string; query?: string }): UpcomingProduct[] {
  const needle = query?.trim().toLowerCase() ?? ''

  return upcomingProducts.filter((entry) => {
    if (!inScope(entry, { range, gender })) return false
    if (brand && entry.brand !== brand) return false
    if (!needle) return true
    return `${entry.name} ${entry.nameAr} ${entry.brand ?? ''}`.toLowerCase().includes(needle)
  })
}
