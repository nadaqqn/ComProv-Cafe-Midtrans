"use client";

import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation"; // untuk redirect halaman

export default function Header({ onCartClick }) {  // <-- tambahkan onCartClick di sini
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-0.2 text-[#ff8162] transition-colors duration-300
                   bg-transparent backdrop-blur-sm">
      <div className="logo">
        <Image
          src="/logo2.png"
          alt="Cafe Cristal Logo"
          width={40}
          height={40}
          priority
        />
      </div>

      <nav className="flex items-center space-x-10 text-sm font-semibold tracking-wide">
        <a href="/#Home" className="hover:underline">Home</a>
        <a href="/#About" className="hover:underline">About Us</a>
        <a href="/#Gallery" className="hover:underline">Gallery</a>
        <a href="/#Menu" className="hover:underline">Menu</a>
        <a href="/#Location" className="hover:underline">Location</a>
        
        <button
          aria-label="Search"
          className="ml-6 p-2 rounded-full border border-white hover:bg-white hover:text-black transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        {/* Icon Keranjang */}
        <button
          aria-label="Cart"
          className="ml-4 p-2 rounded-full border border-white hover:bg-white hover:text-black transition"
          onClick={onCartClick}  // <-- pakai prop dari parent
        >
          <FiShoppingCart className="h-5 w-5" />
        </button>
      </nav>
    </header>
  );
}
