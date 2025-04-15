import React, { useMemo } from 'react';
import { Calendar, X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BookingModal = ({ 
  showBookingModal, 
  closeBookingModal, 
  room, 
  bookingData, 
  setBookingData, 
  handleSubmitBooking,
  isDateBooked
}) => {
  if (!showBookingModal) return null;
  
  // Calculate number of nights and total price
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const bookingSummary = useMemo(() => {
    if (!bookingData.startDate || !bookingData.endDate || !room?.roomPrice) {
      return { nights: 0, totalPrice: 0 };
    }
    
    const startDate = new Date(bookingData.startDate);
    const endDate = new Date(bookingData.endDate);
    const nights = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * room.roomPrice;
    
    return { nights, totalPrice };
  }, [bookingData.startDate, bookingData.endDate, room?.roomPrice]);
  
  // Custom styles for the DatePicker calendar
  const customDatePickerStyles = `
    .react-datepicker {
      font-family: 'Inter', sans-serif;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border: none;
    }
    .react-datepicker__header {
      background-color: #3b82f6;
      border-bottom: none;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      padding-top: 12px;
    }
    .react-datepicker__current-month {
      color: white;
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 8px;
    }
    .react-datepicker__day-name {
      color: rgba(255, 255, 255, 0.8);
      font-weight: 500;
      width: 36px;
      margin: 2px;
    }
    .react-datepicker__day {
      width: 36px;
      height: 36px;
      line-height: 36px;
      margin: 2px;
      border-radius: 50%;
      transition: all 0.2s;
    }
    .react-datepicker__day:hover:not(.react-datepicker__day--disabled) {
      background-color: #e0e7ff;
    }
    .react-datepicker__day--selected {
      background-color: #3b82f6 !important;
      color: white;
      font-weight: 600;
    }
    .react-datepicker__day--keyboard-selected {
      background-color: #dbeafe;
      color: #1e40af;
    }
    .react-datepicker__day--disabled {
      color: #ccc !important;
      text-decoration: line-through;
      background-color: #fee2e2 !important;
      cursor: not-allowed;
    }
    .react-datepicker__day--booked {
      background-color: #fee2e2;
      color: #ef4444;
      pointer-events: none;
      position: relative;
    }
    .react-datepicker__navigation {
      top: 14px;
    }
    .react-datepicker__navigation-icon::before {
      border-color: white;
    }
    .react-datepicker__input-container input {
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border-radius: 0.375rem;
      border: 1px solid #d1d5db;
      width: 100%;
      font-size: 0.875rem;
      transition: all 0.2s;
    }
    .react-datepicker__input-container input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    }
  `;

  // Custom date render function
  const renderCustomDateCell = (date) => {
    const isBooked = isDateBooked(date);
    const dayClasses = isBooked ? "react-datepicker__day--booked" : "";
    return dayClasses;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <style>{customDatePickerStyles}</style>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fadeIn">
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-medium">Book Room: {room?.roomName}</h3>
          <button 
            onClick={closeBookingModal}
            className="text-white hover:text-gray-200 transition rounded-full p-1 hover:bg-blue-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4">
          {bookingData.success ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-4">
              <p className="font-medium">Booking successful!</p>
              <p className="text-sm">Your room has been booked successfully.</p>
              <button
                onClick={closeBookingModal}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitBooking}>
              {bookingData.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-4">
                  <p>{bookingData.error}</p>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Check-in Date</label>
                <div className="relative left-10">
                  <DatePicker
                    selected={bookingData.startDate ? new Date(bookingData.startDate) : null}
                    onChange={(date) => {
                      const formattedDate = date.toISOString().split('T')[0];
                      setBookingData({
                        ...bookingData,
                        startDate: formattedDate
                      });
                    }}
                    minDate={new Date()}
                    filterDate={(date) => !isDateBooked(date)}
                    dayClassName={renderCustomDateCell}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholderText="Select check-in date"
                    required
                    dateFormat="yyyy-MM-dd"
                    showPopperArrow={false}
                  />
                  <Calendar size={18} className="absolute left-3 top-3 text-gray-400" />
                </div>
                <p className="mt-1 text-xs text-gray-500">Red dates are already booked</p>
              </div>

              <div className="mb-12">
                <label className="block text-gray-700 text-sm font-medium mb-2">Check-out Date</label>
                <div className="relative left-10">
                  <DatePicker
                    selected={bookingData.endDate ? new Date(bookingData.endDate) : null}
                    onChange={(date) => {
                      const formattedDate = date.toISOString().split('T')[0];
                      setBookingData({
                        ...bookingData,
                        endDate: formattedDate
                      });
                    }}
                    minDate={bookingData.startDate ? new Date(bookingData.startDate) : new Date()}
                    filterDate={(date) => !isDateBooked(date)}
                    dayClassName={renderCustomDateCell}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholderText="Select check-out date"
                    required
                    dateFormat="yyyy-MM-dd"
                    showPopperArrow={false}
                  />
                  <Calendar size={18} className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>

              {/* Price calculation and booking summary */}
              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <h4 className="font-medium text-blue-800 mb-3">Booking Summary</h4>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Room Price:</span>
                    <span className="font-medium">₹{room?.roomPrice}/night</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Number of Nights:</span>
                    <span className="font-medium">{bookingSummary.nights || '-'}</span>
                  </div>
                </div>
                <div className="border-t border-blue-200 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-semibold">Total Price:</span>
                    <span className="text-blue-700 font-bold text-lg">
                      {bookingSummary.totalPrice > 0 ? `₹${bookingSummary.totalPrice}` : '-'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="mr-3 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bookingData.isSubmitting || !bookingData.startDate || !bookingData.endDate}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {bookingData.isSubmitting ? 'Booking...' : `Confirm Booking ${bookingSummary.totalPrice > 0 ? `(₹${bookingSummary.totalPrice})` : ''}`}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;