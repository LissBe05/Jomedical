import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  '/patient(.*)',
  '/patients(.*)',
  '/appointments(.*)',
  '/medical-records(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  console.log("Middleware triggered for:", req.url)
  
  if (isProtectedRoute(req)) {
    console.log("Protected route accessed:", req.url)
    await auth.protect();
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}