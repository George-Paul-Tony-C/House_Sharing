import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import { 
  Home, X, Bed, MapPin, Image, Coffee, 
  CheckCircle, AlertCircle, Loader, Plus, 
  Wifi, Tv, ShowerHead, UtensilsCrossed, Car, Lock
} from 'lucide-react';

const AddHouseForm = ({ closeForm }) => {
  const { logged } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    address: '',
    noOfRooms: '',
    imageUrl: '',
    amenities: '',
    description: '',
    location: ''
  });
  
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState('');
  const [commonAmenities, setCommonAmenities] = useState([
    { name: 'Wifi', selected: false, icon: <Wifi size={16} /> },
    { name: 'TV', selected: false, icon: <Tv size={16} /> },
    { name: 'Party Hall', selected: false, icon: <ShowerHead size={16} /> },
    { name: 'Kitchen', selected: false, icon: <UtensilsCrossed size={16} /> },
    { name: 'Parking', selected: false, icon: <Car size={16} /> },
    { name: 'Security', selected: false, icon: <Lock size={16} /> }
  ]);
  
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
    // Generate image preview when URL changes
    if (name === 'imageUrl' && isValidUrl(value)) {
      setImagePreview(value);
    }
  };

  // Handle amenity selection
  const toggleAmenity = (index) => {
    const updatedAmenities = [...commonAmenities];
    updatedAmenities[index].selected = !updatedAmenities[index].selected;
    setCommonAmenities(updatedAmenities);
    
    // Update formData.amenities with selected amenities
    const selectedAmenities = updatedAmenities
      .filter(amenity => amenity.selected)
      .map(amenity => amenity.name);
      
    setFormData(prev => ({
      ...prev,
      amenities: selectedAmenities.join(', ') + (formData.amenities.includes(',') ? ', ' + formData.amenities.split(',').slice(-1)[0] : '')
    }));
  };

  // Validate image URL
  const isValidUrl = (url) => {
    if (!url) return false;
    const regex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[^\s]*)?$/;
    return regex.test(url);
  };

  // Navigate between form steps
  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.address || !formData.location || !formData.noOfRooms) {
        setError('Please fill all required fields in this step');
        return;
      }
    } else if (currentStep === 2) {
      if (!isValidUrl(formData.imageUrl)) {
        setError('Please enter a valid image URL');
        return;
      }
    }
    
    setError(null);
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setError(null);
    setCurrentStep(currentStep - 1);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    
    if (!logged || !userId) {
      setError('You must be logged in to add a house');
      return;
    }

    if (!isValidUrl(formData.imageUrl)) {
      setError('Please enter a valid image URL');
      return;
    }

    if (formData.address === '' || formData.noOfRooms === '' || formData.amenities === '') {
      setError('Please fill all required fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newHouseData = {
        user: { userId: parseInt(userId) },
        address: formData.address,
        noOfRooms: parseInt(formData.noOfRooms),
        imageUrl: formData.imageUrl,
        amenities: formData.amenities,
        description: formData.description,
        location: formData.location
      };

      const response = await axiosInstance.post(API_PATHS.HOUSE.ADD_HOUSE, newHouseData);

      if (response.status === 200) {
        setSuccessMessage('House added successfully!');
        setTimeout(() => {
          closeForm();
          navigate('/houses');
        }, 1500);
      } else {
        setError('Failed to add house. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while adding the house');
    } finally {
      setIsLoading(false);
    }
  };

  // Progress indicator
  const ProgressIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
        }`}>
          1
        </div>
        <div className={`w-12 h-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
        }`}>
          2
        </div>
        <div className={`w-12 h-1 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
        }`}>
          3
        </div>
      </div>
    </div>
  );

  // Error notification
  const ErrorNotification = ({ message }) => (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md flex items-start">
      <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-sm text-red-700">{message}</p>
      </div>
    </div>
  );

  // Success notification
  const SuccessNotification = ({ message }) => (
    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-md flex items-start">
      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-sm text-green-700">{message}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="relative px-6 pt-6 pb-4 border-b border-gray-200">
        <button 
          type="button" 
          onClick={closeForm} 
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close form"
        >
          <X size={20} />
        </button>
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-lg mr-3">
            <Home className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Add New Property</h2>
        </div>
        <p className="text-sm text-gray-500 mt-1">Fill in the details to add a new house to your portfolio</p>
      </div>

      <div className="p-6">
        <ProgressIndicator />
        
        {error && <ErrorNotification message={error} />}
        {successMessage && <SuccessNotification message={successMessage} />}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Property Details</h3>
              
              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="123 Main Street, City"
                    required
                  />
                </div>
              </div>
              
              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location/Neighborhood <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Downtown, Suburb name, etc."
                    required
                  />
                </div>
              </div>

              {/* Number of Rooms */}
              <div>
                <label htmlFor="noOfRooms" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Rooms <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Bed size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="noOfRooms"
                    name="noOfRooms"
                    min="1"
                    value={formData.noOfRooms}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter number of rooms"
                    required
                  />
                </div>
              </div>
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your property..."
                />
              </div>
            </div>
          )}

          {/* Step 2: Images and Visuals */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Property Images</h3>
              
              {/* Image URL */}
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Property Image URL <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Image size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Paste a URL to an image of your property (JPEG, PNG, or WebP format)
                </p>
              </div>
              
              {/* Image Preview */}
              <div className="mt-4">
                <p className="block text-sm font-medium text-gray-700 mb-2">Image Preview</p>
                <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-100 h-56 flex items-center justify-center">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Property preview" 
                      className="w-full h-full object-cover"
                      onError={() => setImagePreview('')}
                    />
                  ) : (
                    <div className="text-center p-4">
                      <Image size={48} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        {formData.imageUrl ? 'Invalid image URL' : 'Enter a valid URL to see preview'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Amenities */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Property Amenities</h3>
              
              {/* Common Amenities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Available Amenities
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {commonAmenities.map((amenity, index) => (
                    <button
                      key={amenity.name}
                      type="button"
                      onClick={() => toggleAmenity(index)}
                      className={`flex items-center p-3 border ${
                        amenity.selected 
                          ? 'bg-blue-50 border-blue-300' 
                          : 'border-gray-300 hover:bg-gray-50'
                      } rounded-lg transition-colors`}
                    >
                      <div className={`mr-3 ${amenity.selected ? 'text-blue-600' : 'text-gray-500'}`}>
                        {amenity.icon}
                      </div>
                      <span className={amenity.selected ? 'text-blue-700' : 'text-gray-700'}>
                        {amenity.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Custom Amenities */}
              <div>
                <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Amenities <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Coffee size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="amenities"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Garden, Pool, Gym, etc. (comma-separated)"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Add any additional amenities not listed above, separated by commas
                </p>
              </div>
              
              {/* Amenities Preview */}
              {formData.amenities && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Amenities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.amenities.split(',').map((amenity, index) => (
                      amenity.trim() && (
                        <span 
                          key={index} 
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {amenity.trim()}
                        </span>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Back
              </button>
            ) : (
              <div></div> // Empty div to maintain flex layout
            )}
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader size={16} className="animate-spin mr-2" />
                    Adding House...
                  </>
                ) : (
                  <>
                    <Plus size={16} className="mr-2" />
                    Add House
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHouseForm;