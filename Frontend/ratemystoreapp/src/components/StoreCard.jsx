import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { FaStar } from 'react-icons/fa';

const StoreCard = ({ store, onRate }) => {
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(store.userRating || 0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const submitRating = () => {
    if (onRate) onRate(store.id, rating);
    setShowRating(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-md mx-auto mb-6 border border-gray-200">
      <img
        // src={store.imageUrl || 'https://via.placeholder.com/400x200?text=Store+Image'}
        src='https://www.shutterstock.com/image-photo/female-mannequins-shop-window-three-600nw-2293487247.jpg'
        alt={store.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-800">{store.name}</h2>
        <p className="text-sm text-gray-500 mb-2">{store.address}</p>

        {/* Rating Display */}
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-lg ${i < Math.round(store.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({store.averageRating || 0})</span>
        </div>

        {/* Toggle rating input */}
        <button
          onClick={() => setShowRating(!showRating)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {showRating ? 'Cancel' : 'Rate Now'}
        </button>

        {/* Rating Input */}
        {showRating && (
          <div className="mt-4">
            <ReactStars
              count={5}
              value={rating}
              onChange={handleRatingChange}
              size={30}
              activeColor="#ffd700"
            />
            <button
              onClick={submitRating}
              className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Submit Rating
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreCard;
