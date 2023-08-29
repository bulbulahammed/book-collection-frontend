/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface IAuthState {
  token: string | null;
  user: {
    email: string | null;
  };
}

const storedToken = localStorage.getItem("token");
const storedEmail = localStorage.getItem("email");

const initialState: IAuthState = {
  token: storedToken !== null ? storedToken : null,
  user: {
    email: storedEmail !== null ? storedEmail : null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        token: string;
        user: {
          email: string;
        };
      }>
    ) => {
      state.token = action.payload.token;
      state.user.email = action.payload.user.email;
    },
    defaultState: (state) => {
      state.token = null;
      state.user.email = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, defaultState } = authSlice.actions;

export default authSlice.reducer;
