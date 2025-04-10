import React from 'react';

const Hero = ({ roomSummary }) => {
  return (
    <div className="mb-4">
      <div className="grid lg:grid-cols-3 gap-2 md:grid-cols-2 grid-cols-1">
        <div className="bg-blue-700 px-6 rounded-lg shadow-md flex justify-between items-center h-16">
          <h3 className="font-semibold text-white text-xl">Total Houses</h3>
          <p className="text-2xl font-bold text-blue-50">{roomSummary.totalHouses}</p>
        </div>

        <div className="bg-white px-6 rounded-lg shadow-md flex justify-between items-center h-16">
          <h3 className="font-semibold text-blue-800 text-xl">Total Rooms</h3>
          <p className="text-2xl font-bold text-blue-900">{roomSummary.totalRooms}</p>
        </div>

        <div className="bg-blue-700 px-6 rounded-lg shadow-md flex justify-between items-center h-16">
          <h3 className="font-semibold text-white text-xl">House Types</h3>
          <ul className="text-sm text-blue-100 flex gap-2">
            <li>Independent: {roomSummary.houseTypes.Independent}</li>
            <li>Apartment: {roomSummary.houseTypes.Apartment}</li>
            <li>Other: {roomSummary.houseTypes.Other}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hero;
