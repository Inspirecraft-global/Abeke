import React, { useState } from 'react';
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  StarIcon,
} from '../../icons';

export default function Testimonials() {
  const testimonials = [
    {
      text: 'She has always taken the time to really understand our needs and our many audiences, while keeping true to the overall agency brand.',
      name: 'Camilla Scianna',
      date: 'December 21, 2025',
      rating: 4,
    },
    {
      text: 'Our brand has been strengthened through her creative application. I am very happy and fit with their work. Thanks.',
      name: 'Gillian Freeman',
      date: 'December 21, 2025',
      rating: 4,
    },
    {
      text: 'We are very pleased with the excellent customer service. Their work is very fast and accurate and really helps my goal of building all.',
      name: 'Peter Ronstadt',
      date: 'December 21, 2025',
      rating: 4,
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  const TestimonialCard = ({ text, name, date, rating }) => (
    <div className="bg-white rounded-2xl shadow-sm border p-6 max-w-sm">
      <p className="text-gray-600 italic mb-4">“{text}”</p>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {/* Rating */}
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating ? 'text-orange-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-2 md:px-6 lg:px-20 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-spectral font-bold ">CLIENT TALK</h2>
        <div className="flex items-center gap-3 ml-4">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full border hover:bg-gray-100"
          >
            <ArrowRightIcon />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full border hover:bg-gray-100"
          >
            <ArrowLeftIcon />
          </button>
        </div>
      </div>
      <div className="md:hidden">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-2 px-2">
          {testimonials.map((t, index) => (
            <div key={index} className="snap-start shrink-0 min-w-[85%]">
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:flex items-center justify-between">
        <div className="grid grid-cols-1 font-raleway md:grid-cols-3 gap-2 flex-1">
          {testimonials
            .slice(current, current + 3)
            .concat(
              testimonials.slice(
                0,
                Math.max(0, current + 3 - testimonials.length)
              )
            )
            .map((t, index) => (
              <TestimonialCard key={index} {...t} />
            ))}
        </div>
      </div>
    </div>
  );
}
