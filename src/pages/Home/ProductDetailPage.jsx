import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ALL_PRODUCTS } from '../../data/products';
import { useCartStore } from '../../store/cart.store';
import ProductGrid from '../../components/products/ProductGrid';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  const productId = Number(id);
  const product = ALL_PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="px-2 md:px-6 lg:px-20 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-2">Product not found</h2>
        <p className="text-gray-500 mb-6">
          The item you are looking for doesn\'t exist.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="px-4 py-2 border rounded-lg"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="px-2 md:px-6 lg:px-20 py-8 text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[300px] rounded-xl object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <div className="flex items-end gap-3">
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-lg">
                ${product.originalPrice?.toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-bold">
              ${product.price?.toFixed(2)}
            </span>
            {product.discount && (
              <span className="text-xs bg-lemon-200 text-white px-2 py-1 rounded-md font-medium">
                {product.discount}% OFF
              </span>
            )}
          </div>

          <p className="text-gray-600">Category: {product.category}</p>
          {product.isNew && (
            <span className="text-xs inline-block w-fit bg-green-100 text-green-700 px-2 py-1 rounded">
              New Arrival
            </span>
          )}

          <div className="flex gap-3 mt-4 font-outfit">
            <button
              onClick={() => addItem(product, 1)}
              className="bg-lemon-200 hover:bg-gray-700 text-white px-5 py-2 rounded-lg transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="border px-5 py-2 rounded-lg"
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">You may also like</h2>
        <ProductGrid
          products={ALL_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4)}
        />
      </div>
    </div>
  );
}
