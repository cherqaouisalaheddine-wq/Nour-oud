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
      // Concise on purpose: the full category names ("Parfums Orientaux & Oud",
      // "Parfums de Marque & Autres Fragrances") are shown on the homepage cards,
      // in the mobile menu and as each page's title, where there is room.
      oriental: 'Orientaux',
      designer: 'Marques',
      collections: 'Collections',
      men: 'Homme',
      women: 'Femme',
      about: 'À propos',
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

  categories: {
    eyebrow: 'Explorer',
    title: 'Par famille',
    subtitle: 'Chaque famille olfactive a sa propre température. Trouvez la vôtre.',
    comingSoon: 'Bientôt disponible',
    viewCollection: 'Voir la collection',
    items: {
      homme: {
        eyebrow: 'Pour lui',
        name: 'Parfums Homme',
        description:
          'Oud fumé, ambre massif et cuir. Des compositions structurées pour une présence qui ne demande pas confirmation.',
      },
      femme: {
        eyebrow: 'Pour elle',
        name: 'Parfums Femme',
        description:
          'Rose de Damas, ambre suifé et musc blanc. Des floralisations chaudes qui tiennent jusqu’au bout de la nuit.',
      },
      oud: {
        eyebrow: 'Le roi des parfums',
        name: 'Oud',
        description:
          'Bois d’agar fumé, la famille la plus profonde et la plus tenace de la maison. Notre signature.',
      },
      unisex: {
        eyebrow: 'Bientôt disponible',
        name: 'Unisex',
        description:
          'Des compositions partagées, pensées pour n’appartenir à personne. Ouverture prochaine.',
      },
      coffrets: {
        eyebrow: 'Bientôt disponible',
        name: 'Coffrets',
        description:
          'Coffrets découverte et éditions cadeaux, assemblés à la main à Casablanca. Bientôt disponible.',
      },
    },
  },

  /**
   * The two top-level universes shown as large cards on the homepage and used
   * as the hero copy of each listing page.
   */
  univers: {
    eyebrow: 'Nos univers',
    title: 'Deux univers, une même exigence',
    subtitle:
      'Des oud et des ambrées de la maison aux grandes signatures internationales : choisissez le territoire qui vous ressemble.',
    discover: 'Découvrir',
    items: {
      orientaux: {
        eyebrow: 'Orient · Oud · Ambre',
        name: 'Parfums Orientaux & Oud',
        tagline: 'Oud, ambre, musc et compositions arabes, sélectionnés pour leur tenue.',
        description:
          'Oud, ambre, musc et compositions arabes : les parfums qui font la signature de la maison. Des bois fumés aux ambrées lumineuses, chaque flacon est choisi pour sa tenue et sa noblesse.',
        metaTitle: 'Parfums Orientaux & Oud | NOUR EL OUD',
        metaDescription:
          'Découvrez notre collection de parfums orientaux et d’oud : oud, ambre, musc et compositions arabes. Livraison partout au Maroc, paiement à la livraison.',
      },
      marques: {
        eyebrow: 'Marques internationales',
        name: 'Parfums de Marque & Autres Fragrances',
        tagline: 'Prada, Afnan 9PM, Night Blue et d’autres signatures contemporaines.',
        description:
          'Prada, Afnan 9PM, Night Blue et d’autres grandes signatures contemporaines. Ces références sont en cours de référencement : nous les publions dès que le prix et la disponibilité sont confirmés par nos fournisseurs.',
        metaTitle: 'Parfums de Marque & Autres Fragrances | NOUR EL OUD',
        metaDescription:
          'Prada, Afnan 9PM, Night Blue et d’autres signatures contemporaines chez NOUR EL OUD. Renseignez-vous sur la disponibilité et le prix par WhatsApp.',
      },
    },
  },

  /** Copy specific to the universe listing pages. */
  category: {
    eyebrow: 'Catégorie',
    breadcrumbHome: 'Accueil',
    backToCollection: 'Voir toute la collection',
    upcoming: {
      eyebrow: 'Bientôt disponibles',
      title: 'Références à confirmer',
      badge: 'Informations à confirmer',
      priceOnRequest: 'Prix sur demande',
      note:
        'Nous référençons actuellement ces fragrances. Prix, format et disponibilité seront publiés dès qu’ils seront confirmés par nos fournisseurs. Écrivez-nous pour en savoir plus.',
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
          { label: 'Parfums Orientaux & Oud', href: '/categories/parfums-orientaux-oud' },
          { label: 'Parfums de Marque & Autres', href: '/categories/parfums-de-marque' },
          { label: 'Tous les parfums', href: '#collection' },
          { label: 'Parfums Homme', href: '#collection?genre=Homme' },
          { label: 'Parfums Femme', href: '#collection?genre=Femme' },
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
    concentrationValue: 'Eau de Parfum · 50 ml',
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
