import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const exists = state.items.find(
        (item) => item.title === action.payload.title,
      );
      // console.log("from action.payload",action.payload)
      if (exists) {
        exists.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
      console.log("addToCart");
    },

    removeFromCart: (state, action) => {
      const item = state.items.find((i) => i.title === action.payload.title);

      if (!item) return;

      if (item.qty > 1) {
        item.qty -= 1; 
      } else {
        state.items = state.items.filter(
          (i) => i.title !== action.payload.title,
        ); 
      }

      console.log("removeFromCart");
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
