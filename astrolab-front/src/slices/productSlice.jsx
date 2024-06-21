import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    uploadProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { uploadProducts } = productSlice.actions;
export const selectProducts = (state) => state.products;
export default productSlice.reducer;
