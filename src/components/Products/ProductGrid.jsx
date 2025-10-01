import React from 'react';
import ProductCard from '../common/ProductCard';

export default function ProductGrid({ products, emptyMessage = "No products match your filters." }) {
  if (products.length === 0) {
    return (
      <div className="w-full py-16 text-center text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
