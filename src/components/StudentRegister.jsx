import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOTPAPI, studentRegistrationAPI } from '../services/allAPI';
import logingif from '../assets/logingif.gif';
import toast from 'react-hot-toast';

const StudentRegister = () => {
  const [studentDetails, setStudentDetails] = useState({
    username: "",
    email: "",
    password: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    school_name: "",
    highest_qualification: "",
    marks_percentage: "",
    passing_year: null,
    street: "",
    district: "",
    state: "",
    verified: false,
  });

  const [errors, setErrors] = useState({});
  const dateInputRef = useRef(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [show, setShow] = useState(false);
  const [resend, setResend] = useState(false);

  const handleChange = (e) => {
    setStudentDetails({ ...studentDetails, [e.target.name]: e.target.value });
  };

  const generateOTP = async () => {
    const studentEmail = studentDetails?.email;

    if (!studentEmail) {
      return toast.error('Enter a valid email!');
    }

    setLoading(true);
    toast.loading('Sending OTP...');

    try {
      const result = await getOTPAPI({ email: studentEmail });

      if (result.status === 200) {
        setShow(true);
        setResend(false);
console.log(result);

        const expiryTime = new Date(result?.data?.expiry);
        localStorage.setItem('otp', result?.data?.otp);
        localStorage.setItem('expiry', expiryTime);

        toast.dismiss();
        toast.success(`${result.data.message} (Valid for 10 minutes)`);
      } else {
        toast.dismiss();
        toast.error('Something went wrong! Try again');
      }
    } catch (err) {
      toast.dismiss();
      toast.error('Email not valid!');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = () => {
    const storedOTP = localStorage.getItem('otp');
    const expiryTime = localStorage.getItem('expiry');

    if (!storedOTP || !expiryTime) {
      return toast.error('No OTP found. Please request a new one.');
    }

    const expiryDate = new Date(expiryTime);
    const currentTime = new Date();

    if (currentTime > expiryDate) {
      localStorage.removeItem('otp');
      localStorage.removeItem('expiry');
      setShow(false);
      setResend(true);
      return toast.error('OTP has expired. Request a new one.');
    }

    if (otp === storedOTP) {
      toast.success('OTP verified successfully!');
      localStorage.removeItem('otp');
      localStorage.removeItem('expiry');
      setStudentDetails({ ...studentDetails, verified: true });
    } else {
      toast.error('Incorrect OTP. Please try again.');
      setResend(true);
    }
  };

  const handleSubmit = async () => {

    if (!validateForm()) return;

    if (!studentDetails.verified) {
      return toast.error('Email not verified!');
    }
console.log(studentDetails);

    setLoading(true);

    try {
      const result = await studentRegistrationAPI(studentDetails);
      if (result.status === 201) {
        const { id, username, email, role, access_token, refresh_token, message } = result.data;
        localStorage.setItem("user", JSON.stringify({ id, username, email }));
        localStorage.setItem("role", role);
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        toast.success(message);
        navigate('/student/profile')
      } else {
        toast.error("Registration failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!studentDetails.username) newErrors.username = "Name is required";
    if (!studentDetails.email.includes("@")) newErrors.email = "Enter a valid email";
    if (studentDetails.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!/^[0-9]{10}$/.test(studentDetails.phone_number)) newErrors.phone_number = "Enter a valid 10-digit phone number";
    if (!studentDetails.date_of_birth) newErrors.date_of_birth = "Date of birth is required";
    if (!studentDetails.gender) newErrors.gender = "Select gender";
    if (!studentDetails.state) newErrors.state = "State is required";
    if (!studentDetails.verified) newErrors.email = "Verify your email";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div style={{ backgroundColor: '#fbfbfb' }} className="min-h-screen grid grid-cols-2 items-center">
      <div className="flex justify-center">
        <img className="" src={logingif} alt="no img" />
      </div>

      <div className="bg-white p-10 rounded-lg shadow-md max-w mx-auto absolute right-20">
        <h2 className="text-2xl font-bold mb-4 text-center">Student Registration</h2>
        <div className="w-170 flex justify-between">
          {/* personal details */}
          <div className="w-80">
            <input type="text" name="username" placeholder="Name*" value={studentDetails.username} onChange={handleChange} className="w-full p-2 border rounded" required />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            <input type="email" name="email" placeholder="Email Address*" value={studentDetails.email} onChange={handleChange} className="w-full p-2 border rounded mt-4" required />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            {/* email verification */}
            {studentDetails.verified ? (
              <button className="text-green-600 p-2">Email Verified✅</button>
            ) : (
              <>
                {studentDetails.email !== '' && !show && (
                  <div className='text-end p-2 border-transparent'>
                    <button className='text-blue-800 underline cursor-pointer' onClick={generateOTP}>Verify Email</button>
                  </div>
                )}

                {show && (
                  <div className='flex justify-between gap-2 mt-4'>
                    <input type="text" onChange={(e) => setOtp(e.target.value)} value={otp} className='p-2 border rounded' placeholder='Enter your OTP' />
                    <button onClick={verifyOTP} className='p-2 text-white rounded bg-green-600 border-green-500'>Verify</button>
                  </div>
                )}

                {resend && (
                  <button onClick={generateOTP} className="mt-2 p-2 bg-blue-500 text-white rounded">Resend OTP</button>
                )}
              </>
            )}
            <input type="password" name="password" placeholder="Password*" value={studentDetails.password} onChange={handleChange} className="w-full p-2 border rounded mt-4" required />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            <input type="tel" name="phone_number" placeholder="Phone Number*" value={studentDetails.phone_number} onChange={handleChange} className="w-full p-2 border rounded mt-4" required />
            {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
            <div className="relative w-full" onClick={() => dateInputRef.current?.showPicker()}>
              <label htmlFor="dob" className="w-full p-2 border rounded flex items-center justify-between cursor-pointer bg-white text-gray-500 mt-4">
                {studentDetails.date_of_birth ? studentDetails.date_of_birth : "Select Date of Birth*"}
                <span className="text-gray-500">📅</span>
              </label>
              <input type="date" id="dob" name="date_of_birth" value={studentDetails.date_of_birth} onChange={handleChange} ref={dateInputRef} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" required />
              {errors.date_of_birth && <p className="text-red-500 text-sm">{errors.date_of_birth}</p>}
            </div>

            <select name="gender" value={studentDetails.gender} onChange={handleChange} className="w-full p-2 border rounded text-gray-500 mt-4" required>
              <option value="">Select Gender*</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>

          {/* accademic details */}
          <div className="w-80">
            <input type="text" name="school_name" placeholder="School Name" value={studentDetails.school_name} onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="text" name="highest_qualification" placeholder="Highest Qualification" value={studentDetails.highest_qualification} onChange={handleChange} className="w-full p-2 border rounded mt-4" />
            <input type="number" name="marks_percentage" placeholder="Marks Percentage" value={studentDetails.marks_percentage} onChange={handleChange} className="w-full p-2 border rounded mt-4" />
            <input type="number" name="passing_year" placeholder="Passing Year" value={studentDetails.passing_year} onChange={handleChange} className="w-full p-2 border rounded mt-4" />
            <input type="text" name="state" placeholder="State*" value={studentDetails.state} onChange={handleChange} className="w-full p-2 border rounded mt-4" required />
              {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
            <input type="text" name="district" placeholder="District" value={studentDetails.district} onChange={handleChange} className="w-full p-2 border rounded mt-4" />
            <input type="text" name="street" placeholder="Street" value={studentDetails.street} onChange={handleChange} className="w-full p-2 border rounded mt-4" />
          </div>
        </div>

        <div className='w-full flex justify-center mt-5'>
          <button onClick={(handleSubmit)} className="p-2 bg-blue-500 text-white rounded">
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
