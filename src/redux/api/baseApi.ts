import { createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'



export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: () => ({}),
  tagTypes:[]
})

// axiosBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/' })