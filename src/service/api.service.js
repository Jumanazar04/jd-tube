const BASE_URL = "https://youtube-v31.p.rapidapi.com";

export async function fetchFromAPI(endpoint) {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "0a5a2576d6msh0cfdb42cf9b413cp1bba13jsn75ad28a8c259",
      "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
    },
  };

  const response = await fetch(`${BASE_URL}/${endpoint}`, options);
  const data = await response.json();
  return data.items;
}
