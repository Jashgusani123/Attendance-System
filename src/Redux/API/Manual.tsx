import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StudentRequest, StudentResponse } from "../../Types/API/StudentApiType";

export const StudentAPI = createApi({
    reducerPath: "ManualAPI",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/` }),
    tagTypes: ["students"],  //  Added tagTypes for caching
    endpoints: (builders) => ({
        signup: builders.mutation<StudentResponse, StudentRequest>({
            query: (formData) => ({
                url: "register",
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["students"]  //  Invalidate cache after signup
        })
    })
});

export const { useSignupMutation } = StudentAPI;
