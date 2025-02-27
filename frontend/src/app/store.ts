import { configureStore } from '@reduxjs/toolkit';
import { loginApi } from '../features/Login/api/loginApi';

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer, // Add RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware), // Add RTK Query middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
