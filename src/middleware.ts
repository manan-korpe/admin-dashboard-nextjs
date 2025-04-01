import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const adminCookie = request.cookies.get("admin");
  
  if(!adminCookie && request.nextUrl.pathname !== "/login"){
    return NextResponse.redirect(new URL("/login",request.url));
  }

  if(adminCookie && request.nextUrl.pathname === "/login"){
    return NextResponse.redirect(new URL("/dashboard",request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/dashboard",
    "/dashboard/product",
    "/dashboard/category",
  ],
};
