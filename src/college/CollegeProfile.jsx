import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaRegCalendarAlt, FaHome, FaArrowLeft, FaBook } from 'react-icons/fa';
import CollegeHome from './CollegeHome';
import AppiledStudents from './AppiledStudents';
import EditProfile from './EditProfile';
import ManageCourse from './ManageCourse';
import { useNavigate } from 'react-router-dom';
import { getApplicationsAPI, getCollegeAPI, updateApplicationAPI } from '../services/allAPI';
import toast from 'react-hot-toast';

const CollegeProfile = () => {
  const navigate = useNavigate();
  const [isPage, setIsPage] = useState('home');
  const [newApplications, setNewApplications] = useState([]);
  const [collegeData, setCollegeData] = useState([]);

  const header = {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };

  useEffect(() => {
    fetchApplications();
    fetchCollegeDetails();
  }, []);

  const fetchApplications = async () => {
    try {
      const result = await getApplicationsAPI(header);
      if (result.status === 200) {
        setNewApplications(result.data);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error loading applied colleges");
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    const reqBody = JSON.stringify({ status: newStatus });

    try {
      const result = await updateApplicationAPI(applicationId, reqBody, header);

      if (result.status === 200) {
        toast.success('Application updated');
        fetchApplications();
      } else {
        toast.error('Failed to update');
        console.log(err);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status");
    }
  };

  const fetchCollegeDetails = async () => {
    try {
      const result = await getCollegeAPI(header);
      result.status === 200 && setCollegeData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='w-screen h-screen bg-purple-700 grid grid-cols-4'>
        <div className='p-8 text-white'>
          <div className='flex items-baseline'>
            <button onClick={() => navigate('/')}><FaArrowLeft className="mr-4 text-xl" /></button>
            <h1 className='text-2xl font-bold'>College Dashboard</h1>
          </div>
          <div>
            <nav className="space-y-4 mt-4">
              <button onClick={() => setIsPage('home')} className="flex items-center space-x-2 hover:bg-purple-800 p-2 rounded w-full">
                <FaHome /> <span>Home</span>
              </button>
              <button onClick={() => setIsPage('college')} className="flex items-center space-x-2 hover:bg-purple-800 p-2 rounded w-full">
                <FaRegCalendarAlt /> <span>Applications</span>
              </button>
              <button onClick={() => setIsPage('courses')} className="flex items-center space-x-2 hover:bg-purple-800 p-2 rounded w-full">
                <FaBook /> <span>Courses</span>
              </button>
              <button onClick={() => setIsPage('profile')} className="flex items-center space-x-2 hover:bg-purple-800 p-2 rounded w-full">
                <FaUserCircle /> <span>User</span>
              </button>
            </nav>
          </div>
        </div>
        <div className='col-span-3 py-5 pe-5'>
          <div className='bg-white rounded-3xl h-full p-5'>
            {isPage === 'home' ? (
              <CollegeHome newApplications={newApplications} />
            ) : isPage === 'college' ? (
              <AppiledStudents newApplications={newApplications} handleStatusUpdate={handleStatusUpdate} />
            ) : isPage === 'profile' ? (
              <EditProfile collegeData={collegeData} />
            ) : isPage === 'courses' ? (
              <ManageCourse />
            ) : (
              <CollegeHome />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollegeProfile;
