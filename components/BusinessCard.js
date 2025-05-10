import React from 'react';

const BusinessCard = ({ business }) => {
  const {
    name, formatted_address, formatted_phone_number,
    website, rating, user_ratings_total, business_status,
    opening_hours, types
  } = business;

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-sm text-gray-700 mb-1">{formatted_address}</p>
      {formatted_phone_number && <p className="text-sm text-gray-700 mb-1">📞 {formatted_phone_number}</p>}
      {website && <p className="text-sm text-blue-600 mb-1">🌐 <a href={website} target="_blank" rel="noopener noreferrer">{website}</a></p>}
      {rating && <p className="text-sm text-yellow-600 mb-1">⭐ {rating} ({user_ratings_total} reviews)</p>}
      {business_status && <p className="text-sm text-gray-600 mb-1">Status: {business_status}</p>}
      {opening_hours?.weekday_text && (
        <div className="text-sm text-gray-600 mb-1">
          <p>Hours:</p>
          <ul>{opening_hours.weekday_text.map((line, i) => <li key={i}>{line}</li>)}</ul>
        </div>
      )}
      {types && <p className="text-sm text-gray-500 mt-2">Categories: {types.join(', ')}</p>}
    </div>
  );
};

export default BusinessCard;
