import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, MapPin, Wifi, Tv, Car, Shield, Star, Heart } from 'lucide-react';

const RoomCard = ({ room, isEditable = false }) => {
  // Extract amenities from the house object
  const amenities = room.house?.amenities?.split(',').map(item => item.trim()).filter(Boolean) || [];
  
  // Map amenity names to appropriate icons
  const getAmenityIcon = (amenity) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes('wifi')) return <Wifi size={14} />;
    if (lowerAmenity.includes('tv')) return <Tv size={14} />;
    if (lowerAmenity.includes('parking')) return <Car size={14} />;
    if (lowerAmenity.includes('security')) return <Shield size={14} />;
    return <Star size={14} />;
  };

  // Format price with commas for thousands
  const formattedPrice = room.roomPrice.toLocaleString('en-IN');

  // Get room type style
  const getRoomTypeStyle = (type) => {
    const typeLC = type?.toLowerCase();
    if (typeLC === 'ac') return 'bg-blue-100 text-blue-800';
    if (typeLC === 'deluxe') return 'bg-purple-100 text-purple-800';
    if (typeLC === 'premium') return 'bg-amber-100 text-amber-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <Link 
      to={isEditable ? `/room/${room.roomId}` : `/rooms/${room.roomId}`} 
      key={room.roomId} 
      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-48">
        {room.imageUrl ? (
          <img 
            src={room.imageUrl} 
            alt={room.roomName} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Home size={32} className="text-gray-400" />
          </div>
        )}
        
        {/* Price tag */}
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
          ₹{formattedPrice}/Day
        </div>
        
        {/* Availability badge */}
        {!room.available && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-red-600 text-white px-4 py-2 rounded-md font-bold text-lg transform rotate-12 shadow-lg">
              Not Available
            </div>
          </div>
        )}
        
        {/* Favorite button */}
        <button className="absolute top-2 left-2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all duration-300">
          <Heart size={18} className="text-gray-500 hover:text-red-500 transition-colors duration-300" />
        </button>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-800 mb-1 hover:text-blue-600 transition-colors duration-300">{room.roomName}</h3>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRoomTypeStyle(room.roomType)}`}>
            {room.roomType}
          </span>
        </div>
        
        {/* Location info */}
        {room.house?.location && (
          <div className="flex items-center text-gray-600 mb-2 text-sm">
            <MapPin size={14} className="mr-1 text-gray-500" />
            <span>{room.house.location}</span>
          </div>
        )}
        
        {/* Capacity */}
        <div className="flex items-center text-gray-600 mb-3">
          <Users size={14} className="mr-1 text-gray-500" />
          <span className="text-sm">{room.roomCapacity} {room.roomCapacity === 1 ? 'person' : 'people'}</span>
        </div>
        
        {/* Description if available */}
        {room.house?.description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{room.house.description}</p>
        )}
        
        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {amenities.slice(0, 3).map((amenity, index) => (
              <div key={index} className="flex items-center bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {getAmenityIcon(amenity)}
                <span className="ml-1">{amenity}</span>
              </div>
            ))}
            {amenities.length > 3 && (
              <div className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                +{amenities.length - 3} more
              </div>
            )}
          </div>
        )}
        
        {/* Extra space to push buttons to bottom */}
        <div className="flex-grow"></div>
        
        {/* Action buttons */}
        <div className="flex gap-2 mt-3">
          <button 
            className={`flex-1 py-2 rounded text-sm font-medium transition-all duration-300 ${
              room.available 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow' 
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`} 
            disabled={!room.available}
          >
            Book Now
          </button>
          {isEditable && (
            <button className="px-3 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-300">
              Edit
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;