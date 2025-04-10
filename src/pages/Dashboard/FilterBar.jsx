import React, { useState } from 'react';

const FilterBar = ({ onFilter }) => {
  const [search, setSearch] = useState('');
  const [roomType, setRoomType] = useState('');
  const [rating, setRating] = useState('');
  const [priceSort, setPriceSort] = useState('');

  const handleApplyFilters = () => {
    onFilter({
      search,
      roomType,
      rating,
      priceSort,
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-between p-4 bg-white shadow-sm rounded-md mb-4 gap-2">
      {/* Left Section: Search and Room Type */}
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="text"
          placeholder="Search by room..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-48"
        />
        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="">All Room Types</option>
          <option value="AC">AC</option>
          <option value="Non-AC">Non-AC</option>
          <option value="Furnished">Furnished</option>
          <option value="Non-Furnished">Non-Furnished</option>
        </select>
      </div>

      {/* Middle Section: Rating Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars & above</option>
          <option value="3">3 Stars & above</option>
          <option value="2">2 Stars & above</option>
          <option value="1">1 Star & above</option>
        </select>
      </div>

      {/* Right Section: Price Sorting and Apply Button */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price Ascending</option>
          <option value="desc">Price Descending</option>
        </select>
        <button
          onClick={handleApplyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
