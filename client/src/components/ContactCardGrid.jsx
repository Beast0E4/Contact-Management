import React, { useState } from 'react';
import { 
  FaEdit, FaTrash, FaEnvelope, FaPhone, FaBuilding, 
  FaFilter, FaUser, FaTimes
} from 'react-icons/fa';

const ContactCardGrid = ({ contacts, onView, onEdit, onDelete }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const allTags = [...new Set(contacts.flatMap(c => c.tags || []))].filter(Boolean).sort();

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredContacts = selectedTags.length === 0 
    ? contacts 
    : contacts.filter(c => selectedTags.every(tag => c.tags?.includes(tag)));

  if (contacts.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] shadow-sm border-2 border-dashed border-gray-100">
        <div className="bg-gray-50 p-4 rounded-full mb-4">
          <FaUser className="text-gray-300 text-3xl" />
        </div>
        <p className="text-gray-400 font-medium tracking-tight">Your directory is currently empty.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">

      {allTags.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
              <FaFilter className="text-blue-500" /> Filter by Tags
            </div>
            {selectedTags.length > 0 && (
              <button 
                onClick={() => setSelectedTags([])} 
                className="text-[10px] font-black text-red-400 flex items-center gap-1 uppercase tracking-widest transition-colors hover:text-red-600"
              >
                <FaTimes /> Clear Filters
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all duration-300 whitespace-nowrap ${
                  selectedTags.includes(tag) 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' 
                  : 'bg-white text-gray-500 border-gray-100 hover:border-blue-300 hover:text-blue-500'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredContacts.map((contact) => (
          <div 
            key={contact._id} 
            className="group relative w-full bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 overflow-hidden"
          >
            {/* Top Action Buttons */}
            <div className="absolute top-6 right-6 flex gap-2 z-30">
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(contact._id); }}
                className="p-3 bg-white shadow-sm text-gray-300 hover:text-blue-600 rounded-2xl border border-gray-50 transition-all"
              >
                <FaEdit size={16} />
              </button>
              
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(contact._id); }}
                className="p-3 bg-white shadow-sm text-gray-300 hover:text-red-600 rounded-2xl border border-gray-50 transition-all"
              >
                <FaTrash size={16} />
              </button>
            </div>

            {/* View Clickable Area */}
            <div onClick={() => onView(contact)} className="p-10 cursor-pointer relative z-10">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/40 -mr-16 -mt-16 rounded-full -z-10 group-hover:scale-125 transition-transform duration-700"></div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-gray-800 pr-20 tracking-tight group-hover:text-blue-600 transition-colors">
                    {contact.name}
                  </h3>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 mt-3 rounded-lg text-[10px] font-black uppercase tracking-widest ${contact.company ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
                    <FaBuilding size={10} /> {contact.company || 'Personal'}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                      <FaEnvelope size={14} />
                    </div>
                    <span className="text-sm font-bold text-gray-600 truncate">{contact.email || '—'}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-green-50 group-hover:text-green-500 transition-colors">
                      <FaPhone size={14} />
                    </div>
                    <span className="text-sm font-bold text-gray-600">
                      {contact.phone ? `+${contact.phone}` : '—'}
                    </span>
                  </div>
                </div>

                {contact.notes && (
                  <div className="p-4 bg-indigo-50/30 rounded-2xl border border-indigo-50/50">
                    <p className="text-[11px] text-indigo-900/60 italic font-medium line-clamp-2 leading-relaxed">
                      {contact.notes}
                    </p>
                  </div>
                )}

                {contact.tags && contact.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {contact.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter bg-white text-gray-400 border border-gray-100 shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactCardGrid;