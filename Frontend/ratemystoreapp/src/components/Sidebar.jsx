// src/components/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/AuthSlice';

const Sidebar = () => {
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const renderLinks = () => {
    if (!role) return null;
    
    switch (role) {
      case 'user':
        return (
          <>
            <NavItem to="/user/stores" label="Stores" />
            <NavItem to="/user/ratings" label="My Ratings" />
          </>
        );
      case 'storeowner':
        return (
          <>
            <NavItem to="/store/dashboard" label="Dashboard" />
            <NavItem to="/store/ratings" label="Ratings" />
          </>
        );
      case 'admin':
        return (
          <>
            <NavItem to="/admin/dashboard" label="Dashboard" />
            <NavItem to="/admin/users" label="User List" />
            <NavItem to="/admin/stores" label="Store List" />
            <NavItem to="/admin/add-user" label="Add User" />
            <NavItem to="/admin/add-store" label="Add Store" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <aside className="w-64 bg-white border-r shadow h-full flex flex-col justify-between">
      <div>
        <div className="p-4 font-bold text-xl text-blue-600">RateMyStore</div>
        <nav className="flex flex-col gap-2 px-4">
          {renderLinks()}
        </nav>
      </div>
      {role && (
        <button
          onClick={handleLogout}
          className="m-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </aside>
  );
};

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block py-2 px-3 rounded hover:bg-blue-100 transition ${
        isActive ? 'bg-blue-200 text-blue-800' : 'text-gray-700'
      }`
    }
  >
    {label}
  </NavLink>
);

export default Sidebar;
