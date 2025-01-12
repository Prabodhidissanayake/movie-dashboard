import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language") || "en-US";

    const url = `${process.env.NEXT_PUBLIC_API_URL}/movie/upcoming?language=${language}&page=1`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch upcoming movies",
      },
      { status: 500 }
    );
  }
}
