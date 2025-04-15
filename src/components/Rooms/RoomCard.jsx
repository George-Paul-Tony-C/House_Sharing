import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users } from 'lucide-react';

const RoomCard = ({ room, isEditable = false }) => (
  <Link to={isEditable ? `/room/${room.roomId}` : `/rooms/${room.roomId}`} 
    key={room.roomId} 
    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
  >
    <div className="relative h-40">
      {room.imageUrl ? (
        <img 
          src={room.imageUrl} 
          alt={room.roomName} 
          className="w-full h-full object-cover" 
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <Home size={32} className="text-gray-400" />
        </div>
      )}
      <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
        ₹{room.roomPrice}/Day
      </div>
      {!room.available && (
        <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white px-2 py-1 text-xs font-medium text-center">
          Not Available
        </div>
      )}
    </div>
    
    <div className="p-3">
      <h3 className="text-base font-semibold mb-1">{room.roomName}</h3>
      
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{room.roomType}</span>
        <div className="flex items-center">
          <Users size={14} className="mr-1" />
          <span className="text-xs">{room.roomCapacity} {room.roomCapacity === 1 ? 'person' : 'people'}</span>
        </div>
      </div>
      
      <div className="flex gap-2 mt-2">
        <button className={`flex-1 py-1 rounded text-sm font-medium transition-colors ${
          room.available 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
        }`} disabled={!room.available}>
          Book Now
        </button>
        {isEditable && (
          <button className="px-2 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100">
            Edit
          </button>
        )}
      </div>
    </div>
  </Link>
);

export default RoomCard;