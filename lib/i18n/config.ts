/**
 * Locale configuration.
 *
 * Two locales, French first because it is the brand's primary language and the
 * default for first-time visitors. This module is intentionally dependency-free
 * so it can be imported from the proxy, server components and client components
 * alike without pulling React into any of them.
 */

export const locales = ['fr', 'ar'] as const

export type Locale = (typeof locales)[number]

/** French is the default: first-time visitors always land on `/fr`. */
export const defaultLocale: Locale = 'fr'

/** Writing direction, applied to `<html dir>` by the locale layout. */
export const localeDirections: Record<Locale, 'ltr' | 'rtl'> = {
  fr: 'ltr',
  ar: 'rtl',
}

/** Endonym — each language is labelled in its own script, as is conventional. */
export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  ar: 'العربية',
}

/** Flag shown next to the endonym in the switcher. */
export const localeFlags: Record<Locale, string> = {
  fr: '🇫🇷',
  ar: '🇲🇦',
}

/** OpenGraph locale codes for localized metadata. */
export const localeOgLocales: Record<Locale, string> = {
  fr: 'fr_MA',
  ar: 'ar_MA',
}

/** BCP-47 tags used for `Intl` formatting and `hreflang` alternates. */
export const localeTags: Record<Locale, string> = {
  fr: 'fr-MA',
  ar: 'ar-MA',
}

/** localStorage key holding the visitor's chosen language. */
export const LANGUAGE_STORAGE_KEY = 'nour-el-oud.lang'

/**
 * Cookie mirroring the language choice. localStorage is invisible to the proxy,
 * so the same preference is also written to a cookie, which lets a returning
 * visitor hitting `/` be redirected to the language they last used.
 */
export const LANGUAGE_COOKIE = 'nour-el-oud-lang'

/** Narrowing guard for untrusted input (route params, storage values). */
export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}

/** Builds an in-page path for a locale, e.g. `/ar`. */
export function localePath(locale: Locale) {
  return `/${locale}`
}
