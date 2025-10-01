// components/ProductCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cart.store';

export default function ProductCard({
  image,
  title,
  price,
  originalPrice,
  discount,
  currency = '$',
  isNew = false,
  id,
}) {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group w-full font-raleway overflow-hidden rounded-xl border border-transparent bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Image */}
      <div className="relative w-full h-72">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-xl transform transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          onClick={() => navigate(`/products/${id}`)}
        />
        {isNew && (
          <span className="absolute top-2 font-inter left-2 bg-lemon-200 text-white text-xs px-2 py-1 rounded-md">
            New Arrival
          </span>
        )}
        {discount && (
          <span className="absolute font-inter top-2 right-2 bg-lemon-200 text-white  text-xs px-2 py-1 rounded-md font-semibold">
            {discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3
          className="text-gray-800 font-medium text-base transition-colors duration-300 group-hover:text-black cursor-pointer"
          onClick={() => navigate(`/products/${id}`)}
        >
          {title}
        </h3>

        <div className="flex justify-between items-center mt-2">
          <div className="flex flex-col">
            <div className="flex flex-col">
              {originalPrice && (
                <p className="text-gray-400 text-sm line-through">
                  {currency} {originalPrice.toFixed(2)}
                </p>
              )}
              <p className="text-black font-semibold text-lg">
                {currency} {price.toFixed(2)}
              </p>
            </div>
          </div>
          <button
            className="bg-lemon-200 hover:bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
            onClick={() => addItem({ id, title, price, image }, 1)}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
