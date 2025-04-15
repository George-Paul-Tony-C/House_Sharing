import React, { useState } from 'react';
import { X } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const AddRoomModal = ({ isOpen, onClose, houseId, onRoomAdded }) => {
  const [formData, setFormData] = useState({
    roomName: '',
    roomCapacity: 1,
    roomType: '', // No predefined values, user can input any room type
    roomPrice: '',
    available: true,
    imageUrl: 'https://images.pexels.com/photos/90317/pexels-photo-90317.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const roomData = {
      house: { houseId: parseInt(houseId) },
      roomName: formData.roomName,
      roomCapacity: parseInt(formData.roomCapacity),
      roomType: formData.roomType,  // The user will provide this
      roomPrice: parseInt(formData.roomPrice),
      available: formData.available,
      imageUrl: formData.imageUrl
    };

    try {
      const response = await axiosInstance.post(API_PATHS.ROOM.ADD_ROOM, roomData);
      if (response.data) {
        onRoomAdded(response.data);
        setFormData({
          roomName: '',
          roomCapacity: 1,
          roomType: '', // Clear roomType
          roomPrice: '',
          available: true,
          imageUrl: 'https://images.pexels.com/photos/90317/pexels-photo-90317.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        });
        onClose();
      }
    } catch (err) {
      setError('Failed to add room. Please try again.',err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-300/50 bg-opacity-40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-semibold">Add New Room</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {error && (
            <div className="bg-red-50 text-red-700 border-l-4 border-red-500 p-2 text-sm rounded">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Room Name*</label>
              <input
                type="text"
                name="roomName"
                value={formData.roomName}
                onChange={handleChange}
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. B425"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Capacity*</label>
              <input
                type="number"
                name="roomCapacity"
                value={formData.roomCapacity}
                onChange={handleChange}
                min="1"
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Room Type*</label>
            <input
              type="text"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              required
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. AC, Non-AC, Deluxe, Premium"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Price (₹)*</label>
              <input
                type="number"
                name="roomPrice"
                value={formData.roomPrice}
                onChange={handleChange}
                required
                min="0"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 20000"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="https://images.pexels.com/photos/90317/pexels-photo-90317.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty for default image</p>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-600">Available for booking</label>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-md text-sm font-medium text-white ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
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
