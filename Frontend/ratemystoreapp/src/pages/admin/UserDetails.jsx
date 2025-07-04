// src/pages/admin/UserDetails.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const UserDetails = ({ userId }) => {
  const { users } = useSelector(state => state.admin);
  const user = users.find(u => u.id === userId);

  if (!user) return <p className="text-gray-500">User not found.</p>;

  return (
    <div className="p-6 bg-white shadow rounded space-y-3">
      <h2 className="text-2xl font-bold mb-2">User Details</h2>
      <p><span className="font-semibold">Name:</span> {user.name}</p>
      <p><span className="font-semibold">Email:</span> {user.email}</p>
      <p><span className="font-semibold">Username:</span> {user.username}</p>
      <p><span className="font-semibold">Address:</span> {user.address}</p>
      <p><span className="font-semibold">Phone:</span> {user.phoneNumber}</p>
      <p><span className="font-semibold">Role:</span> {user.role}</p>
      {user.role === 'storeowner' && (
        <p><span className="font-semibold">Average Rating:</span> {user.averageRating || 'N/A'}</p>
      )}
    </div>
  );
};

export default UserDetails;
