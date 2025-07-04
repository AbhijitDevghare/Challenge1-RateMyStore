// src/pages/storeowner/StoreRatings.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoreRatings } from '../../redux/slices/storeSlice';
import RatingStars from '../../components/RatingStars';

const StoreRatings = () => {
  const dispatch = useDispatch();
  const { ratings, loading, error } = useSelector((state) => state.store);

  useEffect(() => {
    dispatch(fetchStoreRatings());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">All Ratings for Your Store</h2>

      {loading && <p>Loading ratings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {ratings && ratings.length > 0 ? (
        <div className="space-y-3">
          {ratings.map((rating) => (
            <div key={rating.id} className="bg-white p-4 rounded shadow">
              <p className="font-medium">{rating.userName}</p>
              <RatingStars value={rating.rating} editable={false} />
              {rating.comment && <p className="text-sm text-gray-500 italic">"{rating.comment}"</p>}
            </div>
          ))}
        </div>
      ) : (
        <p>No ratings yet.</p>
      )}
    </div>
  );
};

export default StoreRatings;