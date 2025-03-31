import React from 'react';
import Hero from '../components/Hero';
import TopColleges from '../components/TopColleges';
import OurTeam from '../components/OurTeam';
import Footer from '../components/Footer';
import ChatBot from '../ChatBot';

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-[#0F0F1A] via-[#1C1C2E] to-[#0F0F1A] text-white relative overflow-hidden">

      <div className="absolute inset-0 bg-purple-800 opacity-80 blur-[100px] rounded-full w-[700px] h-[400px] z-0 top-[-200px] left-[0px]"></div>
      <div className="absolute inset-0 bg-purple-800 opacity-30 blur-[100px] rounded-full w-[500px] h-[400px] z-0 top-[500px] left-[900px]"></div>
      <div className="absolute inset-0 bg-purple-800 opacity-50 blur-[100px] rounded-full w-[500px] h-[400px] z-0 top-[1700px] left-[-100px]"></div>

      <Hero />
      <ChatBot />
      <TopColleges />
      <OurTeam/>
      <Footer />
    </div>
  );
};

export default Home;
