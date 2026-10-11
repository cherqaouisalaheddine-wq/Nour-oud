'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Check, ChevronDown } from 'lucide-react'
import {
  locales,
  localeFlags,
  localeNames,
  type Locale,
} from '@/lib/i18n/config'
import { useI18n } from '@/components/i18n/locale-provider'

/**
 * Swaps the locale segment of the current URL while keeping the in-page anchor,
 * so switching language from the middle of the storefront returns the visitor to
 * the section they were reading.
 */
function useLocaleSwitch() {
  const { locale } = useI18n()
  const router = useRouter()
  const pathname = usePathname()

  return (next: Locale) => {
    if (next === locale) return
    const suffix = pathname.replace(/^\/(fr|ar)(?=\/|$)/, '')
    const hash = typeof window === 'undefined' ? '' : window.location.hash
    router.push(`/${next}${suffix}${hash}`)
  }
}

/**
 * Header language selector.
 *
 * A dropdown on the desktop bar; the mobile menu uses `LanguageOptions` instead
 * because the header row has no room for a third control at that width.
 */
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, dict } = useI18n()
  const switchTo = useLocaleSwitch()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${dict.header.languageAria} — ${localeNames[locale]}`}
        className="flex h-11 items-center gap-1.5 px-2 text-[0.6875rem] tracking-[0.14em] uppercase transition-colors hover:text-[var(--champagne)]"
      >
        <span aria-hidden="true" className="text-sm leading-none">
          {localeFlags[locale]}
        </span>
        <span className="hidden lg:inline">{localeNames[locale]}</span>
        <span aria-hidden="true" className="lg:hidden">
          {locale.toUpperCase()}
        </span>
        <ChevronDown
          className={`size-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={dict.header.languageLabel}
          className="absolute end-0 top-full z-80 mt-1 min-w-44 border border-[var(--hairline)] bg-[var(--bone)] py-1 shadow-xl"
        >
          {locales.map((code) => {
            const active = code === locale
            return (
              <li key={code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    switchTo(code)
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-start text-sm transition-colors hover:bg-[var(--bone-deep)] ${
                    active ? 'text-[var(--ink)]' : 'text-[var(--ink-muted)]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span aria-hidden="true">{localeFlags[code]}</span>
                    {localeNames[code]}
                  </span>
                  {active && (
                    <Check
                      className="size-4 text-[var(--champagne)]"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

/** Two-up language control for the mobile menu, where there is room to label it. */
export function LanguageOptions({ className = '' }: { className?: string }) {
  const { locale, dict } = useI18n()
  const switchTo = useLocaleSwitch()

  return (
    <div className={className}>
      <p className="text-[0.5625rem] tracking-[0.22em] uppercase text-[var(--ink-muted)]">
        {dict.header.languageLabel}
      </p>
      <div
        className="mt-3 grid grid-cols-2 gap-px border border-[var(--hairline)] bg-[var(--hairline)]"
        role="group"
        aria-label={dict.header.languageAria}
      >
        {locales.map((code) => {
          const active = code === locale
          return (
            <button
              key={code}
              type="button"
              onClick={() => switchTo(code)}
              aria-pressed={active}
              className={`flex items-center justify-center gap-2 py-3 text-sm transition-colors ${
                active
                  ? 'bg-[var(--ink)] text-[var(--bone)]'
                  : 'bg-[var(--bone)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
              }`}
            >
              <span aria-hidden="true">{localeFlags[code]}</span>
              {localeNames[code]}
            </button>
          )
        })}
      </div>
    </div>
  )
}
