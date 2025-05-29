import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminRequest ,AdminReducerInitialState } from "../../Types/API/AdminType";

const initialState: AdminReducerInitialState = {
    admin: null,
    loading: false
};

const AdminReducer = createSlice({
    name: "AdminReducer",
    initialState,
    reducers: {
        AdminExits: (state, action: PayloadAction<AdminRequest>) => {
            state.loading = false;
            state.admin = action.payload;
        },
        AdminNotExits: (state) => {
            state.loading = false;
            state.admin = null;
        },
    }
});

export const { AdminExits, AdminNotExits } = AdminReducer.actions;
export default AdminReducer.reducer; // Export the reducer
