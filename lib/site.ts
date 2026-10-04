import type { ScentFamily } from '@/lib/products'

export const siteConfig = {
  name: 'Oudia',
  tagline: "Parfums d'exception",
  origin: 'Fait au Maroc',
  announcement: 'Livraison offerte à partir de 500 DH · Paiement à la livraison',
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
    `Salam, je veux commander ${productName}. Merci de me confirmer la disponibilité et la livraison.`,
  )
}

/**
 * Pre-fills the WhatsApp order message with the full cart contents.
 * This is the checkout path for the storefront - there is no payment backend.
 */
export function cartOrderLink(
  lines: { name: string; quantity: number; price: number }[],
) {
  const total = lines.reduce((sum, line) => sum + line.price * line.quantity, 0)
  const detail = lines
    .map((line) => `• ${line.name} x${line.quantity} — ${line.price * line.quantity} DH`)
    .join('\n')

  return whatsappLink(
    `Salam, je souhaite commander :\n${detail}\n\nTotal : ${total} DH\nMerci de me confirmer la disponibilité et la livraison.`,
  )
}

export const navigation = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Collections', href: '#collection' },
  { label: 'Homme', href: '#collection?genre=Homme' },
  { label: 'Femme', href: '#collection?genre=Femme' },
  { label: 'Unisex', href: '#categories' },
  { label: 'Oud', href: '#categories' },
  { label: 'À propos', href: '#histoire' },
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
      "Bois d'agar fumé, cuir et épices. La famille la plus profonde et la plus tenace de la maison.",
    gradient: 'from-[#1a1410] via-[#4a3025] to-[#a9783a]',
  },
  {
    name: 'Ambre',
    tagline: 'Chaleur enveloppante',
    description:
      'Ambre suifé, miel et cuir. Des parfums doux et bright qui restent toute la journée.',
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

export const customerBenefits = [
  {
    icon: 'Truck',
    title: 'Livraison partout au Maroc',
    description:
      'Expédition partout au Maroc en 24 à 48h ouvrables, suivi de commande par WhatsApp.',
  },
  {
    icon: 'Wallet',
    title: 'Paiement à la livraison',
    description:
      'Vous payez seulement lorsque la commande est entre vos mains. Aucun acompte demandé.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Produits soigneusement sélectionnés',
    description:
      'Des flacons finis et contrôlés. Nos concessions sont garanties à vie par la maison.',
  },
  {
    icon: 'MessageCircle',
    title: 'Service client',
    description:
      'Une équipe à Casablanca vous aide à choisir la fragrance qui vous ressemble vraiment.',
  },
] as const

/**
 * PLACEHOLDER CONTENT — NOT FOR PRODUCTION.
 *
 * These quotes are written examples, not real customers. Publishing invented
 * testimonials as social proof is a consumer-protection problem in most
 * markets. Swap every entry for a real, permissioned review before launch;
 * the layout reads from the same shape, so no code change is needed.
 */
export const PLACEHOLDER_TESTIMONIALS = true

export const testimonials = [
  {
    quote:
      "Le Sheikh Zayed Oud est une tuerie. J'en ai offert à mon frère pour son mariage, il n'en parlait plus.",
    name: 'Salma B.',
    city: 'Casablanca',
    rating: 5,
    product: 'Sheikh Zayed Oud',
  },
  {
    quote:
      "Commandé un mardi, reçu le mercredi. Le flacon est lourd, la qualité est là. Impeccable.",
    name: 'Youssef A.',
    city: 'Rabat',
    rating: 5,
    product: 'Malikat Al Arab',
  },
  {
    quote:
      "J'hésitais entre l'oud et l'ambre. Ils m'ont conseillé Yara sur WhatsApp, c'est exactement ce que je cherchais.",
    name: 'Nadia E.',
    city: 'Marrakech',
    rating: 5,
    product: 'Yara',
  },
] as const

export const promotionalOffer = {
  eyebrow: 'Édition limitée',
  title: 'Oud Royale',
  description:
    'Une sélection de nos six meilleurs oud, à prix de lancement pour une durée limitée.',
  discount: '-15%',
  code: 'OUD15',
  details: [
    'Livraison offerte dès 500 DH',
    'Paiement à la livraison',
    'Flacons de 50 ml garantis',
  ],
} as const

export const footerColumns = [
  {
    title: 'Collections',
    links: [
      { label: 'Tous les parfums', href: '#collection' },
      { label: 'Parfums Homme', href: '#collection?genre=Homme' },
      { label: 'Parfums Femme', href: '#collection?genre=Femme' },
      { label: 'Oud', href: '#categories' },
      { label: 'Ambre', href: '#categories' },
      { label: 'Bestsellers', href: '#bestsellers' },
    ],
  },
  {
    title: 'La maison',
    links: [
      { label: 'À propos', href: '#histoire' },
      { label: 'Notre histoire', href: '#histoire' },
      { label: 'Service client', href: '#avantages' },
      { label: 'Nous contacter', href: '#contact' },
    ],
  },
] as const

export const categoryShowcase = [
  {
    slug: 'homme',
    name: 'Parfums Homme',
    eyebrow: 'Pour lui',
    description:
      'Oud fumé, ambre massif et cuir. Des compositions structurées pour une présence qui ne demande pas confirmation.',
    href: '#collection?genre=Homme',
    image: '/products/sheikh-zayed-oud.jpg',
    available: true,
  },
  {
    slug: 'femme',
    name: 'Parfums Femme',
    eyebrow: 'Pour elle',
    description:
      'Rose de Damas, ambre suifé et musc blanc. Des floralisations chaudes qui tiennent jusqu’au bout de la nuit.',
    href: '#collection?genre=Femme',
    image: '/products/lailat-al-arab.jpg',
    available: true,
  },
  {
    slug: 'oud',
    name: 'Oud',
    eyebrow: 'Le roi des parfums',
    description:
      'Bois d’agar fumé, la famille la plus profonde et la plus tenace de la maison. Notre signature.',
    href: '#collection?family=Oud',
    image: '/products/oud-amber-noir.jpg',
    available: true,
  },
  {
    slug: 'unisex',
    name: 'Unisex',
    eyebrow: 'Bientôt disponible',
    description:
      'Des compositions partagées, pensées pour n’appartenir à personne. Ouverture prochaine.',
    href: '#collection',
    image: '/products/oud-amber-bleu.jpg',
    available: false,
  },
  {
    slug: 'coffrets',
    name: 'Coffrets',
    eyebrow: 'Bientôt disponible',
    description:
      'Coffrets découverte et éditions cadeaux, assemblés à la main à Casablanca. Bientôt disponible.',
    href: '#collection',
    image: '/products/makhsouse-oud.jpg',
    available: false,
  },
] as const