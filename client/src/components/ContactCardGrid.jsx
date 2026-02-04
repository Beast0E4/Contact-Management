import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEnvelope, FaPhone, FaBuilding, FaFilter, FaStickyNote, FaUser, FaTimes } from 'react-icons/fa';

const ContactCardGrid = ({ contacts, onView, onEdit, onDelete }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const allTags = [...new Set(contacts.flatMap(c => c.tags || []))].sort();

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
      <div className="w-full flex flex-col items-center justify-center py-24 bg-white rounded-3xl shadow-sm border-2 border-dashed border-gray-100">
        <div className="bg-gray-50 p-4 rounded-full mb-4">
          <FaUser className="text-gray-300 text-3xl" />
        </div>
        <p className="text-gray-400 font-medium">No contacts found.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Filter Bar */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
            <FaFilter className="text-blue-500" /> Filter Directory
          </div>
          {selectedTags.length > 0 && (
            <button onClick={() => setSelectedTags([])} className="text-[10px] font-bold text-red-400 flex items-center gap-1 uppercase">
              <FaTimes /> Clear
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold border transition-all ${
                selectedTags.includes(tag) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredContacts.map((contact) => (
          <div 
            key={contact._id} 
            className="group relative w-full bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            {/* 1. MOVE ACTION BUTTONS OUTSIDE THE VIEW-CLICK AREA */}
            <div className="absolute top-6 right-6 flex gap-2 z-30">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // Stops the card click
                  onEdit(contact._id);
                }}
                className="p-3 bg-white shadow-md text-gray-400 hover:text-blue-600 rounded-2xl border border-gray-50 transition-all pointer-events-auto"
              >
                <FaEdit size={16} />
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // Stops the card click
                  onDelete(contact._id);
                }}
                className="p-3 bg-white shadow-md text-gray-400 hover:text-red-600 rounded-2xl border border-gray-50 transition-all pointer-events-auto"
              >
                <FaTrash size={16} />
              </button>
            </div>

            {/* 2. ONLY THIS WRAPPER TRIGGERS VIEW */}
            <div 
              onClick={() => onView(contact)}
              className="p-8 cursor-pointer relative z-10"
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/40 -mr-16 -mt-16 rounded-full -z-10"></div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-gray-800 pr-16">{contact.name}</h3>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-lg text-[10px] font-bold uppercase ${contact.company ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
                    <FaBuilding size={10} /> {contact.company || 'Personal'}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400"><FaEnvelope size={14} /></div>
                    <span className="text-sm font-medium text-gray-600 truncate">{contact.email || '—'}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400"><FaPhone size={14} /></div>
                    <span className="text-sm font-medium text-gray-600">{contact.phone || '—'}</span>
                  </div>
                </div>

                {contact.notes && (
                  <div className="p-4 bg-indigo-50/30 rounded-2xl border border-indigo-50/50">
                    <p className="text-xs text-indigo-900/70 italic line-clamp-2">{contact.notes}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {contact.tags?.map((tag, i) => (
                    <span key={i} className={`px-3 py-1 rounded-full text-[10px] font-bold border ${selectedTags.includes(tag) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border-gray-100'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactCardGrid;