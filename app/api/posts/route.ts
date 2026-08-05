import { NextResponse } from "next/server";
import { getPosts } from "@/lib/blog";

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(
    { posts },
    {
      headers: {
        // One post per day: let CDNs cache for an hour.
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
