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
        setAll(cookiesToSet) {
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
  const isLoginPage = request.nextUrl.pathname === "/secure-admin/login";

  // Redirect unauthenticated users away from admin routes
  if (isAdminRoute && !isLoginPage && !user) {
    return NextResponse.redirect(
      new URL("/secure-admin/login", request.url)
    );
  }

  // Redirect logged-in users away from login page
  if (isLoginPage && user) {
    return NextResponse.redirect(
      new URL("/secure-admin/dashboard", request.url)
    );
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/secure-admin/:path*"],
};
