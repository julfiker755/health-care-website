import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBlog: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/news/all",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.news],
      transformResponse: (response: any, meta: any) => {
        return {
          blog: response,
          meta,
        };
      },
    }),
    storeBlog: build.mutation({
      query: (data) => ({
        url: "/news/store",
        method: "POST",
        data,
      }),
      invalidatesTags:[tagTypes.news]
    }),
    removeBlogs: build.mutation({
        query: (id) => ({
          url: `/news/${id}`,
          method: "DELETE",
        }),
        invalidatesTags:[tagTypes.news]
      }),
  }),
});

export const {
  useStoreBlogMutation,
  useGetAllBlogQuery,
  useRemoveBlogsMutation
} = blogApi;
