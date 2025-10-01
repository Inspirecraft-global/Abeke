import { useState, useMemo, useEffect } from 'react';

export default function useProductFilters(products, pageSize = 8) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [onlyNew, setOnlyNew] = useState(false);
  const [sort, setSort] = useState('new');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = [...products];

    if (category !== 'All') {
      list = list.filter((p) => p.category === category);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (onlyNew) {
      list = list.filter((p) => p.isNew);
    }

    list = list.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sort) {
      case 'price_low_high':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price_high_low':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        list.sort((a, b) => (b.isNew === true) - (a.isNew === true));
    }

    return list;
  }, [products, category, query, onlyNew, priceRange, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [category, query, onlyNew, priceRange, sort]);

  const resetFilters = () => {
    setQuery('');
    setCategory('All');
    setOnlyNew(false);
    setPriceRange([0, 300]);
    setSort('new');
  };

  return {
    // Filter states
    query,
    setQuery,
    category,
    setCategory,
    priceRange,
    setPriceRange,
    onlyNew,
    setOnlyNew,
    sort,
    setSort,
    page,
    setPage,
    
    // Computed values
    filtered,
    paginated,
    totalPages,
    
    // Actions
    resetFilters,
  };
}
