import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_PORT}/api`,
    credentials: "include",
  }),
  tagTypes: ["Product", "AdminProduct", "Review"],
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query(body) {
        return {
          url: "/post",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),
    getPosts: builder.query({
      query: (params) => ({
        url: "/get/posts",
        params: {
          page: params?.page,
          title: params?.title,
          tags: params?.tags,
          name: params?.name,
        },
      }),
      providesTags: ["Product"],
    }),
    likePost: builder.mutation({
      query({ id, userId }) {
        return {
          url: `/${id}/likePost`,
          method: "PUT",
          body: { userId },
        };
      },
      invalidatesTags: ["Product"],
    }),
    getPostsByTag: builder.query({
      query: (tag) => ({
        url: `/posts/tag/${tag}`,
      }),
    }),
    deleteProduct: builder.mutation({
      query(id) {
        return {
          url: `/product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useLikePostMutation,
  useGetPostsByTagQuery,
  useDeleteProductMutation,
} = postApi;
