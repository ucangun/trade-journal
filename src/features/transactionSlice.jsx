import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",

  initialState: {
    transactions: [],
    transaction: null,
    loading: false,
    error: false,
    isTransactionModalOpen: false,
    selectedStock: null,
  },
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
  createTransactionSuccess,
  updateTransactionSuccess,
  deleteTransactionSuccess,
  fetchFail,
  openTransactionModal,
  closeTransactionModal,
} = transactionSlice.actions;
export default transactionSlice.reducer;
