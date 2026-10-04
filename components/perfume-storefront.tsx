'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, Check, ChevronDown, Menu, MessageCircle, Search, ShoppingBag, Sparkles, Star, X } from 'lucide-react'

const WHATSAPP_NUMBER = '212600000000'

const products = [
  { name: 'Ameerat Oud Amber', nameAr: 'أميرات عود أمبر', price: 349, gender: 'Femme', category: 'Amber', notes: 'Ambre · Oud · Rose', image: '/products/ameerat.jpg', color: 'from-[#5d2b19] to-[#b86b32]', tag: 'Bestseller' },
  { name: 'White', nameAr: 'وايت', price: 389, gender: 'Femme', category: 'Musk', notes: 'Musc blanc · Ambre · Fleurs', image: '/products/white.jpg', color: 'from-[#7a3a18] to-[#d8953b]', tag: 'Signature' },
  { name: 'Shams Al Khususi', nameAr: 'شمس الخصوصي', price: 279, gender: 'Homme', category: 'Oud', notes: 'Oud · Safran · Bois précieux', image: '/products/red-oud.jpg', color: 'from-[#713b42] to-[#d49aa0]', tag: 'Doux' },
  { name: 'Lailat Al Arab', nameAr: 'ليلة العرب', price: 429, gender: 'Femme', category: 'Floral', notes: 'Rose · Ambre · Musc', image: '/products/lailat-al-arab.jpg', color: 'from-[#1f2c31] to-[#607379]', tag: 'Exclusif' },
  { name: 'Qasas Hudson', nameAr: 'قصص هدسون', price: 359, gender: 'Homme', category: 'Oud', notes: 'Oud · Ambre · Épices', image: '/products/qasas-hudson.jpg', color: 'from-[#1d2022] to-[#61615d]', tag: 'Intense' },
  { name: 'Qasas Inferial', nameAr: 'قصص إمبريال', price: 249, gender: 'Homme', category: 'Oud', notes: 'Oud · Ambre · Bois précieux', image: '/products/qasas-inferial.jpg', color: 'from-[#6e6c5d] to-[#c8c0a7]', tag: 'Clean' },
  { name: 'Qasas Only One', nameAr: 'قصص أونلي وان', price: 319, gender: 'Homme', category: 'Oud', notes: 'Oud rouge · Ambre · Cuir', image: '/products/qasas-only-one.jpg', color: 'from-[#3d251d] to-[#99714f]', tag: 'Coup de cœur' },
  { name: 'Qasas Blush', nameAr: 'قصص بلاش', price: 289, gender: 'Femme', category: 'Floral', notes: 'Rose · Jasmin · Musc', image: '/products/qasas-blush.jpg', color: 'from-[#62664d] to-[#d1c791]', tag: 'Frais' },
  { name: 'Malikat Al Arab', nameAr: 'ملكة العرب', price: 499, gender: 'Femme', category: 'Amber', notes: 'Ambre · Rose · Oud', image: '/products/malikat-al-arab.jpg', color: 'from-[#261714] to-[#8b4d2f]', tag: 'Premium' },
  { name: 'Najdi', nameAr: 'نجدي', price: 329, gender: 'Homme', category: 'Oud', notes: 'Oud · Cuir · Ambre', image: '/products/najdi.jpg', color: 'from-[#171717] to-[#80684d]', tag: 'Nouveau' },
  { name: 'Ameer Al Oudh White', nameAr: 'أمير العود الأبيض', price: 349, gender: 'Homme', category: 'Oud', notes: 'Oud blanc · Ambre · Bois', image: '/products/ameer-al-oudh-white.jpg', color: 'from-[#d7c6a5] to-[#fff6df]', tag: 'Élégant' },
  { name: 'Lailat Khamis', nameAr: 'ليلة خميس', price: 379, gender: 'Homme', category: 'Oud', notes: 'Oud · Épices · Bois précieux', image: '/products/lailat-khamis.jpg', color: 'from-[#171717] to-[#9b712d]', tag: 'Intense' },
  { name: 'Sheikh Zayed Ataa', nameAr: 'شيخ زايد عطاء', price: 399, gender: 'Homme', category: 'Amber', notes: 'Ambre · Cuir · Safran', image: '/products/sheikh-zayed-ataa.jpg', color: 'from-[#3d1714] to-[#9b6935]', tag: 'Signature' },
  { name: 'Sheikh Zayed Musk', nameAr: 'شيخ زايد مسك', price: 369, gender: 'Homme', category: 'Musk', notes: 'Musc blanc · Ambre · Rose', image: '/products/sheikh-zayed-musk.jpg', color: 'from-[#e9e0d1] to-[#718b68]', tag: 'Doux' },
  { name: 'Oud Amber Bleu', nameAr: 'عود أمبر بلو', price: 389, gender: 'Homme', category: 'Oud', notes: 'Oud · Ambre · Notes marines', image: '/products/manasik-oud-amber-bleu.jpg', color: 'from-[#0b2236] to-[#b58b40]', tag: 'Exclusif' },
  { name: 'Sheikh Zayed Oud', nameAr: 'شيخ زايد عود', price: 429, gender: 'Homme', category: 'Oud', notes: 'Oud · Bois fumé · Ambre', image: '/products/sheikh-zayed-oud.jpg', color: 'from-[#11100e] to-[#b5823d]', tag: 'Premium' },
  { name: 'Oud Amber Noir', nameAr: 'عود أمبر نوار', price: 419, gender: 'Homme', category: 'Oud', notes: 'Oud noir · Ambre · Cuir', image: '/products/manasik-oud-amber-noir.jpg', color: 'from-[#0e0c0b] to-[#8c5a22]', tag: 'Mystère' },
  { name: 'Ameer Al Oudh Original', nameAr: 'أمير العود الأصلي', price: 359, gender: 'Homme', category: 'Oud', notes: 'Oud · Ambre · Bois', image: '/products/ameer-al-oudh-original.jpg', color: 'from-[#1a1410] to-[#d1a05b]', tag: 'Classique' },
  { name: 'Makhsouse Oud', nameAr: 'مخصوص عود', price: 449, gender: 'Homme', category: 'Oud', notes: 'Oud précieux · Ambre · Musc', image: '/products/makhsouse-oud.jpg', color: 'from-[#151313] to-[#9c692d]', tag: 'Prestige' },
]

function whatsappLink(product: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Salam, je veux commander ${product}. Merci de me confirmer la disponibilité et la livraison.`)}`
}

function Bottle({ color, image, alt }: { color: string; image?: string; alt: string }) {
  return (
    <div className="relative flex h-full items-end justify-center overflow-hidden rounded-[1.5rem] bg-[#eee8dd]">
      {image ? <img src={image} alt={alt} className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105" /> : <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-90`} />}
      <div className="absolute -right-10 -top-12 size-36 rounded-full border border-white/20 bg-white/10 blur-sm" />
    </div>
  )
}

export function PerfumeStorefront() {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | null>(null)
  const categories = ['Tous', 'Homme', 'Femme']
  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = activeCategory === 'Tous' || product.gender === activeCategory
    const matchesQuery = `${product.name} ${product.nameAr} ${product.notes}`.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  }), [activeCategory, query])

  return (
    <main className="min-h-screen bg-[#f7f3ed] text-[#241913]">
      <div className="bg-[#2a1b15] px-4 py-2 text-center text-[11px] tracking-[0.15em] text-[#efcf8c]">LIVRAISON OFFERTE À PARTIR DE 500 DH · PAIEMENT À LA LIVRAISON</div>
      <header className="sticky top-0 z-20 border-b border-[#e7ddd0] bg-[#f7f3ed]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <button className="lg:hidden" aria-label="Ouvrir le menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
          <a href="#accueil" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#2a1b15] text-[#efcf8c]"><Sparkles /></div>
            <div><p className="font-serif text-xl font-semibold tracking-[0.14em]">NOUR OUD</p><p className="text-[9px] uppercase tracking-[0.3em] text-[#8d6e55]">Parfums d’exception</p></div>
          </a>
          <nav className={`${mobileMenu ? 'absolute left-0 top-full flex w-full flex-col border-b border-[#e7ddd0] bg-[#f7f3ed] p-5' : 'hidden'} gap-5 text-sm font-medium lg:static lg:flex lg:flex-row lg:border-0 lg:bg-transparent lg:p-0`}>
            <a href="#collection" onClick={() => setMobileMenu(false)} className="hover:text-[#a9783a]">La collection</a><a href="#histoire" onClick={() => setMobileMenu(false)} className="hover:text-[#a9783a]">Notre histoire</a><a href="#conseils" onClick={() => setMobileMenu(false)} className="hover:text-[#a9783a]">Conseils parfum</a>
          </nav>
          <div className="flex items-center gap-2"><button aria-label="Rechercher" className="rounded-full p-2 hover:bg-[#eee8dd]" onClick={() => setSearchOpen(!searchOpen)}><Search /></button><a href="#collection" aria-label="Voir la collection" className="rounded-full bg-[#2a1b15] p-2 text-[#efcf8c] hover:bg-[#4a3025]"><ShoppingBag /></a></div>
        </div>
        {searchOpen && <div className="border-t border-[#e7ddd0] px-5 py-3"><div className="mx-auto flex max-w-7xl items-center gap-2"><Search className="text-[#8d6e55]" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un parfum..." className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-[#a89582]" /></div></div>}
      </header>

      <section id="accueil" className="mx-auto grid max-w-7xl gap-7 px-5 pb-16 pt-8 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-12 lg:px-8 lg:pb-24 lg:pt-14">
        <div className="order-2 lg:order-1"><p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#a9783a]">L’art du parfum oriental</p><h1 className="max-w-xl font-serif text-5xl leading-[.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl">Le parfum qui <em className="font-normal text-[#a9783a]">raconte</em> votre histoire.</h1><p className="mt-6 max-w-md text-base leading-7 text-[#765f4d]">Des fragrances profondes, chaleureuses et intemporelles. Chaque goutte de notre collection est une invitation au voyage.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#collection" className="rounded-full bg-[#2a1b15] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#4a3025]">Découvrir la collection <ArrowLeft className="ml-2 inline rotate-180" /></a><a href={whatsappLink('un parfum')} target="_blank" rel="noreferrer" className="rounded-full border border-[#cdbda8] px-6 py-3.5 text-sm font-semibold hover:border-[#2a1b15]">Nous écrire sur WhatsApp</a></div><div className="mt-9 flex items-center gap-6 text-xs text-[#765f4d]"><span className="flex items-center gap-2"><Check className="text-[#a9783a]" /> 100% authentique</span><span className="flex items-center gap-2"><Check className="text-[#a9783a]" /> Fait au Maroc</span></div></div>
        <div className="order-1 relative min-h-[420px] overflow-hidden rounded-[2rem] lg:order-2 lg:min-h-[590px]"><img src="/oud-hero.png" alt="Flacon de parfum oud entouré de bois précieux" className="absolute inset-0 size-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#241913]/65 via-transparent to-transparent" /><div className="absolute bottom-6 left-6 text-white"><p className="text-xs uppercase tracking-[0.25em] text-[#efcf8c]">Édition signature</p><p className="mt-1 font-serif text-3xl">Oud Royal</p><p className="mt-1 text-sm text-white/75">L’âme des nuits arabes</p></div></div>
      </section>

      <section id="collection" className="bg-[#eee8dd] px-5 py-16 lg:px-8 lg:py-24"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a9783a]">La collection · Homme & Femme</p><h2 className="mt-2 font-serif text-4xl sm:text-5xl">Trouvez votre <em className="font-normal">signature</em></h2></div><div className="flex gap-2 overflow-x-auto pb-1">{categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${activeCategory === category ? 'bg-[#2a1b15] text-white' : 'bg-[#f7f3ed] text-[#765f4d] hover:bg-white'}`}>{category}</button>)}</div></div><div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">{filteredProducts.map((product) => <article key={product.name} className="group cursor-pointer" onClick={() => setSelectedProduct(product)}><div className="relative aspect-[.82] overflow-hidden rounded-[1.25rem]"><Bottle color={product.color} image={product.image} alt={`Parfum ${product.name}`} /><span className="absolute left-3 top-3 rounded-full bg-[#f7f3ed]/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#765f4d]">{product.tag}</span><a href={whatsappLink(product.name)} target="_blank" rel="noreferrer" className="absolute inset-x-3 bottom-3 flex translate-y-12 items-center justify-center gap-2 rounded-full bg-[#25d366] py-2.5 text-xs font-semibold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"><MessageCircle /> Commander</a></div><div className="pt-3"><div className="flex items-start justify-between gap-2"><div><h3 className="font-serif text-lg leading-tight">{product.name}</h3><p className="mt-0.5 text-xs text-[#a9783a]">{product.nameAr}</p></div><p className="whitespace-nowrap text-sm font-semibold">{product.price} DH</p></div><p className="mt-2 text-[11px] text-[#8d7764]">{product.notes}</p></div></article>)}</div>{filteredProducts.length === 0 && <p className="py-16 text-center text-[#765f4d]">Aucun parfum ne correspond à votre recherche.</p>}</div></section>

      <section id="histoire" className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24"><div className="relative overflow-hidden rounded-[2rem] bg-[#2a1b15] p-8 text-[#f7f3ed] sm:p-12"><div className="absolute -right-20 -top-20 size-64 rounded-full border border-[#efcf8c]/20" /><p className="text-xs uppercase tracking-[0.3em] text-[#efcf8c]">Notre promesse</p><h2 className="mt-5 max-w-md font-serif text-4xl leading-tight sm:text-5xl">Des senteurs qui restent. Des souvenirs qui reviennent.</h2><p className="mt-5 max-w-md leading-7 text-[#d7c7b4]">Nous sélectionnons des matières premières nobles pour créer des parfums qui vous ressemblent. L’oud, le musc et l’ambre sont au cœur de notre maison.</p><a href={whatsappLink('un conseil personnalisé')} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#efcf8c] px-5 py-3 text-sm font-semibold text-[#2a1b15]">Parler à un conseiller <MessageCircle /></a></div><div><p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a9783a]">Pourquoi Nour Oud</p><div className="mt-7 flex flex-col gap-7">{[['01', 'Une tenue remarquable', 'Des compositions concentrées, pensées pour vous accompagner du matin jusqu’à la nuit.'], ['02', 'Un rituel sur mesure', 'Besoin d’aide pour choisir ? Notre équipe vous guide par WhatsApp, simplement.'], ['03', 'Livraison partout au Maroc', 'Recevez votre commande rapidement, avec paiement à la livraison.']].map(([number, title, text]) => <div key={number} className="flex gap-5 border-b border-[#e2d8ca] pb-6"><span className="font-serif text-2xl text-[#b89059]">{number}</span><div><h3 className="font-serif text-2xl">{title}</h3><p className="mt-1 text-sm leading-6 text-[#765f4d]">{text}</p></div></div>)}</div></div></section>

      <section id="conseils" className="border-t border-[#e7ddd0] px-5 py-12 text-center lg:px-8"><Star className="mx-auto text-[#a9783a]" /><h2 className="mt-3 font-serif text-3xl">Votre parfum vous attend.</h2><p className="mx-auto mt-2 max-w-md text-sm text-[#765f4d]">Un doute ? Envoyez-nous un message et recevez une recommandation personnalisée.</p><a href={whatsappLink('une recommandation personnalisée')} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25d366] px-6 py-3 text-sm font-semibold text-white"><MessageCircle /> Commander via WhatsApp</a></section>
      {selectedProduct && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#241913]/70 p-4 backdrop-blur-sm" role="presentation" onClick={() => setSelectedProduct(null)}><div role="dialog" aria-modal="true" aria-labelledby="product-dialog-title" className="relative grid w-full max-w-2xl overflow-hidden rounded-[2rem] bg-[#f7f3ed] shadow-2xl sm:grid-cols-2" onClick={(event) => event.stopPropagation()}><button type="button" aria-label="Fermer les détails" onClick={() => setSelectedProduct(null)} className="absolute right-4 top-4 z-10 rounded-full bg-[#f7f3ed]/90 p-2 text-[#2a1b15] shadow-sm"><X /></button><div className="relative min-h-80"><Bottle color={selectedProduct.color} image={selectedProduct.image} alt={`Parfum ${selectedProduct.name}`} /><span className="absolute left-4 top-4 rounded-full bg-[#f7f3ed]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#765f4d]">{selectedProduct.tag}</span></div><div className="flex flex-col justify-center p-7 sm:p-9"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a9783a]">{selectedProduct.category}</p><h2 id="product-dialog-title" className="mt-3 font-serif text-4xl leading-tight">{selectedProduct.name}</h2><p className="mt-1 text-sm text-[#a9783a]">{selectedProduct.nameAr}</p><p className="mt-6 text-sm leading-7 text-[#765f4d]">Une fragrance élégante et chaleureuse, composée de {selectedProduct.notes.toLowerCase()}. Idéale pour révéler votre présence avec caractère.</p><p className="mt-6 font-serif text-2xl">{selectedProduct.price} DH</p><a href={whatsappLink(selectedProduct.name)} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1da851]"><MessageCircle /> Commander sur WhatsApp</a></div></div></div>}
      <footer className="bg-[#2a1b15] px-5 py-7 text-center text-xs text-[#c8b29b]">© 2026 Nour Oud · Parfums d’exception made in Morocco</footer>
    </main>
  )
}
