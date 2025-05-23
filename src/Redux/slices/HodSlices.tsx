import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HodReducerInitialState, HodRequest } from "../../Types/API/HodApiType";

const initialState: HodReducerInitialState = {
    hod: null,
    loading: false
};

const HodReducer = createSlice({
    name: "HodReducer",
    initialState,
    reducers: {
        HodExits: (state, action: PayloadAction<HodRequest>) => {
            state.loading = false;
            state.hod = action.payload;
        },
        HodNotExits: (state) => {
            state.loading = false;
            state.hod = null;
        },
    }
});

export const { HodExits, HodNotExits } = HodReducer.actions;
export default HodReducer.reducer; // Export the reducer
