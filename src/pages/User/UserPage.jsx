import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../../Layouts/dashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

import { User, MapPin, Mail, Phone, Shield, LogOut, Edit, Camera } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const UserPage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { logout } = useContext(AuthContext);
    
    useEffect(() => {
        fetchUser();
    }, []);
    
    const fetchUser = async () => {
        setLoading(true);
        const userId = localStorage.getItem("userId");
        try {
        const response = await axiosInstance.get(API_PATHS.USER.GET_USER(userId));
        const { user } = response.data;
        setUser(user);
        setError(null);
        } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user information. Please try again later.");
        } finally {
        setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
    };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : user ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 flex items-center justify-center">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                      <User size={64} className="text-gray-400" />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 p-1 rounded-full text-white">
                      <Camera size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                  <p className="text-gray-600 mt-1">User ID: {user.userId}</p>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-center">
                      <Mail className="text-blue-600 mr-2" size={18} />
                      <span className="text-gray-700">{user.email}</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Phone className="text-blue-600 mr-2" size={18} />
                      <span className="text-gray-700">{user.ph_no}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button 
                      onClick={handleLogout}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>

              {/* Bookings */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
              <Link to='/bookings' className=''>
                <div className="flex items-center justify-center m-4 rounded-lg bg-blue-700 text-white ">
                  <h2 className='p-2 font-medium text-lg'>List of Bookings</h2>
                </div>
              </Link>
              </div>
              
              {/* Security Card */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg text-gray-800 flex items-center">
                      <Shield className="text-blue-600 mr-2" size={20} />
                      Security
                    </h3>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit size={16} />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Password</span>
                      <span className="text-gray-800">••••••••</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Last updated</span>
                      <span className="text-gray-800">2 months ago</span>
                    </div>
                  </div>
                  
                  <button className="mt-4 w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-lg font-medium">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
            
            {/* Details Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-xl text-gray-800">Personal Information</h3>
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium">
                      <Edit size={16} />
                      Edit Profile
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Full Name</h4>
                      <p className="text-gray-800 text-lg">{user.name}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Email Address</h4>
                      <p className="text-gray-800 text-lg">{user.email}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Phone Number</h4>
                      <p className="text-gray-800 text-lg">{user.ph_no}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Address</h4>
                      <div className="flex items-start gap-2">
                        <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={18} />
                        <p className="text-gray-800">{user.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Activity Section */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
                <div className="p-6">
                  <h3 className="font-semibold text-xl text-gray-800 mb-6">Recent Activity</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                        <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Profile Updated</h4>
                        <p className="text-sm text-gray-500">You updated your profile information</p>
                      </div>
                      <span className="ml-auto text-sm text-gray-500">2 days ago</span>
                    </div>
                    
                    <div className="flex items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Account Login</h4>
                        <p className="text-sm text-gray-500">Logged in from a new device</p>
                      </div>
                      <span className="ml-auto text-sm text-gray-500">1 week ago</span>
                    </div>
                    
                    <div className="flex items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Password Changed</h4>
                        <p className="text-sm text-gray-500">Updated your account password</p>
                      </div>
                      <span className="ml-auto text-sm text-gray-500">2 months ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">No user information found. Please try logging in again.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserPage;