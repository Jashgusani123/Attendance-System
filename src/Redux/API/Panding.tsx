import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PandingAPI = createApi({
    reducerPath: "PandingAPI",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_SERVER}/panding/`, 
        credentials: "include"  // ✅ Ensure cookies are sent with requests
    }),
    tagTypes: ["panding"],  //  Added tagTypes for caching
    endpoints: (builders) => ({
        createPandingRequest:builders.mutation({
            query: (formData) => ({
                url: "create",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["panding"]  //  Invalidate cache after signup
        }),
        acceptPandingReuest:builders.mutation({
            query: ({pandingId,_id}) => ({
                url: "accept",
                method: "POST",
                body:{pandingId , _id}
            }),
            invalidatesTags: ["panding"]  //  Invalidate cache after signup
        }),
        rejectPandingReuest:builders.mutation({
            query: ({pandingId,_id}) => ({
                url: "reject",
                method: "POST",
                body:{pandingId , _id}
            }),
            invalidatesTags: ["panding"]  //  Invalidate cache after signup
        }),
        deletePandingRequst:builders.mutation({
            query: () => ({
                url: "delete",
                method: "DELETE",
            }),
            invalidatesTags: ["panding"]  //  Invalidate cache after signup
        }),
    })
});

export const {useCreatePandingRequestMutation , useAcceptPandingReuestMutation, useRejectPandingReuestMutation,useDeletePandingRequstMutation} = PandingAPI;
