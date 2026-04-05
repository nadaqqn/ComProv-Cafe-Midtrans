"use client";

import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

export default function HeroCarousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () =>
    setActiveIndex((prev) => (prev + 1) % images.length);

  const prevSlide = () =>
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section {...handlers} className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url('${images[activeIndex]}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0"></div>

      {/* Text Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center top-1/2 transform -translate-y-1/2 px-6">
        <h1
          className="text-white text-5xl font-bold mb-6 font-pacifico"
          style={{
            letterSpacing: "0.05em",
            fontFamily: "'Dancing Script', cursive",
          }}
        >
          Discover Seruas Coffee
        </h1>
        <button className="bg-[#8b5e53] text-white font-bold rounded-full px-8 py-3 hover:bg-[#6f473f] transition">
          ORDER NOW
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === activeIndex
                ? "bg-white opacity-100"
                : "bg-white opacity-40"
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition z-20"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition z-20"
      >
        &#10095;
      </button>
    </section>
  );
}
