import React, { useEffect, useState } from 'react'
import UserBookings from './UserBookings'
import RoomsBookings from './RoomsBooked'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import DashboardLayout from '../../Layouts/dashboardLayout'

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('user')

  const [bookings, setBookings] = useState([]);
  const [UserBooking, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          setError('User not logged in. Please login to view your bookings.');
          setLoading(false);
          return;
        }
        
        const response = await axiosInstance.get(API_PATHS.BOOKING.OWNER_ROOMS_BOOKINGS(userId));
        setBookings(response.data);
        const UserResponse = await axiosInstance.get(API_PATHS.BOOKING.USER_BOOKINGS(userId));
        setUserBookings(UserResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load bookings. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
      try {
        const response = await axiosInstance.put(API_PATHS.BOOKING.CANCEL_BOOKING(bookingId));
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <DashboardLayout>
        <div className="p-4">
        {/* Tabs */}
        <div className="flex space-x-4 mb-4">
            <button
            onClick={() => setActiveTab('user')}
            className={`px-4 py-2 rounded ${
                activeTab === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
                >
            Your Bookings
            </button>
            <button
            onClick={() => setActiveTab('rooms')}
            className={`px-4 py-2 rounded ${
                activeTab === 'rooms' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
                >
            Your Rooms Booked by User
            </button>
        </div>

        {/* Tab Content */}
        <div>
            {activeTab === 'user' && <UserBookings handleCancelBooking={handleCancelBooking} bookings={UserBooking} loading={loading} error={error}/>}
            {activeTab === 'rooms' && <RoomsBookings handleCancelBooking={handleCancelBooking} bookings={bookings} loading={loading} error={error}/>}
        </div>
        </div>
    </DashboardLayout>
  )
}

export default Bookings
