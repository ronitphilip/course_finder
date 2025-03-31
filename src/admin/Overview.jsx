import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from "recharts";
import profilepic from '../assets/profilepic.jpg';
import { useCollege } from '../context/CollegeContext';
import { FiChevronDown, FiChevronUp, FiBell } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const Overview = () => {

  const { colleges, courses, location, reviews } = useCollege();
  const { users, messages } = useAdmin();

  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [pendingColleges, setPendingColleges] = useState([]);
  const [newMessages, setNewMessages] = useState(messages)

  useEffect(() => {
    if (colleges) {
      const pending = colleges.filter(college => !college.is_approved);
      setPendingColleges(pending);
    }
  },[colleges])

  const notifications = [
    ...pendingColleges.map(college => ({
      type: "College Approval",
      message: `College "${college.name}" is pending approval.`
    })),
    ...newMessages.map(msg => ({
      type: "New Message",
      message: `New message from ${msg.name || "Unknown"}: "${msg.message?.slice(0, 30)}..."`
    }))
  ]

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const pieChart1Data = [
    { name: "Colleges", value: colleges?.length || 0, color: "#7209B7" },
    { name: "Courses", value: courses?.length || 0, color: "#3A0CA3" },
    { name: "States", value: new Set(location.map((item) => item.state)).size, color: "#4361EE" },
    { name: "Districts", value: new Set(location.map((item) => item.district)).size, color: "#4CC9F0" },
  ];

  const pieChart2Data = [
    { name: 'Reviews', value: reviews?.length || 0, color: '#B5179E' },
    { name: 'Users', value: users?.length || 0, color: '#F72585' },
  ];

  const renderLabel = ({ percent }) => `${(percent * 100).toFixed(1)}%`;

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-indigo-700 bg-white inline px-4 py-1 rounded-2xl'>Dashboard</h1>
        <div onClick={() => setShowDropdown(!showDropdown)} className='flex items-center bg-white px-3 py-2 rounded-full shadow-md cursor-pointer hover:shadow-lg transition-all'>
          <img className='h-10 rounded-full' src={profilepic} alt="admin dp" />
          <h1 className="text-gray-700 font-medium mx-3">admin@gmail.com</h1>
          {showDropdown ? (
            <FiChevronUp className="text-xl text-gray-600 transition-transform duration-200" />
          ) : (
            <FiChevronDown className="text-xl text-gray-600 transition-transform duration-200" />
          )}
          {showDropdown && (
            <div className="absolute right-20 top-30 w-40 bg-white rounded-xl shadow-lg z-10 cursor-pointer">
              <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100 rounded-xl">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='mt-7 h-134 w-262 overflow-hidden relative grid grid-cols-2 gap-10'>

        <div className="h-full grid grid-rows-2 gap-8 overflow-hidden">

          <div className="relative bg-white rounded-2xl inset-shadow-xs overflow-hidden flex items-center p-5">
            <div className="w-1/3 flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-gray-800">Overview</h2>
              <p className="text-sm text-gray-600">Breakdown of colleges, courses, and locations.</p>
              <div>
                {pieChart1Data.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-4 h-4 inline-block rounded-full" style={{ backgroundColor: entry.color }}></span>
                    {entry.name}
                  </div>
                ))}
              </div>
            </div>
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
          </div>

          <div className="relative bg-white rounded-2xl inset-shadow-xs overflow-hidden flex items-center p-5">
            <PieChart width={250} height={250}>
              <Pie
                data={pieChart2Data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={100}
                stroke="none"
                dataKey="value"
                label={renderLabel}
                labelLine={false}
              >
                {pieChart2Data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="w-1/3 flex flex-col gap-3 text-right">
              <h2 className="text-lg font-semibold text-gray-800">User Activity</h2>
              <p className="text-sm text-gray-600">Total users and reviews submitted.</p>
              <div>
                {pieChart2Data.map((entry, index) => (
                  <div key={index} className="flex justify-end items-center gap-2 text-sm text-gray-700">
                    {entry.name}
                    <span className="w-4 h-4 inline-block rounded-full" style={{ backgroundColor: entry.color }}></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="h-full rounded-2xl">
          <div className='bg-purple-700 text-white rounded-2xl flex flex-col'>
            <div className="flex items-center justify-between p-3 bg-purple-700 text-white rounded-xl shadow-lg cursor-pointer"
              onClick={toggleNotifications}>
              <h1 className="text-xl font-bold">Notifications</h1>
              <FiBell size={24} className="transition-transform duration-300"
                style={{ transform: showNotifications ? "rotate(15deg)" : "rotate(0deg)" }} />
            </div>
            <div className={`overflow-hidden transition-all duration-500 ${showNotifications ? "max-h-120" : "max-h-0"} bg-purple-700 rounded-xl text-white my-2`}>
              <div className="space-y-2 px-5 py-2 max-h-115 overflow-y-auto">
                {notifications?.length > 0 ? (
                  notifications?.map((notif, index) => (
                    <div key={index} className="bg-purple-400 rounded-xl p-3 flex items-center">
                      <span>{notif.message}</span>
                    </div>
                  ))
                ) : (
                  <div className="bg-purple-400 rounded-xl p-3 text-center">
                    No new notifications
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Overview;
