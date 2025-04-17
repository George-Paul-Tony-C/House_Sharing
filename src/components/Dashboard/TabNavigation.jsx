import React from 'react';

const TabNavigation = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`py-3 px-6 font-medium text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-700 text-blue-700 bg-blue-50'
                : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;