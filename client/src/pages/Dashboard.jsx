import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FaPlus,
  FaSearch,
  FaHeart,
  FaRegHeart,
  FaEdit,
  FaTrash,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTag,
  FaStickyNote,
  FaSignOutAlt,
  FaTimes,
  FaFilter,
  FaUserCircle,
  FaStar
} from 'react-icons/fa';
import {
  fetchContacts,
  createContact,
  updateContact,
  deleteContact,
  setSearchTerm,
  clearFilters
} from '../redux/slices/contactSlice';
import { logout } from '../redux/slices/authSlice';
import { validateEmail, validatePhone } from '../utils/validation';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { 
    filteredContacts, 
    loading, 
    searchTerm, 
    selectedTag, 
    showFavorites, 
    contacts: allContacts 
  } = useSelector((state) => state.contacts);

  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [viewingContact, setViewingContact] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
    tags: ''
  });

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const allTags = [...new Set(
    allContacts
      .flatMap(c => c.tags || [])
      .filter(tag => tag && tag.trim() !== '')
  )].sort();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const openModal = (contact = null) => {
    if (contact) {
      setEditingContact(contact);
      setFormData({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        notes: contact.notes || '',
        tags: Array.isArray(contact.tags) ? contact.tags.join(', ') : ''
      });
    } else {
      setEditingContact(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        notes: '',
        tags: ''
      });
    }
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingContact(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      notes: '',
      tags: ''
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }

    if (!formData.email && !formData.phone) {
      newErrors.email = 'Provide at least email or phone';
      newErrors.phone = 'Provide at least email or phone';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const contactData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      notes: formData.notes.trim(),
      tags: formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '')
    };

    if (editingContact) {
      await dispatch(updateContact({ id: editingContact._id, data: contactData }));
    } else {
      await dispatch(createContact(contactData));
    }

    closeModal();
  };

  const handleDelete = async (id) => {
    await dispatch(deleteContact(id));
    setShowDeleteConfirm(null);
    if (viewingContact?._id === id) {
      setViewingContact(null);
    }
  };

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const viewContact = (contact) => {
    setViewingContact(contact);
  };

  const closeViewModal = () => {
    setViewingContact(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <FaUserCircle className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Contact Manager</h1>
                <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="btn btn-secondary text-sm"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">

            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts by name, email, or phone..."
                value={searchTerm}
                onChange={handleSearch}
                className="input pl-10 w-full"
              />
            </div>


            <button
              onClick={() => openModal()}
              className="btn btn-primary whitespace-nowrap"
            >
              <FaPlus />
              Add Contact
            </button>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaFilter />
              Filters:
            </span>
            
            <button
              onClick={handleFavoriteFilter}
              className={`badge ${
                showFavorites
                  ? 'bg-red-100 text-red-700 border-red-300'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              } border px-3 py-1.5 cursor-pointer hover:shadow-md transition-all`}
            >
              {showFavorites ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              Favorites {showFavorites && `(${filteredContacts.length})`}
            </button>

            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagFilter(tag)}
                className={`badge ${
                  selectedTag === tag
                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                    : 'bg-gray-100 text-gray-700 border-gray-300'
                } border px-3 py-1.5 cursor-pointer hover:shadow-md transition-all`}
              >
                <FaTag className="text-xs" />
                {tag}
              </button>
            ))}

            {(searchTerm || selectedTag || showFavorites) && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                <FaTimes />
                Clear All
              </button>
            )}
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredContacts.length} of {allContacts.length} contacts
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading contacts...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <FaUser className="text-gray-300 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Contacts Found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedTag || showFavorites
                ? 'Try adjusting your filters'
                : 'Get started by adding your first contact'}
            </p>
            {!searchTerm && !selectedTag && !showFavorites && (
              <button onClick={() => openModal()} className="btn btn-primary">
                <FaPlus />
                Add Your First Contact
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContacts.map((contact) => (
              <div
                key={contact._id}
                className="card p-6 hover:shadow-xl transition-all cursor-pointer"
                onClick={() => viewContact(contact)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {contact.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                        {contact.name}
                        {contact.isFavorite && (
                          <FaStar className="text-yellow-500 text-sm" />
                        )}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {contact.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaEnvelope className="text-gray-400" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                  )}
                  {contact.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaPhone className="text-gray-400" />
                      <span>{contact.phone}</span>
                    </div>
                  )}
                </div>

                {contact.tags && contact.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {contact.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="badge bg-blue-50 text-blue-700 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(contact);
                    }}
                    className="btn btn-secondary flex-1 text-sm"
                  >
                    <FaEdit />
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteConfirm(contact._id);
                    }}
                    className="btn btn-danger flex-1 text-sm"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {editingContact ? 'Edit Contact' : 'Add New Contact'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUser className="inline mr-2" />
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaEnvelope className="inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaPhone className="inline mr-2" />
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`input ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaTag className="inline mr-2" />
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="input"
                  placeholder="work, family, friends"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Example: work, family, friends
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaStickyNote className="inline mr-2" />
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="input resize-none"
                  placeholder="Additional notes..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={closeModal} className="btn btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  {editingContact ? 'Update Contact' : 'Add Contact'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-6 py-8 rounded-t-lg text-white">
              <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-3xl font-bold">
                    {viewingContact.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={closeViewModal}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  <FaTimes />
                </button>
              </div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {viewingContact.name}
                {viewingContact.isFavorite && <FaStar className="text-yellow-300" />}
              </h2>
            </div>

            <div className="p-6 space-y-4">

              {viewingContact.email && (
                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-blue-600 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Email</p>
                    <p className="text-gray-900">{viewingContact.email}</p>
                  </div>
                </div>
              )}

              {viewingContact.phone && (
                <div className="flex items-start gap-3">
                  <FaPhone className="text-blue-600 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Phone</p>
                    <p className="text-gray-900">{viewingContact.phone}</p>
                  </div>
                </div>
              )}

              {viewingContact.tags && viewingContact.tags.length > 0 && (
                <div className="flex items-start gap-3">
                  <FaTag className="text-blue-600 mt-1" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {viewingContact.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="badge bg-blue-100 text-blue-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {viewingContact.notes && (
                <div className="flex items-start gap-3">
                  <FaStickyNote className="text-blue-600 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Notes</p>
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {viewingContact.notes}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    closeViewModal();
                    openModal(viewingContact);
                  }}
                  className="btn btn-primary flex-1"
                >
                  <FaEdit />
                  Edit
                </button>
                <button
                  onClick={() => {
                    closeViewModal();
                    setShowDeleteConfirm(viewingContact._id);
                  }}
                  className="btn btn-danger"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-sm w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrash className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Contact?</h3>
              <p className="text-gray-600">
                Are you sure you want to delete this contact? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="btn btn-danger flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
