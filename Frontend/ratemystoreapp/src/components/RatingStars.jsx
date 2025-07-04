// src/components/RatingStars.jsx
import React from 'react';
import ReactStars from 'react-rating-stars-component';

const RatingStars = ({ value = 0, onChange = null, editable = false }) => {
  return (
    <div className="flex items-center">
      <ReactStars
        count={5}
        value={value}
        onChange={onChange}
        size={24}
        activeColor="#ffd700"
        edit={editable}
        isHalf={false}
      />
    </div>
  );
};

export default RatingStars;
