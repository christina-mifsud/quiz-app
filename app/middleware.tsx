import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuth } from "@/firebase/admin-config";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // storing token in cookies??

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    adminAuth.verifyIdToken(token);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/quiz/:path*",
};
