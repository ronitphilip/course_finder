import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  return (
    <>
      {/* Navigation */}
      <nav className="absolute top-4 left-0 w-full flex justify-between items-center px-10 z-20">
        <h1 className="text-2xl font-bold">CourseFinder</h1>
        <ul className="flex gap-6 text-lg">
          <li className="hover:text-blue-400 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-blue-400 cursor-pointer">
            <Link to="/colleges">Colleges</Link>
          </li>
          <li className="hover:text-blue-400 cursor-pointer">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-blue-400 cursor-pointer">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {user ? (
          role === "student" ? (
            <button
              onClick={() => navigate("/student/profile")}
              className="bg-blue-500 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-400"
            >
              <FaUserCircle className="text-xl" />
              {user?.username?.includes("@") ? user.username.split("@")[0] : user?.username?.split(" ")[0] || 'Profile'}
            </button>
          ) : role === "college" ? (
            <button
              onClick={() => navigate("/college/profile")}
              className="bg-blue-500 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-400"
            >
              <FaUserCircle className="text-xl" />
              {user?.username?.includes("@") ? user.username.split("@")[0] : user?.username?.split(" ")[0] || 'Profile'}
            </button>
          ) : role === "admin" ? (
            <button
              onClick={() => navigate("/admin")}
              className="bg-blue-500 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-400"
            >
              <FaUserCircle className="text-xl" />
              Admin
            </button>
          ) : null
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-400"
          >
            Login
          </button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
