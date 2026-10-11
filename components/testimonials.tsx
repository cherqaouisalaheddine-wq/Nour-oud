'use client'

import { Quote, Star } from 'lucide-react'
import { PLACEHOLDER_TESTIMONIALS, siteConfig, testimonialMeta } from '@/lib/site'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/components/i18n/locale-provider'

/**
 * PLACEHOLDER CONTENT — NOT FOR PRODUCTION.
 *
 * The quotes in the dictionaries are written examples, not real customers. They
 * render so the layout can be reviewed, and `PLACEHOLDER_TESTIMONIALS` in
 * lib/site.ts surfaces a visible notice above them. Replace every dictionary
 * entry with real, permissioned reviews and set that flag to false before going
 * live.
 */
export function Testimonials() {
  const { dict } = useI18n()

  return (
    <section id="temoignages" className="bg-[var(--bone)] px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">{dict.testimonials.eyebrow}</p>
              <h2 className="section-title mt-4">{dict.testimonials.title}</h2>
            </div>
            <p className="text-sm text-[var(--ink-muted)] tabular-nums">
              <span className="text-[var(--ink)]">{siteConfig.rating.value}</span> / 5
              <span className="mx-2 text-[var(--hairline-strong)]">|</span>
              {dict.testimonials.reviews(siteConfig.rating.count)}
            </p>
          </div>
        </Reveal>

        {PLACEHOLDER_TESTIMONIALS && (
          <div
            role="note"
            className="mt-8 border-s-2 border-[var(--champagne)] bg-[var(--bone-deep)] px-5 py-4"
          >
            <p className="text-xs leading-relaxed tracking-wide text-[var(--ink-muted)]">
              <span className="font-medium tracking-[0.1em] uppercase">
                {dict.testimonials.noticeTitle}
              </span>{' '}
              — {dict.testimonials.noticeText}
            </p>
          </div>
        )}

        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonialMeta.map((testimonial, index) => {
            const copy = dict.testimonials.items[testimonial.id]
            return (
              <Reveal as="li" key={testimonial.id} delay={index * 90}>
                <div className="flex h-full flex-col border border-[var(--hairline)] bg-[var(--bone)] px-7 py-9 transition-colors duration-500 hover:border-[var(--champagne)]/50">
                  <div className="flex items-center justify-between">
                    <Quote
                      className="size-6 text-[var(--champagne)] rtl:-scale-x-100"
                      strokeWidth={1}
                      aria-hidden="true"
                    />
                    <div
                      className="flex gap-0.5"
                      aria-label={dict.testimonials.ratingAria(testimonial.rating)}
                    >
                      {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className="size-3 fill-[var(--champagne)] text-[var(--champagne)]"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>

                  <blockquote className="mt-6 flex-1">
                    <p className="font-[family-name:var(--font-display)] text-lg leading-[1.7] text-[var(--ink-soft)]">
                      &laquo;&nbsp;{copy.quote}&nbsp;&raquo;
                    </p>
                  </blockquote>

                  <footer className="mt-8 border-t border-[var(--hairline)] pt-5">
                    <p className="text-sm font-medium">{copy.name}</p>
                    <p className="mt-0.5 text-xs text-[var(--ink-muted)]">
                      {copy.city} · {testimonial.product}
                    </p>
                  </footer>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
