import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/register']

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  // Skip static files and API routes
  if (
    req.nextUrl.pathname.startsWith('/_next/static/') ||
    req.nextUrl.pathname.startsWith('/api/')
  ) {
    return NextResponse.next()
  }

  // Redirect to login page if not authenticated
  if (token === undefined && !PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Redirect to home page if authenticated and trying to access public routes
  if (token !== undefined && PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
    const url = req.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
