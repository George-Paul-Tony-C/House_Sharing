import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { Home, MapPin, Coffee, Search, Filter, Loader, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AllHouses = () => {
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const fetchHouses = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.HOUSE.GET_ALL_HOUSES);
      const houses = response.data;
      
      if (houses && houses.length > 0) {
        setHouses(houses);
        setFilteredHouses(houses);
        setError(null);
      } else {
        setHouses([]);
        setFilteredHouses([]);
        setError('No houses found');
      }
    } catch (error) {
      console.error(error);
      setError('Error fetching house data');
      setHouses([]);
      setFilteredHouses([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredHouses(houses);
    } else {
      const filtered = houses.filter(house => 
        house.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        house.amenities.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredHouses(filtered);
    }
  }, [searchTerm, houses]);

  // Function to limit amenities display
  const displayAmenities = (amenities) => {
    if (!amenities) return "No amenities";
    const amenitiesList = amenities.split(',').map(a => a.trim());
    if (amenitiesList.length <= 3) return amenities;
    return `${amenitiesList.slice(0, 2).join(', ')} +${amenitiesList.length - 2} more`;
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-xl border border-gray-200">
      <div className="bg-blue-100 p-4 rounded-full mb-4">
        <Home size={48} className="text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No Houses Available</h3>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Currently, there are no properties listed. Please check back later.
      </p>
    </div>
  );

  const ErrorDisplay = ({ message }) => (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{message}</p>
        </div>
      </div>
    </div>
  );

  const HouseCard = ({ house }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative">
        <Link to={`/house/${house.houseId}`}>
          <div className="w-full h-56 overflow-hidden">
            {house.imageUrl ? (
              <img
                src={house.imageUrl}
                alt={house.address}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <Home size={48} className="text-gray-400" />
              </div>
            )}
          </div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-blue-800">
            {house.noOfRooms} {house.noOfRooms === 1 ? 'Room' : 'Rooms'}
          </div>
        </Link>
      </div>

      <div className="p-4">
        <Link to={`/house/${house.houseId}`}>
          <h2 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors line-clamp-1">{house.address}</h2>
        </Link>

        <div className="flex items-start space-x-2 mb-3">
          <MapPin size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600 line-clamp-1">{house.location || house.address}</p>
        </div>

        <div className="flex items-start space-x-2 mb-4">
          <Coffee size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600">{displayAmenities(house.amenities)}</p>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <Link 
            to={`/house/${house.houseId}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );

  const HouseListItem = ({ house }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow p-4 flex flex-col sm:flex-row gap-4">
      <Link to={`/house/${house.houseId}`} className="w-full sm:w-48 h-32 flex-shrink-0">
        {house.imageUrl ? (
          <img
            src={house.imageUrl}
            alt={house.address}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-md">
            <Home size={32} className="text-gray-400" />
          </div>
        )}
      </Link>

      <div className="flex-grow">
        <Link to={`/house/${house.houseId}`}>
          <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">{house.address}</h2>
        </Link>

        <div className="flex items-center gap-6 mt-2">
          <div className="flex items-center space-x-1">
            <Bed size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">{house.noOfRooms} {house.noOfRooms === 1 ? 'Room' : 'Rooms'}</span>
          </div>

          <div className="flex items-center space-x-1">
            <Coffee size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">
              {house.amenities ? house.amenities.split(',').length : 0} Amenities
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-2">
          {house.amenities || "No amenities listed"}
        </p>

        <div className="flex justify-end mt-3">
          <Link 
            to={`/house/${house.houseId}`}
            className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-md transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Properties</h1>
          <p className="text-gray-600 mt-1">Browse all available properties</p>
        </div>

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
      </div>

      {/* Error message */}
      {error && !isLoading && houses.length === 0 && (
        <ErrorDisplay message={error} />
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader className="h-10 w-10 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading all properties...</p>
        </div>
      ) : filteredHouses.length > 0 ? (
        <>
          {/* Houses grid/list */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHouses.map((house) => (
                <HouseCard key={house.houseId} house={house} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHouses.map((house) => (
                <HouseListItem key={house.houseId} house={house} />
              ))}
            </div>
          )}
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default AllHouses;
