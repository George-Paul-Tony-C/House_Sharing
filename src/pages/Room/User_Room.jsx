import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../Layouts/dashboardLayout'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { Home, Loader, Star } from 'lucide-react';
import RoomReview from '../../components/RoomPage/RoomReview';
import RoomBookingHistory from '../../components/RoomPage/RoomsBooringHistory';

const UserRoom = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);

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
    }

    useEffect(() => {
        fetchRoomDetails();
    }, [roomId]);

    // Calculate average rating if reviews exist
    const averageRating = reviews.length > 0 
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
        : 0;

    return (
        <DashboardLayout>
          <div className="p-4 max-w-3xl mx-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <Loader className="animate-spin h-8 w-8 text-blue-600 mb-4" />
                <p className="text-gray-600">Loading room details...</p>
              </div>
            ) : room ? (
              <>
                <div className="mb-6">
                  {/* Room Details Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{room.roomName}</h1>
                      <div className="flex items-center mt-2 text-gray-600">
                        <Home size={16} className="mr-1" />
                        <span>{room.house.address}</span>
                      </div>
                    </div>
                    {reviews.length > 0 && (
                      <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
                        <Star size={16} className="text-yellow-500 mr-1" fill="#f59e0b" />
                        <span className="font-semibold">{averageRating}</span>
                        <span className="text-gray-500 text-sm ml-1">({reviews.length} reviews)</span>
                      </div>
                    )}
                  </div>
                </div>
    
                {/* Room Image */}
                <div className="w-full h-64 overflow-hidden rounded-lg mb-6">
                  <img
                    src={room.imageUrl}
                    alt={room.roomName}
                    className="w-full h-full object-cover"
                  />
                </div>
    
                {/* Room Details */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="font-semibold text-lg text-gray-800">Room Type:</p>
                      <p className="text-gray-600">{room.roomType}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-800">Price:</p>
                      <p className="text-green-600 font-semibold">₹{room.roomPrice}/month</p>
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-800">Capacity:</p>
                      <p className="text-gray-600">{room.roomCapacity} people</p>
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-800">Availability:</p>
                      <p className={`font-medium ${room.available ? 'text-green-500' : 'text-red-500'}`}>
                        {room.available ? 'Available' : 'Not Available'}
                      </p>
                    </div>
                  </div>
                </div>
    
                {/* Room Description */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">Room Description:</h3>
                  <p className="text-gray-600 leading-relaxed">{room.house.description}</p>
                </div>

                {/* Reviews Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  {/* Review Component */}
                  <RoomReview reviews={reviews} />
                </div>

                {/* Booking History Section */}
                <div className="mb-6">
                  <RoomBookingHistory />
                </div>
              </>
            ) : (
              <div className="text-center p-8">
                <h2 className="text-xl font-semibold text-gray-700">Room not found</h2>
                <p className="mt-2 text-gray-600">The requested room could not be found.</p>
              </div>
            )}
          </div>
        </DashboardLayout>
      );
}

export default UserRoom;