// pages/Home.jsx
import React from 'react';
import ProductCard from '../common/ProductCard';
import { NavLink } from 'react-router-dom';

export default function Product() {
  return (
    <div className="flex flex-col gap-10 px-2 md:px-6 lg:px-20 py-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Recommended for you</h3>
        <NavLink
          to="/product"
          className="font-outfit cursor-pointer hover:underline text-sm"
        >
          View all
        </NavLink>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  ">
        <ProductCard
          image="/images/Product/Product1.jpg"
          title="Shirt Soft Cotton"
          price={32}
          originalPrice={40}
          discount={20}
          currency="$"
          isNew
        />
        <ProductCard
          image="/images/Product/Product2.jpg"
          title="Running Shoes"
          price={225}
          originalPrice={250}
          discount={10}
          isNew
        />
        <ProductCard
          image="/images/Product/Product3.jpg"
          title="Running Shoes"
          price={250}
          isNew
        />
        <ProductCard
          image="/images/Product/Product4.jpg"
          title="Running Shoes"
          price={200}
          originalPrice={250}
          discount={20}
          isNew
        />
        <ProductCard
          image="/images/Product/Product5.jpg"
          title="Running Shoes"
          price={250}
        />
        <ProductCard
          image="/images/Product/Product6.jpg"
          title="Running Shoes"
          price={212}
          originalPrice={250}
          discount={15}
        />
        <ProductCard
          image="/images/Product/Product7.jpg"
          title="Running Shoes"
          price={250}
        />
        <ProductCard
          image="/images/Product/Product2.jpg"
          title="Running Shoes"
          price={237}
          originalPrice={250}
          discount={5}
        />
      </div>
    </div>
  );
}
