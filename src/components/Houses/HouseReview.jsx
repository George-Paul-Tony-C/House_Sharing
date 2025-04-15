import { Star, UserCircle } from 'lucide-react';
import React from 'react';

const HouseReview = ({ reviews }) => {
  return (
    <div className="space-y-4">
      { reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review.reviewId}
            className="border border-gray-200 rounded-lg p-4 shadow-md bg-white"
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
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{review.user.name}</h3>
                <p className="text-sm text-gray-500">Room Name : {review.room.roomName}</p>
              </div>
            </div>

            <p className="mt-2 text-gray-700">{review.message}</p>

            <div className="mt-2 flex items-center space-x-2">
              <span className="text-yellow-500 text-xl">
                {'★'.repeat(review.rating)}{' '}
                {'☆'.repeat(5 - review.rating)}
              </span>
              <span className="text-sm text-gray-500">{review.rating} out of 5</span>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
          <Star size={32} className="mx-auto text-gray-400 mb-2" />
          <h3 className="text-base font-medium text-gray-900 mb-1">No Reviews Yet</h3>
          <p className="text-gray-600">Be the first to review this property.</p>
        </div>
      )}
    </div>
  );
};

export default HouseReview;
