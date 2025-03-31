import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Colleges from './pages/Colleges';
import Contact from './pages/Contact';
import About from './pages/About';
import Auth from './pages/Auth';
import Pnf from './pages/Pnf';
import StudentRegister from './components/StudentRegister';
import CollegeRegister from './components/CollegeRegister';
import StudentProfile from './student/StudentProfile';
import View from './components/View';
import CollegeProfile from './college/CollegeProfile';
import AdminLayout from './admin/AdminLayout';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const authToken = localStorage.getItem("access_token");
  const userRole = localStorage.getItem("role");

  if (authToken && allowedRoles.includes(userRole)) {
    return element;
  }

  return <Navigate to="*" replace />;

};

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/colleges' element={<Colleges />} />
        <Route path='/colleges/:id' element={<View />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Auth />} />
        <Route path="/register/student" element={<StudentRegister />} />
        <Route path="/register/college" element={<CollegeRegister />} />

        <Route path="/student/profile" element={<ProtectedRoute element={<StudentProfile />} allowedRoles={["student"]} />} />

        <Route path="/college/profile" element={<ProtectedRoute element={<CollegeProfile />} allowedRoles={["college"]} />} />

        <Route path="/admin" element={<ProtectedRoute element={<AdminLayout />} allowedRoles={["admin"]} />} />

        <Route path='*' element={<Pnf />} />
      </Routes>
    </>
  )
}

export default App