import React from 'react';
import { Trash2 } from 'lucide-react';

const DeleteConfirmationModal = ({ isOpen, house, onCancel, onDelete }) => {
  if (!isOpen || !house) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Property</h3>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to delete the property at <span className="font-medium">{house.address}</span>? 
            This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={() => onDelete(house.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;