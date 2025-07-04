// src/pages/storeowner/StoreOwnerDashboard.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoreRatings } from '../../redux/slices/storeSlice';
import RatingStars from '../../components/RatingStars';

const StoreOwnerDashboard = () => {
  const dispatch = useDispatch();
  const { myStore, ratings, loading, error } = useSelector(state => state.store);

  useEffect(() => {
    dispatch(fetchStoreRatings());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Store Dashboard</h2>

      {loading && <p>Loading store data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {myStore && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">{myStore.storeName}</h3>
          <p className="text-gray-600">{myStore.address}</p>
          <p className="mt-2 text-yellow-600 font-medium">Average Rating:</p>
          <RatingStars value={myStore.averageRating || 0} editable={false} />
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">User Ratings</h3>
        {ratings && ratings.length > 0 ? (
          <div className="space-y-3">
            {ratings.map((r) => (
              <div key={r.id} className="bg-white p-3 rounded shadow">
                <p className="font-medium">{r.userName}</p>
                <RatingStars value={r.rating} editable={false} />
                {r.comment && <p className="text-sm text-gray-500 italic">"{r.comment}"</p>}
              </div>
            ))}
          </div>
        ) : (
          <p>No ratings submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;
