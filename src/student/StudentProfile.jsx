import React, { useEffect, useState } from 'react'
import { FaUserCircle, FaRegCalendarAlt, FaHome, FaArrowLeft } from 'react-icons/fa';
import StudentHome from './StudentHome';
import AppliedColleges from './AppliedColleges';
import EditProfile from './EditProfile';
import { useNavigate } from 'react-router-dom';
import { getStudentAPI } from '../services/allAPI';
import { appliedCollegesAPI } from "../services/allAPI";

const StudentProfile = () => {

  const navigate = useNavigate();
  const [appliedColleges, setAppliedColleges] = useState([]);
  const [isPage, setIsPage] = useState('home');
  const [studentData, setStudentData] = useState([]);

  const header = {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };

  useEffect(()=>{
    fetchStudentDetails();
    fetchAppliedColleges();
  },[])

  const fetchStudentDetails = async () => {
    try {
      const result = await getStudentAPI(header);
      result.status === 200 && setStudentData(result.data);
    } catch (err) {
      console.log(err);
      
    }
  }

  const fetchAppliedColleges = async () => {
    
    try {
      const result = await appliedCollegesAPI(header);
      if (result.status === 200) {
        setAppliedColleges(result.data);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error loading applied colleges");
    }
  };

  return (
    <>
      <div className='w-screen h-screen bg-purple-700 grid grid-cols-4'>
        <div className='p-8 text-white'>
          <div className='flex items-baseline'>
            <button onClick={()=>navigate('/')}><FaArrowLeft className="mr-4 text-xl" /></button>
            <h1 className='text-2xl font-bold'>Student Dashboard</h1>
          </div>
          <div>
            <nav className="space-y-4 mt-4">
              <button onClick={()=>setIsPage('home')} className="flex items-center space-x-2 hover:bg-purple-800 p-2 rounded w-full">
                <FaHome /> <span>Home</span>
              </button>
              <button onClick={()=>setIsPage('college')} className="flex items-center space-x-2 hover:bg-purple-800 p-2 rounded w-full">
                <FaRegCalendarAlt /> <span>Colleges</span>
              </button>
              <button onClick={()=>setIsPage('profile')} className="flex items-center space-x-2 hover:bg-purple-800 p-2 rounded w-full">
                <FaUserCircle /> <span>User</span>
              </button>
            </nav>
          </div>
        </div>
        <div className='col-span-3 py-5 pe-5'>
          <div className='bg-white rounded-3xl h-full p-5'>
            {
              isPage === 'home' ? (
                <StudentHome appliedColleges={appliedColleges} studentData={studentData} />
              ) : isPage === 'college' ? (
                <AppliedColleges appliedColleges={appliedColleges} />
              ) : isPage === 'profile' ? (
                <EditProfile studentData={studentData} />
              ) : (
                <StudentHome />
              )
            }
          </div>
        </div>
      </div>
      
    </>

  )
}

export default StudentProfile