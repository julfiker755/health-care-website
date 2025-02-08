import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";


const specialitiesApi=baseApi.injectEndpoints({
    endpoints:(build)=>({
        getAllSpecialities:build.query({
            query:()=>({
                url:"/specialities",
                method:"GET"
            }),
         providesTags:[tagTypes.specialities]
        })
    })
})

export const {useGetAllSpecialitiesQuery}=specialitiesApi