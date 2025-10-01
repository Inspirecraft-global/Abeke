import React from 'react';

export default function ProductPageHeader({ 
  title = "All Products", 
  subtitle = "Discover fashionable picks tailored for you" 
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}
