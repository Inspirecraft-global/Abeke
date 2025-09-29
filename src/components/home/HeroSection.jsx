import React, { useState, useEffect } from 'react';

export default function HeroSection() {
  const slides = [
    {
      src: '/images/gallery/gallery1.jpg',
    },
    {
      src: '/images/gallery/gallery2.jpg',
    },
    {
      src: '/images/gallery/gallery3.jpg',
    },
    {
      src: '/images/gallery/gallery4.jpg',
    },
    {
      src: '/images/gallery/gallery5.jpg',
    },
  ];

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      className="relative w-full h-[300px] md:h-[500px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full w-full h-full relative flex-shrink-0"
          >
            <img
              src={slide.src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="absolute text-center  font-spectral inset-0 bg-black/40 flex flex-col justify-center items-center px-4 md:px-10 lg:px-20 text-white">
        <h2 className="text-4xl md:text-7xl font-bold   animate-fade-in-up">
          Effortless. Feminine.
        </h2>
        <h2 className="text-4xl md:text-7xl font-bold   animate-fade-in-up">
          Yours.{' '}
        </h2>
        <p className="max-w-[400px] md:max-w-lg text-base md:text-xl mb-4 md:mb-6 font-medium animate-fade-in-up animation-delay-200">
          Timeless pieces designed to move with you because elegance shouldn't
          try hard.
        </p>
        <button className="bg-lemon-200   text-white  px-3 py-1.5 md:px-5 md:py-2 rounded-md font-semibold transition-all duration-300 hover:scale-105 animate-fade-in-up animation-delay-400 text-sm md:text-base">
          Explore Collection
        </button>
      </div>
      <button
        onClick={prevSlide}
        className="hidden md:absolute  left-5 top-1/2 -translate-y-1/2 bg-black/40 text-white md:flex justify-center items-center w-10 h-10 rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute hidden right-5 top-1/2 -translate-y-1/2 bg-black/40 text-white md:flex justify-center items-center w-10 h-10 rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
      >
        ❯
      </button>

      <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full cursor-pointer transition-all duration-300 hover:scale-125 ${
              i === current
                ? 'bg-white shadow-lg'
                : 'bg-gray-400 hover:bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
