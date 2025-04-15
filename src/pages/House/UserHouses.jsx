import React, { useEffect, useState, useContext } from 'react';
import { Loader, Plus } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../Layouts/dashboardLayout';
import HouseFilters from '../../components/Houses/HouseFilters';
import ErrorDisplay from '../../components/Houses/ErrorDisplay';
import HouseCard from '../../components/Houses/HouseCard';
import HouseListItem from '../../components/Houses/HouseListItem';
import HouseEmptyState from '../../components/Houses/HouseEmptyState';
import AddHouseModal from '../../components/Houses/AddHouseModal';
import AddHouseForm from '../../components/Houses/AddHouseForm';
import DeleteConfirmationModal from '../../components/Houses/DeleteConfirmationModal';


const UserHouses = () => {
  const { logged } = useContext(AuthContext);
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [error, setError] = useState(null);
  const [isAddHouseFormOpen, setIsAddHouseFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const fetchHouses = async () => {
    if (!logged) {
      return;
    }

    setIsLoading(true);
    const userId = localStorage.getItem('userId');

    try {
      const response = await axiosInstance.get(`${API_PATHS.USER.GET_USER_HOUSES.replace(':userId', userId)}`);
      const { houses } = response.data;
      
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
  }, [logged, isAddHouseFormOpen]);

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

  const openAddHouseForm = () => {
    setIsAddHouseFormOpen(true);
  };

  const closeAddHouseForm = () => {
    setIsAddHouseFormOpen(false);
  };

  const confirmDeleteHouse = (houseId, address) => {
    setDeleteConfirmation({ id: houseId, address });
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  const handleDeleteHouse = async (houseId) => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(API_PATHS.HOUSE.DELETE_HOUSE(houseId));
      setDeleteConfirmation(null);
      fetchHouses();
    } catch (error) {
      if (error.response) {
        setError(`Failed to delete: ${error.response.data.message || 'Unknown error'}`);
      } else {
        setError(`Failed to delete: ${error.message}`);
      }
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Properties</h1>
            <p className="text-gray-600 mt-1">
              Manage your houses and rental properties
            </p>
          </div>
          
          <button 
            onClick={openAddHouseForm} 
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Add New House
          </button>
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
            <p className="text-gray-600">Loading your properties...</p>
          </div>
        ) : filteredHouses.length > 0 ? (
          <>
            {/* Houses grid/list */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHouses.map((house) => (
                  <HouseCard
                    key={house.houseId} 
                    house={house} 
                    isUserHouse={true}
                    onDeleteClick={confirmDeleteHouse}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredHouses.map((house) => (
                  <HouseListItem 
                    key={house.houseId} 
                    house={house} 
                    isUserHouse={true}
                    onDeleteClick={confirmDeleteHouse}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <HouseEmptyState 
            isUserHouse={true} 
            onAddHouse={openAddHouseForm}
          />
        )}
      </div>

      {/* Add House Modal */}
      <AddHouseModal isOpen={isAddHouseFormOpen} onClose={closeAddHouseForm}>
        <AddHouseForm closeForm={closeAddHouseForm} />
      </AddHouseModal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={!!deleteConfirmation}
        house={{ id: deleteConfirmation?.id, address: deleteConfirmation?.address }}
        onCancel={cancelDelete}
        onDelete={handleDeleteHouse}
      />
    </DashboardLayout>
  )
};

export default UserHouses;