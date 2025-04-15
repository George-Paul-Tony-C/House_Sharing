import React from 'react';
import { Search, Filter, ArrowUpDown, PlusCircle } from 'lucide-react';

const RoomSearchFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  filterType, 
  setFilterType, 
  sortOption, 
  setSortOption,
  uniqueRoomTypes,
  showAddButton = false,
  onAddClick = () => {}
}) => (
  <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
    <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
      <div className="relative w-full md:w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search rooms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="flex flex-wrap gap-2 w-full md:w-auto">
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
          <Filter size={14} className="text-gray-500" />
          <select 
            className="bg-transparent border-none text-sm focus:ring-0 pr-8"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            {uniqueRoomTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
          <ArrowUpDown size={14} className="text-gray-500" />
          <select 
            className="bg-transparent border-none text-sm focus:ring-0 pr-8"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="capacity">Capacity</option>
            <option value="type">Room Type</option>
          </select>
        </div>
        
        {showAddButton && (
          <button 
            onClick={onAddClick}
            className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium"
          >
            <PlusCircle size={14} />
            Add Room
          </button>
        )}
      </div>
    </div>
  </div>
);

export default RoomSearchFilter;