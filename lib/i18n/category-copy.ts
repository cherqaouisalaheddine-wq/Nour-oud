import type { Dictionary } from '@/lib/i18n/dictionaries/types'
import { categoryMeta, type CategoryId } from '@/lib/categories'

/**
 * Resolves the localized copy block of a category.
 *
 * Audience pages read from `dict.audience.items`, range pages from
 * `dict.ranges.items`; both blocks share the same shape, so a single helper
 * keeps the hero and the page metadata in sync.
 */
export function categoryCopy(dict: Dictionary, id: CategoryId) {
  const meta = categoryMeta[id]
  return meta.kind === 'range'
    ? dict.ranges.items[meta.range]
    : dict.audience.items[meta.audience]
}
