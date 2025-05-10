import { exportLeadsToCSV } from '../../utils/csvExportUtils';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const leads = req.body.leads;
    const csv = exportLeadsToCSV(leads);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.status(200).send(csv);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
