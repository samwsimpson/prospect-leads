import { fetchGooglePlaces } from '../../../utils/googlePlacesApi';
import { isThirdPartyUrl } from '../../../utils/isThirdPartyUrl';

export default async function handler(req, res) {
  const { zip, keyword, noWebsiteOnly } = req.query;

  if (!zip || !keyword) {
    return res.status(400).json({ error: 'Missing zip or keyword' });
  }

  try {
    const businesses = await fetchGooglePlaces(zip, keyword);

    const filtered = businesses.filter(place => {
      if (noWebsiteOnly === 'true') {
        return !place.website || isThirdPartyUrl(place.website);
      }
      return true;
    });

    res.status(200).json(filtered);
  } catch (error) {
    console.error('Search API error:', error);
    res.status(500).json({ error: 'Failed to fetch businesses' });
  }
}