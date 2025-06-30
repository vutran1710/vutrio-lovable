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

export async function POST(req: NextRequest) {
  try {
    const { page } = await req.json();

    if (!page || typeof page !== "string") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const views = await incrementPageView(page);
    return NextResponse.json({ views });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to increment view" },
      { status: 500 },
    );
  }
}
