import { NextRequest, NextResponse } from "next/server";
import { getPageViews } from "@/lib/pageViews";

export async function GET(
  req: NextRequest,
  context: any, // ✅ let Next.js handle this internally
) {
  const slug = context.params.slug;
  const views = await getPageViews(slug);
  return NextResponse.json({ views });
}
