import { Star, UserCircle } from 'lucide-react';
import React from 'react';

const RoomReview = ({ reviews , handleOpenReviewModal}) => {
  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review.reviewId}
            className="border border-gray-100 rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {review.user?.avatar ? (
                  <img
                    src={review.user.avatar}
                    alt={review.user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                  />
                ) : (
                  <UserCircle className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">{review.user.name}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        size={16}
                        className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">{review.rating}/5</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  {review.date ? formatDate(review.date) : 'Recent review'}
                </p>
              </div>
            </div>

            <p className="mt-3 text-gray-700 leading-relaxed">{review.message}</p>
          </div>
        ))
      ) : (
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center">
          <Star size={40} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Reviews Yet</h3>
          <p className="text-gray-600 mb-4">Be the first to review this property.</p>
          <button 
          onClick={handleOpenReviewModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200">
            Write a Review
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomReview;