export async function getLatestItineraries(limit = 3) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/itineraries?limit=${limit}`, {
      cache: "no-store",
    });
  
    if (!res.ok) throw new Error("Failed to fetch itineraries");
  
    return res.json();
  }