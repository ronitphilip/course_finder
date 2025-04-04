import React from "react";
import { FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-12 px-20 relative z-10">
      <div className="grid grid-cols-5 gap-10">
        {/* Left Section - Branding */}
        <div>
          <h2 className="text-2xl text-white font-bold flex items-center gap-2">
            <span className="text-yellow-400">★</span> CourseFinder
          </h2>
          <p className="text-sm mt-2 max-w-xs">
            Helping students discover the best colleges that match their goals and aspirations. Find your dream college and take the next step toward a bright future.
          </p>
          <p className="text-sm mt-2 max-w-xs">Currently v1.3.5.</p>
        </div>

        <div></div>
        <div></div>

        {/* Middle Section - Menu */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Menu</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to={'/'} className="hover:text-white">Home</Link></li>
            <li><Link to={'/colleges'} className="hover:text-white">Colleges</Link></li>
            <li><Link to={'/contact'} className="hover:text-white">Contact</Link></li>
            <li><Link to={'/about'} className="hover:text-white">About</Link></li>
            <li><Link to={'/admin'} className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>

        {/* Right Section - Legal & Socials */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
          </ul>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4 text-yellow-400 text-xl">
            <a href="#"><FaXTwitter className="hover:text-white transition-colors" /></a>
            <a href="#"><FaLinkedin className="hover:text-white transition-colors" /></a>
            <a href="#"><FaInstagram className="hover:text-white transition-colors" /></a>
          </div>
        </div>
      </div>

      {/* Thin Separator */}
      <div className="border-t border-gray-700 mt-10"></div>
    </footer>
  );
};

export default Footer;
