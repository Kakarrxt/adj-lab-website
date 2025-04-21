import createArcjet from "@arcjet/next";
import { shield, tokenBucket } from "@arcjet/next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const arcjet = createArcjet({
  key: process.env.ARCJET_KEY!,
  rules: [

    shield({
      mode: "LIVE",
    }),

    tokenBucket({
      mode: "LIVE",
      refillRate: 3, 
      interval: "1d", 
      capacity: 3, 
    }),
  ],
});

export async function middleware(request: NextRequest) {
 
  // if (process.env.NODE_ENV === "development") {
  //   return NextResponse.next();
  // }
  
  const decision = await arcjet.protect(request, {
    requested: 1
  });

  if (decision.isDenied()) {
    // Return a plain text error message with 429 status (Too Many Requests)
    return new NextResponse(
      "Rate limit exceeded. Please try again later.", 
      {
        status: 429,
        headers: {
          'Content-Type': 'text/plain',
          'Retry-After': '60', // Suggests client should retry after 60 seconds
        }
      }
    );
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};