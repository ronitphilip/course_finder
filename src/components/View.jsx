import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { appliedCollegesAPI, fetchCollegeDetailsAPI } from "../services/allAPI";
import { FaCheckCircle, FaMapMarkerAlt, FaSearch, FaGraduationCap, FaStar } from "react-icons/fa";
import ApplyPop from "./ApplyPop";
import Comments from "./Comments";

const View = () => {
  const { id } = useParams();

  const [college, setCollege] = useState([]);
  const [appData, setAppData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchAllAppliedColleges();
    fetchDetails();
  }, [id]);

  const fetchAllAppliedColleges = async () => {

    const token = localStorage.getItem('access_token')

    if (!token) {
      console.error("No token found! User might be logged out.");
      return;
    }

    const header = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const result = await appliedCollegesAPI(header);
      if (result.status === 200) {
        localStorage.setItem("applied-colleges", JSON.stringify(result.data));
        setAppData(result.data);
      } else {
        console.log("Unexpected response:", result);
      }
    } catch (err) {
      console.error("Error fetching applied colleges:", err);
    }
  }

  const fetchDetails = async () => {
    try {
      const result = await fetchCollegeDetailsAPI(id);
      if (result.status == 200) {
        setCollege(result.data);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const filteredCourses = college?.courses?.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        {
          showPopup && <ApplyPop appData={appData} college={college} id={id} onClose={() => setShowPopup(false)} />
        }
      </div>
      <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col md:flex-row gap-10">
        {/* Left Section - College Image & Basic Info */}
        <div className="md:w-3/4 flex flex-col items-center mt-3">
          {/* College Image */}
          <img
            src={college?.image}
            alt="College Cover"
            className="w-full h-120 object-cover rounded-lg shadow-lg"
          />

          {/* College Details */}
          <div className="w-full mt-5">
            <div className="flex items-baseline justify-between">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                {college.name}
                {college.is_approved && <FaCheckCircle className="text-green-400 text-2xl" />}
              </h1>
              <div className="flex space-x-1 mt-1 me-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-lg ${averageRating >= star ? "text-yellow-400" : "text-gray-600"}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-400 mt-2 flex items-center gap-2 text-lg">
              <FaMapMarkerAlt className="text-red-600" /> {college?.street}, {college?.district}, {college?.state}
            </p>
            <div>
              <h2 className="text-xl font-semibold mt-5">College Details:</h2>
              <p className="text-gray-300 mt-2">{college?.description}</p>
            </div>
          </div>
        </div>

        {/* Right Section - Courses & Apply Button */}
        <div className="md:w-1/2 flex flex-col justify-center space-y-6 pe-20">
          {college?.courses?.length > 0 && (
            <div className="h-150 overflow-auto bg-gray-800 rounded-2xl p-5 shadow-lg">
              <div className="w-full flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FaGraduationCap /> Available Courses
                </h2>
                {/* Search Button */}
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="flex items-center gap-2 bg-gray-700 px-3 p-2 rounded-lg text-white hover:bg-gray-600 transition"
                >
                  <FaSearch />
                </button>
              </div>

              {/* Search Box */}
              {showSearch && (
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              )}

              {/* Course List */}
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-300">
                {filteredCourses?.length > 0 ? (
                  filteredCourses?.map((course, index) => (
                    <div key={index}>
                      <li>{course.name}</li>
                      <ul>
                        {course?.fee && <li>Fee: {course?.fee}</li>}
                        {course?.duration && <li>Duration: {course?.duration} years</li>}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 mt-8">No courses found.</p>
                )}
              </ul>
            </div>
          )}

          <div className="w-full flex justify-center">
            <button
              onClick={() => setShowPopup(true)}
              className="w-60 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition text-lg font-semibold shadow-md"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
      <Comments id={id} setAverageRating={setAverageRating} />
    </>
  );
};

export default View;
