import React from "react";
import { useNavigate } from "react-router-dom";

const teamMembers = [
  { name: "Richard G.", role: "Co-founder, Technical Lead", experience: "8+ years", image: "https://i.pinimg.com/736x/52/46/49/524649971a55b2f3a0dae1d537c61098.jpg" },
  { name: "George B.", role: "Co-founder, Mobile Apps", experience: "8+ years", image: "https://i.pinimg.com/736x/10/0e/32/100e324c085a3d86fa6214e619b9a1ec.jpg" },
  { name: "Jane M.", role: "Co-founder, Web Apps", experience: "12+ years", image: "https://i.pinimg.com/736x/99/c8/87/99c88705a07c52aa0460dfd70454a48c.jpg" },
  { name: "Rachel T.", role: "Game Designer", experience: "12+ years", image: "https://i.pinimg.com/736x/da/a7/46/daa746a0575a0d2d29dd971ecff49fd4.jpg" },
  { name: "Tiffany K.", role: "UI/UX Designer", experience: "7+ years", image: "https://i.pinimg.com/736x/8d/a7/41/8da7418c70faa5abfacc5bd20ba78e23.jpg" }
];

const OurTeam = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center pt-25 px-8 md:px-16 relative z-10">
        {/* Left Column - Content */}
        <div className="flex flex-col justify-center ps-15">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Meet our <br />
            <span className="text-teal-500">talented team.</span>
          </h2>
  
          <p className="text-gray-600 mb-8 max-w-lg">
            Our diverse team of experts brings years of experience across various industries.
            We're passionate about creating exceptional products and
            delivering outstanding results for our clients.
          </p>
  
          <div className="flex gap-4">
            <button className="bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-800 transition-colors font-medium">
              Join our team
            </button>
            <button onClick={()=>navigate('/contact')} className="border border-teal-500 text-teal-500 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium">
              Contact us
            </button>
          </div>
        </div>
  
        {/* Right Column - Image Container */}
        <div className="flex justify-center">
          <div className="h-80 md:h-96 bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
            <img className="h-100" src="https://i.pinimg.com/736x/00/f8/09/00f80924ca315eec7ff96e30c297a280.jpg" alt="" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 px-6 py-26">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-25 h-25 rounded-full overflow-hidden shadow-lg transition-transform transform hover:scale-105">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-semibold mt-4">{member.name}</h3>
            <p className="text-gray-600 text-sm">{member.role}</p>
            <p className="text-gray-500 text-xs">{member.experience} experience</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default OurTeam;
