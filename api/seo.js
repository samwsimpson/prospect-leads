export default function handler(req, res) {
  res.status(200).json({
    title: "Prospect Leads - Find Businesses Without Websites",
    description: "Discover local businesses that lack an online presence. Export contact details and generate leads fast."
  });
}
