import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { AuthContext } from '../../context/AuthContext';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../Layouts/dashboardLayout';
import AddHouseForm from './AddHouseForm';
import { Link } from 'react-router-dom';
import { Home, Plus, Trash2, Search, Filter, MapPin, Coffee, Bed, Loader, AlertCircle } from 'lucide-react';

const HouseList = () => {
  const { logged } = useContext(AuthContext);
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [error, setError] = useState(null);
  const [isAddHouseFormOpen, setIsAddHouseFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const fetchHouses = async () => {
    if (!logged) {
      return;
    }

    setIsLoading(true);
    const userId = localStorage.getItem('userId');

    try {
      const response = await axiosInstance.get(`${API_PATHS.USER.GET_USER_HOUSES.replace(':userId', userId)}`);
      const { message, houses } = response.data;
      
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
  }, [logged, isAddHouseFormOpen]);

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

  const openAddHouseForm = () => {
    setIsAddHouseFormOpen(true);
  };

  const closeAddHouseForm = () => {
    setIsAddHouseFormOpen(false);
  };

  const confirmDeleteHouse = (houseId, address) => {
    setDeleteConfirmation({ id: houseId, address });
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  const handleDeleteHouse = async (houseId) => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(API_PATHS.HOUSE.DELETE_HOUSE(houseId));
      setDeleteConfirmation(null);
      fetchHouses();
    } catch (error) {
      if (error.response) {
        setError(`Failed to delete: ${error.response.data.message || 'Unknown error'}`);
      } else {
        setError(`Failed to delete: ${error.message}`);
      }
      setIsLoading(false);
    }
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-xl border border-gray-200">
      <div className="bg-blue-100 p-4 rounded-full mb-4">
        <Home size={48} className="text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No Houses Yet</h3>
      <p className="text-gray-600 text-center max-w-md mb-6">
        You haven't added any houses to your portfolio yet. Add your first property to get started.
      </p>
      <button 
        onClick={openAddHouseForm}
        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        <Plus size={20} className="mr-2" />
        Add Your First House
      </button>
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

  const HouseCard = ({ house }) => {
    // Function to limit amenities display
    const displayAmenities = (amenities) => {
      if (!amenities) return "No amenities";
      const amenitiesList = amenities.split(',').map(a => a.trim());
      if (amenitiesList.length <= 3) return amenities;
      return `${amenitiesList.slice(0, 2).join(', ')} +${amenitiesList.length - 2} more`;
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
        <div className="relative">
          <Link to={`/houses/${house.houseId}`}>
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
          <Link to={`/houses/${house.houseId}`}>
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
              to={`/houses/${house.houseId}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              View Details
            </Link>
            <button 
              type="button" 
              onClick={() => confirmDeleteHouse(house.houseId, house.address)} 
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              aria-label={`Delete house at ${house.address}`}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const HouseListItem = ({ house }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow p-4 flex flex-col sm:flex-row gap-4">
      <Link to={`/houses/${house.houseId}`} className="w-full sm:w-48 h-32 flex-shrink-0">
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
        <Link to={`/houses/${house.houseId}`}>
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
          <div className="flex gap-2">
            <Link 
              to={`/houses/${house.houseId}`}
              className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-md transition-colors"
            >
              View Details
            </Link>
            <button 
              type="button" 
              onClick={() => confirmDeleteHouse(house.houseId, house.address)} 
              className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800 border border-red-200 hover:border-red-300 hover:bg-red-50 rounded-md transition-colors inline-flex items-center"
              aria-label={`Delete house at ${house.address}`}
            >
              <Trash2 size={14} className="mr-1" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Properties</h1>
            <p className="text-gray-600 mt-1">
              Manage your houses and rental properties
            </p>
          </div>
          
          <button 
            onClick={openAddHouseForm} 
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Add New House
          </button>
        </div>

        {/* Search and filter controls */}
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
          
          {filteredHouses.length > 0 && (
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <Filter size={16} className="mr-2" />
              <span>Showing {filteredHouses.length} of {houses.length} properties</span>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && !isLoading && houses.length === 0 && (
          <ErrorDisplay message={error} />
        )}

        {/* Loading state */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader className="h-10 w-10 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600">Loading your properties...</p>
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

      {/* Add House Modal */}
      {isAddHouseFormOpen && (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Add New Property</h2>
                <button 
                  onClick={closeAddHouseForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <AddHouseForm closeForm={closeAddHouseForm} />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Property</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete the property at <span className="font-medium">{deleteConfirmation.address}</span>? 
                This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => handleDeleteHouse(deleteConfirmation.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default HouseList;