import React, { useState } from "react";
import { FaChartPie, FaUniversity, FaUserGraduate, FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({setIsPage}) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <div className="h-screen p-5 text-white flex flex-col">

      <div className='flex items-baseline my-8 justify-center'>
        <button onClick={() => navigate('/')}><FaArrowLeft className="mr-4 text-xl" /></button>
        <h1 className='text-4xl font-bold me-10'>CourseFinder</h1>
      </div>

      <nav className="flex flex-col space-y-4">
        <SidebarItem icon={<FaChartPie />} text="Dashboard" active={activeItem === "Dashboard"} setActive={setActiveItem} setIsPage={setIsPage} />
        <SidebarItem icon={<FaUniversity />} text="Colleges" active={activeItem === "Colleges"} setActive={setActiveItem} setIsPage={setIsPage} />
        <SidebarItem icon={<FaUserGraduate />} text="Students" active={activeItem === "Students"} setActive={setActiveItem} setIsPage={setIsPage} />
        <SidebarItem icon={<FaEnvelope />} text="Contact" active={activeItem === "Contact"} setActive={setActiveItem} setIsPage={setIsPage} />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, text, active, setActive, setIsPage }) => {
  return (
    <div
      className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer ${
        active ? "bg-indigo-600" : "hover:bg-indigo-800"
      }`}
      onClick={() => {setActive(text), setIsPage(text)}}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-md">{text}</span>
    </div>
  );
};

export default Sidebar;
