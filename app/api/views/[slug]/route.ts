// app/api/views/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { incrementPageView, getPageViews } from "@/lib/pageViews";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const views = await getPageViews(params.slug);
  return NextResponse.json({ views });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const views = await incrementPageView(params.slug);
  return NextResponse.json({ views });
}
