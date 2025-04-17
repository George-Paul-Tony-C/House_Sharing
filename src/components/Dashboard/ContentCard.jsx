import React from 'react';

const ContentCard = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {children}
    </div>
  );
};

export default ContentCard;