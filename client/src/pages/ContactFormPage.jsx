import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createContact, updateContact } from '../redux/slices/contactSlice';
import { 
  FaUser, FaEnvelope, FaTag, 
  FaStickyNote, FaArrowLeft, FaSave, FaBuilding 
} from 'react-icons/fa';
import { validateEmail } from '../utils/validation';

// Phone Input Library & Styles
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import toast from 'react-hot-toast';

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
    company: '',
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
          company: contact.company || '',
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

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
    setErrors({ ...errors, phone: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim() || !formData.phone) {
      toast.error ('All marked fields are required');
      newErrors.common = 'All marked fields are required';
    }
    if (formData.email && !validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (formData.phone && formData.phone.length < 8) newErrors.phone = 'Phone number is too short';

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
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/dashboard')} 
          className="group flex items-center text-gray-400 mb-8 hover:text-blue-600 transition-all font-bold text-sm uppercase tracking-widest"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
          Back to Directory
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-100 p-8 md:p-12">
          <header className="mb-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">
              {isEditing ? 'Edit Profile' : 'New Contact'}
            </h2>
            <p className="text-gray-400 mt-2 font-medium">Enter the details below to maintain your network.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-7">
            
            {/* Name & Company Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label text="Full Name" required />
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="E.g. Alex Rivera"
                    className={`w-full pl-11 pr-4 py-4 bg-gray-50 border rounded-2xl outline-none focus:ring-4 transition-all ${
                      errors.name ? 'border-red-500 focus:ring-red-50' : 'border-transparent focus:ring-blue-50 focus:bg-white focus:border-blue-500'
                    }`}
                  />
                </div>
                {errors.name && <ErrorMsg msg={errors.name} />}
              </div>

              <div>
                <Label text="Company" />
                <div className="relative">
                  <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="E.g. Global Tech"
                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <Label text="Email Address" required/>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@company.com"
                  className={`w-full pl-11 pr-4 py-4 bg-gray-50 border rounded-2xl outline-none focus:ring-4 transition-all ${
                    errors.email ? 'border-red-500 focus:ring-red-50' : 'border-transparent focus:ring-blue-50 focus:bg-white focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.email && <ErrorMsg msg={errors.email} />}
            </div>

            {/* Phone with Searchable Country */}
            <div>
              <Label text="Phone Number" required />
              <PhoneInput
                country={'us'}
                value={formData.phone}
                onChange={handlePhoneChange}
                enableSearch={true}
                searchPlaceholder="Find your country..."
                
                // ADD THIS: Passes the required attribute to the internal input
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: false
                }}

                inputStyle={{
                  width: '100%',
                  height: '60px',
                  borderRadius: '1.25rem',
                  border: errors.phone ? '2px solid #ef4444' : 'none', // Subtle red border if error
                  backgroundColor: '#f9fafb',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
                containerClass="premium-phone"
                buttonStyle={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '1.25rem 0 0 1.25rem',
                  paddingLeft: '10px'
                }}
                dropdownStyle={{
                  borderRadius: '1rem',
                  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
                }}
              />
              {errors.phone && <ErrorMsg msg={errors.phone} />}
            </div>

            {/* Tags */}
            <div>
              <Label text="Tags (comma separated)" />
              <div className="relative">
                <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Work, Family, High Priority"
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label text="Internal Notes" />
              <div className="relative">
                <FaStickyNote className="absolute left-4 top-5 text-gray-300" />
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Write a brief description..."
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-blue-500 transition-all resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 py-4 bg-gray-100 text-gray-500 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-all"
              >
                Discard Changes
              </button>
              <button
                type="submit"
                className="flex-[2] py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                <FaSave size={14} />
                {isEditing ? 'Update Contact' : 'Save Contact'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Simple helper components for clean code
const Label = ({ text, required }) => (
  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-1">
    {text} {required && <span className="text-red-500">*</span>}
  </label>
);

const ErrorMsg = ({ msg }) => (
  <p className="text-red-500 text-[10px] font-bold mt-2 px-1 uppercase tracking-tight italic">
    {msg}
  </p>
);

export default ContactFormPage;