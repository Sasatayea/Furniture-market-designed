import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('adminProducts/fetchProducts', async () => {
  try {
    const res = await fetch('http://localhost:5000/furniture');
    const data = await res.json();
    const items = data[0]?.data || [];
    // Ensure every item has a unique id for DataGrid
    return items.map((item, index) => ({
      ...item,
      id: item._id || item.id || `prod-${index}`,
      images: item.images || ['https://via.placeholder.com/300x200?text=No+Image'],
      price: item.price || item.originalPrice || 0,
      stockStatus: item.stockStatus || 'In Stock',
      category: item.category || 'Uncategorized',
      title: item.title || 'Unnamed Product',
    }));
  } catch (error) {
    console.error('Failed to fetch products', error);
    return [];
  }
});

const adminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState: {
    products: [],
    loading: false,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.unshift({
        ...action.payload,
        id: `new-${Date.now()}`,
      });
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        if (state.products.length === 0) {
          state.products = action.payload;
        }
      });
  },
});

export const { addProduct, updateProduct, deleteProduct } = adminProductsSlice.actions;
export default adminProductsSlice.reducer;
