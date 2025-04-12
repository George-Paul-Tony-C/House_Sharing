import React, { useEffect, useState } from 'react';
import AuthLayout from '../../Layouts/authLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = ({logged , setLogged}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_email: '',
    user_password: ''
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
        const response = await axiosInstance.post(API_PATHS.USER.LOGIN, formData);
        
        // Check if the response is valid
        if (response.status === 200) {
            localStorage.setItem('user', formData.user_email);
            setLogged(true);
            navigate('/'); // Redirect to the dashboard after successful login
        } else {
            alert('Login failed: ' + (response.data.message || 'Unknown error'));
        }
    } catch (error) {
        console.log(error);
        // Handle the case where there is a network error or CORS error
        if (error.response) {
            // Display the error response message from the backend
            alert('Error logging in: ' + error.response.data.message || error.response.statusText);
        } else if (error.request) {
            alert('Network error. Please check your connection.');
        } else {
            alert('Unexpected error: ' + error.message);
        }
    }
  };

  

  useEffect(() => {
    if (logged) {
      navigate('/'); 
    }
  }, [logged, navigate]);

  return (
    <LoginLayout>
      <div className="flex w-full h-full gap-5 items-center justify-center">
        <div className="w-[70%] not-md:w-[100%] flex flex-col items-center justify-center">
          <div className="text-white p-2 rounded-2xl items-center justify-center flex border-2 border-gray-200 drop-shadow-lg">
            <h1 className="font-bold text-xl text-blue-800">Login</h1>
          </div>
          <form onSubmit={handleSubmit} className="w-[100%] flex flex-col justify-center gap-2 border border-blue-100 p-5 my-5 mx-2 rounded-2xl">
            <label htmlFor="user_email" className="font-medium text-sm mb-1">Email:</label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              placeholder="Enter Your Email"
              value={formData.user_email}
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