import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import { registerUser } from '../redux/slices/authSlice';
import { validateRegisterForm } from '../utils/validation';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Use the comprehensive validation utility
    const { isValid, errors: validationErrors } = validateRegisterForm(formData);
    
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    const result = await dispatch(registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password
    }));
    
    if (registerUser.fulfilled.match(result)) {
      toast.success('Account created! Please login.');
      navigate('/login');
    } else {
      toast.error(result.payload || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg shadow-blue-200">
            <FaUserPlus className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Join us to manage your contacts</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                <FaUser className="inline mr-2 text-gray-400" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 border rounded-xl outline-none focus:ring-2 transition-all ${
                  errors.name ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                }`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                <FaEnvelope className="inline mr-2 text-gray-400" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-xl outline-none focus:ring-2 transition-all ${
                  errors.email ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                }`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                <FaLock className="inline mr-2 text-gray-400" /> Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-3 border rounded-xl outline-none focus:ring-2 transition-all ${
                  errors.password ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                }`}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1 leading-tight">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                <FaLock className="inline mr-2 text-gray-400" /> Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full p-3 border rounded-xl outline-none focus:ring-2 transition-all ${
                  errors.confirmPassword ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                }`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all disabled:opacity-50 mt-2"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-bold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;