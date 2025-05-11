import { fetchPlacesByZip } from '../../utils/googlePlacesApi';
import { isThirdPartyUrl } from '../../utils/isThirdPartyUrl';

export default async function handler(req, res) {
  const { zip, keyword, includeThirdParty } = req.query;

  if (!zip || !keyword) {
    return res.status(400).json({ error: 'Missing zip or keyword' });
  }

  try {
    const results = await fetchPlacesByZip(zip, keyword);

    if (!Array.isArray(results)) {
      return res.status(500).json({ error: 'Unexpected response from Google Places API' });
    }

    const filteredResults = results.filter(place => {
      const website = place.website || '';
      const hasOfficialWebsite = website && !isThirdPartyUrl(website);

      // If user chooses to include 3rd party links, return anything with a URL
      if (includeThirdParty === 'true') {
        return !hasOfficialWebsite; // return if no website or 3rd-party one
      }

      // Default: only return results with no website at all
      return !website;
    });

    res.status(200).json({ results: filteredResults });
  } catch (error) {
    console.error('Search API error:', error);
    res.status(500).json({ error: 'Something went wrong during the search' });
  }
}
