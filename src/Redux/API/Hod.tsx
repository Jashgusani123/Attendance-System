import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const HodAPI = createApi({
  reducerPath: "HodAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/hod/`,
    credentials: "include", // ✅ Ensure cookies are sent with requests
  }),
  tagTypes: ["hod"], //  Added tagTypes for caching
  endpoints: (builders) => ({
    signup: builders.mutation({
      query: (formData) => ({
        url: "register",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["hod"], //  Invalidate cache after signup
    }),
    login: builders.mutation({
      query: (formData) => ({
        url: "login",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["hod"],
    }),
    logout: builders.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      invalidatesTags: ["hod"],
    }),
    getAllStudent: builders.mutation({
      query: () => ({
        url: "getallstudent",
        method: "GET",
      }),
      invalidatesTags: ["hod"],
    }),
    getAllTeachers: builders.mutation({
      query: () => ({
        url: "getallteacher",
        method: "GET",
      }),
      invalidatesTags: ["hod"],
    }),
    getTeacherInfo: builders.mutation({
      query: (_id) => ({
        url: "teacherinfo",
        method: "POST",
        body: { _id: _id },
      }),
      invalidatesTags: ["hod"],
    }),
    getAbsentPresent7DaysData: builders.mutation({
      query: (_id) => ({
        url: "absent_present_data",
        method: "POST",
        body: { Id: _id },
      }),
      invalidatesTags: ["hod"],
    }),
    getOverViewOfLast7Days: builders.mutation({
      query: (_id) => ({
        url: "last7daysoverview",
        method: "POST",
        body: { Id: _id },
      }),
    }),
    getPresentAndAbsentCards: builders.mutation({
      query: (_id) => ({
        url: "getapcard",
        method: "POST",
        body: { Id: _id },
      }),
    }),
    getAllCards: builders.mutation({
      query: () => ({
        url: "getallcard",
        method: "GET",
      }),
    }),
    getBoysAndGirlsOverview: builders.mutation({
      query: () => ({
        url: "getoverview",
        method: "GET",
      }),
    }),
    getAttendaceOverview: builders.mutation({
      query: () => ({
        url: "getattendaceoverview",
        method: "GET",
      }),
    }),
    sendNotification: builders.mutation({
      query: ({ message, teacherId }) => ({
        url: "sendnotifiction",
        method: "POST",
        body: { message, teacherId },
      }),
    }),
    getAllNotification: builders.mutation({
      query: () => ({
        url: "getnotification",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetAllStudentMutation,
  useGetAllTeachersMutation,
  useGetTeacherInfoMutation,
  useGetAbsentPresent7DaysDataMutation,
  useGetOverViewOfLast7DaysMutation,
  useGetPresentAndAbsentCardsMutation,
  useGetAllCardsMutation,
  useGetBoysAndGirlsOverviewMutation,
  useGetAttendaceOverviewMutation,
  useSendNotificationMutation,
  useGetAllNotificationMutation,
} = HodAPI;
