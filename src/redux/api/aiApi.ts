import { baseApi } from "./baseApi";

const aiApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    aiGenerate: build.mutation({
      query: (data) => ({
        url: "/ai/gemeni",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useAiGenerateMutation } = aiApi;
