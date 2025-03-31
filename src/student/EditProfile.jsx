import { input } from 'framer-motion/client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiLogOut } from "react-icons/fi";
import { updateStudentAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
import { useCollege } from '../context/CollegeContext';

const EditProfile = ({ studentData }) => {

  const { refreshColleges } = useCollege();

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(studentData || {});

  useEffect(() => {
    setFormData(studentData);
  }, [studentData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    
    const header = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };

    try {
      const result = await updateStudentAPI(formData, header);
      
      if(result.status === 200){
        toast.success('Profile updated!');
        setIsEditing(false);
        refreshColleges();
      } else {
        toast.error('Failed to update profile');
      }

    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!')
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  }

  return (
    <div>
      <div className="relative">
        <button onClick={handleLogout} className="fixed right-13 top-13 flex items-center text-black bg-white border-2 border-white px-4 py-2 rounded-xl shadow-md transition-all duration-300 hover:bg-transparent hover:text-white hover:shadow-lg">
          Logout <FiLogOut size={20} className="ms-2" />
        </button>

        <div className="h-60 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-xl flex items-center justify-center flex-col">
          {isEditing ? <input name='username' value={formData.username || 'User'} onChange={handleChange} className="text-4xl text-white font-bold text-center bg-transparent border-b-2 border-white outline-none w-full" /> : <h2 className="text-4xl text-white font-bold">{formData?.username || 'User'}</h2>}
          <p className="text-white mt-2">{formData?.email || 'email'}</p>
        </div>

        <div className="absolute top-45 left-6 w-30 h-30 bg-purple-600 rounded-full border-4 border-white flex items-center justify-center">
          <span className='text-6xl font-extrabold text-white'>{formData?.username?.charAt(0) || 'U'}</span>
        </div>

        <button onClick={isEditing ? handleSave : () => setIsEditing(true)} className="fixed right-20 top-80 px-4 py-2 bg-purple-600 text-white rounded">
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <div className="p-10 grid grid-cols-2 mt-10">
        <div>
          <h1 className='text-2xl font-bold mb-5'>Contact Info</h1>
          <div className='space-y-3'>
            <p className="text-gray-600"><strong>Email:</strong> {isEditing ? <input name="email" value={formData.email || ''} onChange={handleChange} className="p-1 border-b-2 border-gray-400 bg-transparent focus:outline-none" /> : formData.email || 'N/A'}</p>
            <p className="text-gray-600"><strong>Phone:</strong> {isEditing ? <input name="phone_number" value={formData.phone_number || ''} onChange={handleChange} className="p-1 border-b-2 border-gray-400 bg-transparent focus:outline-none" /> : formData.phone_number || 'N/A'}</p>
            <p className="text-gray-600"><strong>City:</strong> {isEditing ? <input name="street" value={formData.street || ''} onChange={handleChange} className="p-1 border-b-2 border-gray-400 bg-transparent focus:outline-none" /> : formData.street || 'N/A'}</p>
            <p className="text-gray-600"><strong>District:</strong> {isEditing ? <input name="district" value={formData.district || ''} onChange={handleChange} className="p-1 border-b-2 border-gray-400 bg-transparent focus:outline-none" /> : formData.district || 'N/A'}</p>
            <p className="text-gray-600"><strong>State:</strong> {isEditing ? <input name="state" value={formData.state || ''} onChange={handleChange} className="p-1 border-b-2 border-gray-400 bg-transparent focus:outline-none" /> : formData.state || 'N/A'}</p>
          </div>
        </div>

        <div>
          <h1 className='text-2xl font-bold mb-5'>Academic Info</h1>
          <div className='space-y-3'>
            <p className="text-gray-600"><strong>Qualification:</strong> {isEditing ? <input name="highest_qualification" value={formData.highest_qualification || ''} onChange={handleChange} className="p-1 border-b-2 border-gray-400 bg-transparent focus:outline-none" /> : formData.highest_qualification || 'N/A'}</p>
            <p className="text-gray-600"><strong>School:</strong> {isEditing ? <input name="school_name" value={formData.school_name || ''} onChange={handleChange} className="p-1 border-b-2 border-gray-400 bg-transparent focus:outline-none" /> : formData.school_name || 'N/A'}</p>
            <p className="text-gray-600"><strong>Mark(%):</strong> {isEditing ? <input name="marks_percentage" value={formData.marks_percentage || ''} onChange={handleChange} className="p-1 border-b-2 border-gray-400 bg-transparent focus:outline-none" /> : formData.marks_percentage || 'N/A'}</p>
            <p className="text-gray-600"><strong>Completion year:</strong> {isEditing ? <input name="passing_year" value={formData.passing_year || ''} onChange={handleChange} className="p-1 border-b-2 border-gray-400 bg-transparent focus:outline-none" /> : formData.passing_year || 'N/A'}</p>
            <p className="text-gray-600"><strong>Date of Birth:</strong> {isEditing ? <input name="date_of_birth" value={formData.date_of_birth || ''} onChange={handleChange} className="p-1 border-b-2 border-gray-400 bg-transparent focus:outline-none" /> : formData.date_of_birth || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
