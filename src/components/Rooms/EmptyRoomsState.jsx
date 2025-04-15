import React from 'react';
import { Home, PlusCircle } from 'lucide-react';

const EmptyRoomsState = ({ canAdd = false, onAddClick = () => {} }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
    <Home size={48} className="mx-auto text-gray-400 mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">No Rooms Available</h3>
    <p className="text-gray-600 mb-4">There are currently no rooms available for this house.</p>
    {canAdd && (
      <button 
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 mx-auto"
        onClick={onAddClick}
      >
        <PlusCircle size={16} />
        Add Room
      </button>
    )}
  </div>
);

export default EmptyRoomsState;