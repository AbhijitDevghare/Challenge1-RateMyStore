// src/redux/slices/ratingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';

// Fetch ratings for the logged-in user
export const fetchMyRatings = createAsyncThunk(
  'rating/fetchMyRatings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/rating/user', {
        withCredentials: true,
        redirect: 'follow',
      });
      return response.data.ratings;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Fetching ratings failed');
    }
  }
);

const ratingSlice = createSlice({
  name: 'rating',
  initialState: {
    ratings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings = action.payload;
      })
      .addCase(fetchMyRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ratingSlice.reducer;
