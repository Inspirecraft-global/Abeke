import React from 'react';

function CategoryCard({ title, image }) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="absolute bottom-3 left-3 bg-white px-3 py-1 text-sm font-semibold text-gray-800 rounded-full shadow">
        {title}
      </div>
    </div>
  );
}

export default function CategoriesRow() {
  const categories = [
    { title: 'Shoes', image: '/images/Category/shoes.jpg' },
    { title: 'Bag', image: '/images/Category/bags.jpg' },
    { title: 'Jewelry', image: '/images/Category/neckless.jpg' },
    { title: 'Cloth', image: '/images/Category/tshirt.jpg' },
  ];

  return (
    <div className="px-2 md:px-6 lg:px-20 py-6 flex flex-col gap-6">
      <h3 className="text-2xl font-semibold">Browse By Categories</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
        {categories.map((cat, index) => (
          <CategoryCard key={index} {...cat} />
        ))}
      </div>
    </div>
  );
}
