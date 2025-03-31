import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PandingReducerInitialState, PandingRequest } from "../../Types/API/PandingApiType";

const initialState: PandingReducerInitialState = {
    panding: null,
    loading: false
};

const PandingReducer = createSlice({
    name: "PandingRequest",
    initialState,
    reducers: {
        pandingExits: (state, action: PayloadAction<PandingRequest>) => {
            state.loading = false;
            state.panding = action.payload;
        },
        pandingNotExits: (state) => {
            state.loading = false;
            state.panding = null;
        },
    }
});

export const { pandingExits, pandingNotExits } = PandingReducer.actions;
export default PandingReducer.reducer; // Export the reducer
