import React from 'react';

const HouseTabs = ({ activeTab, setActiveTab }) => (
  <div className="mb-4">
    <div className="border-b border-gray-200">
      <nav className="flex space-x-6">
        <button
          onClick={() => setActiveTab('rooms')}
          className={`py-3 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'rooms'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Rooms
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`py-3 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'reviews'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Reviews
        </button>
        <button
          onClick={() => setActiveTab('location')}
          className={`py-3 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'location'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Location
        </button>
      </nav>
    </div>
  </div>
);

export default HouseTabs;