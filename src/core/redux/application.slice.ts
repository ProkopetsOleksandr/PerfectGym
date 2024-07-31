import { createSlice } from "@reduxjs/toolkit";

interface ApplicationState {
    isLoading: boolean,
    isInitialized: boolean,
    initialization: {
        firebaseInitialized: boolean
    }
}

const initialState: ApplicationState = {
    isLoading: false,
    isInitialized: false,
    initialization: {
        firebaseInitialized: false
    }
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
        firebaseInitialized(state) {
            state.initialization.firebaseInitialized = true;
            state.isInitialized = isAppInitialized(state);
        }
    }
});

function isAppInitialized(state: ApplicationState) : boolean {
    return state.initialization.firebaseInitialized;
}

export default applicationSlice.reducer;

export const ApplicationAction = {...applicationSlice.actions};