import { fetchLeads } from '../../utils/googlePlacesApi';

export default async function handler(req, res) {
  const { zip, keyword } = req.query;
  try {
    const leads = await fetchLeads(zip, keyword);
    res.status(200).json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from Google Places API' });
  }
}
