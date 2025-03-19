import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userType: null,
  error: "",
  permission: [] as string[] | [],
};

// LoginId and Password
const map = new Map([
  ["STUDENT", "STUDENT"],
  ["ADMIN", "ADMIN"],
]);
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    authenticateUser: (state, { payload }) => {
      const { userType, password } = payload;

      if (map.has(userType)) {
        const storedPassword = map.get(userType);

        if (password === storedPassword) {
          state.userType = userType;
          state.error = "";
          const isAdmin = userType === "ADMIN";
          state.permission = isAdmin ? ["ADD", "DELETE", "VIEW"] : [];
        } else {
          state.userType = null;
          state.error = "Invalid password";
        }
      } else {
        state.userType = null;
        state.error = "Invalid password";
      }
    },
    logOut: (state) => {
      state.userType = null;
    },
  },
});

export const { authenticateUser, logOut } = loginSlice.actions;
export default loginSlice.reducer;
