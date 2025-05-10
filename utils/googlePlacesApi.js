export async function fetchLeads(zip, keyword) {
  const key = process.env.GOOGLE_API_KEY;
  const location = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${key}`)
    .then(res => res.json())
    .then(data => data.results[0].geometry.location);

  const res = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=5000&type=${keyword}&key=${key}`);
  const { results } = await res.json();

  return results.filter(place => !place.website).map(place => ({
    name: place.name,
    formatted_address: place.vicinity,
    rating: place.rating,
    user_ratings_total: place.user_ratings_total,
    business_status: place.business_status,
    types: place.types,
  }));
}
