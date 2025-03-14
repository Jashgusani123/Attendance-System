import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeacherReducerInitialState, TeacherRequest } from "../../Types/API/TeacherApiType";

const initialState: TeacherReducerInitialState = {
    teacher: null,
    loading: false
};

const TeacherReducer = createSlice({
    name: "TeacherReducer",
    initialState,
    reducers: {
        teacherExits: (state, action: PayloadAction<TeacherRequest>) => {
            state.loading = false;
            state.teacher = action.payload;
        },
        teacherNotExits: (state) => {
            state.loading = false;
            state.teacher = null;
        },
    }
});

export const { teacherExits, teacherNotExits } = TeacherReducer.actions;
export default TeacherReducer.reducer; // Export the reducer
