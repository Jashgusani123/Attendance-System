import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TeacherLogout, TeacherRequest, TeacherRequestForLogin, TeacherResponse } from "../../Types/API/TeacherApiType";

export const TeacherAPI = createApi({
    reducerPath: "TeacherAPI",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_SERVER}/teacher/`, 
        credentials: "include"  // ✅ Ensure cookies are sent with requests
    }),
    tagTypes: ["teacher"],  //  Added tagTypes for caching
    endpoints: (builders) => ({
        signup: builders.mutation<TeacherResponse, TeacherRequest>({
            query: (formData) => ({
                url: "register",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["teacher"]  //  Invalidate cache after signup
        }),
        login: builders.mutation<TeacherResponse, TeacherRequestForLogin>({
            query: (formData) => ({
                url: "login",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["teacher"]  //  Invalidate cache after login
        }),
        logout:builders.mutation<TeacherLogout , null>({
            query:()=>({
                url:"logout",
                method:"GET"
            }),
            invalidatesTags:["teacher"]
        })
    })
});

export const { useSignupMutation , useLoginMutation , useLogoutMutation} = TeacherAPI;
