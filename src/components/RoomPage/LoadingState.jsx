import React from 'react';
import { Loader } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <Loader className="animate-spin h-8 w-8 text-blue-600 mb-4" />
      <p className="text-gray-600">Loading room details...</p>
    </div>
  );
};

export default LoadingState;