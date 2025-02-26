import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const appointmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyAppointment: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/appointment/my-appointent",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.appointment],
    }),
    getDoctorAppointment: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/appointment/doctor",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.appointment],
    }),
    createAppointment: build.mutation({
      query: (data) => ({
        url: "/appointment/store",
        method: "POST",
        data,
      }),
      invalidatesTags: [
        tagTypes.singleDoctor,
        tagTypes.doctorSchedule,
      ],
    }),
  }),
});

export const {
  useGetMyAppointmentQuery,
  useGetDoctorAppointmentQuery,
  useCreateAppointmentMutation,
} = appointmentApi;
