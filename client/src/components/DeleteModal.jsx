import React from 'react';
import { FaExclamationTriangle, FaTrashAlt, FaTimes } from 'react-icons/fa';

const DeleteModal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center p-4 z-[60] animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] max-w-sm w-full p-8 text-center shadow-2xl border border-white/20 relative overflow-hidden">
        
        {/* Subtle Background Accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-50 rounded-full opacity-50"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes size={16} />
        </button>

        {/* Warning Icon with Pulse Effect */}
        <div className="relative">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12 group hover:rotate-0 transition-transform duration-300">
            <FaTrashAlt size={32} className="-rotate-12 group-hover:rotate-0 transition-transform duration-300" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-red-500/10 rounded-3xl animate-ping opacity-20"></div>
        </div>

        {/* Text Content */}
        <div className="space-y-3 mb-8">
          <h3 className="text-2xl font-black text-gray-900 tracking-tight">
            Confirm Deletion
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed px-2">
            You're about to remove this contact permanently. This record will be wiped from our servers and <span className="text-red-600 font-bold italic">cannot be recovered.</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={onConfirm} 
            className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-red-200 hover:bg-red-700 active:scale-95 transition-all uppercase tracking-widest"
          >
            Delete Permanently
          </button>
          <button 
            onClick={onClose} 
            className="w-full py-4 bg-white text-gray-400 border border-gray-100 rounded-2xl font-bold text-sm hover:bg-gray-50 hover:text-gray-600 transition-all uppercase tracking-widest"
          >
            Keep Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;