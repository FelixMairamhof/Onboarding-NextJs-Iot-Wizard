// middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get('authToken')?.value;
  console.log('Middleware executed'); // Add this line for debugging
  console.log('authToken:', authToken); // Add this line for debugging
  // If there's no authToken cookie, redirect to the login page
  if (!authToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If authToken exists, allow access to the page
  return NextResponse.next();
}

// Specify the paths where this middleware should be applied
export const config = {
  matcher: ['/', '/onboarding','/admin'], // Apply to these paths; adjust as needed
};
