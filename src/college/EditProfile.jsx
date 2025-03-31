import React, { useState } from 'react';
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { updateCollegeAPI } from '../services/allAPI'; // Import API call
import toast from 'react-hot-toast'; // For success/error messages
import { useCollege } from '../context/CollegeContext';

const EditProfile = ({ collegeData }) => {

  const { refreshColleges } = useCollege();

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...collegeData, logo: null, image: null });
  const [logoPreview, setLogoPreview] = useState(collegeData.logo);
  const [imagePreview, setImagePreview] = useState(collegeData.image);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setFormData({ ...formData, [e.target.name]: file });

      if (e.target.name === "logo") {
        setLogoPreview(previewURL);
      } else if (e.target.name === "image") {
        setImagePreview(previewURL);
      }
    }
  };

  const handleSave = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data", // Ensure correct encoding
      };

      // Convert formData to FormData for API request
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await updateCollegeAPI(formDataToSend, headers);

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        refreshColleges();
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <div className="relative">
        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="fixed right-10 top-10 flex items-center text-black bg-white border-2 border-white px-4 py-2 rounded-xl shadow-md transition-all duration-300 hover:bg-transparent hover:text-white hover:shadow-lg z-10"
        >
          Logout <FiLogOut size={20} className="ml-2" />
        </button>

        {/* College Image as Background */}
        <div 
          className="h-60 bg-cover bg-center rounded-t-xl flex items-center justify-center flex-col relative" 
          style={{ backgroundImage: `url(${imagePreview})` }}
        >
          {isEditing ? (
            <>
              <input 
                type="file" name="image" accept="image/*" 
                onChange={handleFileChange} 
                className="absolute bottom-5 right-5 text-sm text-white bg-gray-700 px-2 py-1 rounded cursor-pointer" 
              />
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className="text-4xl text-white font-bold bg-transparent border-b border-white text-center"
              />
            </>
          ) : (
            <>
              <h2 className="text-4xl text-white font-bold">{collegeData?.name}</h2>
              <p className="text-white mt-2">{collegeData?.email}</p>
            </>
          )}
        </div>

        {/* Profile Logo with College Name */}
        <div className="absolute top-40 left-6 w-32 h-32 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center overflow-hidden">
          {logoPreview ? (
            <img src={logoPreview} alt="College Logo" className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="text-4xl font-bold text-gray-700">{collegeData?.name ? collegeData?.name.charAt(0).toUpperCase() : 'C'}</span>
          )}
          {isEditing && (
            <input 
              type="file" name="logo" accept="image/*" 
              onChange={handleFileChange} 
              className="absolute bottom-2 left-2 text-xs text-gray-700 bg-gray-300 px-1 py-0.5 rounded cursor-pointer" 
            />
          )}
        </div>

        {/* Edit/Save Button */}
        <button 
          onClick={isEditing ? handleSave : () => setIsEditing(true)} 
          className="fixed right-20 top-72 px-4 py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* Editable College Details */}
      <div className="p-10 grid grid-cols-2 mt-10 gap-8">
        <div>
          <h1 className="text-2xl font-bold mb-5">Contact Info</h1>
          <div className="space-y-3">
            <p><strong>Email:</strong> <input name="email" className="p-1 border-b-2 border-gray-400 bg-transparent focus:outline-none" value={formData.email} onChange={handleChange} /></p>
            <p><strong>Street:</strong> <input name="street" className="p-1 border-b-2 border-gray-400 bg-transparent focus:outline-none" value={formData.street} onChange={handleChange} /></p>
            <p><strong>District:</strong> <input name="district" className="p-1 border-b-2 border-gray-400 bg-transparent focus:outline-none" value={formData.district} onChange={handleChange} /></p>
            <p><strong>State:</strong> <input name="state" className="p-1 border-b-2 border-gray-400 bg-transparent focus:outline-none" value={formData.state} onChange={handleChange} /></p>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-5">College Information</h1>
          <div className="space-y-3">
            <p><strong>Description:</strong> <textarea name="description" className="p-1 border-b-2 border-gray-400 bg-transparent focus:outline-none w-full" value={formData.description} onChange={handleChange}></textarea></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
