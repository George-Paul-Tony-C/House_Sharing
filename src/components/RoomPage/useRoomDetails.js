import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';


export const useRoomDetails = (roomId) => {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);

  const fetchRoomDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.ROOM.GET_ROOM(roomId));
      setRoom(response.data);
      
      try {
        const reviewsResponse = await axiosInstance.get(API_PATHS.REVIEWS.ROOM_REVIEWS(roomId));
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchBookedDates = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.BOOKING.GET_ROOM_BOOKINGS(roomId));
      if (response.data) {
        const bookedDateRanges = response.data.map(booking => {
          return {
            start: new Date(booking.startDate),
            end: new Date(booking.endDate)
          };
        });
        setBookedDates(bookedDateRanges);
      }
    } catch (error) {
      console.error("Error fetching booked dates:", error);
    }
  };
  

  const isDateBooked = (date) => {
    return bookedDates.some(range => {
      const checkDate = new Date(date);
      return checkDate >= range.start && checkDate <= range.end;
    });
  };
  

  // Calculate average rating if reviews exist
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  useEffect(() => {
    fetchRoomDetails();
  }, [roomId]);

  return {
    room,
    loading,
    reviews,
    averageRating,
    fetchRoomDetails,
    fetchBookedDates,
    isDateBooked
  };
};