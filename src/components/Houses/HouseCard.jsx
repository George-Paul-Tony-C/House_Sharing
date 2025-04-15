import React from 'react';
import { Link } from 'react-router-dom';
import { Home, MapPin, Coffee, Trash2 } from 'lucide-react';

const HouseCard = ({ house, isUserHouse = false, onDeleteClick }) => {
  // Function to limit amenities display
  const displayAmenities = (amenities) => {
    if (!amenities) return "No amenities";
    const amenitiesList = amenities.split(',').map(a => a.trim());
    if (amenitiesList.length <= 3) return amenities;
    return `${amenitiesList.slice(0, 2).join(', ')} +${amenitiesList.length - 2} more`;
  };

  // Determine the correct link URL based on whether it's user house or public view
  const detailsUrl = isUserHouse ? `/houses/${house.houseId}` : `/house/${house.houseId}`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative">
        <Link to={detailsUrl}>
          <div className="w-full h-56 overflow-hidden">
            {house.imageUrl ? (
              <img
                src={house.imageUrl}
                alt={house.address}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <Home size={48} className="text-gray-400" />
              </div>
            )}
          </div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-blue-800">
            {house.noOfRooms} {house.noOfRooms === 1 ? 'Room' : 'Rooms'}
          </div>
        </Link>
      </div>

      <div className="p-4">
        <Link to={detailsUrl}>
          <h2 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors line-clamp-1">{house.address}</h2>
        </Link>

        <div className="flex items-start space-x-2 mb-3">
          <MapPin size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600 line-clamp-1">{house.location || house.address}</p>
        </div>

        <div className="flex items-start space-x-2 mb-4">
          <Coffee size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600">{displayAmenities(house.amenities)}</p>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <Link 
            to={detailsUrl}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            View Details
          </Link>
          
          {isUserHouse && onDeleteClick && (
            <button 
              type="button" 
              onClick={() => onDeleteClick(house.houseId, house.address)} 
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              aria-label={`Delete house at ${house.address}`}
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HouseCard;