import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from './application.slice';
import exercisesReducer from "./exercises.slice";
import programsReducer from "./programs.slice";

const store = configureStore({
    reducer: {
        application: applicationReducer,
        exercises: exercisesReducer,
        programs: programsReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;