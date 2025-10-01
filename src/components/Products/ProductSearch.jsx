import React from 'react';

export default function ProductSearch({ query, onQueryChange, placeholder = "Search products..." }) {
  return (
    <div className="flex-1 flex gap-2">
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lemon-200/60"
      />
    </div>
  );
}
