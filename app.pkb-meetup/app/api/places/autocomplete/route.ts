import { GOOGLE_API_PLACES_URL } from "@/lib/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input");

  if (!input) {
    return new Response("Input parameter is required", { status: 400 });
  }

  try {
    const response = await fetch(
      GOOGLE_API_PLACES_URL +
        new URLSearchParams({
          input: input,
          key: process.env.GOOGLE_PLACES_API_KEY || "",
          components: "country:us",
          types: "geocode",
        })
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error_message || "Failed to fetch suggestions");
    }

    return Response.json(data);
  } catch (error) {
    console.error("Places API Error:", error);
    return Response.json(
      { error: "Failed to fetch suggestions" },
      { status: 500 }
    );
  }
}
