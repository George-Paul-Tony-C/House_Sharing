import React, { useState, useEffect } from 'react';
import { MessageSquare, Star, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import RoomReview from './RoomReview';

const ReviewsSection = ({ reviews, handleOpenReviewModal, averageRating: propAverageRating }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [calculatedAvgRating, setCalculatedAvgRating] = useState(0);
  
  // Calculate metrics for the summary
  const reviewCount = reviews?.length || 0;
  const fiveStarReviews = reviews?.filter(review => review.rating === 5)?.length || 0;
  const fiveStarPercentage = reviewCount > 0 ? Math.round((fiveStarReviews / reviewCount) * 100) : 0;
  
  // Recalculate average rating whenever reviews change
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const sum = reviews.reduce((total, review) => total + (review.rating || 0), 0);
      const avg = sum / reviews.length;
      setCalculatedAvgRating(avg.toFixed(1));
    } else {
      setCalculatedAvgRating(0);
    }
  }, [reviews]);

  // Use prop if provided, otherwise use calculated value
  const displayRating = propAverageRating || calculatedAvgRating || '0.0';
  
  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All Reviews' },
    { value: 'recent', label: 'Recent First' },
    { value: 'highest', label: 'Highest Rated' },
    { value: 'lowest', label: 'Lowest Rated' }
  ];

  // Apply filters to reviews
  const getFilteredReviews = () => {
    if (!reviews) return [];
    
    switch (activeFilter) {
      case 'recent':
        return [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'highest':
        return [...reviews].sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return [...reviews].sort((a, b) => a.rating - b.rating);
      case 'all':
      default:
        return reviews;
    }
  };
  
  const filteredReviews = getFilteredReviews();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Header with Rating Summary */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b">
        <div className="flex items-center mb-4 md:mb-0">
          <h3 className="font-bold text-xl text-gray-800 mr-3">Guest Reviews</h3>
          <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
            <Star size={18} className="text-yellow-500 mr-1" fill="#f59e0b" />
            <span className="font-semibold" data-testid="average-rating">{displayRating}</span>
            <span className="text-gray-500 text-sm ml-1">({reviewCount} reviews)</span>
          </div>
        </div>
        
        <button 
          onClick={handleOpenReviewModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center"
        >
          <MessageSquare size={16} className="mr-2" />
          Write a Review
        </button>
      </div>
      
      {/* Rating Statistics - Visible in expanded view or if there are reviews */}
      {(isExpanded || reviewCount > 0) && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Rating Summary */}
            <div className="col-span-1 md:border-r md:pr-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star size={24} className="text-yellow-500 mr-1" fill="#f59e0b" />
                  <span className="text-3xl font-bold">{displayRating}</span>
                  <span className="text-lg text-gray-500 ml-2">/ 5</span>
                </div>
                <p className="text-gray-500 text-sm">Based on {reviewCount} reviews</p>
              </div>
            </div>
            
            {/* Star Distribution - simplified version */}
            <div className="col-span-1 md:border-r md:px-4">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-lg font-semibold">{fiveStarPercentage}%</p>
                  <p className="text-gray-500 text-sm">5-star reviews</p>
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="col-span-1 md:pl-4">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-lg font-semibold">
                    {filteredReviews?.[0]?.createdAt ? new Date(filteredReviews[0].createdAt).toLocaleDateString() : 'No reviews yet'}
                  </p>
                  <p className="text-gray-500 text-sm">Latest review</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Filters Row */}
      {reviewCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="flex items-center text-gray-600 mr-2">
            <Filter size={16} className="mr-1" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          
          {filterOptions.map(option => (
            <button
              key={option.value}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                activeFilter === option.value 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      
      {/* Review List */}
      {reviewCount > 0 ? (
        <div className="space-y-6">
          <RoomReview reviews={filteredReviews} handleOpenReviewModal={handleOpenReviewModal} />
          
          {/* Show More/Less Button */}
          {reviewCount > 3 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-center text-blue-600 hover:text-blue-800 py-2 mt-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={16} className="mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown size={16} className="mr-1" />
                  Show All {reviewCount} Reviews
                </>
              )}
            </button>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="bg-gray-100 inline-flex p-3 rounded-full mb-3">
            <MessageSquare size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-500 mb-4">No reviews yet. Be the first to share your experience!</p>
          <button 
            onClick={handleOpenReviewModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Write a Review
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;