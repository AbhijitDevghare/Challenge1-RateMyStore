// src/pages/user/UserDashboard.jsx
import React from 'react';

const UserDashboard = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
      <p className="text-gray-700">You can explore stores, submit ratings, and manage your account.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Explore Stores</h2>
          <p>Browse all registered stores and rate your experiences.</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Your Ratings</h2>
          <p>View and manage ratings you've submitted.</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
