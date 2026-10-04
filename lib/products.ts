export type Gender = 'Homme' | 'Femme'

export type ScentFamily = 'Oud' | 'Ambre' | 'Musc' | 'Floral'

export type Product = {
  slug: string
  name: string
  nameAr: string
  price: number
  gender: Gender
  category: ScentFamily
  notes: string
  description: string
  image: string
  color: string
  tag: string
  rating: number
  reviews: number
}

/**
 * Catalogue source of truth.
 *
 * `slug`, `description`, `rating` and `reviews` were added so cards, the
 * quick-view dialog and structured data can all key off stable identifiers.
 * Prices, notes, imagery and merchandising tags are unchanged.
 */
export const products: Product[] = [
  {
    slug: 'ameerat-oud-amber',
    name: 'Ameerat Oud Amber',
    nameAr: 'أميرات عود أمبر',
    price: 349,
    gender: 'Femme',
    category: 'Ambre',
    notes: 'Ambre · Oud · Rose',
    description:
      "Une ambree solaire ou la rose de Taif rencontre un oud velours. Chaleureuse et enveloppante, elle accompagne la femme du soir jusqu'au bout de la nuit.",
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
    description:
      "Un musc blanc d'une purete absolue, pose sur un lit de fleurs blanches et d'ambre blond. Une signature fraiche et propre qui reste proche de la peau.",
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
    description:
      "L'oud prive du matin : safran, bois de santal et une touche de cuir fume. Une elegance discrete, parfaite pour les journees qui comptent.",
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
    description:
      "Une nuit arabe en fiole : rose de Damas, ambre suife et musc blanc. Opulente mais jamais sucree, elle cree une presence magnetique apres le coucher du soleil.",
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
    description:
      "Un oud fume tenu par l'ambre et les epices chaudes. Puissant et structure, un parfum de caractere pour ceux qui assument leur signature.",
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
    description:
      "L'oud le plus accessible de la maison : bois d'agar, ambre clair et une finition champetre. Le point d'entree ideal dans l'univers du oud.",
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
    description:
      "Oud rouge, cuir tanne et ambre brule. Une composition moderne et magnetique, avec l'allure d'un costume bien coupe.",
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
    description:
      "Un bouquet frais et lumineux : rose tendre, jasmin sambac et musc blanc. Leger et solaire, ideal pour les journees chaudes.",
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
    description:
      "La piece maitresse de la maison. Ambre profond, rose royale et oud de Mysore dans une concentration rare. Un parfum qui se retient.",
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
    description:
      "Inspire des grands deserts du Najd : oud sec, cuir patine et ambre sombre. Sec, elegant, profond, un parfum qui ne demande qu'a etre decouvert.",
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
    description:
      "L'oud blanc dans sa version la plus noble : bois de santal, ambre pale et une proprete minerale. Elegant et lumineux, portable en toute saison.",
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
    description:
      "Oud, épices chaudes et bois precieux dans une ambiance de soir tardif. Dense, specifique et durable.",
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
    description:
      "L'heritage sheikhzadien : ambre noble, cuir souple et safran. Un parfum de decouverte, genereux, qui evoque le voyage.",
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
    description:
      "Musc blanc, ambre doux et rose discret. Une composition ronde et accueillante, celle que l'on porte pour recevoir ses proches.",
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
    description:
      "L'oud marin : notes marines, ambre dore et oud fume. Une tension rare entre l'ocean et le desert, signature moderne et affirmee.",
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
    description:
      "Oud intense, bois fume et ambre profond. La piece la plus radicale de la collection homme, une vraie signature de pouvoir.",
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
    description:
      "Le Noir de la maison : oud noir fume, ambre brule et cuir sombre. Mysterieux et nocturne, il ne se revele jamais tout a fait.",
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
    description:
      "La version originelle d'Ameer Al Oudh : oud classique, ambre et bois. Un classique indemodable, qui ne se demodera jamais.",
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
    description:
      "Un oud sur-mesure, compose a partir de matieres premières nobles et d'un musc selectionne. Le sommet de la collection, reserve aux inities.",
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
    description:
      "Une floraison delicate : rose tendre, peche juteuse et musc blanc. Une fraicheur feminine, lumineuse et facile a porter.",
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
    description:
      "Le guide : oud, cuir et ambre dans un equilibre sec et elegant. Une presence calme mais assuree.",
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
    description:
      "Le lion. Ambre massif, cuir et epices, une composition totalement assumee. Pour ceux qui veulent etre sentis avant d'etre vus.",
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
    description:
      "Un heritage sucre-boise : oud, ambre et une touche de vanille. Le classique revisite, moderne et enveloppant.",
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
    description:
      "La trilogie Manasik dans son expression ambree : oud classique, ambre dore et musc. Equilibre, elegant, facile a porter au quotidien.",
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
    description:
      "La fragrance la plus emblematique d'Ameer Al Oudh : oud, ambre et bois noble. Une valeur sure, la porte d'entree de la maison.",
    image: '/products/ameer-al-oudh.jpg',
    color: 'from-[#2b2018] to-[#d0a765]',
    tag: 'Classique',
    rating: 4.8,
    reviews: 132,
  },
]

/** Chips used by the collection filter. `Tous` is intentionally gender-neutral. */
export const genderFilters = ['Tous', 'Homme', 'Femme'] as const

/** Scent-family chips, aligned with the `CategoryShowcase` cards. */
export const familyFilters = ['Toutes', 'Oud', 'Ambre', 'Musc', 'Floral'] as const

export type GenderFilter = (typeof genderFilters)[number]
export type FamilyFilter = (typeof familyFilters)[number]

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

export type CatalogQuery = {
  gender?: GenderFilter
  family?: FamilyFilter
  query?: string
}

/** Single filtering entry point shared by the collection grid and its result count. */
export function filterProducts({ gender, family, query }: CatalogQuery): Product[] {
  const needle = query?.trim().toLowerCase() ?? ''

  return products.filter((product) => {
    if (gender && gender !== 'Tous' && product.gender !== gender) return false
    if (family && family !== 'Toutes' && product.category !== family) return false
    if (!needle) return true

    const haystack = `${product.name} ${product.nameAr} ${product.notes} ${product.category}`
    return haystack.toLowerCase().includes(needle)
  })
}