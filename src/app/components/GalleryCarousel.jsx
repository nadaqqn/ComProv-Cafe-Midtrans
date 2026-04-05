"use client";

import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

export default function GalleryCarousel({ slides = [], autoPlay = true, delay = 4000 }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const next = () => {
    setFade(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
      setFade(false);
    }, 300);
  };

  const prev = () => {
    setFade(true);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + slides.length) % slides.length);
      setFade(false);
    }, 300);
  };

  // Swipe
  const swipeHandlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    preventDefaultTouchmoveEvent: true,
  });

  // Auto Play
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => next(), delay);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4" {...swipeHandlers}>
      
      {/* Container */}
      <div className="relative overflow-hidden rounded-2xl shadow-lg h-[350px] md:h-[450px] bg-black/10">

        {/* Fade Images */}
        {slides.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Slide ${i}`}
            className={`
              absolute inset-0 w-full h-full object-cover transition-opacity duration-700
              ${i === index && !fade ? "opacity-100" : "opacity-0"}
            `}
          />
        ))}
      </div>

      {/* NAV BUTTONS */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 px-3 rounded-full hover:bg-black/60 transition"
      >
        &#10094;
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 px-3 rounded-full hover:bg-black/60 transition"
      >
        &#10095;
      </button>

      {/* DOTS */}
      <div className="flex justify-center mt-5 space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition 
              ${i === index ? "bg-gray-800" : "bg-gray-400 opacity-60"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
