import type { CategoryId } from '@/lib/categories'

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
 * Header navigation structure.
 *
 * Two kinds of entry: a `categoryId` opens a category listing page (the link is
 * built per locale by the header), while `href` is an in-page anchor on the
 * homepage. The header prefixes anchors with the active locale so they also work
 * from a category page. Short desktop labels resolve from `dict.nav.short[key]`,
 * full names from `dict.nav.items[key]`.
 */
export type NavItem =
  | { key: NavKey; href: string }
  | { key: NavKey; categoryId: CategoryId }

export type NavKey = 'home' | 'men' | 'women' | 'oriental' | 'designer' | 'contact'

export const navItems: readonly NavItem[] = [
  { key: 'home', href: '#accueil' },
  { key: 'men', categoryId: 'homme' },
  { key: 'women', categoryId: 'femme' },
  { key: 'oriental', categoryId: 'parfums-arabes-oud' },
  { key: 'designer', categoryId: 'parfums-de-marque' },
  { key: 'contact', href: '#contact' },
]

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
