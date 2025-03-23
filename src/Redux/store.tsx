import { configureStore } from "@reduxjs/toolkit";
import { StudentAPI } from '../Redux/API/Student';
import StudentReducer from './slices/StudentSlices'
import TeacherReducer from './slices/TeacherSlice'
import AdminReducer from './slices/AdminSlices'
import { TeacherAPI } from "./API/Teacher";
import { AdminAPI } from "./API/Admin";

const store = configureStore({
  reducer: {
    [StudentAPI.reducerPath]: StudentAPI.reducer,
    student:StudentReducer,
    [TeacherAPI.reducerPath]: TeacherAPI.reducer,
    teacher:TeacherReducer,
    [AdminAPI.reducerPath]: AdminAPI.reducer,
    admin:AdminReducer,
  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(StudentAPI.middleware).concat(TeacherAPI.middleware).concat(AdminAPI.middleware),
});

export default store;
