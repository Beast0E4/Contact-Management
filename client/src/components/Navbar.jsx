import React from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <FaUserCircle className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Contact Manager</h1>
              <p className="text-sm text-gray-600">Welcome, {user?.name || 'User'}</p>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            <FaSignOutAlt className="text-gray-500" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;