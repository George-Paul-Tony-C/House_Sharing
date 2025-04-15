import React from 'react';
import { Home } from 'lucide-react';

const HouseImage = ({ imageUrl, address }) => (
  <div className="w-full h-64 overflow-hidden rounded-lg mb-6">
    {imageUrl ? (
      <img 
        src={imageUrl} 
        alt={address} 
        className="w-full h-full object-cover" 
      />
    ) : (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <Home size={48} className="text-gray-400" />
      </div>
    )}
  </div>
);

export default HouseImage;