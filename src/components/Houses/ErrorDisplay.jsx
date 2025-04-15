import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorDisplay = ({ message }) => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
    <div className="flex">
      <div className="flex-shrink-0">
        <AlertCircle className="h-5 w-5 text-red-400" />
      </div>
      <div className="ml-3">
        <p className="text-sm text-red-700">{message}</p>
      </div>
    </div>
  </div>
);

export default ErrorDisplay;