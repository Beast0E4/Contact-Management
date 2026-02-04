import React from 'react';
import { FaEdit, FaTrash, FaUser } from 'react-icons/fa';

const ContactTable = ({ contacts, onView, onEdit, onDelete }) => {
  if (contacts.length === 0) return (
    <div className="text-center py-12 bg-white rounded-lg shadow text-gray-500">No contacts found.</div>
  );

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {contacts.map((contact) => (
            <tr key={contact._id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => onView(contact)}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{contact.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{contact.email || '-'}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{contact.phone || '-'}</td>
              <td className="px-6 py-4 text-right space-x-3">
                <button onClick={(e) => { e.stopPropagation(); onEdit(contact._id); }} className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(contact._id); }} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;