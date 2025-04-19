import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",

  initialState: {
    stocks: [],
    stock: null,
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getStocksSuccess: (state, { payload }) => {
      state.loading = false;
      state.stocks = payload;
      state.error = false;
    },
    getStockSuccess: (state, { payload }) => {
      state.loading = false;
      state.stock = payload;
      state.error = false;
    },
    createStockSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    updateStockSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    deleteStockSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  getStocksSuccess,
  getStockSuccess,
  createStockSuccess,
  updateStockSuccess,
  deleteStockSuccess,
  fetchFail,
} = stockSlice.actions;
export default stockSlice.reducer;
