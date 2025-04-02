import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { getUserById } from "./lib/serverApis";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in",
  "/sign-up",
  "/api/(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  const userId = (await auth())?.userId;

  // Skip DB check for public routes
  if (isPublicRoute(req)) {
    return;
  }

  const userDb = await getUserById(userId || "");
  // Redirect to /onboarding if user is not found in the database
  if (!userDb && !req.url.includes("/onboarding")) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
