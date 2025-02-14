import { configureStore } from "@reduxjs/toolkit";
import { StudentAPI } from '../Redux/API/Student';
// import { StudentAPI } from '../Redux/API/Teacher\';
import StudentReducer from './slices/StudentSlices'
import TeacherReducer from './slices/TeacherSlice'
import { TeacherAPI } from "./API/Teacher";

const store = configureStore({
  reducer: {
    [StudentAPI.reducerPath]: StudentAPI.reducer,
    student:StudentReducer,
    [TeacherAPI.reducerPath]: TeacherAPI.reducer,
    teacher:TeacherReducer,

  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(StudentAPI.middleware).concat(TeacherAPI.middleware),
});

export default store;
