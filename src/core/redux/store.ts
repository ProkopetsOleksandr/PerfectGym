import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./workout.slice";

const store = configureStore({
    reducer: {
        workout: workoutReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;