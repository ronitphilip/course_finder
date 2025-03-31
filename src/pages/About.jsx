import React from 'react'
import OurTeam from '../components/OurTeam'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const About = () => {
  return (
    <div className="bg-gradient-to-br from-[#0F0F1A] via-[#1C1C2E] to-[#0F0F1A] text-white ">
      <Navbar />
      <OurTeam />
      <Footer />
    </div>
  )
}

export default About