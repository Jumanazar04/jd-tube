const BASE_URL = "https://www.googleapis.com/youtube/v3";

export async function fetchFromAPI(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.set("key", import.meta.env.VITE_YOUTUBE_API_KEY);

  // Defaultlarni faqat search uchun beramiz
  if (endpoint === "search") {
    if (params.part == null) url.searchParams.set("part", "snippet");
    if (params.maxResults == null) url.searchParams.set("maxResults", "12");
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    url.searchParams.set(key, String(value));
  });

  console.log("REQUEST URL:", url.toString());

  const response = await fetch(url);
  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`YouTube API error: ${response.status} ${errText}`);
  }

  const data = await response.json();
  return data?.items || [];
}
