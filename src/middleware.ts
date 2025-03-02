import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodedToken } from "./services/auth.services";


const authRoutes = [
  "/auth",
  "/register",
  "/auth/reset-password",
  "/auth/forgot-password",
];

const roleBasedPrivateRoutes = {
  PATIENT: [/^\/dashboard\/patient/],
  DOCTOR: [/^\/dashboard\/doctor/],
  ADMIN: [/^\/dashboard\/admin/],
  SUPER_ADMIN: [/^\/dashboard\/super-admin/],
};
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = cookies().get("authToken")?.value;
  type Role = keyof typeof roleBasedPrivateRoutes;

  if (!authToken) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  let decodedData = null;
  if (authToken) {
    decodedData = decodedToken(authToken);
  }
  const role = decodedData?.role;

  if (role && roleBasedPrivateRoutes[role as Role]) {
    const routes = roleBasedPrivateRoutes[role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/auth",
    "/register",
    "/auth/reset-password",
    "/auth/forgot-password",
    "/dashboard/:page*"
  ],
};
