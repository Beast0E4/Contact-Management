import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaEnvelope, FaLock, FaUserCircle, FaChevronRight } from 'react-icons/fa';
import { loginUser } from '../redux/slices/authSlice';
import { validateEmail } from '../utils/validation';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: serverError } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Min 8 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#f8fafc] py-12">
      <div className="max-w-md w-full">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] mb-6 shadow-2xl shadow-blue-200 -rotate-3 hover:rotate-0 transition-transform duration-300">
            <FaUserCircle className="text-white text-4xl" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Welcome Back</h1>
          <p className="text-gray-400 mt-2 font-medium">Access your professional contact directory</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 p-10 border border-gray-100">
          {/* Server Side Errors */}
          {serverError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-[11px] font-black uppercase tracking-widest rounded-2xl text-center">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
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

            {/* Password Field */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-1">
                Security Password
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
              {errors.password && <p className="text-red-500 text-[10px] font-bold mt-2 px-1 uppercase italic">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-blue-200 transition-all disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
            >
              {loading ? 'Authenticating...' : (
                <>
                  Sign In <FaChevronRight size={10} />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-10">
            <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">
              New to the platform?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 ml-1">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;