import type { ScentFamily } from '@/lib/products'

export const siteConfig = {
  name: 'Nour Oud',
  tagline: "Parfums d'exception",
  origin: 'Fait au Maroc',
  announcement: 'Livraison offerte a partir de 500 DH - Paiement a la livraison',
  freeShippingThreshold: 500,
  rating: { value: 4.9, count: 1247 },
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

/** Pre-filled order message for a given product. */
export function orderLink(productName: string) {
  return whatsappLink(
    `Salam, je veux commander ${productName}. Merci de me confirmer la disponibilite et la livraison.`,
  )
}

export const navigation = [
  { label: 'La collection', href: '#collection' },
  { label: 'Nouveautes', href: '#nouveautes' },
  { label: 'Bestsellers', href: '#bestsellers' },
  { label: 'Notre histoire', href: '#histoire' },
  { label: 'Conseils parfum', href: '#conseils' },
] as const

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
      "Bois d'agar fume, cuir et epices. La famille la plus profonde et la plus tenace de la maison.",
    gradient: 'from-[#1a1410] via-[#4a3025] to-[#a9783a]',
  },
  {
    name: 'Ambre',
    tagline: 'Chaleur enveloppante',
    description:
      'Ambre suife, miel et cuir. Des parfums doux et Bright qui restent toute la journee.',
    gradient: 'from-[#5d2b19] via-[#9a5a2c] to-[#d8953b]',
  },
  {
    name: 'Musc',
    tagline: 'Proche de la peau',
    description:
      'Musc blanc, fleurs blanches et ambre pale. La simplicite elegante, parfaite au quotidien.',
    gradient: 'from-[#e9e0d1] via-[#cbbfa8] to-[#8d6e55]',
  },
  {
    name: 'Floral',
    tagline: 'Fleurit aujourd hui',
    description:
      'Rose de Damas, jasmin sambac et touches fruitees. Des bouquets frais etomens.',
    gradient: 'from-[#62664d] via-[#a08a63] to-[#d1c791]',
  },
]

export const customerBenefits = [
  {
    icon: 'Truck',
    title: 'Livraison 24/48h',
    description:
      'Expedition partout au Maroc en 24 a 48h ouvrables, suivi de commande par WhatsApp.',
  },
  {
    icon: 'Wallet',
    title: 'Paiement a la livraison',
    description:
      'Vous payez seulement lorsque la commande est entre vos mains. Aucun acompte demande.',
  },
  {
    icon: 'ShieldCheck',
    title: '100% authentique',
    description:
      'Des flacons finis et controlees. Nos concessions sont garanties a vie par la maison.',
  },
  {
    icon: 'MessageCircle',
    title: 'Conseil personnalise',
    description:
      'Une equipe a Casablanca vous aide a choisir la fragrance qui vous ressemble vraiment.',
  },
] as const

/**
 * Placeholder social proof. Replace with real, verifiable customer reviews
 * before going live - fabricated reviews are a legal risk in most markets.
 */
export const testimonials = [
  {
    quote:
      "Le Sheikh Zayed Oud est une tuerie. J'en ai offert a mon frere pour son mariage, il n'en parlait plus.",
    name: 'Salma B.',
    city: 'Casablanca',
    rating: 5,
    product: 'Sheikh Zayed Oud',
  },
  {
    quote:
      "Commande un mardi, recue le mercredi. Le flacon est lourd, la qualite est la. Tresserieuse.",
    name: 'Youssef A.',
    city: 'Rabat',
    rating: 5,
    product: 'Malikat Al Arab',
  },
  {
    quote:
      "J hesitais entre l'oud et l'ambre. Ils m'ont conseille Yara sur WhatsApp, c'est exactement ce que je cherchais.",
    name: 'Nadia E.',
    city: 'Marrakech',
    rating: 5,
    product: 'Yara',
  },
] as const

export const promotionalOffer = {
  eyebrow: 'Edition limitee',
  title: 'Oud Royale',
  description:
    "Une selection de nos six meilleurs oud, a prix de lancement pour une duree limitee.",
  discount: '-15%',
  code: 'OUD15',
  details: ['Livraison offerte des 500 DH', 'Paiement a la livraison', 'Flacons de 50 ml garantis'],
} as const

export const footerColumns = [
  {
    title: 'La collection',
    links: [
      { label: 'Tous les parfums', href: '#collection' },
      { label: 'Parfum homme', href: '#collection' },
      { label: 'Parfum femme', href: '#collection' },
      { label: 'Oud', href: '#collection' },
      { label: 'Ambre', href: '#collection' },
      { label: 'Bestsellers', href: '#bestsellers' },
    ],
  },
  {
    title: 'La maison',
    links: [
      { label: 'Notre histoire', href: '#histoire' },
      { label: 'Conseils parfum', href: '#conseils' },
      { label: 'Livraison et retours', href: '#conseils' },
      { label: 'Nous contacter', href: '#conseils' },
    ],
  },
] as const