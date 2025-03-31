import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Hero = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/colleges?course=${encodeURIComponent(searchQuery)}`);
    }
  };


  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-3xl px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Find Your <span className="text-blue-400">Dream College</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Search for courses and find the best colleges offering them.
        </p>

        {/* Search Bar */}
        <div className="mt-6 flex justify-center relative">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search for college or courses..."
              className="w-full p-3 pl-10 rounded-full text-gray-500 focus:outline-none bg-white shadow-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <FaSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={handleSearch}
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={() => navigate("/colleges")}
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-400 transition"
          >
            Explore Colleges
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-3 bg-transparent border-2 border-white font-bold rounded-full hover:bg-white hover:text-black transition"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
