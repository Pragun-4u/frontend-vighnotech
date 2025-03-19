import { createSlice } from "@reduxjs/toolkit";

const userTypeSlice = createSlice({
  name: "userType",
  initialState: {
    userType: null,
  },
  reducers: {
    setUserType: (state, { payload }) => {
      state.userType = payload?.toUppercase();
    },
  },
});

export const { setUserType } = userTypeSlice.actions;

export default userTypeSlice.reducer;
