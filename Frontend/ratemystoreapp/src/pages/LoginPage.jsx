import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightToBracket } from 'react-icons/fa6';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    role: 'user',
  });

  const { error, loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { identifier, password, role } = formData;
    const endpoint = `${role}`;
    const res = await dispatch(login({ identifier, password, endpoint }));
    if (res?.payload?.success) {
      navigate(`/`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <span className="text-blue-600 text-xl">★</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
          <p className="text-gray-500 text-sm mb-6 text-center">
            Sign in to manage your store ratings and more
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-sm text-red-600 text-center bg-red-100 p-2 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">Email address or username</label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">Select Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">Normal User</option>
              <option value="store-owner">Store Owner</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-blue-600" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot your password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold flex items-center justify-center space-x-2 transition"
          >
            <FaArrowRightToBracket />
            <span>{loading ? 'Logging in...' : 'Sign in'}</span>
          </button>

          <div className="text-sm text-center mt-4 text-gray-600">
            New to RateHub?{' '}
            <Link to={"/register"}>
                <p className="text-blue-600 hover:underline font-medium">Create an account</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
