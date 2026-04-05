"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { formatRupiah } from "@/utils/formatRupiah";

import {
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

export default function MenuCarousel({ items, addToCart }) {
  const [category, setCategory] = useState("minuman"); // default
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [qty, setQty] = useState(1);

  const filteredItems = useMemo(
    () => items.filter((item) => item.category === category),
    [items, category]
  );

  // init carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
  });

  // update selected slide
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setQty(1);
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  // reset scroll when category changes
  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(0);
      setSelectedIndex(0);
      setQty(1);
    }
  }, [category, emblaApi]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const activeItem = filteredItems[selectedIndex];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-[#fafafa] relative px-4">
      <h2 className="text-4xl font-bold text-center text-[#8b5e53] mb-4">
        Our Menu
      </h2>

      {/* FILTER BUTTONS */}
      <div className="flex justify-center gap-4 mb-0 relative z-50">
        {["minuman", "makanan", "kue"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-full border text-sm font-semibold capitalize transition-all
              ${
                category === cat
                  ? "bg-[#8b5e53] text-white border-[#8b5e53]"
                  : "bg-white text-[#8b5e53] border-[#8b5e53] hover:bg-[#f5e5db]"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CAROUSEL */}
      <div className="embla overflow-hidden relative mx-auto max-w-xs z-10" ref={emblaRef}>
        <div className="embla__container flex">
          {filteredItems.map((item, index) => (
            <div className="embla__slide flex-[0_0_100%] flex justify-center" key={index}>
              <div className="flex flex-col items-center text-center">
                <img src={item.image} alt={item.name} className="w-56 h-56 object-contain" />
                <h3 className="text-2xl font-semibold text-[#8b5e53] mt-2">{item.name}</h3>
<p className="text-lg font-bold text-[#8b5e53]">
  {formatRupiah(item.price)}
</p>
              </div>
            </div>
          ))}
        </div>

        {/* NAV BUTTONS */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full text-[#8b5e53]"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full text-[#8b5e53]"
        >
          <FiChevronRight size={20} />
        </button>
      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-3 mt-4">
        {filteredItems.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              selectedIndex === index ? "bg-[#8b5e53] scale-125" : "bg-[#d9c8bc]"
            }`}
          ></div>
        ))}
      </div>

      {/* QTY + ADD TO CART */}
      {activeItem && (
        <>
          <div className="flex items-center justify-center gap-6 mt-4">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="bg-[#f1e3d4] p-2 text-[#8b5e53] rounded-full"
            >
              <FiMinus />
            </button>

            <span className="text-2xl font-bold w-10 text-[#8b5e53] text-center">{qty}</span>

            <button
              onClick={() => setQty(qty + 1)}
              className="bg-[#f1e3d4] p-2 text-[#8b5e53] rounded-full"
            >
              <FiPlus />
            </button>
          </div>

          <button
            className="bg-[#8b5e53] text-white px-8 py-3 rounded-full text-lg flex items-center gap-3 hover:bg-[#714a42] mt-4"
            onClick={() => {
  addToCart(activeItem, qty); 
  setQty(1); // reset qty
}}
// <-- panggil fungsi dari HeaderWithCart
          >
            <FiShoppingCart size={20} /> Add to Cart
          </button>
        </>
      )}
    </section>
  );
}
