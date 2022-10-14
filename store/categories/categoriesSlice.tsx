import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  categories: [],
  category: null,
  categoryName: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCatgories: (state, action) => {
      state.categories = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCategoryName: (state, action) => {
      state.categoryName = action.payload;
    },
  },
});

export const { setCatgories, setCategory, setCategoryName } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
