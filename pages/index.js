import Head from 'next/head';
import BusinessCard from '../components/BusinessCard';
import { useState } from 'react';

export default function Home() {
  const [zip, setZip] = useState('');
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`/api/search?zip=${zip}&keyword=${keyword}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Head>
        <title>Prospect Leads</title>
        <meta name="description" content="Find businesses without websites" />
      </Head>
      <h1 className="text-2xl font-bold mb-4">Prospect Leads</h1>
      <div className="flex gap-2 mb-4">
        <input className="border p-2 flex-1" placeholder="Zip Code" value={zip} onChange={e => setZip(e.target.value)} />
        <input className="border p-2 flex-1" placeholder="Business Type" value={keyword} onChange={e => setKeyword(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSearch}>Search</button>
      </div>
      <div>
        {results.map((b, idx) => <BusinessCard business={b} key={idx} />)}
      </div>
    </div>
  );
}
