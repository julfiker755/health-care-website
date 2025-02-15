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
    getSingleDoctor: build.query({
      query: (id: string) => ({
        url: `/doctor/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.doctor],
    }),
    createDoctor: build.mutation({
      query: (data) => ({
        url: "/user/doctor-store",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.doctor],
    }),
    deleteDoctor: build.mutation({
      query: (id) => ({
        url: `/doctor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.doctor],
    }),
    updateDoctor: build.mutation({
      query: (data) => ({
        url: "/doctor/update",
        method: "PUT",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetAllDoctorQuery,
  useGetSingleDoctorQuery,
  useCreateDoctorMutation,
  useDeleteDoctorMutation,
  useUpdateDoctorMutation,
} = doctorsApi;
