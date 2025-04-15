import React from 'react';
import { Search, Filter } from 'lucide-react';

const HouseFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  viewMode, 
  setViewMode, 
  filteredCount, 
  totalCount 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by address or amenities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setViewMode('grid')}
            className={`px-3 py-2 rounded-md border ${viewMode === 'grid' 
              ? 'bg-blue-50 border-blue-200 text-blue-600' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            Grid
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`px-3 py-2 rounded-md border ${viewMode === 'list' 
              ? 'bg-blue-50 border-blue-200 text-blue-600' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            List
          </button>
        </div>
      </div>
      
      {filteredCount > 0 && (
        <div className="mt-4 flex items-center text-sm text-gray-600">
          <Filter size={16} className="mr-2" />
          <span>Showing {filteredCount} of {totalCount} properties</span>
        </div>
      )}
    </div>
  );
};

export default HouseFilters;