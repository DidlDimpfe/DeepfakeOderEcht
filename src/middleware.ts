import { generateUUID } from "@/lib/util";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const userTokenCookie = req.cookies.get("userToken");

  const response = NextResponse.next();

  if (!userTokenCookie) {
    const newUserToken = generateUUID();

    response.cookies.set({
      name: "userToken",
      value: newUserToken,
      httpOnly: true, // Only accessible from the server
      path: "/",
      maxAge: 60 * 60 * 24 * 365 * 10,
    });
  }

  return response;
}

export const config = {
  matcher: "/:path*",
};
