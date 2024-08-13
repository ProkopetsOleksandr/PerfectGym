import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import firestoreApi from "../firebase/firestoreApi";
import { ExerciseViewModel, ProgramViewModel } from "../models/viewModels/workout";

interface WorkoutState {
    exercises: ExerciseViewModel[],
    selectedExercise?: ExerciseViewModel,
    programs: ProgramViewModel[],
    selectedProgram?: ProgramViewModel
}

const initialState: WorkoutState = {
    exercises: [],
    programs: [
        {
            id: '1',
            title: 'New Gym. First program',
            description: 'My first program',
            programDays: [
                {
                    exercises: [
                        {
                            exerciseId: 'lFM4uP9GpS9jarDiJHw5',
                            setting: {
                                sets: 3,
                                reps: 10,
                                weight: 10
                            }
                        }
                    ]
                },
                {
                    exercises: [
                        {
                            exerciseId: 'lFM4uP9GpS9jarDiJHw5',
                            setting: {
                                sets: 2,
                                reps: 5,
                                weight: 6
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: '2',
            title: 'New Gym. Second program',
            description: 'Program based on youtube videos',
            programDays: [
                {
                    exercises: [
                        {
                            exerciseId: 'lFM4uP9GpS9jarDiJHw5',
                            setting: {
                                sets: 3,
                                reps: 10,
                                weight: 10
                            }
                        }
                    ]
                }
            ]
        }
    ]
}

const loadExercises = createAsyncThunk<ExerciseViewModel[], void, {}>(
    "workout/loadExercises",
    async function () : Promise<ExerciseViewModel[]> {
        const exercises = await firestoreApi.exercises.getAllExercisesAsync();
        console.log(exercises);

        return exercises;
    }
);

const addExercise = createAsyncThunk<ExerciseViewModel, ExerciseViewModel, {}>(
    "workout/addExcercise",
    async function (exercise) {
        const id = await firestoreApi.exercises.addExerciseAsync(exercise);
        exercise.id = id;

        return exercise;
    }
);

const deleteExercise = createAsyncThunk<string, string, {}>(
    "workout/deleteExercise",
    async function(id: string) {
        await firestoreApi.exercises.deleteExerciseAsync(id);
        return id;
    }
);

const updateExercise = createAsyncThunk<ExerciseViewModel, ExerciseViewModel, {}>(
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
        setSelectedExcercise(state, action: PayloadAction<ExerciseViewModel | undefined>) {
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

            state.selectedExercise = {...exercise};
        });
    }
});

export default workoutSlice.reducer;

export const WorkoutAction = {
    ...workoutSlice.actions,
    loadExercises: loadExercises,
    addExcercise: addExercise,
    updateExcercise: updateExercise,
    deleteExercise: deleteExercise
};