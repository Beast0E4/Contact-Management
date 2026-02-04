import React from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchTerm, onSearch, onAdd, count }) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={onSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
        >
          <FaPlus />
          Add Contact
        </button>
      </div>
      <div className="text-sm text-gray-500">
        Showing <b>{count}</b> contact{count !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default SearchBar;