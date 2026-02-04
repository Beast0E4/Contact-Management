import React from 'react';
import { FaTimes, FaEnvelope, FaPhone, FaTag, FaStickyNote, FaBuilding, FaUserCircle } from 'react-icons/fa';

const ViewModal = ({ contact, onClose }) => {
  if (!contact) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] max-w-lg w-full overflow-hidden shadow-2xl border border-white/20">
        
        {/* Header Section */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 pt-10 text-white relative">
          
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest mb-2 border border-white/10">
              <FaBuilding size={10} />
              {contact.company || 'Personal Contact'}
            </div>
            <h2 className="text-4xl font-black tracking-tight">{contact.name}</h2>
            <p className="text-blue-100/80 text-sm font-medium">Contact Profile Details</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <DetailRow 
              icon={<FaEnvelope className="text-blue-500" />} 
              label="Email Address" 
              value={contact.email} 
              isEmail 
            />
            <DetailRow 
              icon={<FaPhone className="text-green-500" />} 
              label="Phone Number" 
              value={contact.phone} 
            />
          </div>

          <hr className="border-gray-100" />

          {/* Tags Section */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-gray-400">
              <FaTag size={12} />
              <span className="text-xs font-bold uppercase tracking-widest">Categories</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {contact.tags?.length > 0 ? (
                contact.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-gray-50 text-gray-600 text-[10px] font-black rounded-full border border-gray-100 uppercase tracking-tighter shadow-sm">
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-400 italic">No tags assigned</span>
              )}
            </div>
          </div>

          {/* Notes Section */}
          {contact.notes && (
            <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/50 relative">
              <FaStickyNote className="text-indigo-200 absolute top-4 right-4 rotate-12" size={24} />
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Notes & Remarks</p>
              <p className="text-gray-600 text-sm leading-relaxed italic">
                "{contact.notes}"
              </p>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="p-6 bg-gray-50 flex justify-end border-t border-gray-100">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-white border border-gray-200 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-100 transition-all shadow-sm"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

// Internal helper for high-end data display
const DetailRow = ({ icon, label, value, isEmail }) => (
  <div className="flex items-start gap-4 group">
    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center transition-colors group-hover:bg-white group-hover:shadow-md border border-transparent group-hover:border-gray-100">
      {icon}
    </div>
    <div className="flex flex-col min-w-0">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
      <p className={`text-sm font-bold truncate ${isEmail ? 'text-blue-600 underline decoration-blue-200 underline-offset-4' : 'text-gray-700'}`}>
        {value || '—'}
      </p>
    </div>
  </div>
);

export default ViewModal;