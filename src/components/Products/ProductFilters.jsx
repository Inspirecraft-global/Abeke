import React from 'react';
import ProductSearch from './ProductSearch';
import ProductSort from './ProductSort';

const CATEGORIES = ['All', 'Dresses', 'Shoes', 'Bags', 'Jewelry'];

export default function ProductFilters({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  onlyNew,
  onOnlyNewChange,
  sort,
  onSortChange,
  onReset,
}) {
  return (
    <div className="w-full bg-white/60 font-outfit backdrop-blur rounded-xl border border-gray-100 p-3 md:p-4 flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center">
      <ProductSearch query={query} onQueryChange={onQueryChange} />
      
      <div className="flex flex-wrap gap-2 items-center">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 bg-white"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Price</span>
          <input
            type="number"
            min={0}
            value={priceRange[0]}
            onChange={(e) =>
              onPriceRangeChange([Number(e.target.value) || 0, priceRange[1]])
            }
            className="w-20 px-2 py-2 rounded-lg border border-gray-200"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            min={0}
            value={priceRange[1]}
            onChange={(e) =>
              onPriceRangeChange([priceRange[0], Number(e.target.value) || 0])
            }
            className="w-20 px-2 py-2 rounded-lg border border-gray-200"
          />
        </div>

        <label className="inline-flex items-center gap-2 select-none cursor-pointer">
          <input
            type="checkbox"
            checked={onlyNew}
            onChange={(e) => onOnlyNewChange(e.target.checked)}
          />
          <span className="text-sm">New arrivals</span>
        </label>

        <ProductSort sort={sort} onSortChange={onSortChange} />

        <button
          onClick={onReset}
          className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
