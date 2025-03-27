import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AdminAPI = createApi({
    reducerPath: "AdminAPI",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_SERVER}/admin/`, 
        credentials: "include"  // ✅ Ensure cookies are sent with requests
    }),
    tagTypes: ["admin"],  //  Added tagTypes for caching
    endpoints: (builders) => ({
        signup: builders.mutation({
            query: (formData) => ({
                url: "register",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["admin"]  //  Invalidate cache after signup
        }),
        login:builders.mutation({
            query: (formData)=>({
                url:"login",
                method:"POST",
                body:formData
            }) ,
            invalidatesTags:["admin"]
        }),
        logout:builders.mutation({
            query:()=>({
                url:"logout",
                method:"GET"
            }),
            invalidatesTags:["admin"]
        }),
        getAllStudent:builders.mutation({
            query:()=>({
                url:"getallstudent",
                method:"GET"  
            }),
            invalidatesTags:["admin"]
        }),
        getAllTeachers:builders.mutation({
            query:()=>({
                url:"getallteacher",
                method:"GET"  
            }),
            invalidatesTags:["admin"]
        }),
        getTeacherInfo:builders.mutation({
            query:(_id)=>({
                url:"teacherinfo",
                method:"POST",
                body:{_id:_id}  
            }),
            invalidatesTags:["admin"]
        }),
        
    })
});

export const { useSignupMutation , useLoginMutation , useLogoutMutation , useGetAllStudentMutation , useGetAllTeachersMutation , useGetTeacherInfoMutation} = AdminAPI;
