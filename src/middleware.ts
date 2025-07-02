import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const verified = token?.isVerified;
    const url = request.nextUrl;
    if (token && verified && (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up') || url.pathname === '/' || url.pathname.startsWith('/verify'))) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if ((!token || !verified) && (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/settings') || url.pathname.startsWith('/contests') || url.pathname.startsWith('/about'))) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    return NextResponse.next();
}
export const config = {
    matcher: ['/sign-in', '/sign-up', '/about', '/', '/dashboard/:path*', '/verify/:path*', '/settings/:path*', '/contests/:path*']
}
