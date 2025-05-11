export async function fetchGooglePlaces(zip, keyword) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyword}+in+${zip}&key=${process.env.GOOGLE_API_KEY}`
  );
  const data = await response.json();
  return data.results;
}