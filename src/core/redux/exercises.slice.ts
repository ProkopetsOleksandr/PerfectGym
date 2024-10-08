import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MeasurementCategory, MuscleGroup } from "../models/enums";
import { IExercise } from "../models/workout";

interface ExercisesState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    exercises: IExercise[],
    filterDialog: {
        isOpen: boolean
    },
    exerciseDialog: {
        open: boolean,
        selectedExercise?: IExercise
        editMode: boolean,
        formValid: boolean
    }
}

const initialState: ExercisesState = {
    status: 'idle',
    exercises: [],
    filterDialog: {
        isOpen: false
    },
    exerciseDialog: { 
        open: false,
        editMode: false,
        formValid: false
    }
}

const loadExercises = createAsyncThunk<IExercise[], void, {}>("workout/loadExercises",
    async function (): Promise<IExercise[]> {
        // const exercises = await firestoreApi.exercises.getAllExercisesAsync();
        // console.log(exercises);

        const exercises: IExercise[] = [
            {
                id: 1,
                title: "Push from the chest",
                muscleGroup: MuscleGroup.Chest,
                measurementCategory: MeasurementCategory.Reps,
            },
            {
                id: 2,
                title: "Pullover for chest",
                muscleGroup: MuscleGroup.Chest,
                measurementCategory: MeasurementCategory.Reps,
            },
            {
                id: 3,
                title: "Banch press",
                muscleGroup: MuscleGroup.Chest,
                measurementCategory: MeasurementCategory.Reps,
            }
        ];

        return exercises;
    }
);

const addExercise = createAsyncThunk<IExercise, IExercise, {}>("workout/addExcercise",
    async function (exercise) {
        // const id = await firestoreApi.exercises.addExerciseAsync(exercise);
        // exercise.id = id;

        return exercise;
    }
);

const deleteExercise = createAsyncThunk<number, number, {}>("workout/deleteExercise",
    async function (id: number) {
        // await firestoreApi.exercises.deleteExerciseAsync(id);
        return id;
    }
);

const updateExercise = createAsyncThunk<IExercise, IExercise, {}>("workout/updateExercise",
    async function (payload) {
        await new Promise(resolve => setTimeout(resolve, 1200));

        return payload;
    }
);

const exercisesSlice = createSlice({
    name: 'exercises',
    initialState: initialState,
    reducers: {
        openFilterDialog(state) {
            state.filterDialog.isOpen = true;
        },
        closeFilterDialog(state) {
            state.filterDialog.isOpen = false;
        },
        openExerciseDialog(state, action: PayloadAction<IExercise | undefined>) {
            state.exerciseDialog.selectedExercise = action.payload;
            state.exerciseDialog.open = true;
            state.exerciseDialog.editMode = action.payload === undefined;
        },
        closeExerciseDialog(state) {
            state.exerciseDialog.open = false;
        },
        switchExerciseDialogEditMode(state) {
            state.exerciseDialog.editMode = !state.exerciseDialog.editMode;
        },
        setExerciseDialogFormValid(state, action: PayloadAction<boolean>) {
            state.exerciseDialog.formValid = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadExercises.fulfilled, function (state, action) {
            state.exercises = action.payload;
            state.status = 'succeeded';
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

            state.exerciseDialog.selectedExercise = { ...exercise };
        });
    }
});

export default exercisesSlice.reducer;

export const ExerciseAction = {
    ...exercisesSlice.actions,
    loadExercises: loadExercises,
    addExcercise: addExercise,
    updateExcercise: updateExercise,
    deleteExercise: deleteExercise
};