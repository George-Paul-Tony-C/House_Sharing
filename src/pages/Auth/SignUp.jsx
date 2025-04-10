import React, { useState } from 'react';
import AuthLayout from '../../Layouts/authLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignUp = () => {
  const navigate = useNavigate();

  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Customer', // Default role is Customer
    phone_no: '',
    address: '',
  });

  // State to manage which part of the form is being displayed
  const [isSecondStep, setIsSecondStep] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission for the first part
  const handleFirstStepSubmit = (e) => {
    e.preventDefault();
    setIsSecondStep(true);  // Proceed to the second part of the form
  };

  // Handle form submission for the second part (final submission)
  const handleSecondStepSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, formData);
      
      // Store JWT token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);  
        navigate('/');  
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      console.log(error);
      alert('Error signing up: ' + error.response.data.message);
    }
  };

  return (
    <SignUpLayout>
      {/* <div className="border-b-10 rotate-135 relative bottom-65 left-12 border-blue-700 w-40 h-40 transition-all ease-in-out duration-500"></div> */}
      <div className="flex w-full h-full gap-5 items-center justify-center">
        <div className="md:w-[50%] not-md:hidden">
          <img src="/owner.jpg" alt="signup" className="p-3 rounded-3xl" />
        </div>
        <div className="w-[70%] not-md:w-[100%] flex flex-col items-center justify-center">
          <div className="text-white p-2 rounded-2xl items-center justify-center flex border-2 border-gray-200 drop-shadow-lg">
            <h1 className="font-bold text-xl text-blue-800">Sign Up</h1>
          </div>

          {/* First Part - Basic Information */}
          {!isSecondStep ? (
            <form onSubmit={handleFirstStepSubmit} className="w-[100%] flex flex-col justify-center gap-2 border border-blue-100 p-5 my-5 mx-2 rounded-2xl">
              <label htmlFor="name" className="font-medium text-sm mb-1">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Your Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="p-2 mb-2 bg-gray-50 border border-gray-100 rounded-xl text-sm"
                required
              />
              <label htmlFor="email" className="font-medium text-sm mb-1">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className="p-2 mb-2 bg-gray-50 border border-gray-100 rounded-xl text-sm"
                required
              />
              <label htmlFor="password" className="font-medium text-sm mb-1">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a Password"
                value={formData.password}
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
              <button type="submit" className="bg-blue-600 text-white p-2 mt-2 rounded-xl active:scale-95">Next</button>
            </form>
          ) : (
            // Second Part - Address and Phone Number
            <form onSubmit={handleSecondStepSubmit} className="w-[100%] flex flex-col justify-center gap-2 border border-blue-100 p-5 my-5 mx-2 rounded-2xl">
              <label htmlFor="phone_no" className="font-medium text-sm mb-1">Phone Number:</label>
              <input
                type="text"
                id="phone_no"
                name="phone_no"
                placeholder="Enter Your Phone Number"
                value={formData.phone_no}
                onChange={handleInputChange}
                className="p-2 mb-2 bg-gray-50 border border-gray-100 rounded-xl text-sm"
                required
              />
              <label htmlFor="address" className="font-medium text-sm mb-1">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter Your Address"
                value={formData.address}
                onChange={handleInputChange}
                className="p-2 mb-2 bg-gray-50 border border-gray-100 rounded-xl text-sm"
                required
              />
              <button type="submit" className="bg-blue-600 text-white p-2 mt-2 rounded-xl active:scale-95">Sign Up</button>
            </form>
          )}

          <h4 className="text-[14px] font-light">
            Already have an account? 
            <Link to="/login" className="text-blue-700 font-medium">Login</Link>
          </h4>
        </div>
      </div>
      {/* <div className="border-t-10 rotate-45 relative bottom-65 right-12 border-blue-700 w-40 h-40 transition-all ease-in-out duration-500"></div> */}
    </SignUpLayout>
  );
};

export default SignUp;


const SignUpLayout = ({ children }) => {
  
  const pageVariants = {
    initial: {
      opacity: 0.5,
      x : -100
    },
    animate: {
      opacity: 1,
      x : 0
    },
    exit: {
      opacity: 0.5,
      x : 100
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