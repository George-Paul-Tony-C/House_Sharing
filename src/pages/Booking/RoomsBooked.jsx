// RoomsBookings.jsx
import React, { useState } from 'react';
import { Calendar, Clock, Home, Loader, MapPin, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import DetailedBookingsModal from './DetailedBookingsPage';

const RoomsBookings = ({bookings, loading, error, handleCancelBooking}) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time for display
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  // Calculate number of days for a booking
  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'BOOKED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader className="animate-spin h-8 w-8 text-blue-600 mb-4" />
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          <p>{error}</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No bookings found</h3>
          <p className="text-gray-600 mb-4">You haven't made any room bookings yet.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Browse Rooms
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.bookingId}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Room Image */}
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img
                    src={booking.room.imageUrl}
                    alt={booking.room.roomName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Booking Details */}
                <div className="p-6 md:w-2/3">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{booking.room.roomName}</h2>
                      <p className="text-gray-700 mt-1">{booking.room.roomType} Room</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start">
                      <Calendar size={16} className="text-gray-500 mt-1 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Check-in</p>
                        <p className="font-medium">{formatDate(booking.startDate)}</p>
                        <p className="text-sm text-gray-500">{formatTime(booking.startDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Calendar size={16} className="text-gray-500 mt-1 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Check-out</p>
                        <p className="font-medium">{formatDate(booking.endDate)}</p>
                        <p className="text-sm text-gray-500">{formatTime(booking.endDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Home size={16} className="text-gray-500 mt-1 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">House</p>
                        <p className="font-medium">{booking.room.house.noOfRooms}-Room House</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin size={16} className="text-gray-500 mt-1 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{booking.room.house.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mt-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock size={16} className="text-gray-500 mr-2" />
                        <span className="text-gray-700">
                          Booked on {formatDate(booking.bookedDate)}
                        </span>
                      </div>
                      <div className="text-lg font-bold text-blue-600">
                        ₹{booking.room.roomPrice} 
                        <span className="text-sm font-normal text-gray-500">
                          × {calculateDays(booking.startDate, booking.endDate)} days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-gray-50 px-6 py-3 flex justify-end">
                {booking.status === 'BOOKED' && (
                  <button 
                    className="text-red-600 hover:text-red-800 text-sm font-medium mr-4"
                    onClick={() => handleCancelBooking(booking.bookingId)}
                  >
                    Cancel Booking
                  </button>
                )}
                <button 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={() => handleViewDetails(booking)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DetailedBookings Modal */}
      {isModalOpen && selectedBooking && (
        <DetailedBookingsModal 
          booking={selectedBooking} 
          isOpen={isModalOpen}
          onClose={closeModal}
          handleCancelBooking={handleCancelBooking}
        />
      )}
    </div>
  );
};

export default RoomsBookings;