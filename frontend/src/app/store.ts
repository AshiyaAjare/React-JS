import { configureStore } from '@reduxjs/toolkit';
import { loginApi } from '../features/Login/api/loginApi';
import { acceptInvitationAPI } from '../features/AcceptInvite/api/acceptInvitationApi';
import { userAPI } from '../features/Users/api/userApi';
import authReducer from "./authSlice";
import { queryAPI } from '../features/Query/api/queryApi';
import { tagAPI } from '../features/Shared/api/tagsApi';
import { responseAPI } from '../features/Response/api/responseApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [loginApi.reducerPath]: loginApi.reducer, 
    [acceptInvitationAPI.reducerPath]: acceptInvitationAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [queryAPI.reducerPath]: queryAPI.reducer,
    [tagAPI.reducerPath]: tagAPI.reducer,
    [responseAPI.reducerPath]: responseAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware, acceptInvitationAPI.middleware, userAPI.middleware, 
      queryAPI.middleware, tagAPI.middleware, responseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
