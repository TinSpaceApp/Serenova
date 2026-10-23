import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { updateAdminSession } from "./lib/supabase/session";

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path.startsWith("/admin")) {
    return updateAdminSession(request);
  }
  if (path.startsWith("/proposition")) {
    return NextResponse.next();
  }
  if (
    path === "/icon" ||
    path === "/apple-icon" ||
    path.startsWith("/opengraph-image") ||
    path.startsWith("/twitter-image")
  ) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|icon|apple-icon|opengraph-image|twitter-image|.*\\..*).*)",
};
