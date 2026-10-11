import { ar } from '@/lib/i18n/dictionaries/ar'
import { fr } from '@/lib/i18n/dictionaries/fr'
import type { Dictionary } from '@/lib/i18n/dictionaries/types'
import type { Locale } from '@/lib/i18n/config'

/** Every locale's dictionary, keyed by locale code. */
export const dictionaries: Record<Locale, Dictionary> = { fr, ar }

/** Resolves a dictionary, always falling back to French. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.fr
}

export type { Dictionary }
