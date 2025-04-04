import React, { useState, useEffect } from 'react';
import { FiBell } from "react-icons/fi";
import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getCoursesAPI } from '../services/allAPI';
import { PieChart, Pie, Cell } from "recharts";
import manImg from '../assets/manImg.jpg'

const CollegeHome = ({ newApplications }) => {

  const college = JSON.parse(localStorage.getItem('user'));
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const applicationNotifications = newApplications
      .filter(app => app.status === "pending")
      .map(app => `New application: ${app.student_name} applied for ${app.course_name}.`);

    setNotifications(applicationNotifications);
  }, [newApplications]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    try {
      const response = await getCoursesAPI(headers);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const extractUsername = (email) => {
    return email.includes("@") ? email.split("@")[0] : email;
  };

  const pieChart1Data = [
    { name: "Students", value: newApplications?.length || 0, color: "#4361EE" },
    { name: "Courses", value: courses?.length || 0, color: "#3A0CA3" },
  ];

  const renderLabel = ({ percent }) => `${(percent * 100).toFixed(1)}%`;

  const totalApplications = newApplications.length;
  const pendingApplications = newApplications.filter(app => app.status === "pending").length;
  const acceptedApplications = newApplications.filter(app => app.status === "approved").length;
  const rejectedApplications = newApplications.filter(app => app.status === "rejected").length;

  return (
    <div className='h-full '>
      <div className='flex justify-between '>
        <h1 className='text-xl bg-white px-5 rounded-xl flex items-center text-purple-600'>
          Welcome {college?.username ? extractUsername(college.username) : 'College Admin'}!
        </h1>
        <div className='flex items-center space-x-3'>
          <span className="text-2xl text-white h-9 w-9 flex justify-center rounded-full bg-purple-700">
            {college?.username?.charAt(0).toUpperCase() || 'C'}
          </span>
          <span>{college?.email || 'college@example.com'}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 h-full">
        <div className='h-150 mt-5 grid grid-rows-2 gap-4 pe-5 pt-5'>
          <div className='bg-white rounded-2xl inset-shadow-xs p-5 flex items-center justify-between'>
            <div className='ps-10 space-y-2'>
              <p className='text-gray-700 text-sm'>Total Applications</p>
              <p className='text-7xl font-bold text-center'>{totalApplications}</p>
              <div className='flex flex-col space-y-1'>
                <span className='text-sm'> Pending: {pendingApplications}</span>
                <span className='text-sm'> Accepted: {acceptedApplications}</span>
                <span className='text-sm'> Rejected: {rejectedApplications}</span>
              </div>
            </div>
            <img className='w-65 me-10' src={manImg} alt="no img" />
          </div>
          <div className='bg-white rounded-2xl inset-shadow-xs py-5 ps-5 flex justify-between'>
            <PieChart width={250} height={250}>
              <Pie
                data={pieChart1Data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={100}
                stroke="none"
                dataKey="value"
                label={renderLabel}
                labelLine={false}
              >
                {pieChart1Data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className='py-5 pe-15 flex flex-col justify-center items-end space-y-2'>
              <h1 className='text-lg font-semibold text-gray-800'>Overview</h1>
              <div className='flex flex-col justify-center items-end'>
                <p className='text-sm text-gray-700'>Total courses and applied</p>
                <p className='text-sm text-gray-700'>students.</p>
              </div>
              <div className='flex flex-col justify-center items-end'>
                {pieChart1Data.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    {entry.name}
                    <span className="w-4 h-4 inline-block rounded-full" style={{ backgroundColor: entry.color }}></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className='h-150 mt-5'>
          <div className='bg-purple-700 text-white rounded-2xl mt-5 flex flex-col'>
            <div className="flex items-center justify-between p-3 bg-purple-700 text-white rounded-xl shadow-lg cursor-pointer"
              onClick={toggleNotifications}>
              <h1 className="text-xl font-bold">Notifications</h1>
              <FiBell size={24} className="transition-transform duration-300"
                style={{ transform: showNotifications ? "rotate(15deg)" : "rotate(0deg)" }} />
            </div>
            <div className={`overflow-hidden transition-all duration-500 ${showNotifications ? "max-h-130" : "max-h-0"} bg-purple-700 rounded-xl text-white my-2`}>
              <div className="space-y-2 p-5 max-h-130 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div key={index} className="bg-purple-400 rounded-xl p-3 flex items-center">
                      <span>{notification}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-300">No new applications</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CollegeHome;
