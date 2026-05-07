import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productsAction = createAsyncThunk(
  "product/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    error: null,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(productsAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(productsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(productsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
