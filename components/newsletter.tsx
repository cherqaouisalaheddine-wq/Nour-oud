'use client'

import { useState } from 'react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/components/i18n/locale-provider'

/**
 * Newsletter capture.
 *
 * There is no mailing-list backend in this project, so the form does NOT
 * pretend to subscribe anyone. Submitting a valid address hands the request to
 * WhatsApp instead, which is the channel the business already uses. This keeps
 * the interaction real rather than a fake success state.
 *
 * To plug in a real provider later, replace the <form> handler with a fetch to
 * your ESP endpoint and keep the same markup.
 */
export function Newsletter() {
  const { dict } = useI18n()
  const [email, setEmail] = useState('')

  const target = dict.wa.newsletter(email)

  return (
    <section id="newsletter" className="bg-[var(--bone-deep)] px-5 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">{dict.newsletter.eyebrow}</p>
            <h2 className="section-title mt-4">{dict.newsletter.title}</h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-[1.9] text-[var(--ink-muted)]">
              {dict.newsletter.subtitle}
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={(event) => {
              // Hand off to WhatsApp in a new tab. Native GET submission would
              // append ?email=... and corrupt the wa.me deep link.
              event.preventDefault()
              window.open(target, '_blank', 'noopener,noreferrer')
              setEmail('')
            }}
            className="mx-auto mt-10 max-w-lg"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              {dict.newsletter.emailLabel}
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={dict.newsletter.emailPlaceholder}
                autoComplete="email"
                className="min-h-13 flex-1 border border-[var(--hairline-strong)] bg-transparent px-5 text-sm outline-none transition-colors placeholder:text-[var(--ink-muted)] focus:border-[var(--champagne)]"
              />
              <button type="submit" className="btn-ink shrink-0">
                <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
                {dict.newsletter.submit}
              </button>
            </div>

            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-[var(--ink-muted)]">
              <ArrowRight className="size-3 rtl:-scale-x-100" strokeWidth={1.5} aria-hidden="true" />
              {dict.newsletter.note}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
