import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { AuthContext } from '../../context/AuthContext';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../Layouts/dashboardLayout';
import AddHouseForm from './AddHouseForm'; // Importing AddHouseForm component

const HouseList = () => {
  const { logged } = useContext(AuthContext);
  const [houses, setHouses] = useState([]);
  const [error, setError] = useState(null);
  const [isAddHouseFormOpen, setIsAddHouseFormOpen] = useState(false);

  useEffect(() => {
    const fetchHouses = async () => {
      if (!logged) {
        return;
      }

      const userId = localStorage.getItem('userId');

      try {
        const response = await axiosInstance.get(`${API_PATHS.USER.GET_USER_HOUSES.replace(':userId', userId)}`);
        const { message, houses } = response.data;
        
        if (houses && houses.length > 0) {
          setHouses(houses);
        } else {
          setError('No houses found');
        }
      } catch (error) {
        console.error(error);
        setError('Error fetching house data');
      }
    };

    fetchHouses();
  }, [logged,isAddHouseFormOpen]);

  const openAddHouseForm = () => {
    setIsAddHouseFormOpen(true);
  };

  const closeAddHouseForm = () => {
    setIsAddHouseFormOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <div className='flex justify-between items-center'>
          <h1 className="text-2xl font-bold text-blue-800">Your Houses</h1>
          <button 
            onClick={openAddHouseForm} 
            className="mt-4 bg-blue-600 text-white p-2 rounded-md active:scale-95"
          >
            Add New House
          </button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {houses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {houses.map((house) => (
              <div key={house.houseId} className="border-2 border-gray-200/40 p-2 rounded-lg shadow-lg">
                <img
                  src={house.imageUrl}
                  alt={house.address}
                  className="w-full h-56 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold text-blue-600">{house.address}</h2>
                <p className="text-sm text-gray-600 mt-1">Amenities: {house.amenities}</p>
                <p className="text-sm text-gray-600">Rooms: {house.noOfRooms}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-4">No houses found</p>
        )}
      </div>

      {/* Modal for AddHouseForm */}
      {isAddHouseFormOpen && (
        <div className="fixed inset-0 bg-slate-800/50 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <AddHouseForm closeForm={closeAddHouseForm} />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default HouseList;
