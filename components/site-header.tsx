'use client'

import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navigation, siteConfig } from '@/lib/site'
import { useCart } from '@/components/cart/cart-provider'

type SiteHeaderProps = {
  query: string
  onQueryChange: (value: string) => void
  searchOpen: boolean
  onSearchToggle: () => void
}

export function SiteHeader({
  query,
  onQueryChange,
  searchOpen,
  onSearchToggle,
}: SiteHeaderProps) {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { itemCount, open, hydrated } = useCart()

  // Solid background only once the hero has started scrolling away, so the
  // transparent-over-hero state is preserved at rest.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!mobileMenu) return
    const media = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (media.matches) setMobileMenu(false)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [mobileMenu])

  return (
    <>
      <div className="bg-[var(--ink)] px-4 py-2.5 text-center text-[0.5625rem] tracking-[0.18em] uppercase text-[var(--bone)]/80">
        {siteConfig.announcement}
      </div>

      <header
        className={`sticky top-0 z-70 transition-colors duration-500 ${
          scrolled
            ? 'border-b border-[var(--hairline)] bg-[var(--bone)]/92 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenu((open) => !open)}
            aria-label={mobileMenu ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileMenu}
            aria-controls="menu-mobile"
            className="-ml-2 flex size-11 items-center justify-center lg:hidden"
          >
            {mobileMenu ? (
              <X className="size-5" strokeWidth={1.5} />
            ) : (
              <Menu className="size-5" strokeWidth={1.5} />
            )}
          </button>

          <a href="#accueil" className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-9 items-center justify-center border border-[var(--champagne)] text-[0.6875rem] tracking-[0.1em] text-[var(--champagne)]"
            >
              N
            </span>
            <span className="flex flex-col leading-none">
              {/* "NOUR EL OUD" is wider than the previous wordmark, so the
                  tracking/size step down on small screens to keep the mobile
                  header from overflowing. Desktop is unchanged. */}
              <span className="font-[family-name:var(--font-display)] text-base tracking-[0.12em] lg:text-xl lg:tracking-[0.22em]">
                {siteConfig.name}
              </span>
              <span className="mt-1 text-[0.5rem] tracking-[0.3em] uppercase text-[var(--ink-muted)]">
                {siteConfig.tagline}
              </span>
            </span>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative py-2 text-[0.6875rem] font-medium tracking-[0.14em] uppercase"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[var(--champagne)] transition-transform duration-500 group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onSearchToggle}
              aria-label="Rechercher"
              aria-expanded={searchOpen}
              className="flex size-11 items-center justify-center transition-colors hover:text-[var(--champagne)]"
            >
              <Search className="size-5" strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={open}
              aria-label={`Ouvrir le panier, ${itemCount} article${itemCount > 1 ? 's' : ''}`}
              className="relative flex size-11 items-center justify-center transition-colors hover:text-[var(--champagne)]"
            >
              <ShoppingBag className="size-5" strokeWidth={1.5} />
              {/* Count is suppressed until hydration so SSR markup matches. */}
              {hydrated && itemCount > 0 && (
                <span className="absolute top-1 right-0.5 flex size-[1.125rem] items-center justify-center rounded-full bg-[var(--champagne)] text-[0.5625rem] font-medium tabular-nums">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search field */}
        <div
          className={`overflow-hidden border-t border-[var(--hairline)] transition-[max-height,opacity] duration-500 ${
            searchOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!searchOpen}
        >
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-3 lg:px-8">
            <Search
              className="size-4 shrink-0 text-[var(--ink-muted)]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <label htmlFor="catalogue-search" className="sr-only">
              Rechercher un parfum
            </label>
            <input
              id="catalogue-search"
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Rechercher un parfum, une note, une famille…"
              tabIndex={searchOpen ? 0 : -1}
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-[var(--ink-muted)]"
            />
          </div>
        </div>
      </header>

      {/* Mobile navigation panel */}
      <div
        id="menu-mobile"
        className={`fixed inset-0 top-18 z-60 lg:hidden ${
          mobileMenu ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!mobileMenu}
      >
        <button
          type="button"
          tabIndex={mobileMenu ? 0 : -1}
          aria-label="Fermer le menu"
          onClick={() => setMobileMenu(false)}
          className={`absolute inset-0 h-full w-full cursor-default bg-[var(--ink)]/40 transition-opacity duration-400 ${
            mobileMenu ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <nav
          aria-label="Navigation mobile"
          className={`absolute inset-x-0 top-0 border-b border-[var(--hairline)] bg-[var(--bone)] px-5 pt-6 pb-8 transition-all duration-500 ${
            mobileMenu
              ? 'translate-y-0 opacity-100'
              : '-translate-y-3 opacity-0'
          }`}
        >
          <ul className="flex flex-col">
            {navigation.map((item, index) => (
              <li key={item.label} className="border-b border-[var(--hairline)]">
                <a
                  href={item.href}
                  tabIndex={mobileMenu ? 0 : -1}
                  onClick={() => setMobileMenu(false)}
                  className="flex items-baseline gap-4 py-4"
                >
                  <span className="w-6 text-[0.5625rem] tracking-[0.14em] text-[var(--champagne)] tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-2xl">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#newsletter"
            tabIndex={mobileMenu ? 0 : -1}
            onClick={() => setMobileMenu(false)}
            className="btn-ink mt-6 w-full"
          >
            Recevoir nos nouveautés
          </a>
        </nav>
      </div>
    </>
  )
}