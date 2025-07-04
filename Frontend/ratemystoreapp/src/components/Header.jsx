// src/components/Header.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/AuthSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="w-full bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">RateMyStore</h1>
      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-gray-600">Hello, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>

    </header>
  );
};

export default Header;
