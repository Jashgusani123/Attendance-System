import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudentReducerInitialState, StudentRequest } from "../../Types/API/StudentApiType";

const initialState: StudentReducerInitialState = {
    student: null,
    loading: false
};

const StudentReducer = createSlice({
    name: "StudentReducer",
    initialState,
    reducers: {
        studentExits: (state, action: PayloadAction<StudentRequest>) => {
            state.loading = false;
            console.log("In State : " , action.payload);
            
            state.student = action.payload;
        },
        studentNotExits: (state) => {
            state.loading = false;
            state.student = null;
        },
    }
});

export const { studentExits, studentNotExits } = StudentReducer.actions;
export default StudentReducer.reducer; // Export the reducer
