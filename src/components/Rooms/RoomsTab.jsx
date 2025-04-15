// src/components/Rooms/RoomsTab.jsx
import React from 'react';
import LoadingState from './LoadingState';
import RoomsGrid from './RoomsGrid';
import EmptyRoomsState from './EmptyRoomsState';
import NoMatchingRooms from './NoMatchingRooms';
import RoomSearchFilter from './RoomSearchFilter';

const RoomsTab = ({ 
  rooms,
  filteredRooms,
  roomsLoading,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  sortOption,
  setSortOption,
  uniqueRoomTypes,
  isEditable = false,
  onAddRoom = () => {},
}) => {
  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setSortOption('default');
  };

  return (
    <>
      <RoomSearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        sortOption={sortOption}
        setSortOption={setSortOption}
        uniqueRoomTypes={uniqueRoomTypes}
        showAddButton={isEditable}
        onAddClick={onAddRoom}
      />

      {roomsLoading ? (
        <LoadingState message="Loading rooms..." />
      ) : filteredRooms.length > 0 ? (
        <RoomsGrid 
          rooms={filteredRooms} 
          isEditable={isEditable}
        />
      ) : rooms.length > 0 ? (
        <NoMatchingRooms onClearFilters={clearFilters} />
      ) : (
        <EmptyRoomsState canAdd={isEditable} onAddClick={onAddRoom} />
      )}
    </>
  );
};

export default RoomsTab;