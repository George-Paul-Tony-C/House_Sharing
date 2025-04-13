import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../Layouts/dashboardLayout';
import { MapPin, Home, Users, Coffee, Star, Wifi, Tv, Loader, PlusCircle, Filter, Search, ArrowUpDown, Calendar, DollarSign } from 'lucide-react';
import AddRoomModal from './AddRoomModal';

const HousePage = () => {
  const { houseId } = useParams();
  const [houseDetails, setHouseDetails] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [roomsError, setRoomsError] = useState(null);
  const [activeTab, setActiveTab] = useState('rooms');
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // First fetch the house details
        const houseResponse = await axiosInstance.get(`${API_PATHS.HOUSE.GET_HOUSE_DETAILS(houseId)}`);
        setHouseDetails(houseResponse.data);
        setError(null);
        
        // Then try to fetch rooms separately
        setRoomsLoading(true);
        try {
          const roomsResponse = await axiosInstance.get(`${API_PATHS.HOUSE.GET_ROOMS_FOR_HOUSE(houseId)}`);
          // Check if rooms data exists and is an array
          if (roomsResponse.data && roomsResponse.data.rooms) {
            setRooms(roomsResponse.data.rooms);
            setFilteredRooms(roomsResponse.data.rooms);
          } else {
            // If no rooms data or empty array, set empty rooms
            setRooms([]);
            setFilteredRooms([]);
          }
          setRoomsError(null);
        } catch (roomsErr) {
          console.error('Error fetching rooms:', roomsErr);
          setRoomsError('No rooms found for this house.');
          setRooms([]);
          setFilteredRooms([]);
        } finally {
          setRoomsLoading(false);
        }
      } catch (err) {
        console.error('Error fetching house data:', err);
        setError('Failed to load house information. Please try again later.');
        setHouseDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [houseId]);

  useEffect(() => {
    if (!rooms.length) {
      setFilteredRooms([]);
      return;
    }
    
    let result = [...rooms];
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      result = result.filter(room => 
        room.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.roomType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply type filter
    if (filterType !== 'all') {
      result = result.filter(room => room.roomType === filterType);
    }
    
    // Apply sorting
    if (sortOption === 'priceAsc') {
      result.sort((a, b) => a.roomPrice - b.roomPrice);
    } else if (sortOption === 'priceDesc') {
      result.sort((a, b) => b.roomPrice - a.roomPrice);
    } else if (sortOption === 'capacity') {
      result.sort((a, b) => b.roomCapacity - a.roomCapacity);
    } else if (sortOption === 'type') {
      result.sort((a, b) => a.roomType.localeCompare(b.roomType));
    }
    
    setFilteredRooms(result);
  }, [searchTerm, sortOption, filterType, rooms]);

  const handleAddRoom = (newRoom) => {
    setRooms(prevRooms => [...prevRooms, newRoom]);
  };

  const openAddRoomModal = () => {
    setIsAddRoomModalOpen(true);
  };

  // Function to extract unique room types for filter dropdown
  const getUniqueRoomTypes = () => {
    if (!Array.isArray(rooms)) return [];
    const types = new Set(rooms.map(room => room.roomType));
    return Array.from(types);
  };

  // Function to render amenities as badges
  const renderAmenities = (amenitiesString) => {
    if (!amenitiesString) return null;
    
    const amenitiesArray = amenitiesString.split(',').map(item => item.trim()).filter(item => item);
    const amenityIcons = {
      'Wifi': <Wifi size={16} />,
      'TV': <Tv size={16} />,
      'Kitchen': <Coffee size={16} />,
    };

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {amenitiesArray.map((amenity, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            {amenityIcons[amenity] || <Star size={16} />}
            {amenity}
          </span>
        ))}
      </div>
    );
  };

  const EmptyRoomsState = () => (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
      <Home size={48} className="mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No Rooms Available</h3>
      <p className="text-gray-600 mb-4">There are currently no rooms available for this house.</p>
      <button 
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 mx-auto"
        onClick={openAddRoomModal}
      >
        <PlusCircle size={16} />
        Add Room
      </button>
    </div>
  );

  const RoomsGrid = ({ rooms }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <div 
          key={room.roomId} 
          className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="relative h-40">
            {room.imageUrl ? (
              <img 
                src={room.imageUrl} 
                alt={room.roomName} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <Home size={32} className="text-gray-400" />
              </div>
            )}
            <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              ₹{room.roomPrice}/month
            </div>
            {!room.available && (
              <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white px-2 py-1 text-xs font-medium text-center">
                Not Available
              </div>
            )}
          </div>
          
          <div className="p-3">
            <h3 className="text-base font-semibold mb-1">{room.roomName}</h3>
            
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{room.roomType}</span>
              <div className="flex items-center">
                <Users size={14} className="mr-1" />
                <span className="text-xs">{room.roomCapacity} {room.roomCapacity === 1 ? 'person' : 'people'}</span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-2">
              <button className={`flex-1 py-1 rounded text-sm font-medium transition-colors ${
                room.available 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`} disabled={!room.available}>
                Book Now
              </button>
              <button className="px-2 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100">
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const RoomsTab = () => (
    <>
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
                {getUniqueRoomTypes().map(type => (
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
            
            <button 
              onClick={openAddRoomModal}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium"
            >
              <PlusCircle size={14} />
              Add Room
            </button>
          </div>
        </div>
      </div>

      {roomsLoading ? (
        <div className="flex flex-col items-center justify-center h-40">
          <Loader className="animate-spin h-8 w-8 text-blue-600 mb-4" />
          <p className="text-gray-600">Loading rooms...</p>
        </div>
      ) : filteredRooms.length > 0 ? (
        <RoomsGrid rooms={filteredRooms} />
      ) : rooms.length > 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
          <Search size={32} className="mx-auto text-gray-400 mb-2" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Matching Rooms</h3>
          <p className="text-gray-600 mb-3">No rooms match your current filters.</p>
          <button 
            onClick={() => {setSearchTerm(''); setFilterType('all'); setSortOption('default');}}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <EmptyRoomsState />
      )}
    </>
  );


  return (
    <DashboardLayout>
      <div className="p-4 max-w-6xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader className="animate-spin h-8 w-8 text-blue-600 mb-4" />
            <p className="text-gray-600">Loading house information...</p>
          </div>
        ) : error ? (
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold text-gray-700">House not found</h2>
            <p className="mt-2 text-gray-600">The requested house could not be found.</p>
          </div>
        ) : houseDetails ? (
          <>
            {/* House Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{houseDetails.address}</h1>
                  <div className="flex items-center mt-1 text-gray-600">
                    <MapPin size={16} className="mr-1" />
                    <span>{houseDetails.location || "Location not specified"}</span>
                  </div>
                </div>
                <button 
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1"
                  onClick={openAddRoomModal}
                >
                  <PlusCircle size={16} />
                  Add Room
                </button>
              </div>
            </div>

            {/* House Image */}
            <div className="w-full h-64 overflow-hidden rounded-lg mb-6">
              {houseDetails.imageUrl ? (
                <img 
                  src={houseDetails.imageUrl} 
                  alt={houseDetails.address} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Home size={48} className="text-gray-400" />
                </div>
              )}
            </div>

            {/* House Information */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2">
                  <h2 className="text-xl font-semibold mb-2">House Overview</h2>
                  <p className="text-gray-700 mb-3">
                    {houseDetails.description || "This beautiful house offers comfortable accommodation with various amenities for a pleasant stay."}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center">
                      <Home className="text-blue-600 mr-2" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Rooms</p>
                        <p className="font-semibold">{rooms.length}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="text-blue-600 mr-2" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Capacity</p>
                        <p className="font-semibold">{houseDetails.capacity || "Not specified"}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="text-blue-600 mr-2" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Average Price</p>
                        <p className="font-semibold">
                          {rooms.length > 0 
                            ? `₹${Math.round(rooms.reduce((sum, room) => sum + room.roomPrice, 0) / rooms.length)}/month` 
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <h3 className="font-semibold text-base mb-2">Amenities</h3>
                  {renderAmenities(houseDetails.amenities)}
                </div>
              </div>
            </div>

            {/* Tabs for Rooms and Reviews */}
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

            {/* Tab Content */}
            <div className="mb-6">
              {activeTab === 'rooms' && <RoomsTab />}
              
              {activeTab === 'reviews' && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <Star size={32} className="mx-auto text-gray-400 mb-2" />
                  <h3 className="text-base font-medium text-gray-900 mb-1">No Reviews Yet</h3>
                  <p className="text-gray-600">Be the first to review this property.</p>
                </div>
              )}
              
              {activeTab === 'location' && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <MapPin size={32} className="mx-auto text-gray-400 mb-2" />
                  <h3 className="text-base font-medium text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-600">{houseDetails.location || "Location details unavailable."}</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold text-gray-700">House not found</h2>
            <p className="mt-2 text-gray-600">The requested house could not be found.</p>
          </div>
        )}
      </div>

      {/* Add Room Modal */}
      {houseId && (
        <AddRoomModal 
          isOpen={isAddRoomModalOpen}
          onClose={() => setIsAddRoomModalOpen(false)}
          houseId={houseId}
          onRoomAdded={handleAddRoom}
        />
      )}
    </DashboardLayout>
  );
};

export default HousePage;