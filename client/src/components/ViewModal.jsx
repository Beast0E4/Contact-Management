import React from 'react';
import { FaTimes, FaEnvelope, FaPhone, FaTag, FaStickyNote } from 'react-icons/fa';

const ViewModal = ({ contact, onClose }) => {
  if (!contact) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
        <div className="bg-blue-600 p-6 text-white relative">
          <button onClick={onClose} className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors">
            <FaTimes size={20} />
          </button>
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold backdrop-blur-md mb-3">
            {contact.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold">{contact.name}</h2>
        </div>

        <div className="p-6 space-y-6">
          <DetailRow icon={<FaEnvelope />} label="Email" value={contact.email} />
          <DetailRow icon={<FaPhone />} label="Phone" value={contact.phone} />
          
          {contact.tags?.length > 0 && (
            <div className="flex gap-3">
              <FaTag className="text-blue-500 mt-1" />
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Tags</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {contact.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md border border-blue-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {contact.notes && <DetailRow icon={<FaStickyNote />} label="Notes" value={contact.notes} />}
        </div>
      </div>
    </div>
  );
};

// Internal helper for clean rows
const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-blue-500 mt-1">{icon}</div>
    <div>
      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">{label}</p>
      <p className="text-gray-700">{value || 'N/A'}</p>
    </div>
  </div>
);

export default ViewModal;