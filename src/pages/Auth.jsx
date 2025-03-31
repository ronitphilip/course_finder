import React, { useState } from 'react';
import logingif from '../assets/logingif.gif';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/allAPI';
import toast from 'react-hot-toast';

const Login = () => {

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitLogin = async () => {

    if (!userData.email || !userData.password) {
      toast.error('Please enter the details!');
      return;
    }

    setIsLoading(true);

    try {
      const result = await loginAPI(userData);
      if (result.status === 200) {
        setIsLoading(false);
        const { id, username, email, role, access_token, refresh_token } = result.data;
        localStorage.setItem("user", JSON.stringify({id, username, email}));
        localStorage.setItem("role", role);
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        toast.success('Login success!');
        goToPage(role)
        setUserData({ ...userData, email: '', password: '' });
      } else if(result.status === 400){
        setIsLoading(false);
        toast.error(result.response.data.message)
      } else{
        toast.error('Soemthing went wrong!')
        setIsLoading(false);
        console.log(result);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error('Login failed... Try again!')
    }
  }

  const goToPage = (role) => {
    if (role === 'student') {
      navigate('/student/profile')
    } else if (role === 'college') {
      navigate('/college/profile')
    } else if (role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/')
    }
  }

  return (
    <div style={{ backgroundColor: '#fbfbfb' }} className="min-h-screen grid grid-cols-2 items-center">

      <div className="flex justify-center">
        <img className='ms-30' src={logingif} alt="Admin Avatar" />
      </div>

      <div className="bg-white p-10 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome!</h2>

        <input
          type="email"
          placeholder="Email Address"
          value={userData?.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={userData?.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button onClick={submitLogin} disabled={isLoading} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          {isLoading ? "Logging in..." : "Sign in"}
        </button>

        <p className="mt-4 text-center text-gray-600">Don't have an account?</p>
        <div className="flex items-center justify-between">
          <button onClick={()=> navigate('/register/student')} className="text-blue-500 hover:underline cursor-pointer">Register Student</button>
          <button onClick={()=> navigate('/register/college')} className="text-blue-500 hover:underline cursor-pointer">Register College</button>
        </div>
      </div>
    </div>
  );
};

export default Login;