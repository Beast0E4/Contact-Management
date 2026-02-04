import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaChevronRight } from 'react-icons/fa';
import { registerUser } from '../redux/slices/authSlice';
import { validateRegisterForm } from '../utils/validation';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      navigate('/login');
    } else {
      setServerError(result.payload || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#f8fafc] py-12">
      <div className="max-w-md w-full">
        {/* Logo/Icon Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] mb-6 shadow-2xl shadow-blue-200 rotate-3 hover:rotate-0 transition-transform duration-300">
            <FaUserPlus className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Create Account</h1>
          <p className="text-gray-400 mt-2 font-medium">Start managing your connections professionally</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 p-10 border border-gray-100">
          {serverError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-[11px] font-black uppercase tracking-widest rounded-2xl text-center">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-1">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full pl-11 pr-4 py-4 bg-gray-50 border rounded-2xl outline-none focus:ring-4 transition-all ${
                    errors.name ? 'border-red-500 focus:ring-red-50' : 'border-transparent focus:ring-blue-50 focus:bg-white focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-[10px] font-bold mt-2 px-1 uppercase italic">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-1">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className={`w-full pl-11 pr-4 py-4 bg-gray-50 border rounded-2xl outline-none focus:ring-4 transition-all ${
                    errors.email ? 'border-red-500 focus:ring-red-50' : 'border-transparent focus:ring-blue-50 focus:bg-white focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] font-bold mt-2 px-1 uppercase italic">{errors.email}</p>}
            </div>

            {/* Password Grid */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-1">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-4 py-4 bg-gray-50 border rounded-2xl outline-none focus:ring-4 transition-all ${
                      errors.password ? 'border-red-500 focus:ring-red-50' : 'border-transparent focus:ring-blue-50 focus:bg-white focus:border-blue-500'
                    }`}
                  />
                </div>
                {errors.password && <p className="text-red-500 text-[10px] font-bold mt-2 px-1 uppercase italic leading-tight">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-4 py-4 bg-gray-50 border rounded-2xl outline-none focus:ring-4 transition-all ${
                      errors.confirmPassword ? 'border-red-500 focus:ring-red-50' : 'border-transparent focus:ring-blue-50 focus:bg-white focus:border-blue-500'
                    }`}
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-[10px] font-bold mt-2 px-1 uppercase italic">{errors.confirmPassword}</p>}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-blue-200 transition-all disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
            >
              {loading ? 'Creating Account...' : (
                <>
                  Get Started <FaChevronRight size={10} />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-10">
            <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">
              Already a member?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 ml-1">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;