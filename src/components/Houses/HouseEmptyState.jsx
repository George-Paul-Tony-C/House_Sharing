import React from 'react';
import { Home, Plus } from 'lucide-react';

const HouseEmptyState = ({ isUserHouse = false, onAddHouse }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-xl border border-gray-200">
      <div className="bg-blue-100 p-4 rounded-full mb-4">
        <Home size={48} className="text-blue-600" />
      </div>
      
      {isUserHouse ? (
        <>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Houses Yet</h3>
          <p className="text-gray-600 text-center max-w-md mb-6">
            You haven't added any houses to your portfolio yet. Add your first property to get started.
          </p>
          <button 
            onClick={onAddHouse}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Add Your First House
          </button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Houses Available</h3>
          <p className="text-gray-600 text-center max-w-md mb-6">
            Currently, there are no properties listed. Please check back later.
          </p>
        </>
      )}
    </div>
  );
};

export default HouseEmptyState;