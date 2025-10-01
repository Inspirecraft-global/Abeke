import React from 'react';
import ProductPageHeader from '../../components/Products/ProductPageHeader';
import ProductFilters from '../../components/Products/ProductFilters';
import ProductGrid from '../../components/Products/ProductGrid';
import Pagination from '../../components/Products/Pagination';
import useProductFilters from '../../hooks/useProductFilters';
import { ALL_PRODUCTS } from '../../data/products';

export default function ProductsPage() {
  const {
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
    filtered,
    paginated,
    totalPages,
    resetFilters,
  } = useProductFilters(ALL_PRODUCTS);

  return (
    <div className="px-2 md:px-6 lg:px-20 py-6 text-black flex flex-col gap-6">
      <ProductPageHeader />

      <ProductFilters
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        onlyNew={onlyNew}
        onOnlyNewChange={setOnlyNew}
        sort={sort}
        onSortChange={setSort}
        onReset={resetFilters}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        totalItems={filtered.length}
        pageSize={8}
      />

      <ProductGrid products={paginated} />
    </div>
  );
}
