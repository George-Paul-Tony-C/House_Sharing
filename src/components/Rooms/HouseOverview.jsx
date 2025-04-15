import React from 'react';
import { Home, Users, Calendar, Wifi, Tv, Coffee, Star } from 'lucide-react';

const HouseOverview = ({ houseDetails, rooms }) => {
  // Function to render amenities as badges
  const renderAmenities = (amenitiesString) => {
    if (!amenitiesString) return null;
    
    const amenitiesArray = amenitiesString.split(',').map(item => item.trim()).filter(item => item);
    const amenityIcons = {
      'Wifi': <Wifi size={16} />,
      'TV': <Tv size={16} />,
      'Kitchen': <Coffee size={16} />,
    };

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {amenitiesArray.map((amenity, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            {amenityIcons[amenity] || <Star size={16} />}
            {amenity}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-2">House Overview</h2>
          <p className="text-gray-700 mb-3">
            {houseDetails.description || "This beautiful house offers comfortable accommodation with various amenities for a pleasant stay."}
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center">
              <Home className="text-blue-600 mr-2" size={18} />
              <div>
                <p className="text-xs text-gray-500">Rooms</p>
                <p className="font-semibold">{rooms.length}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="text-blue-600 mr-2" size={18} />
              <div>
                <p className="text-xs text-gray-500">Capacity</p>
                <p className="font-semibold">{houseDetails.capacity || "Not specified"}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="text-blue-600 mr-2" size={18} />
              <div>
                <p className="text-xs text-gray-500">Average Price</p>
                <p className="font-semibold">
                  {rooms.length > 0 
                    ? `₹${Math.round(rooms.reduce((sum, room) => sum + room.roomPrice, 0) / rooms.length)}/Day` 
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <h3 className="font-semibold text-base mb-2">Amenities</h3>
          {renderAmenities(houseDetails.amenities)}
        </div>
      </div>
    </div>
  );
};

export default HouseOverview;