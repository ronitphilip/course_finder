import React, { useState, useEffect } from 'react';
import { FiBell } from "react-icons/fi";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa"
import { useCollege } from '../context/CollegeContext';
import { useNavigate } from 'react-router-dom';
import { getReviewAPI } from '../services/allAPI';

const StudentHome = ({ appliedColleges, studentData }) => {

  const { colleges } = useCollege()
  const navigate = useNavigate()

  const student = JSON.parse(localStorage.getItem('user'));
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [collegeRatings, setCollegeRatings] = useState({});

  const suggestedColleges = colleges.filter(college =>
    college?.district?.toLowerCase() === studentData?.district?.toLowerCase()
  );

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    const newNotifications = appliedColleges
      .map((college) => {
        if (college.status === "approved") {
          return `✅ Your application to ${college.college_name} for ${college.course_name} has been approved!`;
        } else if (college.status === "rejected") {
          return `❌ Your application to ${college.college_name} for ${college.course_name} has been rejected.`;
        }
        return null;
      })
      .filter(Boolean);

    setNotifications(newNotifications);
    avrReviews();
  }, [appliedColleges]);

  const avrReviews = async () => {
    try {
      const reviewResponses = await Promise.all(
        suggestedColleges.map((college) => getReviewAPI(college.id))
      );

      const ratings = {};
      reviewResponses.forEach((response, index) => {
        const reviews = response.data;
        if (reviews.length > 0) {
          const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
          ratings[suggestedColleges[index].id] = avgRating.toFixed(1);
        } else {
          ratings[suggestedColleges[index].id] = 0;
        }
      });

      setCollegeRatings(ratings);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-full">
      <div className="flex justify-between">
        <h1 className="text-xl bg-gray-100 px-5 rounded-xl flex items-center text-purple-600">
          Welcome {student?.username ? student.username : 'User'}!
        </h1>
        <div className="flex items-center space-x-3">
          <span className="text-2xl text-white h-9 w-9 flex justify-center rounded-full bg-purple-700">
            {student?.username.charAt(0).toUpperCase()}
          </span>
          <span>{student?.email ? student.email : 'student@example.com'}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 h-full">
        {/* Suggestions Section */}
        <div className="h-155 overflow-y-auto px-5 pt-5">
          <h1 className="text-xl font-bold">Suggestions</h1>
          <p className="text-gray-400 mt-1">Checkout colleges near you!</p>

          <div className="mt-5 overflow-auto max-h-130 space-y-2">
            {suggestedColleges.length > 0 ? (
              suggestedColleges.map((college) => (
                <div key={college.id} className="p-3 rounded-xl bg-purple-100">
                  <h1 className="font-bold text-2xl mb-1">{college.name}</h1>
                  <p className='flex items-center'><FaMapMarkerAlt className="text-red-600 me-1" />{college.state} {college.district} {college.street}</p>
                  <div className="flex justify-between items-center">
                    <div className='flex items-center'>
                      <div className="flex space-x-1 me-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`text-lg ${collegeRatings[college.id] >= star ? "text-yellow-400" : "text-gray-600"}`}
                          />
                        ))}
                      </div>
                      <span>{collegeRatings[college.id]}/5</span>
                    </div>
                    <button onClick={() => navigate(`/colleges/${college?.id}`)} className="px-2 py-1 text-white bg-blue-600 rounded-xl">
                      Apply
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No colleges found near you!</p>
            )}
          </div>

        </div>

        {/* Notifications Section */}
        <div className="pt-18">
          <div className="bg-purple-700 text-white rounded-2xl mt-5 flex flex-col">
            <div
              className="flex items-center justify-between p-3 bg-purple-700 text-white rounded-xl shadow-lg cursor-pointer"
              onClick={toggleNotifications}
            >
              <h1 className="text-xl font-bold">Notifications</h1>
              <FiBell
                size={24}
                className="transition-transform duration-300"
                style={{
                  transform: showNotifications ? "rotate(15deg)" : "rotate(0deg)",
                }}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ${showNotifications ? "max-h-115" : "max-h-0"
                } bg-purple-700 rounded-xl text-white mt-2`}
            >
              <div className="space-y-2 p-5 max-h-115 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div key={index} className="bg-purple-400 rounded-xl p-3 flex items-center">
                      <span>{notification}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-300">No new notifications</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
