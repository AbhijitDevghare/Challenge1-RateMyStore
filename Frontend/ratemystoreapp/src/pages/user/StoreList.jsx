import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StoreCard from '../../components/StoreCard';
import { fetchStores, rateStore } from '../../redux/slices/storeSlice';

const StoreList = () => {
  const dispatch = useDispatch();
  const { stores, loading, error } = useSelector(state => state.store);

  // Fetch all stores from the API
  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  const handleRate = (storeId, rating) => {
    dispatch(rateStore({ storeId, rating }));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {error && <p className="text-red-600">{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && stores.length === 0 && (
        <p className="text-center text-gray-500">No stores found.</p>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} onRate={handleRate} />
        ))}
      </div>
    </div>
  );
};

export default StoreList;
