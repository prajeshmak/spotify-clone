import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Token  will exist if  user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname, origin } = req.nextUrl;

  // Allow the requests if the following is  true..
  // the token exists
  // its a request for next-auth session & provider fetching
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // redirect them to login if they dont have token and are requesting a protected route
  if (!token && pathname != "/login") {
    return NextResponse.redirect(`${origin}/login`);
  }
}
