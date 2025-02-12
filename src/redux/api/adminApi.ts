import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updateDoctor: build.mutation({
        query: (data) => ({
          url: "/admin/update",
          method: "PUT",
          ContentType: "multipart/form-data",
          data,
        }),
        invalidatesTags: [tagTypes.common],
      }),
  }),
});

export const {
  useUpdateDoctorMutation
} =adminApi
