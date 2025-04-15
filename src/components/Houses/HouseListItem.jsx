import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Bed, Coffee, Trash2 } from 'lucide-react';

const HouseListItem = ({ house, isUserHouse = false, onDeleteClick }) => {
  // Determine the correct link URL based on whether it's user house or public view
  const detailsUrl = isUserHouse ? `/houses/${house.houseId}` : `/house/${house.houseId}`;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow p-4 flex flex-col sm:flex-row gap-4">
      <Link to={detailsUrl} className="w-full sm:w-48 h-32 flex-shrink-0">
        {house.imageUrl ? (
          <img
            src={house.imageUrl}
            alt={house.address}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-md">
            <Home size={32} className="text-gray-400" />
          </div>
        )}
      </Link>

      <div className="flex-grow">
        <Link to={detailsUrl}>
          <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">{house.address}</h2>
        </Link>

        <div className="flex items-center gap-6 mt-2">
          <div className="flex items-center space-x-1">
            <Bed size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">{house.noOfRooms} {house.noOfRooms === 1 ? 'Room' : 'Rooms'}</span>
          </div>

          <div className="flex items-center space-x-1">
            <Coffee size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">
              {house.amenities ? house.amenities.split(',').length : 0} Amenities
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-2">
          {house.amenities || "No amenities listed"}
        </p>

        <div className="flex justify-end mt-3">
          <div className="flex gap-2">
            <Link 
              to={detailsUrl}
              className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-md transition-colors"
            >
              View Details
            </Link>
            
            {isUserHouse && onDeleteClick && (
              <button 
                type="button" 
                onClick={() => onDeleteClick(house.houseId, house.address)} 
                className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800 border border-red-200 hover:border-red-300 hover:bg-red-50 rounded-md transition-colors inline-flex items-center"
                aria-label={`Delete house at ${house.address}`}
              >
                <Trash2 size={14} className="mr-1" />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseListItem;