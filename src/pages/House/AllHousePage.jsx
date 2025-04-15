import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../Layouts/dashboardLayout';
import LoadingState from '../../components/Rooms/LoadingState';
import ErrorState from '../../components/Rooms/ErrorState';
import HouseHeader from '../../components/Rooms/HouseHeader';
import HouseImage from '../../components/Rooms/HouseImage';
import HouseOverview from '../../components/Rooms/HouseOverview';
import HouseTabs from '../../components/Rooms/HouseTabs';
import RoomsTab from '../../components/Rooms/RoomsTab';
import LocationTab from '../../components/Rooms/LocationTab';
import HouseReview from '../../components/Houses/HouseReview';

const AllHousePage = () => {
  const { houseId } = useParams();
  const [houseDetails, setHouseDetails] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('rooms');
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
        } catch (roomsErr) {
          console.error('Error fetching rooms:', roomsErr);
          setRooms([]);
          setFilteredRooms([]);
        } finally {
          setRoomsLoading(false);
        }

        try {
          const response = await axiosInstance.get(API_PATHS.REVIEWS.HOUSE_REVIEWS(houseId));
          setReviews(response.data);
        } catch (error) {
          console.log(error);
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

  // Function to extract unique room types for filter dropdown
  const getUniqueRoomTypes = () => {
    if (!Array.isArray(rooms)) return [];
    const types = new Set(rooms.map(room => room.roomType));
    return Array.from(types);
  };

  return (
    <DashboardLayout>
      <div className="p-4 max-w-6xl mx-auto">
        {loading ? (
          <LoadingState message="Loading house information..." />
        ) : error ? (
          <ErrorState title="House not found" message="The requested house could not be found." />
        ) : houseDetails ? (
          <>
            <HouseHeader 
              houseDetails={houseDetails} 
              showAddRoomButton={false} 
            />
            
            <HouseImage 
              imageUrl={houseDetails.imageUrl} 
              address={houseDetails.address} 
            />
            
            <HouseOverview 
              houseDetails={houseDetails} 
              rooms={rooms} 
            />
            
            <HouseTabs 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
            />

            {/* Tab Content */}
            <div className="mb-6">
              {activeTab === 'rooms' && (
                <RoomsTab 
                  rooms={rooms}
                  filteredRooms={filteredRooms}
                  roomsLoading={roomsLoading}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  filterType={filterType}
                  setFilterType={setFilterType}
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                  uniqueRoomTypes={getUniqueRoomTypes()}
                  isEditable={false}
                  pathPrefix="room"
                />
              )}
              
              {activeTab === 'reviews' && <HouseReview reviews={reviews} />}
              
              {activeTab === 'location' && (
                <LocationTab location={houseDetails.location} />
              )}
            </div>
          </>
        ) : (
          <ErrorState title="House not found" message="The requested house could not be found." />
        )}
      </div>
    </DashboardLayout>
  );
};

export default AllHousePage;