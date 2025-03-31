import { configureStore } from "@reduxjs/toolkit";
import { StudentAPI } from '../Redux/API/Student';
import { AdminAPI } from "./API/Admin";
import { TeacherAPI } from "./API/Teacher";
import { PandingAPI } from "./API/Panding";
import AdminReducer from './slices/AdminSlices';
import StudentReducer from './slices/StudentSlices';
import TeacherReducer from './slices/TeacherSlice';
import PandingReducer from './slices/PandingSlices';

const store = configureStore({
  reducer: {
    [StudentAPI.reducerPath]: StudentAPI.reducer,
    student:StudentReducer,
    [TeacherAPI.reducerPath]: TeacherAPI.reducer,
    teacher:TeacherReducer,
    [AdminAPI.reducerPath]: AdminAPI.reducer,
    admin:AdminReducer,
    [PandingAPI.reducerPath]: PandingAPI.reducer,
    panding:PandingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(StudentAPI.middleware).concat(TeacherAPI.middleware).concat(AdminAPI.middleware).concat(PandingAPI.middleware),
});

export default store;
