import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Exercise, MeasurementCategory, MuscleGroup } from "../models/workout";

interface WorkoutState {
    exercises: Exercise[],
    selectedExercise?: Exercise
}

const initialState: WorkoutState = {
    exercises: [
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

const addExercise = createAsyncThunk<Exercise, Exercise, {}>(
    "workout/addExcercise",
    async function (payload) {
        await new Promise(resolve => setTimeout(resolve, 1200));

        payload.id = new Date().getTime();

        return payload;
    }
);

const updateExercise = createAsyncThunk<Exercise, Exercise, {}>(
    "workout/updateExercise",
    async function (payload) {
        await new Promise(resolve => setTimeout(resolve, 1200));

        return payload;
    }
);

const workoutSlice = createSlice({
    name: 'workout',
    initialState: initialState,
    reducers: {
        setSelectedExcercise(state, action: PayloadAction<Exercise | undefined>) {
            state.selectedExercise = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addExercise.fulfilled, function(state, action) {
            state.exercises.push(action.payload);
        });

        builder.addCase(updateExercise.fulfilled, function(state, action) {
            const exercise = state.exercises.find(e => e.id === action.payload.id);
            if (!exercise) {
                return;
            }

            exercise.title = action.payload.title;
            exercise.description = action.payload.description;
            exercise.muscleGroup = action.payload.muscleGroup;
            exercise.measurementCategory = action.payload.measurementCategory;

            state.selectedExercise = exercise;
        });
    }
});

export default workoutSlice.reducer;

export const WorkoutAction = {
    addExcercise: addExercise,
    updateExcercise: updateExercise,
    ...workoutSlice.actions
};