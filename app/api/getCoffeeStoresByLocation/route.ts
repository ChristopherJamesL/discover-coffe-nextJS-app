import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { NextRequest, NextResponse } from "next/server";
import { search } from "unsplash-js/dist/internals";

export async function GET(request: NextRequest, response: NextResponse) {
  let limit: number = 0;
  try {
    const searchParams = request.nextUrl.searchParams;
    const longLat = searchParams.get("longLat") || "";
    const limitParam = searchParams.get("limit");
    limit = limitParam ? parseInt(limitParam) : 0;
    if (longLat) {
      const response = await fetchCoffeeStores(longLat, limit);
      return NextResponse.json(response);
    }
  } catch (e) {
    if (limit > 10) {
      return NextResponse.json(
        { error: "Limit cannot exceed 10 results" },
        { status: 400 }
      );
    }
    console.error("There was an error fetching: ", e);
    return NextResponse.json(`Something went wrong ${e}`, {
      status: 500,
    });
  }
}
