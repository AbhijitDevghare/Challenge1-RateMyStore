// src/pages/admin/AdminDashboard.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminStats } from '../../redux/slices/adminSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { totalUsers, totalStores, totalRatings, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      {loading && <p>Loading stats...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 shadow rounded">
          <p className="text-lg font-semibold">Total Users</p>
          <p className="text-2xl">{totalUsers}</p>
        </div>
        <div className="bg-white p-6 shadow rounded">
          <p className="text-lg font-semibold">Total Stores</p>
          <p className="text-2xl">{totalStores}</p>
        </div>
        <div className="bg-white p-6 shadow rounded">
          <p className="text-lg font-semibold">Total Ratings</p>
          <p className="text-2xl">{totalRatings}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
