import React from 'react';

// Simple CSS-based loader
const Loader = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-4 text-gray-700">Loading...</span>
    </div>
  );
};

export default Loader;