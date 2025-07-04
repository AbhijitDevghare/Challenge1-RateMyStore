import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount } from '../redux/slices/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state) => state.auth);

  const [role, setRole] = useState('user');

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phoneNumber: '',
    storeName: '',
    gstNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = `${role}`;

    const submission = {
      ...formData,
      role,
    };

    const res = await dispatch(createAccount({ data: submission, endpoint }));
    
    if (res?.payload?.success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-8">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <span className="text-blue-600 text-xl">★</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Create an account</h2>
          <p className="text-gray-500 text-sm mb-6 text-center">
            Register to submit ratings and manage stores
          </p>
        </div>

        {error && (
          <div className="text-sm text-red-600 text-center bg-red-100 p-2 rounded mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700">Select Role</label>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">Normal User</option>
              <option value="store-owner">Store Owner</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md w-full"
              placeholder="Username"
              required
            />

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md w-full"
              placeholder="Full Name"
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Email"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md w-full"
              placeholder="Password"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md w-full"
              placeholder="Confirm Password"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Address"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Phone Number"
              required
            />
          </div>

          {role === 'store-owner' && (
            <>
              <div>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Store Name"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="GST Number"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>

          <div className="text-sm text-center mt-4 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" >
              <p className="text-blue-600 hover:underline font-medium">Sign in</p>
            </Link>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
