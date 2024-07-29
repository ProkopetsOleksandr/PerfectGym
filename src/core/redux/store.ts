import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./workout.slice";
import applicationReducer from './application.slice';

const store = configureStore({
    reducer: {
        workout: workoutReducer,
        application: applicationReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;