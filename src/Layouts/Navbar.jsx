import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed bg-white drop-shadow-lg h-16 flex items-center justify-between w-full z-30">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-10 h-10 object-contain" 
          />
          <h1 className="text-blue-700 text-xl font-semibold hidden sm:block">House Sharing</h1>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/profile" 
            className="flex items-center gap-2 text-gray-700 hover:text-blue-700 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
          >
            <span className="hidden sm:block text-sm font-medium">My Account</span>
            <UserCircle className="w-8 h-8 text-blue-700" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;