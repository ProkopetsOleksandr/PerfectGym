import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MeasurementCategory, MuscleGroup } from "../models/enums";
import { IProgram } from "../models/workout";

interface ProgramsState {
    programs: IProgram[],
    selectedProgram?: IProgram,
    selectedTrainingProgramIndex?: number
}

const initialState: ProgramsState = {
    programs: [
        {
            id: 1,
            title: 'New Gym. First program',
            description: 'My first program',
            trainingPrograms: [
                {
                    id: 1,
                    programId: 1,
                    title: "foot, back",
                    workout: [
                        {
                            id: 1,
                            exerciseSet: [
                                {
                                    id: 1,
                                    exerciseDetails: {
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
                                    exerciseDetails: {
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
                            exerciseSet: [
                                {
                                    id: 3,
                                    exerciseDetails: {
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
                        }
                    ]
                },
                {
                    id: 2,
                    programId: 1,
                    title: "chest, arms",
                    workout: [
                        {
                            id: 3,
                            exerciseSet: [
                                {
                                    id: 4,
                                    exerciseDetails: {
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
                            exerciseSet: [
                                {
                                    id: 5,
                                    exerciseDetails: {
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
}

const programsSlice = createSlice({
    name: 'programs',
    initialState: initialState,
    reducers: {
        setSelectedProgram(state, action: PayloadAction<IProgram | undefined>) {
            state.selectedProgram = action.payload ? { ...action.payload } : action.payload;
        },
        setSelectedTrainingProgramIndex(state, action: PayloadAction<number | undefined>) {
            state.selectedTrainingProgramIndex = action.payload;
        }
    },
    extraReducers: (builder) => {
    }
});

export default programsSlice.reducer;

export const ProgramAction = {
    ...programsSlice.actions
};