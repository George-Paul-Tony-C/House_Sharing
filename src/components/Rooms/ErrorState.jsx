import React from 'react';

const ErrorState = ({ title = "Not found", message = "The requested resource could not be found." }) => (
  <div className="text-center p-8">
    <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
    <p className="mt-2 text-gray-600">{message}</p>
  </div>
);

export default ErrorState;