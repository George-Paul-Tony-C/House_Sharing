import React from 'react';
import { Star, X } from 'lucide-react';

const ReviewModal = ({ 
  showReviewModal, 
  closeReviewModal, 
  room, 
  reviewData, 
  handleReviewInputChange, 
  handleSubmitReview 
}) => {
  if (!showReviewModal) return null;
  
  // Generate stars for rating input
  const renderStarRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <label key={i} className="cursor-pointer">
          <input
            type="radio"
            name="rating"
            value={i}
            className="hidden"
            checked={reviewData.rating === i}
            onChange={handleReviewInputChange}
          />
          <Star 
            size={24} 
            className={`${reviewData.rating >= i ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}
          />
        </label>
      );
    }
    return stars;
  };
  
  return (
    <div className="fixed inset-0 bg-gray-50/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-medium">Rate and Review: {room?.roomName}</h3>
          <button 
            onClick={closeReviewModal}
            className="text-white hover:text-gray-200 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4">
          {reviewData.success ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-4">
              <p className="font-medium">Review submitted!</p>
              <p className="text-sm">Thank you for sharing your experience.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview}>
              {reviewData.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-4">
                  <p>{reviewData.error}</p>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Your Rating</label>
                <div className="flex space-x-1">
                  {renderStarRating()}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Your Review</label>
                <textarea
                  name="message"
                  value={reviewData.message}
                  onChange={handleReviewInputChange}
                  placeholder="Share your experience with this room..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-32"
                  required
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Minimum 5 characters required.</p>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={reviewData.isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {reviewData.isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;