// src/pages/admin/AddUser.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/slices/adminSlice';

const AddUser = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.admin);

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phoneNumber: '',
    role: 'user',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Add New User</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">User added successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {['username', 'name', 'email', 'password', 'confirmPassword', 'address', 'phoneNumber'].map(field => (
          <div key={field}>
            <label className="block text-gray-600 capitalize">{field}</label>
            <input
              type={field.includes('password') ? 'password' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring"
              required
            />
          </div>
        ))}

        <div>
          <label className="block text-gray-600">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded"
          >
            <option value="user">Normal User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Adding...' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
