import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import toast from 'react-hot-toast';

// =========================
// Async: Get All Stores
// =========================
export const fetchStores = createAsyncThunk(
  'store/fetchStores',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/store');
      console.log(response)
      return response.data.rows; // Assuming backend sends { stores: [...] }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch stores');
    }
  }
);

export const rateStore = createAsyncThunk(
  'store/rateStore',
  async ({ storeId, rating }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`rating/rate/${storeId}`, { rating });

    //   console.log(response)
    //   toast.promise(response,{
    //     success:"Rating added"
    //   })

      return { storeId, rating: response.data.rating };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Rating failed');
    }
  }
);

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    stores: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearStoreErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Stores
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        console.log(action)
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Rate Store
      .addCase(rateStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rateStore.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.stores.findIndex(s => s.id === action.payload.storeId);
        if (index !== -1) {
          state.stores[index].userRating = action.payload.rating;

          // Recalculate average (optional - depends on backend)
          // state.stores[index].averageRating = ...
        }
      })
      .addCase(rateStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStoreErrors } = storeSlice.actions;

export default storeSlice.reducer;
