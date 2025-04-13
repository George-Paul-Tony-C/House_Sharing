import React, { useState } from 'react';
import { X } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const AddRoomModal = ({ isOpen, onClose, houseId, onRoomAdded }) => {
  const [formData, setFormData] = useState({
    roomName: '',
    roomCapacity: 1,
    roomType: 'AC',
    roomPrice: '',
    available: true,
    imageUrl: 'https://i.imghippo.com/files/kYbU6801Q.png'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const roomData = {
        house: { houseId: parseInt(houseId) },
        roomName: formData.roomName,
        available: formData.available,
        roomCapacity: parseInt(formData.roomCapacity),
        roomType: formData.roomType,
        roomPrice: parseFloat(formData.roomPrice),
        imageUrl: formData.imageUrl
      };
      
      const response = await axiosInstance.post(API_PATHS.ROOM.ADD_ROOM, roomData);
      
      if (response.data) {
        onRoomAdded(response.data);
        setFormData({
          roomName: '',
          roomCapacity: 1,
          roomType: 'AC',
          roomPrice: '',
          available: true,
          imageUrl: 'https://i.imghippo.com/files/kYbU6801Q.png'
        });
        onClose();
      }
    } catch (err) {
      console.error('Error adding room:', err);
      setError('Failed to add room. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold text-gray-800">Add New Room</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-2 rounded text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="roomName" className="block text-sm font-medium text-gray-700 mb-1">
                  Room Name*
                </label>
                <input
                  type="text"
                  id="roomName"
                  name="roomName"
                  value={formData.roomName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. B425"
                />
              </div>
              
              <div>
                <label htmlFor="roomCapacity" className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity*
                </label>
                <input
                  type="number"
                  id="roomCapacity"
                  name="roomCapacity"
                  value={formData.roomCapacity}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">
                  Room Type*
                </label>
                <select
                  id="roomType"
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="roomPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹)*
                </label>
                <input
                  type="number"
                  id="roomPrice"
                  name="roomPrice"
                  value={formData.roomPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. 20000"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">Leave as default or provide a custom image URL</p>
            </div>
            
            <div className="flex items-center bg-gray-50 p-2 rounded-md">
              <input
                type="checkbox"
                id="available"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="available" className="ml-2 block text-sm text-gray-700">
                Available for booking
              </label>
            </div>
          </div>
          
          <div className="mt-5 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-3 py-2 rounded-md text-sm font-medium text-white ${
                isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Adding...' : 'Add Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomModal;