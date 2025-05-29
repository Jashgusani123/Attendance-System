import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AdminRequest, AdminResponse, FirstCard, JoingTableDataResponse, ResponseForCollege, ResponseOfAllCollege, SearchWordResponse, UsersResponse } from "../../Types/API/AdminType";

export const AdminAPI = createApi({
    reducerPath: "AdminAPI",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/admin`, 
        credentials: "include"  // ✅ Ensure cookies are sent with requests
    }),
    tagTypes: ["admin"],  //  Added tagTypes for caching
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
        getAllUsers: builders.query<UsersResponse, void>({
            query: () => ({
                url: `alluser`,
                method: "GET",
              }),
        }),
    })
});

export const { useCreatecollegeMutation , useGetAllCollegesQuery , useGetCollegeQuery ,useSearchCollegeQuery , useGetFirstCardsQuery , useGetJoingTableQuery , useGetAllUsersQuery} = AdminAPI;
