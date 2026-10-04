'use client'

import { Mail, MessageCircle } from 'lucide-react'
import { footerColumns, siteConfig, whatsappLink } from '@/lib/site'

/*
 * lucide-react v1 dropped brand glyphs, so the two social marks are inlined
 * here rather than adding a dependency just for two icons.
 */
function InstagramGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <circle cx="12" cy="12" r="3.75" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...props}>
      <path d="M15.5 3.5h-2.2A3.8 3.8 0 0 0 9.5 7.3v2.2H7.4v3h2.1v8h3v-8h2.3l.5-3h-2.8V7.6c0-.6.4-1 .9-1h1.9z" strokeLinejoin="round" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  { label: 'Instagram', href: siteConfig.social.instagram, Icon: InstagramGlyph },
  { label: 'Facebook', href: siteConfig.social.facebook, Icon: FacebookGlyph },
  {
    label: 'WhatsApp',
    href: whatsappLink('Bonjour NOUR EL OUD, je souhaite avoir plus d’informations.'),
    Icon: MessageCircle,
  },
] as const

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-[var(--ink)] px-5 pt-16 pb-8 text-[var(--bone)] lg:px-8 lg:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex size-9 items-center justify-center border border-[var(--champagne)] text-[0.6875rem] tracking-[0.1em] text-[var(--champagne)]"
              >
                N
              </span>
              <span className="font-[family-name:var(--font-display)] text-2xl tracking-[0.22em]">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-[1.9] text-[var(--bone)]/55">
              Maison de parfum marocaine. Oud, ambre et musc sélectionnés et
              assemblés à Casablanca.
            </p>

            <div className="mt-6 flex gap-2">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-11 items-center justify-center border border-[var(--bone)]/15 text-[var(--bone)]/70 transition-colors duration-500 hover:border-[var(--champagne)] hover:text-[var(--champagne)]"
                >
                  <Icon className="size-4" strokeWidth={1.5} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation + categories */}
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-[0.5625rem] tracking-[0.22em] uppercase text-[var(--champagne)]">
                {column.title}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--bone)]/60 transition-colors duration-400 hover:text-[var(--bone)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h2 className="text-[0.5625rem] tracking-[0.22em] uppercase text-[var(--champagne)]">
              Contact
            </h2>
            <address className="mt-5 flex flex-col gap-3 text-sm not-italic text-[var(--bone)]/60">
              <p>Casablanca, Maroc</p>
              <p>
                <a
                  href="mailto:bonjour@nour-el-oud.ma"
                  className="inline-flex items-center gap-2 transition-colors duration-400 hover:text-[var(--bone)]"
                >
                  <Mail className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                  bonjour@nour-el-oud.ma
                </a>
              </p>
              <p>Lun – Sam · 9h – 19h</p>
            </address>

            <a
              href={whatsappLink('Bonjour NOUR EL OUD, j’ai une question.')}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-bone mt-6 min-h-11! px-5! py-2.5! text-[0.625rem]!"
            >
              <MessageCircle className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
              Nous écrire
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--bone)]/12 pt-7 sm:flex-row">
          <p className="text-xs text-[var(--bone)]/45">
            © {year} {siteConfig.name}. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-xs text-[var(--bone)]/45">
            <a href="#collection" className="transition-colors hover:text-[var(--bone)]">
              Conditions
            </a>
            <a href="#collection" className="transition-colors hover:text-[var(--bone)]">
              Confidentialité
            </a>
            <span className="tracking-[0.14em] uppercase">{siteConfig.origin}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}