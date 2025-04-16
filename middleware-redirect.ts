import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { hostname } = new URL(request.url);
  
  // Check if the request is for the non-www domain
  if (hostname === 'breeeve.com') {
    // Create the URL for the www version
    const url = request.nextUrl.clone();
    url.hostname = 'www.breeeve.com';
    
    // Return a 301 redirect to the www version
    return NextResponse.redirect(url, {
      status: 301,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }
  
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 