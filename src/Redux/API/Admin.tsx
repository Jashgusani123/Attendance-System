import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AdminCreatetationRequest, AdminCreatetationResponse, AdminLoginRequest, AdminLoginResponse, AdminLogoutRespose, AdminRequest, AdminResponse, AllNotificationsResponse, ClassesResponse, Departments, FingerprintRegisterRequest, FingerprintRegisterRespose, FirstCard, JoingTableDataResponse, RequestNotification, RequestResponse, ResponseDeleteResponse, ResponseForCollege, ResponseOfAllCollege, ResponseOfNotification, SearchWordResponse, UsersResponse } from "../../Types/API/AdminType";

export const AdminAPI = createApi({
    reducerPath: "AdminAPI",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/admin`, 
        credentials: "include"  // ✅ Ensure cookies are sent with requests
    }),
    tagTypes: ["admin" , "requests" , "notification"],  //  Added tagTypes for caching
    endpoints: (builders) => ({
        createAdmin: builders.mutation<AdminCreatetationResponse,AdminCreatetationRequest >({
            query: (formData) => ({
                url: "registraction",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["admin"]  //  Invalidate cache after signup
        }),
        LoginAdmin: builders.mutation<AdminLoginResponse,AdminLoginRequest >({
            query: (formData) => ({
                url: "login",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["admin"]  //  Invalidate cache after signup
        }),
        logoutAdmin: builders.mutation<AdminLogoutRespose,void >({
            query: () => ({
                url: "logout",
                method: "POST",
            }),
            invalidatesTags: ["admin"]  //  Invalidate cache after signup
        }),
        createcollege: builders.mutation<AdminResponse,AdminRequest >({
            query: (formData) => ({
                url: "createclg",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["admin"]  //  Invalidate cache after signup
        }),
        getAllColleges: builders.query<ResponseOfAllCollege, void>({
            query: () => ({
                url: "getallcolleges",
                method: "GET",
            }),
        }),
        getCollege: builders.query<ResponseForCollege, string>({
            query: (id) => ({
                url: `college?id=${id}`,
                method: "GET",
              }),
        }),
        searchCollege: builders.query<SearchWordResponse, string>({
            query: (word) => ({
                url: `search?search=${word}`,
                method: "GET",
              }),
        }),
        getFirstCards: builders.query<FirstCard, void>({
            query: () => ({
                url: `firstcards`,
                method: "GET",
              }),
        }),
        getJoingTable: builders.query<JoingTableDataResponse, void>({
            query: () => ({
                url: `firsttable`,
                method: "GET",
              }),
        }),
        getAllDepartments: builders.query<Departments, void>({
            query: () => ({
                url: `getdepartments`,
                method: "GET",
              }),
        }),

        getAllUsers: builders.query<UsersResponse, void>({
            query: () => ({
                url: `alluser`,
                method: "GET",
              }),
        }),
        getAllClasses: builders.query<ClassesResponse, void>({
            query: () => ({
                url: `getclasses`,
                method: "GET",
              }),
        }),
        getRequests: builders.query<RequestResponse, void>({
            query: () => ({
                url: `getrequests`,
                method: "GET",
              }),
              providesTags:["requests"]
        }),
        deleteRequest: builders.mutation<ResponseDeleteResponse, String>({
            query: (id) => ({
                url: `${import.meta.env.VITE_SERVER}/panding/delete`,
                method: "DELETE",
                body:{id},
              }),
              invalidatesTags: ["requests"]
        }),
        getAllNotifications: builders.query<AllNotificationsResponse, void>({
            query: () => ({
                url: `getnotifications`,
                method: "GET",
              }),
              providesTags:["notification"]
        }),
        notification: builders.mutation<ResponseOfNotification, RequestNotification>({
            query: ({ description, to, type, upperHeadding }) => ({
                url: `${import.meta.env.VITE_SERVER}/notification/create`,
                method: "POST",
                body: { description, to, type, upperHeadding },
            }),
            invalidatesTags: ["notification"] 
        }),
        deleteNotification: builders.mutation<ResponseDeleteResponse, String>({
            query: (id) => ({
                url: `deletenotification?id=${id}`,
                method: "DELETE",
              }),
              invalidatesTags: ["notification"]
        }),
        FingerprintRegister: builders.mutation<FingerprintRegisterRespose, FingerprintRegisterRequest>({
            query: ({credentialID, publicKey, counter, transports}) => ({
                url: `register-credential`,
                method: "PUT",
                body:{credentialID, publicKey, counter, transports}
              }),
              invalidatesTags: ["notification"]
        }),
        FingerprintLogin: builders.mutation({
            query: ({ credentialID }) => ({
              url: "/login-fingerprint",
              method: "PUT",
              body: { credentialID }
            })
          }),
          
    })
});

export const { useCreateAdminMutation , useLoginAdminMutation , useLogoutAdminMutation , useFingerprintRegisterMutation, useFingerprintLoginMutation  ,useCreatecollegeMutation , useGetAllCollegesQuery , useGetCollegeQuery ,useSearchCollegeQuery , useGetAllDepartmentsQuery, useGetAllClassesQuery ,useGetFirstCardsQuery , useGetJoingTableQuery , useGetAllUsersQuery , useGetRequestsQuery , useDeleteRequestMutation , useNotificationMutation , useGetAllNotificationsQuery , useDeleteNotificationMutation} = AdminAPI;
