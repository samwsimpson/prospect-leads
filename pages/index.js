
import React, { useState } from 'react';
import BusinessCard from '../components/BusinessCard';

export default function Home() {
  const [zip, setZip] = useState('');
  const [keyword, setKeyword] = useState('');
  const [noWebsiteOnly, setNoWebsiteOnly] = useState(true);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/search?zip=${zip}&keyword=${keyword}&noWebsiteOnly=${noWebsiteOnly}`
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setResults(data);
      } else {
        console.error("Search API did not return an array:", data);
        setError("Unexpected response from server.");
      }
    } catch (err) {
      setError("Failed to fetch results");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Prospect Leads</h1>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Zip Code"
            className="border p-2 mr-2 w-32"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <input
            type="text"
            placeholder="Business Type"
            className="border p-2 mr-2 w-48"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={noWebsiteOnly}
              onChange={(e) => setNoWebsiteOnly(e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2">Only show businesses without websites or using third-party links</span>
          </label>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div>
          {results.map((business, index) => (
            <BusinessCard key={index} business={business} />
          ))}
        </div>
      </div>
    </div>
  );
}
