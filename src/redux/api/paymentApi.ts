import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
     getAllPayment: build.query({
          query: (arg: Record<string, any>) => ({
            url: "/payment/success",
            method: "GET",
            params: arg,
          }),
        }),
    createPayment: build.mutation({
      query: (data) => ({
        url: "/payment/store",
        method: "POST",
        data,
      }),
    }),

  }),
});

export const {useGetAllPaymentQuery,useCreatePaymentMutation} = paymentApi
