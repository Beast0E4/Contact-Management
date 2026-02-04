import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const DeleteModal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-sm w-full p-6 text-center shadow-xl animate-in zoom-in duration-150">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaExclamationTriangle size={30} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Are you sure?</h3>
        <p className="text-gray-500 mb-6 text-sm">
          This action will permanently remove the contact. You cannot undo this later.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;