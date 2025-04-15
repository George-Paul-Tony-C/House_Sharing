import React from 'react';
import RoomCard from './RoomCard';

const RoomsGrid = ({ rooms, isEditable = false}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {rooms.map((room) => (
      <RoomCard 
        key={room.roomId} 
        room={room} 
        isEditable={isEditable}
      />
    ))}
  </div>
);

export default RoomsGrid;