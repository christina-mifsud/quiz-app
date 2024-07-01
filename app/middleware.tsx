// middleware that runs on server side to verify tokens

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuth } from "@/firebase/admin-config";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // get token

  // if no token means not authenticated - redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await adminAuth.verifyIdToken(token); // verify token with firebase admin
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/quiz/:path*",
};
