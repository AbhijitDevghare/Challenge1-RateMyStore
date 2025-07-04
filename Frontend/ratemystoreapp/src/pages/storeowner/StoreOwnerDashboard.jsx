import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoreRatings } from '../../redux/slices/ratingSlice';
import RatingStars from '../../components/RatingStars';

const StoreOwnerDashboard = () => {
  const dispatch = useDispatch();
  const { ratings, loading, error } = useSelector(state => state.rating);



  console.log("ratings:",ratings)
  useEffect(() => {
    dispatch(fetchStoreRatings());
  }, [dispatch]);

  // const myStore = ratings.length > 0 ? ratings[0].storeOwner : null;
  const myStore = useSelector(state => state.auth.data)
  console.log("mystore",myStore)

  const stats = useMemo(() => {
    const distribution = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    let sum = 0;

    for (const r of ratings) {
      const rounded = Math.round(r.rating);
      distribution[rounded] = (distribution[rounded] || 0) + 1;
      sum += r.rating;
    }

    const total = ratings.length;
    const avg = total ? (sum / total).toFixed(2) : 0;

    return { distribution, average: avg, total };
  }, [ratings]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Store Dashboard</h2>

      {loading && <p>Loading store data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {myStore && (
        <div className="bg-white p-4 rounded shadow space-y-2">
          <h3 className="text-xl font-semibold">{myStore.storeName}</h3>
          <p className="text-gray-600">{myStore.address}</p>

          <div className="pt-2">
            <p className="font-medium">Average Rating:</p>
            <div className="flex items-center space-x-2">
              <RatingStars value={stats.average} editable={false} />
              <span className="text-sm text-gray-600">({stats.average})</span>
            </div>
            <p className="text-sm text-gray-500">
              Total Ratings: {stats.total}
            </p>
          </div>

          <div className="pt-4">
            <h4 className="font-semibold mb-2">Rating Distribution:</h4>
            {Object.entries(stats.distribution)
              .sort((a, b) => b[0] - a[0])
              .map(([star, count]) => (
                <div key={star} className="flex items-center justify-between text-sm">
                  <span>{star} star</span>
                  <div className="flex-1 mx-2 bg-gray-200 rounded h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded"
                      style={{
                        width: `${(count / stats.total) * 100 || 0}%`,
                      }}
                    ></div>
                  </div>
                  <span>{count}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">User Ratings</h3>
        {ratings && ratings.length > 0 ? (
          <div className="space-y-3">
            {ratings.map((r) => (
              <div key={r.id} className="bg-white p-3 rounded shadow">
                <p className="font-medium">
                  {r.user?.name || 'Unknown User'}{' '}
                  <span className="text-sm text-gray-500">
                    ({r.user?.email})
                  </span>
                </p>
                <RatingStars value={r.rating} editable={false} />
                {r.comment && (
                  <p className="text-sm text-gray-500 italic">
                    "{r.comment}"
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

export default StoreOwnerDashboard;
