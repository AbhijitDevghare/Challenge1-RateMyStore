// src/pages/storeowner/StoreProfile.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import RatingStars from '../../components/RatingStars';

const StoreProfile = () => {
  const { myStore } = useSelector((state) => state.store);

  if (!myStore) {
    return <p className="text-gray-600">Store data not available.</p>;
  }

  return (
    <div className="bg-white shadow rounded p-6 space-y-4">
      <h2 className="text-2xl font-bold">Store Profile</h2>
      <div>
        <p className="font-semibold">Store Name:</p>
        <p>{myStore.storeName}</p>
      </div>
      <div>
        <p className="font-semibold">GST Number:</p>
        <p>{myStore.gstNumber}</p>
      </div>
      <div>
        <p className="font-semibold">Email:</p>
        <p>{myStore.email}</p>
      </div>
      <div>
        <p className="font-semibold">Address:</p>
        <p>{myStore.address}</p>
      </div>
      <div>
        <p className="font-semibold">Average Rating:</p>
        <RatingStars value={myStore.averageRating || 0} editable={false} />
      </div>
    </div>
  );
};

export default StoreProfile;
