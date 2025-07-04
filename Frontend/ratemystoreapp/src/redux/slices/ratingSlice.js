// // src/redux/slices/ratingSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../../helpers/axiosInstance';

// // Fetch ratings for the logged-in user
// export const fetchMyRatings = createAsyncThunk(
//   'rating/fetchMyRatings',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get('/rating/user', {
//         withCredentials: true,
//         redirect: 'follow',
//       });
//       return response.data.ratings;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Fetching ratings failed');
//     }
//   }
// );

// export const fetchStoreRatings = createAsyncThunk(
//   'rating/fetchMyRatings',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get('/rating/store', {
//         withCredentials: true,
//         redirect: 'follow',
//       });
//       return response.data.ratings;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Fetching ratings failed');
//     }
//   }
// );


// const ratingSlice = createSlice({
//   name: 'rating',
//   initialState: {
//     ratings: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMyRatings.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchMyRatings.fulfilled, (state, action) => {
//         state.loading = false;
//         state.ratings = action.payload;
//       })
//       .addCase(fetchMyRatings.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default ratingSlice.reducer;


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
      return rejectWithValue(error.response?.data?.message || 'Fetching user ratings failed');
    }
  }
);

// Fetch ratings for the logged-in store owner
export const fetchStoreRatings = createAsyncThunk(
  'rating/fetchStoreRatings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('store/ratings', {
        withCredentials: true,
        redirect: 'follow',
      });
      console.log(response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Fetching store ratings failed');
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
      // Handle user ratings
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
      })

      // Handle store ratings
      .addCase(fetchStoreRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoreRatings.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action)
        state.ratings = action.payload;
      })
      .addCase(fetchStoreRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ratingSlice.reducer;
