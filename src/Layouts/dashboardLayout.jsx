import React from 'react';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-blue-50">
      <Navbar />
      <div className="flex flex-row w-full h-full mt-16">
        <main className="flex-1 min-h-[93vh]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
