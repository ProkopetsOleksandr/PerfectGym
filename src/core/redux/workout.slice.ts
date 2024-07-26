import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExcercise, MeasurementCategory, MuscleGroup } from "../models/workout";

interface WorkoutState {
    excercises: IExcercise[],
    selectedExcercise?: IExcercise
}

const initialState: WorkoutState = {
    excercises: [
        {
            id: 1,
            title: "banch press",
            imageUrl: "https://www.lyfta.app/_next/image?url=https%3A%2F%2Flyfta.app%2Fimages%2Fexercises%2F00251101.png&w=640&q=10",
            muscleGroup: MuscleGroup.Chest,
            measurementCategory: MeasurementCategory.WeightAndReps
        },
        {
            id: 2,
            title: "dumbbel v storonu",
            muscleGroup: MuscleGroup.Chest,
            measurementCategory: MeasurementCategory.WeightAndReps
        },
        {
            id: 3,
            title: "Upraznenie 3",
            description: "Very helpful descripion",
            muscleGroup: MuscleGroup.Chest,
            measurementCategory: MeasurementCategory.WeightAndReps
        }
    ]
}

const addExcercise = createAsyncThunk<IExcercise, IExcercise, {}>(
    "workout/addExcercise",
    async function (payload) {
        await new Promise(resolve => setTimeout(resolve, 1200));

        payload.id = new Date().getTime();

        return payload;
    }
);

const workoutSlice = createSlice({
    name: 'workout',
    initialState: initialState,
    reducers: {
        setSelectedExcercise(state, action: PayloadAction<IExcercise | undefined>) {
            state.selectedExcercise = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addExcercise.fulfilled, function(state, action) {
            state.excercises.push(action.payload);
        });
    }
});

export default workoutSlice.reducer;

export const WorkoutActions = { addExcercise, ...workoutSlice.actions };