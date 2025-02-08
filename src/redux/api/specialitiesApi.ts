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
      transformResponse: (response:any,meta:any) => {
        return {
            specialities:response,
            meta
        }
      },
      providesTags: [tagTypes.specialities],
    }),
  }),
});

export const { useGetAllSpecialitiesQuery } = specialitiesApi;
