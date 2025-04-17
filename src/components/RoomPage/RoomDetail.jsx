import React from 'react';
import { Home, Star, Users, Calendar, Wifi, Coffee, Tv, DollarSign, MapPin } from 'lucide-react';

const RoomDetail = ({ room, averageRating, reviewsCount ,handleBookNow }) => {
  // Sample amenities - in a real app, these would come from the room data
  const amenities = [
    { name: 'Free WiFi', icon: <Wifi size={18} /> },
    { name: 'TV', icon: <Tv size={18} /> },
    { name: 'Breakfast', icon: <Coffee size={18} /> }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 p-6 rounded-xl">
      {/* Room Details Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{room.roomName}</h1>
          <div className="flex items-center mt-2 text-gray-600">
            <MapPin size={16} className="mr-2" />
            <span>{room.house.address}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          {reviewsCount > 0 && (
            <div className="flex items-center bg-blue-100 px-4 py-2 rounded-lg">
              <Star size={18} className="text-yellow-500 mr-2" fill="#f59e0b" />
              <span className="font-semibold text-lg">{averageRating}</span>
              <span className="text-gray-600 ml-1">({reviewsCount} reviews)</span>
            </div>
          )}
          <div className="mt-2 text-green-600 font-bold text-xl">
            ₹{room.roomPrice}<span className="text-sm font-normal">/day</span>
          </div>
        </div>
      </div>

      {/* Room Image Gallery */}
      <div className="w-full h-96 overflow-hidden rounded-xl mb-8 shadow-md">
        <img
          src={room.imageUrl}
          alt={room.roomName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
          <div className="bg-blue-50 p-2 rounded-full mb-2">
            <Home size={20} className="text-blue-500" />
          </div>
          <span className="text-sm text-gray-500">Room Type</span>
          <span className="font-medium">{room.roomType}</span>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
          <div className="bg-green-50 p-2 rounded-full mb-2">
            <DollarSign size={20} className="text-green-500" />
          </div>
          <span className="text-sm text-gray-500">Price</span>
          <span className="font-medium">₹{room.roomPrice}/day</span>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
          <div className="bg-purple-50 p-2 rounded-full mb-2">
            <Users size={20} className="text-purple-500" />
          </div>
          <span className="text-sm text-gray-500">Capacity</span>
          <span className="font-medium">{room.roomCapacity} people</span>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
          <div className="bg-orange-50 p-2 rounded-full mb-2">
            <Calendar size={20} className="text-orange-500" />
          </div>
          <span className="text-sm text-gray-500">Status</span>
          <span className={`font-medium ${room.available ? 'text-green-500' : 'text-red-500'}`}>
            {room.available ? 'Available' : 'Not Available'}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Room Description */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-xl text-gray-800 mb-4 border-b pb-2">Description</h3>
          <p className="text-gray-600 leading-relaxed">{room.house.description}</p>
          
          {/* Book Now Button - Only show if available */}
          {room.available && (
            <button onClick={handleBookNow} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
              Book This Room
            </button>
          )}
        </div>

        {/* Amenities Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-xl text-gray-800 mb-4 border-b pb-2">Amenities</h3>
          <ul className="space-y-4">
            {amenities.map((amenity, index) => (
              <li key={index} className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-full mr-3">
                  {amenity.icon}
                </div>
                <span>{amenity.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Location Map Placeholder */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="font-semibold text-xl text-gray-800 mb-4 border-b pb-2">Location</h3>
        <div className="bg-gray-200 h-64 w-full rounded-lg flex items-center justify-center">
          <MapPin size={32} className="text-gray-400 mr-2" />
          <span className="text-gray-500">Map view would appear here</span>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;