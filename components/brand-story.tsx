'use client'

import { MessageCircle } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/components/i18n/locale-provider'

export function BrandStory() {
  const { dict } = useI18n()

  return (
    <section
      id="histoire"
      className="bg-[var(--bone)] px-5 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Editorial image stack */}
          <Reveal className="relative">
            <div className="aspect-4/5 overflow-hidden bg-[var(--bone-deep)]">
              <img
                src="/products/makhsouse-oud.jpg"
                alt={dict.story.imageAlt}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
            {/* Offset accent panel, hidden on small screens to avoid clutter. */}
            <div
              aria-hidden="true"
              className="absolute -end-4 -bottom-4 -z-10 hidden h-2/3 w-1/2 border border-[var(--champagne)]/40 lg:block"
            />
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow">{dict.story.eyebrow}</p>
              <h2 className="section-title mt-4 max-w-md">
                {dict.story.titleLead}{' '}
                <em className="font-light italic">{dict.story.titleEm}</em>.
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-8 space-y-4 text-sm leading-[1.9] text-[var(--ink-muted)]">
                {dict.story.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <dl className="mt-10 flex flex-col">
              {dict.story.pillars.map((pillar, index) => (
                <Reveal key={pillar.number} delay={160 + index * 90}>
                  <div className="flex gap-6 border-t border-[var(--hairline)] py-6">
                    <dt className="font-[family-name:var(--font-display)] text-sm text-[var(--champagne)] tabular-nums">
                      {pillar.number}
                    </dt>
                    <dd>
                      <h3 className="font-[family-name:var(--font-display)] text-xl">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-muted)]">
                        {pillar.text}
                      </p>
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            <Reveal delay={420}>
              <a
                href={dict.wa.advice}
                target="_blank"
                rel="noreferrer"
                className="btn-outline mt-8"
              >
                <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
                {dict.story.cta}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
