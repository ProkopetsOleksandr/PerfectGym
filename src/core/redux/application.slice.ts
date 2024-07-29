import { createSlice } from "@reduxjs/toolkit";

interface ApplicationState {
    isLoading: boolean
}

const initialState: ApplicationState = {
    isLoading: false
}

const applicationSlice = createSlice({
    name: "application",
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        endLoading(state) {
            state.isLoading = false;
        },
    }
});

export default applicationSlice.reducer;

export const ApplicationAction = {...applicationSlice.actions};