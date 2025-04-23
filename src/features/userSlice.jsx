import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    singleUser: null,
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getUsersSuccess: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    },
    getUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.singleUser = payload;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, fetchFail, getUsersSuccess, getUserSuccess } =
  userSlice.actions;
export default userSlice.reducer;
