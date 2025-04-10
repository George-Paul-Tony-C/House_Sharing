import React from 'react';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-blue-50">
      <Navbar />
      <div className="flex flex-row w-full h-full mt-16">
        <main className="flex-1 p-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
