import React, { useState } from 'react';
import AuthLayout from '../../Layouts/authLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_name: '',
    user_password: '',
    role: 'Customer',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      } else {
        alert(response.data.message);
      }
      navigate('/');
    } catch (error) {
      console.log(error);
      alert('Error logging in: ' + error.response.data.message);
    }
  };

  return (
    <LoginLayout>
      {/* <div className="border-b-10 rotate-135 relative bottom-65 left-12 border-blue-700 w-40 h-40 transition-all ease-in-out duration-500"></div> */}
      <div className="flex w-full h-full gap-5 items-center justify-center">
        <div className="w-[70%] not-md:w-[100%] flex flex-col items-center justify-center">
          <div className="text-white p-2 rounded-2xl items-center justify-center flex border-2 border-gray-200 drop-shadow-lg">
            <h1 className="font-bold text-xl text-blue-800">Login</h1>
          </div>
          <form onSubmit={handleSubmit} className="w-[100%] flex flex-col justify-center gap-2 border border-blue-100 p-5 my-5 mx-2 rounded-2xl">
            <label htmlFor="user_name" className="font-medium text-sm mb-1">Username:</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              placeholder="Enter Your Username"
              value={formData.user_name}
              onChange={handleInputChange}
              className="p-2 mb-2 bg-gray-50 border border-gray-100 rounded-xl text-sm"
              required
            />
            <label htmlFor="user_password" className="font-medium text-sm mb-1">Password:</label>
            <input
              id="user_password"
              type="password"
              name="user_password"
              placeholder="Enter Your Password"
              value={formData.user_password}
              onChange={handleInputChange}
              className="p-2 mb-2 bg-gray-50 rounded-xl text-sm"
              required
            />
            <label htmlFor="role" className="font-medium text-sm mb-1">Role:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="p-2 mb-2 bg-gray-50 border border-gray-100 rounded-xl text-sm"
            >
              <option value="Customer">Customer</option>
              <option value="Owner">Owner</option>
            </select>
            <button type="submit" className="bg-blue-600 text-white p-2 mt-2 rounded-xl active:scale-95">Login</button>
          </form>
          <h4 className="text-[14px] font-light">
            Don't have an account? <Link to="/signup" className="text-blue-700 font-medium">Sign Up</Link>
          </h4>
        </div>
        <div className="md:w-[50%] not-md:hidden">
          <img src="/customer.jpg" alt="login" className="p-3 rounded-3xl" />
        </div>
      </div>
      {/* <div className="border-t-10 rotate-45 relative bottom-65 right-12 border-blue-700 w-40 h-40 transition-all ease-in-out duration-500"></div> */}
    </LoginLayout>
  );
};

export default Login;


const LoginLayout = ({ children }) => {
  
  const pageVariants = {
    initial: {
      opacity: 0.5,
      x : 100
    },
    animate: {
      opacity: 1,
      x : 0
    },
    exit: {
      opacity: 0.5,
      x : -100
    },
  };

  const pageTransition = {
    duration : 0.5 ,
    ease : "easeInOut",
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className=" flex items-center justify-center w-full h-full scale-[88%]"
    >
      {children}
    </motion.div>
  );
};