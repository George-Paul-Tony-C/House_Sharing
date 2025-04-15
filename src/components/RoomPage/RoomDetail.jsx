import React from 'react';
import { Home, Star } from 'lucide-react';

const RoomDetail = ({ room, averageRating, reviewsCount }) => {
  return (
    <>
      <div className="mb-6">
        {/* Room Details Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{room.roomName}</h1>
            <div className="flex items-center mt-2 text-gray-600">
              <Home size={16} className="mr-1" />
              <span>{room.house.address}</span>
            </div>
          </div>
          {reviewsCount > 0 && (
            <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
              <Star size={16} className="text-yellow-500 mr-1" fill="#f59e0b" />
              <span className="font-semibold">{averageRating}</span>
              <span className="text-gray-500 text-sm ml-1">({reviewsCount} reviews)</span>
            </div>
          )}
        </div>
      </div>

      {/* Room Image */}
      <div className="w-full h-64 overflow-hidden rounded-lg mb-6">
        <img
          src={room.imageUrl}
          alt={room.roomName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Room Details */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold text-lg text-gray-800">Room Type:</p>
            <p className="text-gray-600">{room.roomType}</p>
          </div>
          <div>
            <p className="font-semibold text-lg text-gray-800">Price:</p>
            <p className="text-green-600 font-semibold">₹{room.roomPrice}/day</p>
          </div>
          <div>
            <p className="font-semibold text-lg text-gray-800">Capacity:</p>
            <p className="text-gray-600">{room.roomCapacity} people</p>
          </div>
          <div>
            <p className="font-semibold text-lg text-gray-800">Availability:</p>
            <p className={`font-medium ${room.available ? 'text-green-500' : 'text-red-500'}`}>
              {room.available ? 'Available' : 'Not Available'}
            </p>
          </div>
        </div>
      </div>

      {/* Room Description */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="font-semibold text-lg text-gray-800 mb-3">Room Description:</h3>
        <p className="text-gray-600 leading-relaxed">{room.house.description}</p>
      </div>
    </>
  );
};

export default RoomDetail;