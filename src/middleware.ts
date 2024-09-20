import { NextRequest, NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt"
import { UserSessionI } from './interfaces/User.interface';
import { match } from 'path-to-regexp';

const secret = process.env.NEXTAUTH_SECRET
export async function middleware(req: NextRequest) {

  const matcher = match('/api/:role/*');
  const params = matcher(req.nextUrl.pathname)

  if (!params) return NextResponse.json({ status: 404, message: "not found", error: true })

  const { params: { role } } = params
  const token = await getToken({ req, secret })
  const userProfile = token as UserSessionI | null
  const userRoles = userProfile?.roles as string[]

  if (!userRoles || !userRoles.includes(role as string)) return NextResponse.json({ status: 401, message: "unauthorized", error: true })

  return NextResponse.next();
}

export const config = {
  // matcher: ['/api/admin/:path*'],
  matcher: ['/api/:path((?!auth).*)'],
};