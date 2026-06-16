import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminRoute = request.nextUrl.pathname.startsWith("/secure-admin");
  const publicRoutes = [
    "/secure-admin/login",
    "/secure-admin/reset-password",
    "/secure-admin/forgot-password",
  ];
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  // Redirect unauthenticated users away from admin routes (except public ones)
  if (isAdminRoute && !isPublicRoute && !user) {
    return NextResponse.redirect(
      new URL("/secure-admin/login", request.url)
    );
  }

  // Redirect logged-in users away from login page
  if (request.nextUrl.pathname === "/secure-admin/login" && user) {
    return NextResponse.redirect(
      new URL("/secure-admin/dashboard", request.url)
    );
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/secure-admin/:path*"],
};
