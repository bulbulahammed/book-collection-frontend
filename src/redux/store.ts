import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/user/userSlice";
import logger from "./middlewares/loggers";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
  // To prevent Overwrite middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
