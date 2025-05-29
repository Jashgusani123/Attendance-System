import { configureStore } from "@reduxjs/toolkit";
import { StudentAPI } from '../Redux/API/Student';
import { HodAPI } from "./API/Hod";
import { TeacherAPI } from "./API/Teacher";
import { PandingAPI } from "./API/Panding";
import HodReducer from './slices/HodSlices';
import StudentReducer from './slices/StudentSlices';
import TeacherReducer from './slices/TeacherSlice';
import PandingReducer from './slices/PandingSlices';
import AdminReducer from './slices/AdminSlices';
import { AdminAPI } from "./API/Admin";

const store = configureStore({
  reducer: {
    [StudentAPI.reducerPath]: StudentAPI.reducer,
    student: StudentReducer,
    [TeacherAPI.reducerPath]: TeacherAPI.reducer,
    teacher: TeacherReducer,
    [HodAPI.reducerPath]: HodAPI.reducer,
    hod: HodReducer,
    [PandingAPI.reducerPath]: PandingAPI.reducer,
    panding: PandingReducer,
    [AdminAPI.reducerPath]: AdminAPI.reducer,
    admin: AdminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(StudentAPI.middleware).concat(TeacherAPI.middleware).concat(HodAPI.middleware).concat(PandingAPI.middleware).concat(AdminAPI.middleware),
});

export default store;
