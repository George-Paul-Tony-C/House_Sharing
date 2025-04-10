import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import RoomCard from '../../components/Card/RoomCard';
import { API_PATHS } from '../../utils/apiPaths';
import FilterBar from './FilterBar';

const FilterableRooms = ({ updateRoomSummary }) => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all room details on component mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(API_PATHS.ROOM.GET_ALL_DETAILS);
        const data = response.data;

        setRooms(data);
        setFilteredRooms(data);

        // Update room summary in parent component
        if (updateRoomSummary) {
          updateRoomSummary(data);
        }
      } catch (err) {
        console.error('Error fetching room details:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
    
  }, []);

  // Enhanced filtering: search across room type, house address, and amenity names,
  // and include optional filtering on minPrice, maxPrice, and room size.
  const handleFilter = (filters) => {
    let newList = [...rooms];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      newList = newList.filter((room) => {
        const roomType = room.room_type.toLowerCase();
        const houseAddress = room.house.house_address.toLowerCase();
        const amenityText = room.amenities
          ? room.amenities.map((amenity) => amenity.amenity_name.toLowerCase()).join(' ')
          : '';
        return (
          roomType.includes(searchTerm) ||
          houseAddress.includes(searchTerm) ||
          amenityText.includes(searchTerm)
        );
      });
    }

    if (filters.roomType) {
      newList = newList.filter((room) => room.room_type === filters.roomType);
    }

    if (filters.rating) {
      const ratingValue = parseFloat(filters.rating);
      newList = newList.filter((room) => (room.rating || 0) >= ratingValue);
    }

    // Optional filtering by price range
    if (filters.minPrice) {
      newList = newList.filter(
        (room) => parseFloat(room.room_price) >= parseFloat(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      newList = newList.filter(
        (room) => parseFloat(room.room_price) <= parseFloat(filters.maxPrice)
      );
    }

    // Optional filtering by room size
    if (filters.roomSize) {
      newList = newList.filter(
        (room) => room.room_size === parseInt(filters.roomSize, 10)
      );
    }

    // Sorting based on price
    if (filters.priceSort === 'asc') {
      newList.sort(
        (a, b) => parseFloat(a.room_price) - parseFloat(b.room_price)
      );
    } else if (filters.priceSort === 'desc') {
      newList.sort(
        (a, b) => parseFloat(b.room_price) - parseFloat(a.room_price)
      );
    }

    setFilteredRooms(newList);
  };

  if (loading) return <p>Loading rooms...</p>;
  if (error) return <p>Error loading rooms: {error.message}</p>;

  return (
    <>
      <FilterBar onFilter={handleFilter} />
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {filteredRooms.map((room) => (
            <RoomCard key={room.room_id} house={room.house} room={room} />
          ))}
        </div>
      ) : (
        <p>No rooms found.</p>
      )}
    </>
  );
};

export default FilterableRooms;
