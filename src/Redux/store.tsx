import { configureStore } from "@reduxjs/toolkit";
import { StudentAPI } from '../Redux/API/Student';

const store = configureStore({
  reducer: {
    [StudentAPI.reducerPath]: StudentAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(StudentAPI.middleware),
});

export default store;
