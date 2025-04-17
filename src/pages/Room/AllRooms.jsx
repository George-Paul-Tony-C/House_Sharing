import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 25000],
    capacity: 'all',
    roomType: 'all',
    amenities: []
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(API_PATHS.ROOM.ALL_ROOM);
        setRooms(response.data);
        setFilteredRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch rooms. Please try again later.');
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, rooms]);

  const applyFilters = () => {
    let result = [...rooms];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(room => 
        room.roomName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.house?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.house?.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply price range filter
    result = result.filter(room => 
      room.roomPrice >= filters.priceRange[0] && room.roomPrice <= filters.priceRange[1]
    );
    
    // Apply capacity filter
    if (filters.capacity !== 'all') {
      result = result.filter(room => 
        filters.capacity === '1' ? room.roomCapacity === 1 :
        filters.capacity === '2' ? room.roomCapacity === 2 :
        filters.capacity === '3' ? room.roomCapacity === 3 :
        filters.capacity === '4+' ? room.roomCapacity >= 4 : true
      );
    }
    
    // Apply room type filter
    if (filters.roomType !== 'all') {
      result = result.filter(room => 
        room.roomType?.toLowerCase() === filters.roomType.toLowerCase()
      );
    }
    
    // Apply amenities filter
    if (filters.amenities.length > 0) {
      result = result.filter(room => {
        if (!room.house?.amenities) return false;
        const roomAmenities = room.house.amenities.split(',').map(a => a.trim().toLowerCase());
        return filters.amenities.every(amenity => 
          roomAmenities.includes(amenity.toLowerCase())
        );
      });
    }
    
    setFilteredRooms(result);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    setFilters({
      ...filters,
      priceRange: newPriceRange
    });
  };

  const handleCapacityChange = (e) => {
    setFilters({
      ...filters,
      capacity: e.target.value
    });
  };

  const handleRoomTypeChange = (e) => {
    setFilters({
      ...filters,
      roomType: e.target.value
    });
  };

  const toggleAmenity = (amenity) => {
    setFilters(prevFilters => {
      if (prevFilters.amenities.includes(amenity)) {
        return {
          ...prevFilters,
          amenities: prevFilters.amenities.filter(a => a !== amenity)
        };
      } else {
        return {
          ...prevFilters,
          amenities: [...prevFilters.amenities, amenity]
        };
      }
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      priceRange: [0, 25000],
      capacity: 'all',
      roomType: 'all',
      amenities: []
    });
  };

  const handleRoomClick = (roomId) => {
    navigate(`/rooms/${roomId}`);
  };

  // Extract unique room types from data for the filter dropdown
  const roomTypes = [...new Set(rooms.map(room => room.roomType))];
  
  // Extract all amenities for filter options
  const allAmenities = rooms.reduce((acc, room) => {
    if (room.house?.amenities) {
      const amenitiesList = room.house.amenities.split(',').map(a => a.trim());
      amenitiesList.forEach(amenity => {
        if (!acc.includes(amenity) && amenity) {
          acc.push(amenity);
        }
      });
    }
    return acc;
  }, []);

  // Get min and max price from all rooms
  const minPrice = Math.min(...rooms.map(room => room.roomPrice), 0);
  const maxPrice = Math.max(...rooms.map(room => room.roomPrice), 25000);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Find Your Perfect Room</h1>
      
      {/* Search bar with filter toggle */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Search by room name, description or location..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition duration-300 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          
          {(filters.priceRange[0] > minPrice || 
            filters.priceRange[1] < maxPrice || 
            filters.capacity !== 'all' || 
            filters.roomType !== 'all' || 
            filters.amenities.length > 0) && (
            <button
              onClick={resetFilters}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md transition duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Reset
            </button>
          )}
        </div>
        
        {/* Filter tags display */}
        {(filters.priceRange[0] > minPrice || 
          filters.priceRange[1] < maxPrice || 
          filters.capacity !== 'all' || 
          filters.roomType !== 'all' || 
          filters.amenities.length > 0) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.priceRange[0] > minPrice && (
              <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1.5 rounded-full flex items-center">
                Min: ₹{filters.priceRange[0].toLocaleString('en-IN')}
                <button onClick={() => setFilters({...filters, priceRange: [minPrice, filters.priceRange[1]]})} className="ml-2 text-blue-600 hover:text-blue-800">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </span>
            )}
            
            {filters.priceRange[1] < maxPrice && (
              <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1.5 rounded-full flex items-center">
                Max: ₹{filters.priceRange[1].toLocaleString('en-IN')}
                <button onClick={() => setFilters({...filters, priceRange: [filters.priceRange[0], maxPrice]})} className="ml-2 text-blue-600 hover:text-blue-800">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </span>
            )}
            
            {filters.capacity !== 'all' && (
              <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1.5 rounded-full flex items-center">
                Capacity: {filters.capacity === '4+' ? '4+ People' : `${filters.capacity} ${parseInt(filters.capacity) === 1 ? 'Person' : 'People'}`}
                <button onClick={() => setFilters({...filters, capacity: 'all'})} className="ml-2 text-blue-600 hover:text-blue-800">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </span>
            )}
            
            {filters.roomType !== 'all' && (
              <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1.5 rounded-full flex items-center">
                Type: {filters.roomType}
                <button onClick={() => setFilters({...filters, roomType: 'all'})} className="ml-2 text-blue-600 hover:text-blue-800">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </span>
            )}
            
            {filters.amenities.map(amenity => (
              <span key={amenity} className="bg-blue-100 text-blue-800 text-xs px-3 py-1.5 rounded-full flex items-center">
                {amenity}
                <button onClick={() => toggleAmenity(amenity)} className="ml-2 text-blue-600 hover:text-blue-800">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}
        
        {/* Expanded filter section */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Price Range Filter */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700">Price Range (₹)</h3>
                <div className="flex flex-col space-y-3">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>₹{filters.priceRange[0].toLocaleString('en-IN')}</span>
                    <span>₹{filters.priceRange[1].toLocaleString('en-IN')}</span>
                  </div>
                  
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                  />
                  
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              {/* Capacity Filter */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700">Capacity</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilters({...filters, capacity: 'all'})}
                    className={`px-4 py-2 rounded-full text-sm ${
                      filters.capacity === 'all' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilters({...filters, capacity: '1'})}
                    className={`px-4 py-2 rounded-full text-sm ${
                      filters.capacity === '1' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    1 Person
                  </button>
                  <button
                    onClick={() => setFilters({...filters, capacity: '2'})}
                    className={`px-4 py-2 rounded-full text-sm ${
                      filters.capacity === '2' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    2 People
                  </button>
                  <button
                    onClick={() => setFilters({...filters, capacity: '3'})}
                    className={`px-4 py-2 rounded-full text-sm ${
                      filters.capacity === '3' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    3 People
                  </button>
                  <button
                    onClick={() => setFilters({...filters, capacity: '4+'})}
                    className={`px-4 py-2 rounded-full text-sm ${
                      filters.capacity === '4+' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    4+ People
                  </button>
                </div>
              </div>
              
              {/* Room Type Filter */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700">Room Type</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilters({...filters, roomType: 'all'})}
                    className={`px-4 py-2 rounded-full text-sm ${
                      filters.roomType === 'all' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    All Types
                  </button>
                  {roomTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setFilters({...filters, roomType: type})}
                      className={`px-4 py-2 rounded-full text-sm ${
                        filters.roomType === type 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Amenities Filter */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700">Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {allAmenities.slice(0, 6).map(amenity => (
                    <div key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`amenity-${amenity}`}
                        checked={filters.amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700">
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
                {allAmenities.length > 6 && (
                  <button className="text-blue-500 text-sm hover:underline mt-1">
                    Show more amenities
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Results Stats */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredRooms.length} of {rooms.length} rooms
        </p>
      </div>
      
      {/* Room Cards */}
      {filteredRooms.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl text-gray-500">No rooms match your filters. Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room.roomId}
              onClick={() => handleRoomClick(room.roomId)}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
            >
              {/* Room Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={room.imageUrl} 
                  alt={room.roomName} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 m-2 rounded-md">
                  ₹{room.roomPrice.toLocaleString('en-IN')}/month
                </div>
                {!room.available && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-md font-bold">
                      Not Available
                    </span>
                  </div>
                )}
              </div>
              
              {/* Room Details */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{room.roomName}</h3>
                  <span className={`text-sm px-2 py-1 rounded ${room.roomType === 'AC' ? 'bg-blue-100 text-blue-800' : room.roomType === 'DELUXE' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                    {room.roomType}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-2">{room.house.location}</p>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-500 line-clamp-2">{room.house.description}</p>
                </div>
                
                {/* Room Specs */}
                <div className="flex justify-between items-center mb-3 text-sm">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <span>{room.house.address}</span>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  <svg className="w-4 h-4 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <span>{room.roomCapacity} {room.roomCapacity === 1 ? 'Person' : 'People'}</span>
                </div>
                
                {/* Amenities Tags */}
                {room.house.amenities && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {room.house.amenities.split(',').slice(0, 3).map((amenity, index) => (
                      amenity.trim() && (
                        <span 
                          key={index} 
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {amenity.trim()}
                        </span>
                      )
                    ))}
                    {room.house.amenities.split(',').length > 3 && (
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        +{room.house.amenities.split(',').length - 3} more
                      </span>
                    )}
                  </div>
                )}
                
                {/* Host Info */}
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2 text-xs font-bold">
                    {room.house.user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{room.house.user.name}</p>
                    <p className="text-xs text-gray-500">Host</p>
                  </div>
                </div>
                
                {/* Call to Action */}
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRooms;