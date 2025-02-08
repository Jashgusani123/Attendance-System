import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StudentRequest, StudentResponse } from "../../Types/API/StudentApiType";

// export const UserAPI = createApi({
//     reducerPath: "UserAPI",
//     baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/` }),
//     tagTypes:["users"],
//     endpoints: (builders) => ({
//       login: builders.mutation<MessageResponse, User>({
//         query: (user) => ({
//           url: "new",
//           method: "post",
//           body: user,
//         }),
//         invalidatesTags:["users"]
//       }),
//       allUsers:builders.query<AllUsersRespones , string>({
//         query:(id)=>`all?id=${id}`,
//         providesTags:["users"]
//       }),
//       deleteUser:builders.mutation<MessageResponse,DeleteUserRequest>({
//         query: ({userId , adminUserId}) => ({
//           url: `${userId}?id=${adminUserId}`,
//           method: "DELETE",
//         }),
//         invalidatesTags:["users"]
//       })
//     }),
//   });

export const StudentAPI = createApi({
    reducerPath:"StudentAPI",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/student/` }),
     endpoints: (builders) => ({
        signup:builders.mutation<StudentResponse,StudentRequest>({
            query:({fullName , collegeJoiningDate , departmentName , collegeName , email , enrollmentNumber , password , semester})=>({
                url:"register",
                method:"POST",
                body:{fullName , collegeJoiningDate , departmentName , collegeName , email , enrollmentNumber , password , semester}
            })
        })
     })
});

export const {useSignupMutation} = StudentAPI;