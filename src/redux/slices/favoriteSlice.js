import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    items: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.items.find(
        (item) => item.title === action.payload.title,
      );
      // console.log("from action.payload",action.payload);
      if (!exists) {
        state.items.push(action.payload); // ✅ هنا الصح
        // console.log("aded from action.payload")
      }
      
    },

    removeFavorite: (state, action) => {
      state.items = state.items.filter(
        (item) => item.title !== action.payload.title,
      );
    },
  },
  
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
