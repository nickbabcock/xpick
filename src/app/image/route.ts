import { NextRequest, NextResponse } from "next/server";
import examplePath from "./example.jpg";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dest = new URL(examplePath.src, request.url);
  const response = NextResponse.redirect(dest);
  response.cookies.set({
    name: "x-picked",
    value: searchParams.get("dim") ?? "1x",
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 14,
  });
  return response;
}
