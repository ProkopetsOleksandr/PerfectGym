import { MeasurementCategory, MuscleGroup } from "./enums";

export interface IExercise {
    id?: number,
    imageUrl?: string,
    title: string,
    description?: string,
    muscleGroup: MuscleGroup,
    measurementCategory: MeasurementCategory
}

export interface IProgram {
    id: number,
    title: string,
    description?: string,
    trainingPrograms: ITrainingProgram[]
}

export interface ITrainingProgram {
    id?: number,
    programId?: number,
    title: string,
    //order: number,
    workout: ITrainingProgramWorkout[]
}

export interface ITrainingProgramWorkout {
    id: number,
    //order: number,
    exerciseSet: ITrainingProgramExercise[]
}

export interface ITrainingProgramExercise {
    id: number,
    // order: number,
    // exerciseId: number,
    sets: number,
    reps: number,
    weight: number,
    exerciseDetails: IExercise,
}
