import { configureStore } from "@reduxjs/toolkit";
import PostReducer from "./features/postSlice";
import AuthReducer from "./features/userSlice";
import { postApi } from "./api/postApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    post: PostReducer,
    [postApi.reducerPath]: postApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      postApi.middleware,
      authApi.middleware,
      userApi.middleware,
    ]),
});
