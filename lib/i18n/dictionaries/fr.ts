import { whatsappLink } from '@/lib/site'
import type { ProductTagKey } from '@/lib/site'

/**
 * French dictionary — the source of truth for the storefront copy.
 *
 * `Dictionary` is derived from this object, so every other locale must export
 * the exact same shape. Interpolated values are plain functions: dictionaries
 * are imported statically by the client `LocaleProvider` rather than passed
 * across the server/client boundary, so functions are allowed.
 */
export const fr = {
  meta: {
    title: 'NOUR EL OUD | Parfums d’exception',
    description:
      'NOUR EL OUD façonne des parfums orientaux d’exception. Oud, ambre et musc sélectionnés au Maroc. Livraison partout au Maroc, paiement à la livraison.',
    keywords: [
      'parfum oud Maroc',
      'parfum arabe',
      'parfum de luxe',
      'ambre et musc',
      'NOUR EL OUD',
    ],
  },

  announcement: 'Livraison offerte à partir de 500 DH · Paiement à la livraison',

  brand: {
    tagline: 'Parfums d’exception',
    origin: 'Fait au Maroc',
  },

  nav: {
    ariaPrimary: 'Navigation principale',
    ariaMobile: 'Navigation mobile',
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
    newsCta: 'Recevoir nos nouveautés',
    items: {
      home: 'Accueil',
      men: 'Homme',
      women: 'Femme',
      oriental: 'Parfums Arabes & Oud',
      designer: 'Parfums de Marque',
      contact: 'Contact',
    },
    // Shorter wording for the desktop bar, where the two full category names
    // would overflow at 1024px. The full names are used from `xl` up and in the
    // mobile menu.
    short: {
      home: 'Accueil',
      men: 'Homme',
      women: 'Femme',
      oriental: 'Arabes & Oud',
      designer: 'Marques',
      contact: 'Contact',
    },
  },

  header: {
    searchAria: 'Rechercher',
    searchLabel: 'Rechercher un parfum',
    searchPlaceholder: 'Rechercher un parfum, une note, une famille…',
    cartAria: (count: number) =>
      `Ouvrir le panier, ${count} article${count > 1 ? 's' : ''}`,
    languageLabel: 'Langue',
    languageAria: 'Choisir la langue',
  },

  hero: {
    eyebrow: 'Maison de parfum · Casablanca',
    titleLine1: 'L’essence',
    titleLine2: 'de l’élégance.',
    subtitle:
      'Découvrez une collection de parfums pensée pour révéler votre signature.',
    ctaPrimary: 'Découvrir la collection',
    ctaSecondary: 'Voir les nouveautés',
    editionLabel: 'Édition signature',
    editionName: 'Oud Royale',
    scrollAria: 'Découvrir la maison',
    imageAlt: 'Flacon de parfum NOUR EL OUD entouré de bois précieux',
  },

  collection: {
    eyebrow: 'Notre collection',
    titleLead: 'Trouvez votre',
    titleEm: 'signature',
    subtitle:
      'Chaque flacon est composé à partir de matières premières nobles, sélectionnées et assemblées au Maroc.',
    genderAria: 'Filtrer par genre',
    familyAria: 'Filtrer par famille olfactive',
    results: (count: number, query?: string) => {
      const noun = count === 1 ? 'parfum' : 'parfums'
      return query ? `${count} ${noun} pour « ${query} »` : `${count} ${noun}`
    },
    emptyTitle: 'Aucun parfum ne correspond',
    emptyText:
      'Essayez un autre terme, ou effacez les filtres pour parcourir l’intégralité de la collection.',
    reset: 'Réinitialiser les filtres',
  },

  story: {
    eyebrow: 'L’art du parfum',
    titleLead: 'Un parfum ne se porte pas. Il se',
    titleEm: 'reconnaît',
    paragraphs: [
      'NOUR EL OUD est née d’une conviction simple : un bon parfum ne se remarque pas, il se retient. Il accompagne celui qui le porte et révèle ce qu’il ne dit pas.',
      'De l’oud fumé de Mysore au musc blanc de Cachemire, chaque composition est construite autour d’une matière noble, équilibrée pour tenir sur la peau du matin jusqu’à la nuit.',
    ],
    pillars: [
      {
        number: '01',
        title: 'Des matières premières nobles',
        text: 'L’oud de Mysore, l’ambre suifé et le musc blanc sont sélectionnés chez des producteurs partenaires, jamais reconstitués.',
      },
      {
        number: '02',
        title: 'Un rituel sur mesure',
        text: 'Besoin d’aide pour choisir ? Notre équipe vous guide par WhatsApp, simplement et sans engagement.',
      },
      {
        number: '03',
        title: 'Assemblé au Maroc',
        text: 'Nos flacons sont finis et contrôlés à Casablanca, puis garantis à vie par la maison.',
      },
    ],
    cta: 'Parler à un conseiller',
    imageAlt: 'Flacon Makhsouse Oud, pièce signature de la maison NOUR EL OUD',
  },

  /**
   * The two audiences, shown as the primary cards on the homepage and used as
   * the hero copy of `/categories/homme` and `/categories/femme`.
   */
  audience: {
    eyebrow: 'Explorez',
    title: 'Pour lui, pour elle',
    subtitle:
      'Chaque univers réunit les parfums arabes & oud et les parfums de marque de la même audience.',
    discover: 'Découvrir',
    items: {
      homme: {
        eyebrow: 'Pour lui',
        name: 'Homme',
        tagline: 'Oud fumé, ambre massif et cuir : la collection masculine.',
        description:
          'Toutes les fragrances masculines de la maison, réunies en deux gammes : les parfums arabes & oud et les parfums de marque.',
        metaTitle: 'Parfums Homme | NOUR EL OUD',
        metaDescription:
          'Découvrez tous les parfums pour homme de NOUR EL OUD : parfums arabes & oud et parfums de marque. Livraison partout au Maroc, paiement à la livraison.',
      },
      femme: {
        eyebrow: 'Pour elle',
        name: 'Femme',
        tagline: 'Rose, ambre et musc : la collection féminine.',
        description:
          'Toutes les fragrances féminines de la maison, réunies en deux gammes : les parfums arabes & oud et les parfums de marque.',
        metaTitle: 'Parfums Femme | NOUR EL OUD',
        metaDescription:
          'Découvrez tous les parfums pour femme de NOUR EL OUD : parfums arabes & oud et parfums de marque. Livraison partout au Maroc, paiement à la livraison.',
      },
    },
  },

  /**
   * The two catalogue lines, shown as cards on the homepage and used as the
   * hero copy of `/categories/parfums-arabes-oud` and `/categories/parfums-de-marque`.
   */
  ranges: {
    eyebrow: 'Nos gammes',
    title: 'Deux gammes, une même exigence',
    subtitle:
      'Des oud et des ambrées de la maison aux signatures internationales, chaque flacon est présenté avec sa vraie nature.',
    discover: 'Découvrir',
    items: {
      'arabes-oud': {
        eyebrow: 'Orient · Oud · Ambre',
        name: 'Parfums Arabes & Oud',
        tagline: 'Oud, ambre, musc et compositions arabes, sélectionnés pour leur tenue.',
        description:
          'Oud, ambre, musc et compositions arabes : les parfums qui font la signature de la maison. Des bois fumés aux ambrées lumineuses, chaque flacon est choisi pour sa tenue et sa noblesse.',
        metaTitle: 'Parfums Arabes & Oud | NOUR EL OUD',
        metaDescription:
          'Découvrez notre collection de parfums arabes et d’oud : oud, ambre, musc et compositions arabes. Livraison partout au Maroc, paiement à la livraison.',
      },
      marques: {
        eyebrow: 'Marques & inspirations',
        name: 'Parfums de Marque',
        tagline: 'Grandes signatures internationales et interprétations olfactives.',
        description:
          'Les grandes signatures internationales et leurs interprétations olfactives, clairement identifiées sur chaque fiche. Chaque référence est publiée avec son prix et sa disponibilité dès qu’ils sont confirmés par nos fournisseurs.',
        metaTitle: 'Parfums de Marque | NOUR EL OUD',
        metaDescription:
          'Parfums de marque et interprétations olfactives des grandes signatures, chez NOUR EL OUD. Renseignez-vous sur la disponibilité et le prix par WhatsApp.',
      },
    },
  },

  /** Copy specific to the category listing pages. */
  category: {
    eyebrow: 'Catégorie',
    breadcrumbHome: 'Accueil',
    backToCollection: 'Voir toute la collection',
    /** Sub-section headings on the audience pages. */
    sections: {
      arabesOud: {
        title: 'Parfums Arabes & Oud',
        note: 'Oud, ambre, musc et compositions arabes de la maison.',
      },
      marques: {
        title: 'Parfums de Marque',
        note: 'Grandes signatures internationales et interprétations olfactives.',
      },
      empty:
        'Aucune référence publiée dans cette gamme pour le moment. Écrivez-nous pour connaître la disponibilité.',
    },
    upcoming: {
      eyebrow: 'À référencer',
      title: 'Références à confirmer',
      priceOnRequest: 'Prix sur demande',
      note:
        'Ces interprétations olfactives sont en cours de référencement : prix, contenance et disponibilité seront publiés dès qu’ils seront confirmés par nos fournisseurs. Écrivez-nous pour en savoir plus.',
      inquire: 'Se renseigner',
    },
  },

  bestsellers: {
    eyebrow: 'Les plus commandés',
    title: 'Best-sellers',
    cta: 'Voir toute la collection',
  },
  promo: {
    eyebrow: 'Édition limitée',
    title: 'Oud Royale',
    description:
      'Une sélection de nos six meilleurs oud, à prix de lancement pour une durée limitée.',
    details: [
      'Livraison offerte dès 500 DH',
      'Paiement à la livraison',
      'Flacons de 50 ml garantis',
    ],
    cta: 'En profiter',
    codeLabel: 'Code',
    imageAlt: 'Flacon Oud Amber Noir, édition limitée',
  },

  why: {
    eyebrow: 'Pourquoi NOUR EL OUD',
    title: 'L’achat en toute simplicité',
    items: {
      delivery: {
        title: 'Livraison partout au Maroc',
        description:
          'Expédition partout au Maroc en 24 à 48 h ouvrables, suivi de commande par WhatsApp.',
      },
      payment: {
        title: 'Paiement à la livraison',
        description:
          'Vous payez seulement lorsque la commande est entre vos mains. Aucun acompte demandé.',
      },
      selection: {
        title: 'Produits soigneusement sélectionnés',
        description:
          'Des flacons finis et contrôlés. Nos concessions sont garanties à vie par la maison.',
      },
      service: {
        title: 'Service client',
        description:
          'Une équipe à Casablanca vous aide à choisir la fragrance qui vous ressemble vraiment.',
      },
    },
  },

  testimonials: {
    eyebrow: 'Ils nous font confiance',
    title: 'Paroles de clients',
    reviews: (count: number) => `${count} avis vérifiés`,
    ratingAria: (rating: number) => `Note : ${rating} sur 5`,
    noticeTitle: 'Contenu provisoire',
    noticeText:
      'Les témoignages ci-dessous sont des exemples de démonstration, pas des avis de clients réels. À remplacer par des avis authentifiés et autorisés avant la mise en ligne.',
    items: {
      salma: {
        quote:
          'Le Sheikh Zayed Oud est une tuerie. J’en ai offert à mon frère pour son mariage, il n’en parlait plus.',
        name: 'Salma B.',
        city: 'Casablanca',
      },
      youssef: {
        quote:
          'Commandé un mardi, reçu le mercredi. Le flacon est lourd, la qualité est là. Impeccable.',
        name: 'Youssef A.',
        city: 'Rabat',
      },
      nadia: {
        quote:
          'J’hésitais entre l’oud et l’ambre. Ils m’ont conseillé Yara sur WhatsApp, c’est exactement ce que je cherchais.',
        name: 'Nadia E.',
        city: 'Marrakech',
      },
    },
  },

  newsletter: {
    eyebrow: 'La lettre',
    title: 'Restez informé',
    subtitle:
      'Les nouvelles compositions, les éditions limitées et les conseils de la maison, directement sur WhatsApp.',
    emailLabel: 'Votre adresse email',
    emailPlaceholder: 'votre@email.com',
    submit: 'S’inscrire',
    note: 'L’inscription se fait via WhatsApp — aucun email n’est stocké.',
  },

  footer: {
    about:
      'Maison de parfum marocaine. Oud, ambre et musc sélectionnés et assemblés à Casablanca.',
    columns: [
      {
        title: 'Collections',
        links: [
          { label: 'Parfums Arabes & Oud', href: '/categories/parfums-arabes-oud' },
          { label: 'Parfums de Marque', href: '/categories/parfums-de-marque' },
          { label: 'Parfums Homme', href: '/categories/homme' },
          { label: 'Parfums Femme', href: '/categories/femme' },
          { label: 'Tous les parfums', href: '#collection' },
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
    ],
    contactTitle: 'Contact',
    location: 'Casablanca, Maroc',
    hours: 'Lun – Sam · 9 h – 19 h',
    writeUs: 'Nous écrire',
    copyright: (year: number) => `© ${year} NOUR EL OUD. Tous droits réservés.`,
    terms: 'Conditions',
    privacy: 'Confidentialité',
  },

  cart: {
    eyebrow: 'Votre sélection',
    title: 'Panier',
    closeAria: 'Fermer le panier',
    dialogAria: 'Panier',
    emptyTitle: 'Votre panier est vide',
    emptyText:
      'Parcourez la collection et ajoutez vos fragrances préférées.',
    browse: 'Découvrir la collection',
    remainingPrefix: 'Plus que',
    remainingSuffix: 'pour la livraison offerte',
    freeShippingUnlocked: 'Livraison offerte débloquée',
    decreaseAria: (name: string) => `Diminuer la quantité de ${name}`,
    increaseAria: (name: string) => `Augmenter la quantité de ${name}`,
    remove: 'Retirer',
    imageAlt: (name: string) => `Parfum ${name}`,
    subtotal: 'Sous-total',
    shippingNote: 'Frais de livraison calculés à la confirmation.',
    checkout: 'Commander via WhatsApp',
  },

  quickview: {
    closeAria: 'Fermer les détails',
    notesLabel: 'Notes',
    concentrationLabel: 'Concentration',
    concentrationValue: 'Eau de Parfum',
    sizeLabel: 'Contenance',
    reviewCount: (count: number) => `${count} avis`,
    addToCart: 'Ajouter au panier',
    added: 'Ajouté au panier',
    viewCart: 'Voir le panier',
    orderWhatsApp: 'Commander sur WhatsApp',
    imageAlt: (name: string) => `Flacon du parfum ${name}`,
  },

  product: {
    viewAria: (name: string) => `Voir le parfum ${name}`,
    imageAlt: (name: string) => `Flacon du parfum ${name}`,
    addAria: (name: string) => `Ajouter ${name} au panier`,
    add: 'Ajouter',
    added: 'Ajouté',
    details: 'Détails',
  },

  filters: {
    gender: {
      Tous: 'Tous',
      Homme: 'Homme',
      Femme: 'Femme',
    },
    family: {
      Toutes: 'Toutes les familles',
      Oud: 'Oud',
      Ambre: 'Ambre',
      Musc: 'Musc',
      Floral: 'Floral',
    },
    price: {
      all: 'Tous les prix',
      lt300: 'Moins de 300 DH',
      mid: '300 – 400 DH',
      gt400: 'Plus de 400 DH',
    },
    brand: {
      all: 'Toutes les marques',
    },
    availability: {
      all: 'Toutes',
      available: 'Disponibles',
      onrequest: 'Sur demande',
    },
    /** Lineage badge shown on every card. */
    lineage: {
      arabe: 'Parfum arabe',
      inspire: 'Inspiré',
      original: 'Original',
    },
    labels: {
      type: 'Type de parfum',
      price: 'Prix',
      brand: 'Marque',
      availability: 'Disponibilité',
    },
  },

  /** Measurement units, appended to a numeric value such as the flacon volume. */
  units: {
    ml: 'ml',
  },

  tags: {
    Bestseller: 'Meilleure vente',
    Signature: 'Signature',
    Doux: 'Doux',
    Exclusif: 'Exclusif',
    Intense: 'Intense',
    Clean: 'Épuré',
    'Coup de cœur': 'Coup de cœur',
    Frais: 'Frais',
    Premium: 'Premium',
    Nouveau: 'Nouveau',
    Élégant: 'Élégant',
    Mystère: 'Mystère',
    Classique: 'Classique',
    Prestige: 'Prestige',
    Puissant: 'Puissant',
  } satisfies Record<ProductTagKey, string>,

  notFound: {
    eyebrow: 'Erreur 404',
    title: 'Page introuvable',
    text: 'La page que vous cherchez n’existe pas ou a été déplacée.',
    cta: 'Retour à l’accueil',
  },

  wa: {
    order: (productName: string) =>
      whatsappLink(
        `Salam, je veux commander ${productName}. Merci de me confirmer la disponibilité et la livraison.`,
      ),
    cart: (lines: { name: string; quantity: number; price: number }[]) => {
      const total = lines.reduce((sum, line) => sum + line.price * line.quantity, 0)
      const detail = lines
        .map((line) => `• ${line.name} x${line.quantity} — ${line.price * line.quantity} DH`)
        .join('\n')
      return whatsappLink(
        `Salam, je souhaite commander :\n${detail}\n\nTotal : ${total} DH\nMerci de me confirmer la disponibilité et la livraison.`,
      )
    },
    newsletter: (email: string) =>
      whatsappLink(
        `Bonjour, je souhaite m’inscrire à la lettre d’information NOUR EL OUD.\n\nMon email : ${email.trim()}`,
      ),
    inquire: (productName: string) =>
      whatsappLink(
        `Salam, je souhaite des informations sur ${productName} : prix, format et disponibilité.`,
      ),
    advice: whatsappLink(
      'Bonjour, je voudrais des conseils pour choisir un parfum.',
    ),
    question: whatsappLink('Bonjour NOUR EL OUD, j’ai une question.'),
    info: whatsappLink(
      'Bonjour NOUR EL OUD, je souhaite avoir plus d’informations.',
    ),
  },
}
