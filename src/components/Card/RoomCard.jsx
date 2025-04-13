import React from 'react';

const RoomCard = ({ house, room }) => {
  return (
    <div className="group relative w-full h-80 overflow-hidden rounded-lg shadow-md transform transition duration-500 ease-in-out hover:scale-105">
      {room.images ? (
        <img
          src={room.images}
          alt={`Room in ${house.address}`}
          className="w-full h-full object-cover transition duration-500 ease-in-out group-hover:opacity-50"
        />
      ) : (
        <div className="w-full h-full bg-gray-200"></div>
      )}

      {/* Room size badge (bottom right corner) */}
      <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
        {room.room_size} Bed{room.room_size > 1 ? 's' : ''}
      </div>

      {/* Details overlay, hidden by default */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-4 
                      opacity-0 transform translate-y-full transition duration-500 ease-in-out 
                      group-hover:opacity-100 group-hover:translate-y-0">
        <h3 className="text-lg font-semibold">{room.room_type}</h3>
        <p className="text-sm">Price: ${room.room_price}</p>
        <p className="text-sm">
          Available: {room.available ? 'Yes' : 'No'}
        </p>
        {room.rating && <p className="text-sm">Rating: {room.rating} / 5</p>}
        <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">
          View Details
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
