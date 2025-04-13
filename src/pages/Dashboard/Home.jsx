import React from 'react';
import DashboardLayout from '../../Layouts/dashboardLayout';
import { Link, useNavigate } from 'react-router-dom';
import AllHouses from './AllHouses';

const Home = () => {

  const navigate = useNavigate();

  const handleHouses = () => {
    console.log("Navigating to /houses...");
    navigate('/houses');  // This should trigger navigation
  };
  

  return (
    <DashboardLayout>
      <div className="bg-blue-50 h-full p-6">
        <div className=' flex justify-between items-center'>
          <h1 className="text-blue-700 font-bold text-2xl">Hello Everyone</h1>
      
          <div className='flex items-center mt-4 gap-2'>
            <button onClick={handleHouses} className='text-white bg-blue-700 p-3 rounded-lg' >Your Houses </button>
          </div>
        </div>
        <AllHouses />
      </div>
      
    </DashboardLayout>
  );
};

export default Home;
