import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

let initialState = {
  counter: 0,
  products: [],
  brands: [],
  isLoading: false,
  error: null,
};

export let getBrands = createAsyncThunk(
  "product/getBrands",
  async function () {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    return data.data;
  }
);

export let productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter++;
    },
    decrement: (state) => {
      state.counter--;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export let { increment, decrement } = productSlice.actions;
export let productReducer = productSlice.reducer;