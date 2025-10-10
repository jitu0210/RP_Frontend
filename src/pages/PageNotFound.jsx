import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Text */}
        <h1 className="text-9xl font-bold text-gray-300">404</h1>
        
        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2">Sorry, the page you are looking for doesn't exist.</p>
        
        {/* Home Button */}
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;