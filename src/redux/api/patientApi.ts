import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const patientApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPatient: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/patient",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: any) => {
        return {
          patients: response,
          meta,
        };
      },
      providesTags: [tagTypes.patient],
    }),
    createPatient: build.mutation({
      query: (data) => ({
        url: "/user/patient-store",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useCreatePatientMutation, useGetAllPatientQuery } = patientApi;
