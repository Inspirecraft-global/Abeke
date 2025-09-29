import React from 'react';

export default function Advert() {
  const promos = [
    '🚀 Get 20% OFF on your first order!',
    '🎧 Free shipping on orders above $100',
    '🎉 Limited-time promo discounts available now!',
    '🛍️ Shop the latest collection today!',
  ];

  return (
    <div className="bg-black h-10 font-inter flex items-center overflow-hidden relative">
      <div className="flex whitespace-nowrap animate-marquee text-white font-medium text-sm">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex">
            {promos.map((text, idx) => (
              <span key={idx} className="mx-8">
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
