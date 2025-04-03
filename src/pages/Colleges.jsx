import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCollege } from '../context/CollegeContext';
import CollegeCard from '../components/CollegeCard';
import Pnf from './Pnf';
import { useLocation } from 'react-router-dom';

const Colleges = () => {

  const { colleges, courses, location, loading, error } = useCollege();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const courseQuery = queryParams.get('course');

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("")
  const [searchQuery, setSearchQuery] = useState(courseQuery || "");

  useEffect(() => {
    setSearchQuery(courseQuery || "");
  }, [courseQuery]);

  const uniqueStates = [...new Set(location.map((item) => item.state))];

  const uniqueDistricts =
    selectedState !== ""
      ? [...new Set(location.filter((item) => item.state === selectedState).map((item) => item.district))]
      : [];

      const filteredColleges = colleges.filter((college) => {
        const isSearchOrFilterActive =
          searchQuery ||
          selectedState ||
          selectedDistrict ||
          selectedCourse;
      
        const collegeNameMatch = searchQuery
          ? college.name.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
      
        const courseMatch = searchQuery
          ? college.courses.some(course => course.name.toLowerCase().includes(searchQuery.toLowerCase()))
          : true;
      
        const selectedCourseMatch = selectedCourse
          ? college.courses.some(course => course.name.toLowerCase() === selectedCourse.toLowerCase())
          : true;
      
        const approvedCheck = isSearchOrFilterActive ? true : college.is_approved;
      
        return (
          approvedCheck &&
          (!selectedState || college.state === selectedState) &&
          (!selectedDistrict || college.district === selectedDistrict) &&
          selectedCourseMatch && 
          (collegeNameMatch || courseMatch)
        );
      });

  const handleCourseSelect = (course) => {
    setSelectedCourse(prev => (prev === course ? '' : course));
  };

  if (loading) return <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F0F1A] via-[#1C1C2E] to-[#0F0F1A] text-white'><p className="text-center text-xl">Loading colleges...</p></div>
  if (error) return <Pnf />;

  return (
    <div className='pt-18 bg-gradient-to-br from-[#0F0F1A] via-[#1C1C2E] to-[#0F0F1A] text-white'>
      <Navbar />
      <div className='min-h-150 grid grid-cols-5 p-5 gap-6'>

        {/* Sidebar with Filters */}
        <div className='p-4 bg-gray-900 rounded-lg shadow-lg'>
          <div className='mb-4 w-full'>
            <input type="text" placeholder="Search by college or course" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-teal-400" />
          </div>

          <h2 className='text-lg font-bold mb-2'>Filter by Course</h2>
          <div className='flex flex-col space-y-2'>
            {(showAllCourses ? courses : courses.slice(0, 5)).map((course, index) => (
              <label key={index} className='flex items-center cursor-pointer'>
                <input
                  type='radio'
                  name='course'
                  value={course?.name}
                  checked={selectedCourse === course?.name}
                  onChange={() => handleCourseSelect(course?.name)}
                  className='hidden'
                />
                <span className={`w-4 h-4 border-2 rounded-full ${selectedCourse === course?.name ? 'bg-teal-400' : 'border-gray-500'}`}></span>
                <span className='ml-2 text-gray-300 capitalize'>{course?.name}</span>
              </label>
            ))}
            {courses.length > 5 && (
              <button
                onClick={() => setShowAllCourses(!showAllCourses)}
                className="text-teal-400 underline text-sm cursor-pointer"
              >
                {showAllCourses ? 'Show Less' : 'More'}
              </button>
            )}
          </div>

          <h2 className='text-lg font-bold mt-4 mb-2'>Filter by State</h2>
          <div className="flex flex-col space-y-2">
            {uniqueStates.map((state, index) => (
              <label key={index} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="state"
                  value={state}
                  checked={selectedState === state}
                  onChange={() => {
                    setSelectedState(state);
                    setSelectedDistrict("");
                  }}
                  className="hidden"
                />
                <span className={`w-4 h-4 border-2 rounded-full ${selectedState === state ? "bg-teal-400" : "border-gray-500"}`}></span>
                <span className="ml-2 text-gray-300">{state}</span>
              </label>
            ))}
          </div>

          {selectedState && (
            <>
              <h2 className="text-lg font-bold mt-4 mb-2">Filter by District</h2>
              <div className="flex flex-col space-y-2">
                {uniqueDistricts.map((district, index) => (
                  <label key={index} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="district"
                      value={district}
                      checked={selectedDistrict === district}
                      onChange={() => setSelectedDistrict(prev => (prev === district ? "" : district))}
                      className="hidden"
                    />
                    <span className={`w-4 h-4 border-2 rounded-full ${selectedDistrict === district ? "bg-teal-400" : "border-gray-500"}`}></span>
                    <span className="ml-2 text-gray-300">{district}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {(selectedCourse || selectedState || selectedDistrict) && (
            <button
              onClick={() => {
                setSelectedCourse("");
                setSelectedState("");
                setSelectedDistrict("");
              }}
              className="mt-4 bg-red-500 px-4 py-2 text-white rounded-md w-full cursor-pointer"
            >
              Clear Filters
            </button>
          )}

        </div>

        {/* College Cards Section */}
        <div className='grid col-span-4 grid-cols-4 gap-3 min-h-screen'>
          {filteredColleges.length > 0 ? (
            filteredColleges.map((college) => (
              <CollegeCard key={college.id} college={college} imgheight='h-45' height='h-65' />
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-3">No colleges found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Colleges;
