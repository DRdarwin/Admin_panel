import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // Перевіряємо, чи збережено токен у cookies (або інший спосіб)
  const token = req.cookies.get('authToken')?.value

  // Які роути вважаємо захищеними
  const protectedPaths = ['/settings', '/dashboard', '/Calendar', '/mail']
  const isProtected = protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))

  if (isProtected && !token) {
    // Якщо користувач неавторизований і хоче зайти на захищену сторінку,
    // перекидаємо його на /login
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Інакше пропускаємо далі
  return NextResponse.next()
}

// Вказуємо, які шляхи має обробляти middleware
export const config = {
  matcher: ['/settings/:path*', '/dashboard/:path*', '/Calendar/:path*', '/mail/:path*'],
}
