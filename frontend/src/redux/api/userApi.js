import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, setisAuthenticated } from "../features/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_PORT}/api`,
    credentials: "include",
  }),
  tagTypes: ["User", "AdminUser"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/me/profile",
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setisAuthenticated(true));
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery } = userApi;
