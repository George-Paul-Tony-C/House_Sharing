// DetailedBookingsModal.jsx
import React from 'react';
import { ArrowLeft, Calendar, Clock, Home, MapPin, User, Info, X } from 'lucide-react';

const DetailedBookingsModal = ({ booking, isOpen, onClose, handleCancelBooking }) => {
  if (!isOpen || !booking) return null;

  // Format date function
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate duration in days
  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'BOOKED':
        return 'bg-green-500';
      case 'CANCELLED':
        return 'bg-red-500';
      case 'COMPLETED':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur bg-opacity-50 z-50 flex justify-center items-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto">
        <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-bold">Booking Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Booking Header */}
          <div className={`${getStatusColor(booking.status)} text-white p-4 flex justify-between items-center rounded-lg mb-6`}>
            <div>
              <h2 className="text-xl font-semibold">Booking #{booking.bookingId}</h2>
              <p className="text-blue-100">Booked on {formatDate(booking.bookedDate)}</p>
            </div>
            <div className="bg-white py-1 px-4 rounded-full text-blue-700 font-medium">
              {booking.status}
            </div>
          </div>

          <div className="md:flex mb-6">
            {/* Room Image */}
            <div className="md:w-1/3">
              <img 
                src={booking.room.imageUrl} 
                alt={booking.room.roomName} 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            {/* Room Details */}
            <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{booking.room.roomName} - {booking.room.roomType}</h3>
                <p className="text-gray-600">{booking.room.house.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-gray-500 font-medium mb-1">Room Details</h4>
                  <p><span className="font-medium">Price:</span> ₹{booking.room.roomPrice}/night</p>
                  <p><span className="font-medium">Capacity:</span> {booking.room.roomCapacity} Persons</p>
                  <p><span className="font-medium">Type:</span> {booking.room.roomType}</p>
                </div>

                <div>
                  <h4 className="text-gray-500 font-medium mb-1">Property Details</h4>
                  <p><span className="font-medium">Name:</span> {booking.room.house.description}</p>
                  <p><span className="font-medium">Location:</span> {booking.room.house.location}</p>
                  <p><span className="font-medium">Amenities:</span> {booking.room.house.amenities}</p>
                  <p><span className="font-medium">Address:</span> {booking.room.house.address || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Date Details */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-gray-500 text-sm">Check-in</p>
                <p className="font-bold">{formatDate(booking.startDate)}</p>
              </div>
              
              <div className="text-center">
                <p className="text-gray-500 text-sm">Duration</p>
                <p className="font-bold">{calculateDuration(booking.startDate, booking.endDate)} Days</p>
              </div>
              
              <div className="text-center">
                <p className="text-gray-500 text-sm">Check-out</p>
                <p className="font-bold">{formatDate(booking.endDate)}</p>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="p-4 border border-gray-200 rounded-lg mb-6">
            <h4 className="text-gray-500 font-medium mb-1">Guest Information</h4>
            <p><span className="font-medium">Name:</span> {booking.user && booking.user.name}</p>
            <p><span className="font-medium">Email:</span> {booking.user && booking.user.email}</p>
            <p><span className="font-medium">Phone:</span> {booking.user && booking.user.ph_no}</p>
          </div>
          
          {/* Payment Information */}
          <div className="p-4 border border-gray-200 rounded-lg mb-6">
            <h4 className="text-gray-500 font-medium mb-1">Payment Information</h4>
            <div className="flex justify-between">
              <div>
                <p><span className="font-medium">Room Rate:</span> ₹{booking.room.roomPrice}/night</p>
                <p><span className="font-medium">Duration:</span> {calculateDuration(booking.startDate, booking.endDate)} nights</p>
                {booking.taxAmount && <p><span className="font-medium">Taxes & Fees:</span> ₹{booking.taxAmount}</p>}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-700">
                  ₹{booking.room.roomPrice * calculateDuration(booking.startDate, booking.endDate)}
                </p>
                <p className="text-sm text-gray-500">Total amount</p>
              </div>
            </div>
          </div>
          
          {/* House Rules & Policies */}
          <div className="p-4 border border-gray-200 rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-4">House Rules & Policies</h3>
            <div className="mb-4">
              <h4 className="font-medium mb-2">Check-in/Check-out</h4>
              <p className="text-gray-700">Check-in time: 2:00 PM</p>
              <p className="text-gray-700">Check-out time: 11:00 AM</p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium mb-2">Cancellation Policy</h4>
              <p className="text-gray-700">Free cancellation up to 24 hours before check-in. After that, you will be charged for the first night.</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">House Rules</h4>
              <ul className="list-disc ml-5 text-gray-700">
                <li>No smoking inside the property</li>
                <li>No parties or events</li>
                <li>Quiet hours between 10:00 PM and 8:00 AM</li>
              </ul>
            </div>
          </div>
          
          {/* Actions */}
          {booking.status === 'BOOKED' && (
            <div className="flex justify-end">
              <button 
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                onClick={() => {
                  handleCancelBooking(booking.bookingId);
                  onClose();
                }}
              >
                Cancel Booking
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedBookingsModal;