import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StudentLogout, StudentRequest, StudentRequestForLogin, StudentResponse } from "../../Types/API/StudentApiType";

export const StudentAPI = createApi({
    reducerPath: "StudentAPI",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_SERVER}/student/`, 
        credentials: "include"  // ✅ Ensure cookies are sent with requests
    }),
    tagTypes: ["students"],  //  Added tagTypes for caching
    endpoints: (builders) => ({
        signup: builders.mutation<StudentResponse, StudentRequest>({
            query: (formData) => ({
                url: "register",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["students"]  //  Invalidate cache after signup
        }),
        login: builders.mutation<StudentResponse, StudentRequestForLogin>({
            query: (formData) => ({
                url: "login",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["students"]  //  Invalidate cache after login
        }),
        logout:builders.mutation<StudentLogout , null>({
            query:()=>({
                url:"logout",
                method:"GET"
            }),
            invalidatesTags:["students"]
        })
    })
});

export const { useSignupMutation , useLoginMutation , useLogoutMutation} = StudentAPI;
