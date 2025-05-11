import React, { useState } from 'react';

export default function Home() {
  const [zip, setZip] = useState('');
  const [keyword, setKeyword] = useState('');
  const [noWebsiteOnly, setNoWebsiteOnly] = useState(true);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`/api/search?zip=${zip}&keyword=${keyword}&noWebsiteOnly=${noWebsiteOnly}`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <div>
      <h1>Prospect Leads</h1>
      <input placeholder="Zip Code" value={zip} onChange={(e) => setZip(e.target.value)} />
      <input placeholder="Keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <label>
        <input type="checkbox" checked={noWebsiteOnly} onChange={() => setNoWebsiteOnly(!noWebsiteOnly)} />
        Only show businesses without websites
      </label>
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((biz, index) => (
          <li key={index}>
            <strong>{biz.name}</strong><br />
            {biz.formatted_address}<br />
            {biz.website || 'No website'}
          </li>
        ))}
      </ul>
    </div>
  );
}
