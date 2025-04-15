import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRoomDetails } from '../../components/RoomPage/useRoomDetails';

import DashboardLayout from '../../Layouts/dashboardLayout';
import LoadingState from '../../components/RoomPage/LoadingState';
import RoomDetail from '../../components/RoomPage/RoomDetail';
import ReviewsSection from '../../components/RoomPage/ReviewsSection';
import BookingButton from '../../components/RoomPage/BookingButton';
import NotFound from '../../components/RoomPage/NotFound';
import BookingModal from '../../components/RoomPage/BookingModal';
import ReviewModal from '../../components/RoomPage/ReviewModal';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';


const RoomPage = () => {
  const { roomId } = useParams();
  const { 
    room, 
    loading, 
    reviews, 
    averageRating, 
    fetchRoomDetails, 
    fetchBookedDates,
    isDateBooked 
  } = useRoomDetails(roomId);
  
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    isSubmitting: false,
    error: null,
    success: false
  });
  
  const [reviewData, setReviewData] = useState({
    message: '',
    rating: 5,
    isSubmitting: false,
    error: null,
    success: false
  });

  const handleBookNow = () => {
    // Get tomorrow's date as default start date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Get day after tomorrow as default end date
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    
    // Format dates to YYYY-MM-DD
    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };
    
    setBookingData({
      ...bookingData,
      startDate: formatDate(tomorrow),
      endDate: formatDate(dayAfterTomorrow)
    });
    
    // Fetch booked dates when opening the modal
    fetchBookedDates(roomId);
    
    setShowBookingModal(true);
  };

  const handleOpenReviewModal = () => {
    setShowReviewModal(true);
  };

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: name === 'rating' ? parseInt(value) : value
    });
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    // Reset booking state
    setTimeout(() => {
      setBookingData({
        ...bookingData,
        error: null,
        success: false
      });
    }, 300);
  };

  const closeReviewModal = () => {
    setShowReviewModal(false);
    // Reset review state
    setTimeout(() => {
      setReviewData({
        ...reviewData,
        error: null,
        success: false
      });
    }, 300);
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');

    if (!userId) {
      setBookingData({
        ...bookingData,
        error: "User not logged in. Please login to book a room."
      });
      return;
    }

    setBookingData({
      ...bookingData,
      isSubmitting: true,
      error: null
    });

    try {
      const currentDate = new Date().toISOString(); // get current date-time in ISO format
      
      // Ensure start and end dates are in the proper format (with time)
      const bookingPayload = {
        user: {
          userId: userId
        },
        room: {
          roomId: parseInt(roomId)
        },
        bookedDate: currentDate, // current date and time
        startDate: new Date(bookingData.startDate + "T" + "14:00:00").toISOString(), // start time at 14:00
        endDate: new Date(bookingData.endDate + "T" + "12:00:00").toISOString(), // end time at 12:00
        status: "BOOKED"
      };

      const response = await axiosInstance.post(API_PATHS.BOOKING.ADD_BOOKING, bookingPayload);

      if (response.data) {
        setBookingData({
          ...bookingData,
          isSubmitting: false,
          success: true,
          error: null
        });

        // Refresh room details to update availability
        setTimeout(() => {
          fetchRoomDetails();
          setShowBookingModal(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Booking error:", error);
      let errorMessage = "Failed to book room. Please try again.";
      
      // Add specific handling for date conflict errors
      if (error.response?.status === 400 && error.response?.data?.includes("date conflict")) {
        errorMessage = "This room is already booked for the selected dates. Please choose different dates.";
      }
      
      setBookingData({
        ...bookingData,
        isSubmitting: false,
        error: error.response?.data || errorMessage
      });
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      setReviewData({
        ...reviewData,
        error: "User not logged in. Please login to add a review."
      });
      return;
    }
    
    if (reviewData.message.trim().length < 5) {
      setReviewData({
        ...reviewData,
        error: "Review message must be at least 5 characters."
      });
      return;
    }
    
    setReviewData({
      ...reviewData,
      isSubmitting: true,
      error: null
    });
    
    try {
      const reviewPayload = {
        user: {
          userId: parseInt(userId)
        },
        room: {
          roomId: parseInt(roomId)
        },
        message: reviewData.message,
        rating: reviewData.rating
      };
      
      const response = await axiosInstance.post(API_PATHS.REVIEWS.ADD_REVIEW, reviewPayload);
      
      if (response.data) {
        setReviewData({
          ...reviewData,
          isSubmitting: false,
          success: true,
          error: null
        });
        
        // Refresh reviews to show the new review
        setTimeout(() => {
          fetchRoomDetails();
          setShowReviewModal(false);
          
          // Reset form after successful submission and modal close
          setTimeout(() => {
            setReviewData({
              message: '',
              rating: 5,
              isSubmitting: false,
              error: null,
              success: false
            });
          }, 300);
        }, 2000);
      }
    } catch (error) {
      console.error("Review error:", error);
      setReviewData({
        ...reviewData,
        isSubmitting: false,
        error: error.response?.data || "Failed to add review. Please try again."
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 max-w-3xl mx-auto">
        {loading ? (
          <LoadingState />
        ) : room ? (
          <>
            <RoomDetail 
              room={room} 
              averageRating={averageRating} 
              reviewsCount={reviews.length} 
            />
            
            <ReviewsSection 
              reviews={reviews} 
              handleOpenReviewModal={handleOpenReviewModal} 
            />
            
            <BookingButton 
              available={room.available} 
              handleBookNow={handleBookNow} 
            />
          </>
        ) : (
          <NotFound />
        )}
      </div>

      <BookingModal 
        showBookingModal={showBookingModal}
        closeBookingModal={closeBookingModal}
        room={room}
        bookingData={bookingData}
        setBookingData={setBookingData}
        handleSubmitBooking={handleSubmitBooking}
        isDateBooked={isDateBooked}
      />

      <ReviewModal
        showReviewModal={showReviewModal}
        closeReviewModal={closeReviewModal}
        room={room}
        reviewData={reviewData}
        handleReviewInputChange={handleReviewInputChange}
        handleSubmitReview={handleSubmitReview}
      />
    </DashboardLayout>
  );
};

export default RoomPage;