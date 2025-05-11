// pages/api/search.js
import { fetchPlacesByKeyword } from '../../utils/googlePlacesApi';
import { isThirdPartyUrl } from '../../utils/isThirdPartyUrl';

export default async function handler(req, res) {
  const { zip, keyword, includeThirdParty = 'false' } = req.query;

  if (!zip || !keyword) {
    return res.status(400).json({ error: 'Missing zip or keyword' });
  }

  try {
    const places = await fetchPlacesByKeyword(zip, keyword);

    const filteredResults = places.filter(place => {
      const hasWebsite = place.website || place.vicinity || place.url;
      const websiteUrl = place.website || '';
      const include = includeThirdParty === 'true';

      if (!hasWebsite) return false;

      if (include) return true;

      return websiteUrl && !isThirdPartyUrl(websiteUrl);
    });

    const formatted = filteredResults.map(place => ({
      name: place.name,
      formatted_address: place.vicinity || '',
      formatted_phone_number: place.formatted_phone_number || '',
      website: place.website || '',
      rating: place.rating || '',
      user_ratings_total: place.user_ratings_total || '',
      business_status: place.business_status || '',
      opening_hours: place.opening_hours || null,
      types: place.types || []
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error('Search API error:', error);
    res.status(500).json({ error: 'Failed to fetch places' });
  }
}
