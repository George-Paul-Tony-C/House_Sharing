import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed bg-blue-50 drop-shadow-xl h-16 flex items-center justify-between shadow-md w-full z-30">
      <div className="flex items-center w-full justify-start h-full">
        <img src="/logo.png" alt="Logo" className="w-16 h-16 scale-120 drop-shadow-2xl" />
        <h1 className="text-blue-700 text-xl font-bold">House Sharing</h1>
      </div>
    </nav>
  );
};

export default Navbar;
