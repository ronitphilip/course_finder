import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logingif from '../assets/logingif.gif';
import toast from 'react-hot-toast';
import { registerCollegeAPI } from '../services/allAPI';

const CollegeRegister = () => {

  const navigate = useNavigate();

  const [collegeDetails, setCollegeDetails] = useState({
    name: '',
    username:'College Admin',
    email: '',
    password: '',
    image: '',
    logo: '',
    state: '',
    district: '',
    street: '',
    description: ''
  })

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState()

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setCollegeDetails({ ...collegeDetails, [e.target.name]: e.target.files[0] });
    } else {
      setCollegeDetails({ ...collegeDetails, [e.target.name]: e.target.value });
    }
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!collegeDetails.name) newErrors.name = "College name is required.";
    if (!collegeDetails.email) newErrors.email = "Email is required.";
    if (!collegeDetails.password) newErrors.password = "Password is required.";
    if (!collegeDetails.image) newErrors.image = "College image is required.";
    if (!collegeDetails.state) newErrors.state = "State is required.";
    if (!collegeDetails.district) newErrors.district = "District is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    
    if (!validateForm()) {
      toast.error('Please fill all the required fields correctly.');
      return;
    }

    const formData = new FormData();
    formData.append("name", collegeDetails.name);
    formData.append("username", collegeDetails.name);
    formData.append("email", collegeDetails.email);
    formData.append("password", collegeDetails.password);
    formData.append("image", collegeDetails.image);
    formData.append("logo", collegeDetails.logo);
    formData.append("state", collegeDetails.state);
    formData.append("district", collegeDetails.district);
    formData.append("street", collegeDetails.street);
    formData.append("description", collegeDetails.description);

    setLoading(true)

    try {
      const result = await registerCollegeAPI(formData);
      if (result.status === 201) {
        setLoading(false);
        const { id, username, email, role, access_token, refresh_token, message } = result.data;
        localStorage.setItem("user", JSON.stringify({ id, username, email }));
        localStorage.setItem("role", role);
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        toast.success(message);
        navigate('/college/profile')
      } else {
        setLoading(false);
        toast.error('Something went wrong! Try again');
        console.log(result);
      }

    } catch (err) {
      setLoading(false);
      toast.error('Something went wrong! Try again')
      console.log(err);
    }
  }

  console.log(collegeDetails);

  return (
    <div style={{ backgroundColor: '#fbfbfb' }} className='min-h-screen grid grid-cols-2'>
      <div className='flex items-center'>
        <img src={logingif} alt="no img" />
      </div>
      <div className='flex items-center justify-center'>
        <div className='flex justify-center flex-col p-5 rounded bg-white shadow-md w-150 me-40'>
          <h2 className="text-2xl font-bold mb-4 text-center">College Registration</h2>
          <div className='grid grid-cols-2'>
            <div className='flex flex-col me-2'>
              <input onChange={handleChange} className='p-2 border rounded' name='name' type="text" placeholder='College name' required />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              <input onChange={handleChange} className='p-2 border rounded mt-4' name='email' type="email" placeholder='Email' required />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              <input onChange={handleChange} className='p-2 border rounded mt-4' name='password' type="password" placeholder='Password' required />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              <label className='p-2 border rounded cursor-pointer text-gray-500 mt-4'>
                {collegeDetails?.image ? collegeDetails?.image?.name : 'Upload College Image'}
                <input onChange={handleChange} className='hidden' name='image' type="file" accept="image/*" required />
              </label>
              {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
              <label className='p-2 border rounded cursor-pointer text-gray-500 mt-4'>
                {collegeDetails?.logo ? collegeDetails?.logo?.name : 'Upload Logo'}
                <input onChange={handleChange} className='hidden' name='logo' type="file" accept="image/*" />
              </label>
            </div>

            <div className='flex flex-col ms-2'>
              <input onChange={handleChange} className='p-2 border rounded' name='state' type="text" placeholder='State' />
              {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
              <input onChange={handleChange} className='p-2 border rounded mt-4' name='district' type="text" placeholder='District' />
              {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
              <input onChange={handleChange} className='p-2 border rounded mt-4' name='street' type="text" placeholder='City' />
              <textarea onChange={handleChange} className='p-2 border rounded h-25 mt-4' name='description' placeholder='Description'></textarea>
            </div>
          </div>
          <div className='w-full flex justify-center mt-4'>
            <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded" disabled={loading}>
              {loading ? 'Registering...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollegeRegister