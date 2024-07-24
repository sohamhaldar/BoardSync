import { NextRequest,NextResponse } from 'next/server';
export { default } from "next-auth/middleware";
import {getToken} from 'next-auth/jwt'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const token=await getToken({req:request,secret:process.env.AUTH_SECRET});
    const url=request.nextUrl;

    if((url.pathname.startsWith('/login'))||(url.pathname.startsWith('/signin'))){
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    if((url.pathname.startsWith('/signup'))||(url.pathname.startsWith('/register'))){
        return NextResponse.redirect(new URL('/auth/signup', request.url))
    }

    if(token && (
        url.pathname.startsWith('/auth')
    )){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    if (!token && url.pathname.startsWith('/workspace/')) {
        const segments = url.pathname.split('/');
        if (segments.length > 3 && segments[3] !== 'share') {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }


}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/auth/:path*','/dashboard/:path*','/signin','/login','/register','/signup','/workspace/:path*'],
}