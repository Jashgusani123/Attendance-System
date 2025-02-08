

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudentReducerInitialState, StudentRequest } from "../../Types/API/StudentApiType";


const initialState:StudentReducerInitialState = {
    student: null,
    loading: true
}

// export const userReducer = createSlice({
//     name:"userReducer",
//     initialState,
//     reducers:{
//         userExits: (state , action:PayloadAction<User>)=>{
//             state.loading = false
//             state.user = action.payload
//         },
//         userNotExits: (state)=>{
//             state.loading = false
//             state.user = null
//         },

//     } 
// })

const StudentReducer = createSlice({
    name: "StudentReducer",
    initialState,
    reducers: {
        studentExits: (state, action: PayloadAction<StudentRequest>) => {
            state.loading = false
            state.student = action.payload
        },
        studentNotExits: (state) => {
            state.loading = false
            state.student = null
        },
    }
});

export default StudentReducer