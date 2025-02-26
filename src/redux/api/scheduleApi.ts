import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSchedule: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/schedule",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: any) => {
        return {
          schedules: response,
          meta,
        };
      },
      providesTags: [tagTypes.schedule],
    }),
    getAllDoctorSchedule: build.query({
      query: () => ({
        url: "/schedule/doctor-schedule-all",
        method: "GET"
      }),
      providesTags: [tagTypes.commonSchedule],
    }),
    createSchedule: build.mutation({
      query: (data) => ({
        url: "/schedule/store",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.schedule],
    }),
    deleteSchedule: build.mutation({
      query: (id) => ({
        url: `/schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.schedule],
    }),
  }),
});

export const {
 useGetAllScheduleQuery,
 useGetAllDoctorScheduleQuery,
 useCreateScheduleMutation,
 useDeleteScheduleMutation
} = scheduleApi
