import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminReducerInitialState, AdminRequest } from "../../Types/API/AdminApiType";

const initialState: AdminReducerInitialState = {
    admin: null,
    loading: false
};

const AdminReducer = createSlice({
    name: "AdminReducer",
    initialState,
    reducers: {
        adminExits: (state, action: PayloadAction<AdminRequest>) => {
            state.loading = false;
            state.admin = action.payload;
        },
        adminNotExits: (state) => {
            state.loading = false;
            state.admin = null;
        },
    }
});

export const { adminExits, adminNotExits } = AdminReducer.actions;
export default AdminReducer.reducer; // Export the reducer
