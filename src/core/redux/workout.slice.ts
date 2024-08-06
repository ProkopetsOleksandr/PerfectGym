import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { Exercise } from "../models/workout";

interface WorkoutState {
    exercises: Exercise[],
    selectedExercise?: Exercise
}

const exerciseCollection = collection(firestore, "exercises");

const initialState: WorkoutState = {
    exercises: []
}

const loadExercises = createAsyncThunk<Exercise[], void, {}>(
    "workout/loadExercises",
    async function () : Promise<Exercise[]> {
        const data = await getDocs(exerciseCollection);
        const filteredData = data.docs.map(doc => {
            const data = doc.data();

            const exercise: Exercise = {
                id: doc.id,
                title: data.title,
                description: data.descripion,
                muscleGroup: data.muscleGroup,
                measurementCategory: data.measurementCategory,
                imageUrl: data.imageUrl
            }

            return exercise;
        });

        console.log(filteredData);

        return filteredData;
    }
);

const addExercise = createAsyncThunk<Exercise, Exercise, {}>(
    "workout/addExcercise",
    async function (exercise) {
        const {id, ...newExercise} = exercise;

        const result = await addDoc(exerciseCollection, newExercise);

        exercise.id = result.id;

        return exercise;
    }
);

const deleteExercise = createAsyncThunk<string, string, {}>(
    "workout/deleteExercise",
    async function(id: string) {
        const exerciseDoc = doc(firestore, "exercises", id);
        await deleteDoc(exerciseDoc);
        return id;
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
        builder.addCase(loadExercises.fulfilled, function (state, action) {
            state.exercises = action.payload;
        });

        builder.addCase(addExercise.fulfilled, function (state, action) {
            state.exercises.push(action.payload);
        });

        builder.addCase(deleteExercise.fulfilled, function (state, action) {
            state.exercises = state.exercises.filter(exercise => exercise.id !== action.payload);
        });

        builder.addCase(updateExercise.fulfilled, function (state, action) {
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
    ...workoutSlice.actions,
    addExcercise: addExercise,
    updateExcercise: updateExercise,
    loadExercises: loadExercises,
    deleteExercise: deleteExercise
};