import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
  }

  return (
    <nav className="fixed bg-blue-50 drop-shadow-xl h-16 flex items-center justify-between shadow-md w-full z-30">
      <div className="flex items-center w-full justify-start h-full">
        <img src="/logo.png" alt="Logo" className="w-16 h-16 scale-120 drop-shadow-2xl" />
        <h1 className="text-blue-700 text-xl font-bold">House Sharing</h1>
      </div>
      <Link to='/login' onClick={handleLogout} className='mr-3 rounded-xl flex gap-2 items-center justify-center hover:bg-red-700 text-lg bg-blue-700 text-white active:scale-95 p-2 cursor-pointer'>
        Logout<FaTrash className=''/>
      </Link>
    </nav>
  );
};

export default Navbar;
