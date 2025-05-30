import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AdminRequest, AdminResponse, ClassesResponse, Departments, FirstCard, JoingTableDataResponse, RequestNotification, RequestResponse, ResponseDeleteResponse, ResponseForCollege, ResponseOfAllCollege, ResponseOfNotification, SearchWordResponse, UsersResponse } from "../../Types/API/AdminType";

export const AdminAPI = createApi({
    reducerPath: "AdminAPI",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/admin`, 
        credentials: "include"  // ✅ Ensure cookies are sent with requests
    }),
    tagTypes: ["admin" , "requests"],  //  Added tagTypes for caching
    endpoints: (builders) => ({
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
        notification: builders.mutation<ResponseOfNotification, RequestNotification>({
            query: ({description , to,type, upperHeadding}) => ({
                url: `${import.meta.env.VITE_SERVER}/notification/create`,
                method: "POST",
                body:{description , to , type ,upperHeadding},
              }),
        }),
    })
});

export const { useCreatecollegeMutation , useGetAllCollegesQuery , useGetCollegeQuery ,useSearchCollegeQuery , useGetAllDepartmentsQuery, useGetAllClassesQuery ,useGetFirstCardsQuery , useGetJoingTableQuery , useGetAllUsersQuery , useGetRequestsQuery , useDeleteRequestMutation , useNotificationMutation} = AdminAPI;
