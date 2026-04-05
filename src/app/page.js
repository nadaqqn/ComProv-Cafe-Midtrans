"use client";


import dynamic from "next/dynamic";

const HeroCarousel = dynamic(() => import("./components/HeroCarousel"), {
  ssr: false,
});

import GalleryCarousel from "./components/GalleryCarousel";

import HeaderWithCart from './components/HeaderWithCart';


export default function Home() {
  
  
  return (
  <>
    {/* HERO SECTION */}
    <section id="Home">
      <HeroCarousel images={["/wooden-coffee.jpg", "/workspace.jpg"]} />
    </section>

      {/* HOME SECTION */}
    <section id="About"
      className="text-white h-screen flex items-center px-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center 
                      space-y-10 md:space-y-0 md:space-x-16">

        {/* Gambar bundar */}
        <div className="flex-shrink-0 w-64 h-64 rounded-full overflow-hidden border-4 border-[#8b5e53]">
          <img
            src="/coffee.jpg"
            alt="Espresso Machine"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Teks deskriptif */}
        <div className="max-w-xl text-center md:text-left">
          <h2
            className="text-4xl font-cursive mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Welcome To Seruas Coffee
          </h2>

          <p className="text-lg leading-relaxed">
            Welcome to Seruas Coffee, a cozy cafe in Bali where nature-inspired design 
            meets productivity and relaxation. Our cafe features warm lighting, bamboo 
            and wood interiors, and alang-alang accents, creating the perfect ambiance 
            for work, study, or casual coffee moments.
            <br /><br />
            At Seruas Coffee, every cup is crafted from carefully selected specialty 
            coffee beans, offering a rich and memorable taste. Whether you're looking 
            for a peaceful workspace, a relaxing coffee break, or a spot to connect 
            with friends, Seruas Coffee provides an inviting atmosphere for all.
            Experience the perfect blend of comfort, creativity, and premium coffee 
            at Seruas Coffee & Workspace.
          </p>
        </div>

      </div>
    </section>


    {/* ======= GALLERY SECTION ======= */}
    <section id="Gallery" className="py-20 bg-[#f5f5f5]">
      <GalleryCarousel
        slides={[
          "/barista.webp",
          "/baristacafe.webp",
          "/coffeeshop.webp",
          "/interior.webp",
        ]}
        autoPlay={true}
        delay={6000}
      />


    </section>

    {/* MENU SECTION */}
  <section id="Menu" className="">
       <div>
      {/* MENU SECTION */}
      <HeaderWithCart />
    </div>
    </section>

    

    {/* Section Visit Us */}
    <section id="Location"
      className="relative bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-hours.jpg')" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center gap-12">

        {/* Judul */}
        <h2 className="text-5xl font-extrabold mb-12 text-center">
          Visit <span className="text-[#f97646] italic">Us!</span>
        </h2>

        {/* Dua kolom: Opening Hours & Maps */}
        <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-12">

          {/* Opening Hours Box */}
          <div className="bg-white rounded-2xl p-8 max-w-sm shadow-lg">
            <h2 className="text-[#7b5a4e] text-3xl font-header text-center mb-4">
              Opening Hours
            </h2>
            <hr className="border-t border-gray-300 mb-6" />
            <div className="text-gray-600">
              <div className="flex justify-between items-center border-b border-gray-300 py-2">
                <span className="text-sm w-32 truncate">Monday - Friday</span>
                <span className="text-lg">09:00am - 09:00pm</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 py-2">
                <span className="text-sm w-32 truncate">Saturday - Sunday</span>
                <span className="text-lg">09:00am - 12:00pm</span>
              </div>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-2xl font-header mb-1">Call Now</h3>
              <p className="text-[#7b5a4e] font-semibold text-xl">(62) 878-8989-8989</p>
            </div>
          </div>

          {/* Maps */}
          <div className="w-full lg:w-96 h-64 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.0012345678!2d115.1695483!3d-8.823183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd25b2c09b03d11%3A0x265e340c8693d619!2sPatuz+Kitchen!5e0!3m2!1sen!2sid!4v1697456392287!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </div>
    </section>




  </>
  );
}


