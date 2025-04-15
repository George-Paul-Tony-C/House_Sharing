import React from 'react';
import { MessageSquare } from 'lucide-react';
import RoomReview from './RoomReview';

const ReviewsSection = ({ reviews, handleOpenReviewModal }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-gray-800">Guest Reviews</h3>
        <button 
          onClick={handleOpenReviewModal}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          <MessageSquare size={14} className="mr-1" />
          Write a Review
        </button>
      </div>
      
      {/* Review Component */}
      <RoomReview reviews={reviews} handleOpenReviewModal={handleOpenReviewModal} />
    </div>
  );
};

export default ReviewsSection;