import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExcercise, ExcerciseGroup } from "../models/workout";

type WorkoutState = {
    excercises: IExcercise[]
}

const initialState = {
    excercises: [
        {
            id: 1,
            title: "banch press",
            imageUrl: "https://www.lyfta.app/_next/image?url=https%3A%2F%2Flyfta.app%2Fimages%2Fexercises%2F00251101.png&w=640&q=10",
            excerciseGroup: ExcerciseGroup.Chest
        },
        {
            id: 2,
            title: "dumbbel v storonu",
            excerciseGroup: ExcerciseGroup.Chest
        },
        {
            id: 3,
            title: "Upraznenie 3",
            excerciseGroup: ExcerciseGroup.Chest
        }
    ]
}

const workoutSlice = createSlice({
    name: 'workout',
    initialState: initialState,
    reducers: {
        addExcercise(state: WorkoutState, action: PayloadAction<IExcercise>) {
            state.excercises.push(action.payload);
        }
    }
});

export const { addExcercise } = workoutSlice.actions;
export default workoutSlice.reducer;