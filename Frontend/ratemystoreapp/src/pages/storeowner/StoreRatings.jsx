import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoreRatings } from '../../redux/slices/ratingSlice';
import RatingStars from '../../components/RatingStars';

const StoreRatings = () => {
  const dispatch = useDispatch();
  const { ratings, loading, error } = useSelector((state) => state.rating);

  useEffect(() => {
    dispatch(fetchStoreRatings());
  }, [dispatch]);

  const myStore = ratings.length > 0 ? ratings[0].storeOwner : null;
  const averageRating =
    ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Ratings for Your Store</h2>

      {loading && <p>Loading ratings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {myStore && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">{myStore.storeName}</h3>
          <p className="text-gray-600">{myStore.address}</p>
          <p className="mt-2 text-yellow-600 font-medium">Average Rating:</p>
          <RatingStars value={averageRating} editable={false} />
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">User Ratings</h3>
        {ratings?.length > 0 ? (
          <div className="space-y-3">
            {ratings.map((rating) => (
              <div key={rating.id} className="bg-white p-4 rounded shadow">
                <p className="font-medium">
                  {rating.user?.name || 'Anonymous'}
                </p>
                <RatingStars value={rating.rating} editable={false} />
                {rating.comment && (
                  <p className="text-sm text-gray-500 italic">
                    "{rating.comment}"
                  </p>
                )}
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

export default StoreRatings;
