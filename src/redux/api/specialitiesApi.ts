import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const specialitiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSpecialities: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/specialities",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: any) => {
        return {
          specialities: response,
          meta,
        };
      },
      providesTags: [tagTypes.specialities],
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
  useGetAllSpecialitiesQuery,
  useCreateSpecialitiesMutation,
  useUpdateSpecialitiesMutation,
  useDeleteSpecialitiesMutation
} = specialitiesApi;
