// src/pages/user/MyRatings.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyRatings } from '../../redux/slices/ratingSlice';
import RatingStars from '../../components/RatingStars';

const MyRatings = () => {
  const dispatch = useDispatch();
  const { ratings, loading, error } = useSelector(state => state.rating);

  useEffect(() => {
    dispatch(fetchMyRatings());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">My Submitted Ratings</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {ratings.length === 0 && !loading && <p>No ratings submitted yet.</p>}

      {ratings.map((item) => (
        <div key={item.id} className="border rounded p-4 bg-white shadow">
          <h3 className="text-lg font-semibold">{item.storeOwner?.storeName || 'Unnamed Store'}</h3>
          <p className="text-sm text-gray-500">{item.storeOwner?.address || 'No Address'}</p>
          <RatingStars value={item.rating} editable={false} />
        </div>
      ))}
    </div>
  );
};

export default MyRatings;
