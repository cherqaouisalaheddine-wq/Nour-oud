import type { ScentFamily } from '@/lib/products'

/**
 * Non-translatable brand configuration.
 *
 * Every human-readable string now lives in `lib/i18n/dictionaries`, so the same
 * storefront can render in French or Arabic. Only values that are identical in
 * both languages - brand name, thresholds, ratings, handles, asset paths - stay
 * here.
 */
export const siteConfig = {
  name: 'NOUR EL OUD',
  /** Order value (in dirhams) from which shipping is offered. */
  freeShippingThreshold: 500,
  rating: { value: 4.9, count: 1247 },
  email: 'bonjour@nour-el-oud.ma',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    tiktok: 'https://tiktok.com',
  },
} as const

/** WhatsApp deep-link builder. Falls back to a placeholder number in local dev. */
export function whatsappLink(message: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '212600000000'
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

/**
 * Header navigation structure. Hrefs are in-page anchors and therefore
 * language-independent; labels resolve from `dict.nav.items[key]`.
 */
export const navItems = [
  { key: 'home', href: '#accueil' },
  { key: 'collections', href: '#collection' },
  { key: 'men', href: '#collection?genre=Homme' },
  { key: 'women', href: '#collection?genre=Femme' },
  { key: 'unisex', href: '#categories' },
  { key: 'oud', href: '#categories' },
  { key: 'about', href: '#histoire' },
] as const

export type NavKey = (typeof navItems)[number]['key']

/**
 * Large visual category cards. Imagery, availability and the deep-link target
 * stay here; the eyebrow/title/description come from `dict.categories.items`.
 */
export const categoryMeta = [
  {
    slug: 'homme',
    image: '/products/sheikh-zayed-oud.jpg',
    href: '#collection?genre=Homme',
    available: true,
  },
  {
    slug: 'femme',
    image: '/products/lailat-al-arab.jpg',
    href: '#collection?genre=Femme',
    available: true,
  },
  {
    slug: 'oud',
    image: '/products/manasik-oud-amber-noir.jpg',
    href: '#collection?family=Oud',
    available: true,
  },
  {
    slug: 'unisex',
    image: '/products/manasik-oud-amber-bleu.jpg',
    href: '#collection',
    available: false,
  },
  {
    slug: 'coffrets',
    image: '/products/makhsouse-oud.jpg',
    href: '#collection',
    available: false,
  },
] as const

export type CategorySlug = (typeof categoryMeta)[number]['slug']

/** "Why us" tiles: the glyph is fixed, the copy is translated. */
export const benefitMeta = [
  { key: 'delivery', icon: 'Truck' },
  { key: 'payment', icon: 'Wallet' },
  { key: 'selection', icon: 'ShieldCheck' },
  { key: 'service', icon: 'MessageCircle' },
] as const

export type BenefitKey = (typeof benefitMeta)[number]['key']

/** Promo graphic values. The discount and code are literal, copy is translated. */
export const promoMeta = { discount: '-15%', code: 'OUD15' } as const

/**
 * PLACEHOLDER CONTENT — NOT FOR PRODUCTION.
 *
 * The testimonial text in the dictionaries is written examples, not real
 * customers. Publishing invented testimonials as social proof is a
 * consumer-protection problem in most markets, so a visible notice is shown
 * while this flag is true. Swap the dictionary entries for real, permissioned
 * reviews and set this to false before launch.
 */
export const PLACEHOLDER_TESTIMONIALS = true

/**
 * Testimonial identity that must not change between languages: a stable id, the
 * star rating and the product the customer bought. Quotes, names and cities are
 * translated in the dictionaries.
 */
export const testimonialMeta = [
  { id: 'salma', rating: 5, product: 'Sheikh Zayed Oud' },
  { id: 'youssef', rating: 5, product: 'Malikat Al Arab' },
  { id: 'nadia', rating: 5, product: 'Yara' },
] as const

export type TestimonialId = (typeof testimonialMeta)[number]['id']

/** Product merchandising tags, translated by key. */
export type ProductTagKey =
  | 'Bestseller'
  | 'Signature'
  | 'Doux'
  | 'Exclusif'
  | 'Intense'
  | 'Clean'
  | 'Coup de cœur'
  | 'Frais'
  | 'Premium'
  | 'Nouveau'
  | 'Élégant'
  | 'Mystère'
  | 'Classique'
  | 'Prestige'
  | 'Puissant'

/* -------------------------------------------------------------------------- */
/* Legacy data                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Olfactory-family blurbs. Kept for reference but not rendered by any current
 * section - the storefront presents families through `categoryMeta` and the
 * collection filters instead.
 */
export type ScentFamilyMeta = {
  name: ScentFamily
  tagline: string
  description: string
  gradient: string
}

export const scentFamilies: ScentFamilyMeta[] = [
  {
    name: 'Oud',
    tagline: 'Le roi des parfums',
    description:
      "Bois d'agar fumé, cuir et épices. La famille la plus profonde et la plus tenace de la maison.",
    gradient: 'from-[#1a1410] via-[#4a3025] to-[#a9783a]',
  },
  {
    name: 'Ambre',
    tagline: 'Chaleur enveloppante',
    description:
      'Ambre suifé, miel et cuir. Des parfums doux et lumineux qui restent toute la journée.',
    gradient: 'from-[#5d2b19] via-[#9a5a2c] to-[#d8953b]',
  },
  {
    name: 'Musc',
    tagline: 'Proche de la peau',
    description:
      'Musc blanc, fleurs blanches et ambre pâle. La simplicité élégante, parfaite au quotidien.',
    gradient: 'from-[#e9e0d1] via-[#cbbfa8] to-[#8d6e55]',
  },
  {
    name: 'Floral',
    tagline: 'Fleurit aujourd’hui',
    description:
      'Rose de Damas, jasmin sambac et touches fruitées. Des bouquets frais et ombrés.',
    gradient: 'from-[#62664d] via-[#a08a63] to-[#d1c791]',
  },
]
