export default async function handler(req, res) {
  const { zip, keyword, noWebsiteOnly } = req.query;

  const mockResults = [
    { name: "Business One", formatted_address: "123 Main St", website: "" },
    { name: "Business Two", formatted_address: "456 Side Ave", website: "http://example.com" }
  ];

  const filtered = mockResults.filter(biz => 
    noWebsiteOnly === 'false' || !biz.website || /facebook|instagram|yelp/.test(biz.website)
  );

  res.status(200).json(filtered);
}
