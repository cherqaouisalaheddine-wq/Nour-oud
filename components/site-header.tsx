'use client'

import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { localePath, type Locale } from '@/lib/i18n/config'
import { navItems, type NavItem } from '@/lib/site'
import { categoryPath } from '@/lib/categories'
import { useCart } from '@/components/cart/cart-provider'
import { useI18n } from '@/components/i18n/locale-provider'
import { LanguageOptions, LanguageSwitcher } from '@/components/i18n/language-switcher'

/**
 * Every nav entry resolves to a locale-prefixed URL.
 *
 * A bare `#collection` only works while the visitor is already on the homepage;
 * prefixing the locale makes the same link work from a category page too, and
 * the browser still treats it as a same-document jump when the path matches.
 */
function navHref(item: NavItem, locale: Locale) {
  return 'categoryId' in item
    ? categoryPath(locale, item.categoryId)
    : `${localePath(locale)}${item.href}`
}

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
  const { dict, locale } = useI18n()
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

  // Switching language is a navigation; make sure the panel is not left open.
  useEffect(() => {
    setMobileMenu(false)
  }, [locale])

  return (
    <>
      <div className="bg-[var(--ink)] px-4 py-2.5 text-center text-[0.5625rem] tracking-[0.18em] uppercase text-[var(--bone)]/80">
        {dict.announcement}
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
            aria-label={mobileMenu ? dict.nav.menuClose : dict.nav.menuOpen}
            aria-expanded={mobileMenu}
            aria-controls="menu-mobile"
            className="-ms-2 flex size-11 items-center justify-center lg:hidden"
          >
            {mobileMenu ? (
              <X className="size-5" strokeWidth={1.5} />
            ) : (
              <Menu className="size-5" strokeWidth={1.5} />
            )}
          </button>

          <a href={localePath(locale)} className="flex items-center gap-3">
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
                NOUR EL OUD
              </span>
              <span className="mt-1 text-[0.5rem] tracking-[0.3em] uppercase text-[var(--ink-muted)]">
                {dict.brand.tagline}
              </span>
            </span>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label={dict.nav.ariaPrimary}>
            {navItems.map((item) => (
              <a
                key={item.key}
                href={navHref(item, locale)}
                className="group relative py-2 text-[0.6875rem] font-medium tracking-[0.14em] whitespace-nowrap uppercase"
              >
                {dict.nav.items[item.key]}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[var(--champagne)] transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right"
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <LanguageSwitcher className="hidden sm:block" />

            <button
              type="button"
              onClick={onSearchToggle}
              aria-label={dict.header.searchAria}
              aria-expanded={searchOpen}
              className="flex size-11 items-center justify-center transition-colors hover:text-[var(--champagne)]"
            >
              <Search className="size-5" strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={open}
              aria-label={dict.header.cartAria(itemCount)}
              className="relative flex size-11 items-center justify-center transition-colors hover:text-[var(--champagne)]"
            >
              <ShoppingBag className="size-5" strokeWidth={1.5} />
              {/* Count is suppressed until hydration so SSR markup matches. */}
              {hydrated && itemCount > 0 && (
                <span className="absolute top-1 end-0.5 flex size-[1.125rem] items-center justify-center rounded-full bg-[var(--champagne)] text-[0.5625rem] font-medium tabular-nums">
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
              {dict.header.searchLabel}
            </label>
            <input
              id="catalogue-search"
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder={dict.header.searchPlaceholder}
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
          aria-label={dict.nav.menuClose}
          onClick={() => setMobileMenu(false)}
          className={`absolute inset-0 h-full w-full cursor-default bg-[var(--ink)]/40 transition-opacity duration-400 ${
            mobileMenu ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <nav
          aria-label={dict.nav.ariaMobile}
          className={`absolute inset-x-0 top-0 max-h-[calc(100svh-4.5rem)] overflow-y-auto border-b border-[var(--hairline)] bg-[var(--bone)] px-5 pt-6 pb-8 transition-all duration-500 ${
            mobileMenu
              ? 'translate-y-0 opacity-100'
              : '-translate-y-3 opacity-0'
          }`}
        >
          <ul className="flex flex-col">
            {navItems.map((item, index) => {
              // Category entries show their full, official name in the menu;
              // the long wording wraps instead of overflowing a narrow phone.
              const isCategory = 'categoryId' in item
              const label = isCategory
                ? dict.univers.items[item.categoryId].name
                : dict.nav.items[item.key]
              return (
                <li key={item.key} className="border-b border-[var(--hairline)]">
                  <a
                    href={navHref(item, locale)}
                    tabIndex={mobileMenu ? 0 : -1}
                    onClick={() => setMobileMenu(false)}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className="w-6 shrink-0 text-[0.5625rem] tracking-[0.14em] text-[var(--champagne)] tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`min-w-0 font-[family-name:var(--font-display)] ${
                        isCategory ? 'text-xl leading-snug sm:text-2xl' : 'text-2xl'
                      }`}
                    >
                      {label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>

          <LanguageOptions className="mt-6" />

          <a
            href={`${localePath(locale)}#newsletter`}
            tabIndex={mobileMenu ? 0 : -1}
            onClick={() => setMobileMenu(false)}
            className="btn-ink mt-6 w-full"
          >
            {dict.nav.newsCta}
          </a>
        </nav>
      </div>
    </>
  )
}
