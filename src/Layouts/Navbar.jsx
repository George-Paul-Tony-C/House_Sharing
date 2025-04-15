import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, LogOut, User, BookOpen } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { logout } = useContext(AuthContext);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed bg-white drop-shadow-lg h-16 flex items-center justify-between w-full z-30">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-12 h-12 object-contain" // Increased logo size
          />
          <h1 className="text-blue-700 text-2xl font-semibold hidden sm:block">House Sharing</h1>
        </Link>
        
        <div className="flex items-center gap-4" ref={dropdownRef}>
          <div className="relative">
            <button 
              className="flex items-center gap-2 text-gray-700 hover:text-blue-700 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="hidden sm:block text-sm font-medium">My Account</span>
              <UserCircle className="w-8 h-8 text-blue-700" />
            </button>
            
            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-40"
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link 
                  to="/profile" 
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </Link>
                <Link 
                  to="/bookings" 
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>My Bookings</span>
                </Link>
                <hr className="my-1 border-gray-200" />
                <button
                  onClick={logout}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;