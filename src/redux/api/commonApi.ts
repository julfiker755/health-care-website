import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const commonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleProfile: build.query({
      query: () => ({
        url: "/user/my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updatePassword: build.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useGetSingleProfileQuery,
  useUpdatePasswordMutation
} =commonApi

