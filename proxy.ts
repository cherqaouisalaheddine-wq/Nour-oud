import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale, LANGUAGE_COOKIE } from '@/lib/i18n/config'

/**
 * Root redirect.
 *
 * `middleware.ts` was renamed to `proxy.ts` in Next 16. Its only job here is to
 * send a bare `/` to a language route: the visitor's last choice (mirrored into
 * a cookie by `LocaleProvider`) when there is one, French otherwise. Every other
 * request - `/_next/*`, `/products/*.jpg`, `/fr`, `/ar` - is left untouched via
 * the exact-match matcher below.
 */
export function proxy(request: NextRequest) {
  const cookieLocale = request.cookies.get(LANGUAGE_COOKIE)?.value
  const locale = isLocale(cookieLocale) ? cookieLocale : defaultLocale

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/'],
}
