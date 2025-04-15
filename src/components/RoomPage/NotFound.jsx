import React from 'react';

const NotFound = () => {
  return (
    <div className="text-center p-8">
      <h2 className="text-xl font-semibold text-gray-700">Room not found</h2>
      <p className="mt-2 text-gray-600">The requested room could not be found.</p>
    </div>
  );
};

export default NotFound;