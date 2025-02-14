import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUser: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/user",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: any) => {
        return {
          users: response,
          meta,
        };
      },
    }),
    userLogin: build.mutation({
      query: (data) => ({
        url: "/auth",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useUserLoginMutation
} =authApi 
