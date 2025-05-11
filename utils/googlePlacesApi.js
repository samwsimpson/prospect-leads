// utils/googlePlacesApi.js
import axios from 'axios';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const fetchPlacesByKeyword = async (zip, keyword) => {
  const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${GOOGLE_API_KEY}`;
  const geoResponse = await axios.get(geoUrl);
  const { lat, lng } = geoResponse.data.results[0].geometry.location;

  const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&keyword=${keyword}&key=${GOOGLE_API_KEY}`;
  const placesResponse = await axios.get(placesUrl);

  return placesResponse.data.results;
};
