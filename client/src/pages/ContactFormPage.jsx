import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createContact, updateContact } from '../redux/slices/contactSlice';
import { 
  FaUser, FaEnvelope, FaPhone, FaTag, 
  FaStickyNote, FaArrowLeft, FaSave 
} from 'react-icons/fa';
import { validateEmail, validatePhone } from '../utils/validation';

const ContactFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state.contacts);
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tags: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && contacts.length > 0) {
      const contact = contacts.find((c) => c._id === id);
      if (contact) {
        setFormData({
          name: contact.name || '',
          email: contact.email || '',
          phone: contact.phone || '',
          notes: contact.notes || '',
          tags: Array.isArray(contact.tags) ? contact.tags.join(', ') : ''
        });
      }
    }
  }, [id, contacts, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (formData.email && !validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (formData.phone && !validatePhone(formData.phone)) newErrors.phone = 'Invalid phone format';
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

    // Process tags from string to array
    const contactData = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '')
    };

    if (isEditing) {
      await dispatch(updateContact({ id, data: contactData }));
    } else {
      await dispatch(createContact(contactData));
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-xl mx-auto px-4">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center text-gray-600 mb-6 hover:text-blue-600 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {isEditing ? 'Update Contact' : 'Add New Contact'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                <FaUser className="inline mr-2 text-gray-400" /> Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full p-3 border rounded-xl outline-none focus:ring-2 transition-all ${
                  errors.name ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                <FaEnvelope className="inline mr-2 text-gray-400" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={`w-full p-3 border rounded-xl outline-none focus:ring-2 transition-all ${
                  errors.email ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                }`}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                <FaPhone className="inline mr-2 text-gray-400" /> Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className={`w-full p-3 border rounded-xl outline-none focus:ring-2 transition-all ${
                  errors.phone ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                }`}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                <FaTag className="inline mr-2 text-gray-400" /> Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="work, family, friends"
                className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
              />
              <p className="text-xs text-gray-400 mt-1 italic">Example: work, family, friends</p>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                <FaStickyNote className="inline mr-2 text-gray-400" /> Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Additional notes..."
                className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all resize-none"
              />
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
              >
                <FaSave />
                {isEditing ? 'Save Changes' : 'Add Contact'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactFormPage;