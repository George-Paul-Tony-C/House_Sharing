import React from 'react';

const BookingButton = ({ available, handleBookNow }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={handleBookNow}
        className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium shadow-md transition-all duration-200 ${
          available ? '' : 'cursor-not-allowed opacity-50'
        }`}
        disabled={!available}
      >
        {available ? 'Book Now' : 'Not Available'}
      </button>
    </div>
  );
};

export default BookingButton;