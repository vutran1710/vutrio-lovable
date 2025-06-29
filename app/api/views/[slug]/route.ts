import { NextRequest, NextResponse } from "next/server";
import { getPageViews, incrementPageView } from "@/lib/pageViews";

export async function GET(
  req: NextRequest,
  context: any, // ✅ let Next.js handle this internally
) {
  const slug = context.params.slug;
  const views = await getPageViews(slug);
  return NextResponse.json({ views });
}

export async function POST(
  req: NextRequest,
  context: any, // ✅ same here
) {
  const slug = context.params.slug;
  const views = await incrementPageView(slug);
  return NextResponse.json({ views });
}
