import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get language from cookie or localStorage
  const storedLanguage = request.cookies.get('language')?.value || 'en-US'

  // Add language to request headers
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-language', storedLanguage)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: '/api/:path*',
}