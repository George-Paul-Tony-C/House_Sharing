import React from 'react';
import { MapPin } from 'lucide-react';

const LocationTab = ({ location }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
    <MapPin size={32} className="mx-auto text-gray-400 mb-2" />
    <h3 className="text-base font-medium text-gray-900 mb-1">Location</h3>
    <p className="text-gray-600">{location || "Location details unavailable."}</p>
  </div>
);

export default LocationTab;