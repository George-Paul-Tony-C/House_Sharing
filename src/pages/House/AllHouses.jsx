import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import HouseEmptyState from '../../components/Houses/HouseEmptyState';
import HouseListItem from '../../components/Houses/HouseListItem';
import HouseCard from '../../components/Houses/HouseCard';
import ErrorDisplay from '../../components/Houses/ErrorDisplay';
import HouseFilters from '../../components/Houses/HouseFilters';


const AllHouses = () => {
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const fetchHouses = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.HOUSE.GET_ALL_HOUSES);
      const houses = response.data;
      
      if (houses && houses.length > 0) {
        setHouses(houses);
        setFilteredHouses(houses);
        setError(null);
      } else {
        setHouses([]);
        setFilteredHouses([]);
        setError('No houses found');
      }
    } catch (error) {
      console.error(error);
      setError('Error fetching house data');
      setHouses([]);
      setFilteredHouses([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredHouses(houses);
    } else {
      const filtered = houses.filter(house => 
        house.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        house.amenities?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredHouses(filtered);
    }
  }, [searchTerm, houses]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Properties</h1>
          <p className="text-gray-600 mt-1">Browse all available properties</p>
        </div>
      </div>

      {/* Filters */}
      <HouseFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        viewMode={viewMode}
        setViewMode={setViewMode}
        filteredCount={filteredHouses.length}
        totalCount={houses.length}
      />

      {/* Error message */}
      {error && !isLoading && houses.length === 0 && (
        <ErrorDisplay message={error} />
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader className="h-10 w-10 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading all properties...</p>
        </div>
      ) : filteredHouses.length > 0 ? (
        <>
          {/* Houses grid/list */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHouses.map((house) => (
                <HouseCard key={house.houseId} house={house} isUserHouse={false} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHouses.map((house) => (
                <HouseListItem key={house.houseId} house={house} isUserHouse={false} />
              ))}
            </div>
          )}
        </>
      ) : (
        <HouseEmptyState isUserHouse={false} />
      )}
    </div>
  );
};

export default AllHouses;