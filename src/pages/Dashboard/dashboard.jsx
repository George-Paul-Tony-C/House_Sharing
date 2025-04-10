import React, { useState } from 'react';
import DashboardLayout from '../../Layouts/dashboardLayout';
import Hero from './Hero';
import FilterableRooms from './FilterableRooms';

const Dashboard = () => {
  const [roomSummary, setRoomSummary] = useState({
    totalRooms: 0,
    totalHouses: 0,
    houseTypes: { Independent: 0, Apartment: 0, Other: 0 },
  });

  // Calculates the room summary from the fetched rooms data
  const updateRoomSummary = (rooms) => {
    const uniqueHouses = new Map();
    rooms.forEach((room) => {
      const house = room.house;
      if (!uniqueHouses.has(house.house_id)) {
        uniqueHouses.set(house.house_id, house);
      }
    });
    const houseTypes = { Independent: 0, Apartment: 0, Other: 0 };
    uniqueHouses.forEach((house) => {
      if (houseTypes.hasOwnProperty(house.house_type)) {
        houseTypes[house.house_type]++;
      } else {
        houseTypes.Other++;
      }
    });

    setRoomSummary({
      totalRooms: rooms.length,
      totalHouses: uniqueHouses.size,
      houseTypes,
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <Hero roomSummary={roomSummary} />
        <FilterableRooms updateRoomSummary={updateRoomSummary} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
