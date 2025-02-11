import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const doctorsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDoctor: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/doctor",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: any) => {
        return {
          doctors: response,
          meta,
        };
      },
      providesTags: [tagTypes.doctor],
    }),
    createSpecialities: build.mutation({
      query: (data) => ({
        url: "/specialities/store",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.specialities],
    }),
    updateSpecialities: build.mutation({
      query: ({ id, data }) => ({
        url: `/specialities/update/${id}`,
        method: "PUT",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.specialities],
    }),
    deleteSpecialities: build.mutation({
      query: (id) => ({
        url: `/specialities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.specialities],
    }),
  }),
});

export const {
  useGetAllDoctorQuery,
  useCreateSpecialitiesMutation,
  useUpdateSpecialitiesMutation,
  useDeleteSpecialitiesMutation
} = doctorsApi
