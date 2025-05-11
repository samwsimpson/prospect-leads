
import axios from 'axios';

export async function fetchPlaceDetails(placeId, apiKey) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,business_status,opening_hours,types&key=${apiKey}`;
  const response = await axios.get(url);
  return response.data.result;
}
