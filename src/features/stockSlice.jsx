import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",

  initialState: {
    stocks: [],
    stock: null,
    openStocks: [],
    closedStocks: [],
    loading: false,
    error: false,
    isModalOpen: false,
    isUpdateModalOpen: false,
    selectedStock: null,
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
    openStocksSuccess: (state, { payload }) => {
      state.loading = false;
      state.openStocks = payload;
      state.error = false;
    },
    closedStocksSuccess: (state, { payload }) => {
      state.loading = false;
      state.closedStocks = payload;
      state.error = false;
    },
    createStockSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.isModalOpen = false;
    },
    updateStockSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.isUpdateModalOpen = false;
      state.selectedStock = null;
    },
    deleteStockSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    openUpdateModal: (state, { payload }) => {
      state.isUpdateModalOpen = true;
      state.selectedStock = payload;
    },
    closeUpdateModal: (state) => {
      state.isUpdateModalOpen = false;
      state.selectedStock = null;
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
  openModal,
  closeModal,
  openUpdateModal,
  closeUpdateModal,
  openStocksSuccess,
  closedStocksSuccess,
} = stockSlice.actions;
export default stockSlice.reducer;
