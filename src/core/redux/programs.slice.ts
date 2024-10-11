import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MeasurementCategory, MuscleGroup } from "../models/enums";
import { IProgram } from "../models/workout";

interface ProgramsState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    programs: IProgram[],
    programDialog: {
        open: boolean,
        selectedProgram?: IProgram,
        editMode: boolean,
        formValid: boolean
        //selectedTrainingProgramIndex?: number /// WTF? Looks like a shit
        addExerciseDialog: {
            open: boolean,
            selectedExerciseIds: number[]
        }
    }
}

const initialState: ProgramsState = {
    status: 'idle',
    programs: [],
    programDialog: {
        open: false,
        editMode: false,
        formValid: false,
        addExerciseDialog: {
            open: false,
            selectedExerciseIds: []
        }
    }
}

const loadPrograms = createAsyncThunk<IProgram[], void, {}>("workout/loadPrograms",
    async function (): Promise<IProgram[]> {
        // const exercises = await firestoreApi.exercises.getAllExercisesAsync();
        // console.log(exercises);

        const programs: IProgram[] = [
            {
                id: 1,
                title: 'New Gym. First program',
                description: 'My first program',
                //createdAt: date,
                trainingPrograms: [
                    {
                        id: 1,
                        title: "foot, back",
                        workout: [
                            {
                                id: 1,
                                isSuperset: true,
                                exerciseSet: [
                                    {
                                        id: 1,
                                        exercise: {
                                            id: 1,
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
                                        id: 2,
                                        exercise: {
                                            id: 2,
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
                                id: 2,
                                isSuperset: false,
                                exerciseSet: [
                                    {
                                        id: 3,
                                        exercise: {
                                            id: 3,
                                            title: 'My fake exercise 3',
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
                                id: 3,
                                isSuperset: false,
                                exerciseSet: [
                                    {
                                        id: 4,
                                        exercise: {
                                            id: 4,
                                            title: 'My fake exercise 4',
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
                                id: 4,
                                isSuperset: false,
                                exerciseSet: [
                                    {
                                        id: 5,
                                        exercise: {
                                            id: 5,
                                            title: 'My fake exercise 5',
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
                                id: 5,
                                isSuperset: false,
                                exerciseSet: [
                                    {
                                        id: 6,
                                        exercise: {
                                            id: 6,
                                            title: 'My fake exercise 6',
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
                                id: 6,
                                isSuperset: false,
                                exerciseSet: [
                                    {
                                        id: 7,
                                        exercise: {
                                            id: 7,
                                            title: 'My fake exercise 7',
                                            description: "short description",
                                            muscleGroup: MuscleGroup.Arm,
                                            measurementCategory: MeasurementCategory.WeightAndReps
                                        },
                                        sets: 3,
                                        reps: 10,
                                        weight: 10
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 2,
                        title: "chest, arms",
                        workout: [
                            {
                                id: 3,
                                isSuperset: false,
                                exerciseSet: [
                                    {
                                        id: 4,
                                        exercise: {
                                            id: 4,
                                            title: 'My fake exercise 4',
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
                                id: 4,
                                isSuperset: false,
                                exerciseSet: [
                                    {
                                        id: 5,
                                        exercise: {
                                            id: 5,
                                            title: 'My fake exercise 5',
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
                                id: 3,
                                isSuperset: false,
                                exerciseSet: [
                                    {
                                        id: 4,
                                        exercise: {
                                            id: 4,
                                            title: 'My fake exercise 4',
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
                                id: 4,
                                isSuperset: false,
                                exerciseSet: [
                                    {
                                        id: 5,
                                        exercise: {
                                            id: 5,
                                            title: 'My fake exercise 5',
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
                                id: 3,
                                isSuperset: false,
                                exerciseSet: [
                                    {
                                        id: 4,
                                        exercise: {
                                            id: 4,
                                            title: 'My fake exercise 4',
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
                                id: 4,
                                isSuperset: false,
                                exerciseSet: [
                                    {
                                        id: 5,
                                        exercise: {
                                            id: 5,
                                            title: 'My fake exercise 5',
                                            description: "short description",
                                            muscleGroup: MuscleGroup.Arm,
                                            measurementCategory: MeasurementCategory.WeightAndReps
                                        },
                                        sets: 3,
                                        reps: 10,
                                        weight: 10
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]

        return programs;
    }
);

const programsSlice = createSlice({
    name: 'programs',
    initialState: initialState,
    reducers: {
        // setSelectedProgram(state, action: PayloadAction<IProgram | undefined>) {
        //     state.programDialog.selectedProgram = action.payload ? { ...action.payload } : action.payload;
        // },
        // setSelectedTrainingProgramIndex(state, action: PayloadAction<number | undefined>) {
        //     state.selectedTrainingProgramIndex = action.payload;
        // }
        openProgramDialog(state, action: PayloadAction<IProgram | undefined>) {
            state.programDialog.open = true;
            state.programDialog.selectedProgram = action.payload;
            state.programDialog.editMode = action.payload === undefined;
        },
        closeProgramDialog(state) {
            state.programDialog.open = false;
        },
        switchProgramDialogEditMode(state) {
            state.programDialog.editMode = !state.programDialog.editMode;
        },
        openAddExerciseDialog(state) {
            state.programDialog.addExerciseDialog.selectedExerciseIds = [];
            state.programDialog.addExerciseDialog.open = true;
        },
        closeAddExerciseDialog(state) {
            state.programDialog.addExerciseDialog.open = false;
        },
        switchSelectedExericseInAddExerciseDialog(state, action: PayloadAction<number>) {
            if (state.programDialog.addExerciseDialog.selectedExerciseIds.includes(action.payload)) {
                state.programDialog.addExerciseDialog.selectedExerciseIds = state.programDialog.addExerciseDialog.selectedExerciseIds.filter(id => id !== action.payload);
            } else {
                state.programDialog.addExerciseDialog.selectedExerciseIds.push(action.payload);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadPrograms.fulfilled, function (state, action) {
            state.programs = action.payload;
            state.status = 'succeeded';
        });
    }
});

export default programsSlice.reducer;

export const ProgramAction = {
    ...programsSlice.actions,
    loadPrograms: loadPrograms,
};