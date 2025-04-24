import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  transaction: null,
  stockTransactions: [],
  loading: false,
  error: false,
  isTransactionModalOpen: false,
  selectedStock: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getTransactionsSuccess: (state, { payload }) => {
      state.loading = false;
      state.transactions = payload;
      state.error = false;
    },
    getTransactionSuccess: (state, { payload }) => {
      state.loading = false;
      state.transaction = payload;
      state.error = false;
    },
    getStockTransactionsSuccess: (state, { payload }) => {
      state.loading = false;
      state.stockTransactions = payload;
      state.error = false;
    },
    createTransactionSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.isTransactionModalOpen = false;
    },
    updateTransactionSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    deleteTransactionSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    openTransactionModal: (state, { payload }) => {
      state.isTransactionModalOpen = true;
      state.selectedStock = payload;
    },
    closeTransactionModal: (state) => {
      state.isTransactionModalOpen = false;
      state.selectedStock = null;
    },
  },
});

export const {
  fetchStart,
  getTransactionsSuccess,
  getTransactionSuccess,
  getStockTransactionsSuccess,
  createTransactionSuccess,
  updateTransactionSuccess,
  deleteTransactionSuccess,
  fetchFail,
  openTransactionModal,
  closeTransactionModal,
} = transactionSlice.actions;

export default transactionSlice.reducer;
