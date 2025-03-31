import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { submitContactAPI } from '../services/allAPI';
import Footer from '../components/Footer';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if( !formData?.name || !formData?.email || !formData?.subject || !formData?.message ){
      toast.error('Please fill all the fields!');
      return;
    }

    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem("access_token");
    const userDetails = JSON.parse(localStorage.getItem('user'))

    if (userRole === "student" || userRole === "college") {

      const updatedFormData = { ...formData, role: userRole, user: userDetails?.id };
      const header = { Authorization: `Bearer ${token}` };

      try {

        const response = await submitContactAPI(updatedFormData, header);

        if (response.status === 201) {
          toast.success("Message sent!");
          setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
          toast.error('Something went wrong!')
          console.log(response);
        }

      } catch (error) {
        console.error("Error submitting form:", error);
        setResponseMessage("An error occurred. Please try again.");
      }
    } else {
      toast.error("Please Login");
    }
  };

  return (
    <div className='bg-gradient-to-br from-[#0F0F1A] via-[#1C1C2E] to-[#0F0F1A] text-white'>
      <Navbar />
      <div className="pt-20 flex flex-col items-center justify-center">
        <div className='text-center px-60 pt-5'>
          <h1 className='text-4xl font-extrabold'>Get In Touch</h1>
          <p className="mt-2 text-sm text-gray-200">Reach out to us for any inquiries or assistance or just drop a hi :)</p>
        </div>

        <div className='my-10 bg-white flex p-2 rounded-3xl shadow-lg max-w-4xl w-full'>
          {/* Left Side - Contact Information */}
          <div className="w-2/5 bg-gradient-to-br from-[#0F0F1A] via-[#1C1C2E] to-[#0F0F1A] text-white p-6 rounded-3xl">
            <h1 className='text-2xl font-bold'>Contact Information</h1>
            <p className="mt-4 text-sm text-gray-200">Connecting aspiring students with top colleges through smart search and real insights.</p>
            <div className="mt-4 space-y-3">
              <p className="flex items-center gap-3 pt-4"><FaPhoneAlt className="text-teal-400" /> +91 000 0000 000</p>
              <p className="flex items-center gap-3 pt-4"><FaPhoneAlt className="text-teal-400" /> +91 000 0000 000</p>
              <p className="flex items-center gap-3 pt-4"><FaEnvelope className="text-teal-400" /> support@collegefinder.com</p>
              <p className="flex items-center gap-3 pt-4"><FaMapMarkerAlt className="text-teal-400" /> Kochi, Kerala</p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-3/5 p-6 text-black">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" required rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"></textarea>
              <div className='w-full flex justify-center'>
                <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-bold transition duration-300 px-6">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
