/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface IAuthState {
  token: string | null;
  user: {
    email: string | null;
    id: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

const storedToken = localStorage.getItem("token");
const storedEmail = localStorage.getItem("email");
const storedId = localStorage.getItem("id");

const initialState: IAuthState = {
  token: storedToken !== null ? storedToken : null,
  user: {
    email: storedEmail !== null ? storedEmail : null,
    id: storedId !== null ? storedId : null,
  },
  isLoading: false,
  isError: false,
  error: null,
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
          id: string;
        };
      }>
    ) => {
      state.token = action.payload.token;
      state.user.email = action.payload.user.email;

      // Retrieve id from local storage and update the state
      const storedId = localStorage.getItem("id");
      state.user.id = storedId !== null ? storedId : null;
    },
    defaultState: (state) => {
      state.token = null;
      state.user.email = null;
      state.user.id = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, defaultState } = authSlice.actions;

export default authSlice.reducer;
