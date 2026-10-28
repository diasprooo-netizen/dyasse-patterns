import { NextResponse, type NextRequest } from 'next/server'

// Only the primary custom domain may be indexed. Vercel's generated deployment
// and staging URLs remain available for QA but must not compete with dyasse.com.
export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') || '').toLowerCase().split(':')[0]
  const officialHost = host === 'dyasse.com' || host === 'www.dyasse.com'

  if (!officialHost && request.nextUrl.pathname === '/robots.txt') {
    return new NextResponse('User-agent: *\nDisallow: /\n', {
      status: 200,
      headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=300' },
    })
  }

  const response = NextResponse.next()
  if (!officialHost) response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
