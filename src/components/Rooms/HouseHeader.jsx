import React from 'react';
import { MapPin, PlusCircle } from 'lucide-react';

const HouseHeader = ({ houseDetails, showAddRoomButton = false, onAddRoomClick = () => {} }) => {
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{houseDetails.address}</h1>
          <div className="flex items-center mt-1 text-gray-600">
            <MapPin size={16} className="mr-1" />
            <span>{houseDetails.location || "Location not specified"}</span>
          </div>
        </div>
        {showAddRoomButton && (
          <button 
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1"
            onClick={onAddRoomClick}
          >
            <PlusCircle size={16} />
            Add Room
          </button>
        )}
      </div>
    </div>
  );
};

export default HouseHeader;