import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import firestoreApi from "../firebase/firestoreApi";
import { MeasurementCategory, MuscleGroup } from "../models/enums";
import { IExercise, IProgram, IWorkout } from "../models/workout";

interface WorkoutState {
    exercises: IExercise[],
    selectedExercise?: IExercise,
    programs: IProgram[],
    selectedProgram?: IProgram,
    selectedTrainingProgramIndex?: number
}

const initialState: WorkoutState = {
    exercises: [],
    programs: [
        {
            id: '1',
            title: 'New Gym. First program',
            description: 'My first program',
            trainingPrograms: [
                {
                    dayNumber: 1,
                    title: "foot, back",
                    workout: [
                        {
                            orderNumber: 1,
                            exerciseSet: [
                                {
                                    exerciseDetails: {
                                        id: '1',
                                        title: 'My fake exercise 1',
                                        description: "short description",
                                        muscleGroup: MuscleGroup.Arm,
                                        measurementCategory: MeasurementCategory.WeightAndReps
                                    },
                                    sets: 3,
                                    reps: 10,
                                    weight: 10
                                },
                                {
                                    exerciseDetails: {
                                        id: '2',
                                        title: 'My fake exercise 2',
                                        description: "short description",
                                        muscleGroup: MuscleGroup.Arm,
                                        measurementCategory: MeasurementCategory.WeightAndReps
                                    },
                                    sets: 3,
                                    reps: 10,
                                    weight: 10
                                }
                            ]
                        },
                        {
                            orderNumber: 2,
                            exerciseSet: {
                                exerciseDetails: {
                                    id: '3',
                                    title: 'My fake exercise 3',
                                    description: "short description",
                                    muscleGroup: MuscleGroup.Arm,
                                    measurementCategory: MeasurementCategory.WeightAndReps
                                },
                                sets: 3,
                                reps: 10,
                                weight: 10
                            }
                        }
                    ]
                },
                {
                    dayNumber: 2,
                    title: "foot, back",
                    workout: [
                        {
                            orderNumber: 1,
                            exerciseSet: {
                                exerciseDetails: {
                                    id: '4',
                                    title: 'My fake exercise 4',
                                    description: "short description",
                                    muscleGroup: MuscleGroup.Arm,
                                    measurementCategory: MeasurementCategory.WeightAndReps
                                },
                                sets: 3,
                                reps: 10,
                                weight: 10
                            }
                        },
                        {
                            orderNumber: 2,
                            exerciseSet: {
                                exerciseDetails: {
                                    id: '5',
                                    title: 'My fake exercise 5',
                                    description: "short description",
                                    muscleGroup: MuscleGroup.Arm,
                                    measurementCategory: MeasurementCategory.WeightAndReps
                                },
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

const loadExercises = createAsyncThunk<IExercise[], void, {}>(
    "workout/loadExercises",
    async function (): Promise<IExercise[]> {
        const exercises = await firestoreApi.exercises.getAllExercisesAsync();
        console.log(exercises);

        return exercises;
    }
);

const addExercise = createAsyncThunk<IExercise, IExercise, {}>(
    "workout/addExcercise",
    async function (exercise) {
        const id = await firestoreApi.exercises.addExerciseAsync(exercise);
        exercise.id = id;

        return exercise;
    }
);

const deleteExercise = createAsyncThunk<string, string, {}>(
    "workout/deleteExercise",
    async function (id: string) {
        await firestoreApi.exercises.deleteExerciseAsync(id);
        return id;
    }
);

const updateExercise = createAsyncThunk<IExercise, IExercise, {}>(
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
        setSelectedExcercise(state, action: PayloadAction<IExercise | undefined>) {
            state.selectedExercise = action.payload ? { ...action.payload } : action.payload;
        },
        setSelectedProgram(state, action: PayloadAction<IProgram | undefined>) {
            state.selectedProgram = action.payload ? { ...action.payload } : action.payload;
        },
        setSelectedTrainingProgramIndex(state, action: PayloadAction<number | undefined>) {
            state.selectedTrainingProgramIndex = action.payload;
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

            state.selectedExercise = { ...exercise };
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