import React from 'react';

export default function Subscribe() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="w-full bg-lemon-100 text-black py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Stay in the loop
          </h2>
          <p className="mt-3 md:mt-4 text-black font-raleway text-base md:text-lg">
            Subscribe to receive updates on events, inspirational content, and
            community news.
          </p>
        </div>

        {/* Right form */}
        <div className="flex-1 w-full font-raleway">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-3"
          >
            <label htmlFor="subscribe-email" className="sr-only">
              Email address
            </label>
            <input
              id="subscribe-email"
              type="email"
              required
              autoComplete="email"
              placeholder="Enter your email"
              className="w-full sm:w-80 rounded-full bg-white px-5 py-3 text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-lemon-100"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="rounded-full px-6 py-3 bg-black text-white font-semibold shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-xs text-white/80">
            We care about your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
