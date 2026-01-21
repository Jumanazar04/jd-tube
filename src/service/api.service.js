const BASE_URL = "https://www.googleapis.com/youtube/v3";

export async function fetchFromAPI(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}/${endpoint}`);

  // default params
  url.searchParams.set("key", import.meta.env.VITE_YOUTUBE_API_KEY);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("maxResults", "12");

  // dynamic params
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.status}`);
  }

  const data = await response.json();
  console.log(data.items);
  
  return data.items || [];
}
