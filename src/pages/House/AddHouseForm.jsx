import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import { FaX } from 'react-icons/fa6';
import { FaBed, FaConciergeBell, FaHome, FaImage } from 'react-icons/fa';

const AddHouseForm = ({ closeForm }) => {
  const { logged } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    address: '',
    noOfRooms: '',
    imageUrl: '',
    amenities: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate image URL
  const isValidUrl = (url) => {
    const regex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[^\s]*)?$/;
    return regex.test(url);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId'); // Get userId from localStorage
    console.log(userId);

    if (!logged || !userId) {
      setError('You must be logged in to add a house.');
      return;
    }

    if (!isValidUrl(formData.imageUrl)) {
      setError('Please enter a valid image URL.');
      return;
    }

    if (formData.address === '' || formData.noOfRooms === '' || formData.amenities === '') {
      setError('Please fill all the fields.');
      return;
    }

    setIsLoading(true); // Show loading spinner while processing the request
    setError(null);

    try {
      const newHouseData = {
        user: { userId: parseInt(userId) }, // Pass userId inside the user object
        address: formData.address,
        noOfRooms: formData.noOfRooms,
        imageUrl: formData.imageUrl,
        amenities: formData.amenities,
      };

      const response = await axiosInstance.post(API_PATHS.HOUSE.ADD_HOUSE, newHouseData);

      if (response.status === 200) {
        setSuccessMessage('House added successfully!');
        setError(null);
        closeForm(); // Close the modal
        navigate('/houses'); // Redirect to the list of houses (or another appropriate page)
      } else {
        setError('Failed to add house. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while adding the house.');
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="relative p-6 bg-white rounded-lg shadow-2xl w-full max-w-lg mx-auto transform transition-all ease-in-out">
      {/* Close button */}
      <button 
        type="button" 
        onClick={closeForm} 
        className="absolute top-2 right-2 text-red-600 text-xl hover:text-red-800 transition-colors"
      >
        <FaX />
      </button>
      
      {/* Form Header */}
      <h1 className="text-3xl font-bold text-blue-800 mb-4 text-center animate__animated animate__fadeIn">Add New House</h1>

      {error && <div className="text-red-500 mb-4 flex items-center"><FaHome className="mr-2" />{error}</div>}
      {successMessage && <div className="text-green-500 mb-4 flex items-center"><FaHome className="mr-2" />{successMessage}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Address */}
        <div className="relative">
          <label htmlFor="address" className="block text-sm font-medium mb-2">Address</label>
          <div className="flex items-center space-x-3">
            <FaHome className="text-gray-400" />
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-3 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              placeholder="Enter the address"
              required
            />
          </div>
        </div>

        {/* Number of Rooms */}
        <div className="relative">
          <label htmlFor="noOfRooms" className="block text-sm font-medium mb-2">Number of Rooms</label>
          <div className="flex items-center space-x-3">
            <FaBed className="text-gray-400" />
            <input
              type="number"
              id="noOfRooms"
              name="noOfRooms"
              value={formData.noOfRooms}
              onChange={handleInputChange}
              className="w-full p-3 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              placeholder="Enter number of rooms"
              required
            />
          </div>
        </div>

        {/* Image URL */}
        <div className="relative">
          <label htmlFor="imageUrl" className="block text-sm font-medium mb-2">Image URL</label>
          <div className="flex items-center space-x-3">
            <FaImage className="text-gray-400" />
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="w-full p-3 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              placeholder="Paste image URL"
              required
            />
          </div>
        </div>

        {/* Amenities */}
        <div className="relative">
          <label htmlFor="amenities" className="block text-sm font-medium mb-2">Amenities</label>
          <div className="flex items-center space-x-3">
            <FaConciergeBell className="text-gray-400" />
            <input
              type="text"
              id="amenities"
              name="amenities"
              value={formData.amenities}
              onChange={handleInputChange}
              className="w-full p-3 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              placeholder="Enter amenities (comma-separated)"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-blue-600 text-white p-3 rounded-xl mt-4 w-full text-lg transition-all transform ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Adding House...' : 'Add House'}
        </button>
      </form>
    </div>
  );
};

export default AddHouseForm;
