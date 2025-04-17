import React from 'react';

const Header = ({ userName, onViewHouses }) => {
  return (
    <div>
      {/* Hero Section with Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome {userName ? `${userName}!` : 'to Our House Sharing!'}</h2>
              <p className="text-lg mb-6 text-blue-100">Find your dream home with our curated selection of properties. Easy to browse, simple to manage.</p>
              <button 
                className="bg-white text-blue-800 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-md"
                onClick={onViewHouses}
              >
                Explore Your Properties
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
            
              <img 
                src="/customer.jpg" 
                alt="Featured Property" 
                className="rounded-lg shadow-xl w-100 h-auto "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;