import React from 'react';
import { Search } from 'lucide-react';

const NoMatchingRooms = ({ onClearFilters }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
    <Search size={32} className="mx-auto text-gray-400 mb-2" />
    <h3 className="text-lg font-medium text-gray-900 mb-1">No Matching Rooms</h3>
    <p className="text-gray-600 mb-3">No rooms match your current filters.</p>
    <button 
      onClick={onClearFilters}
      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
    >
      Clear Filters
    </button>
  </div>
);

export default NoMatchingRooms;