import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
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
  useUserLoginMutation
} =authApi 
