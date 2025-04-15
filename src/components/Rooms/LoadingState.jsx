import React from 'react';
import { Loader } from 'lucide-react';

export const LoadingState = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center h-40">
    <Loader className="animate-spin h-8 w-8 text-blue-600 mb-4" />
    <p className="text-gray-600">{message}</p>
  </div>
);

export default LoadingState;