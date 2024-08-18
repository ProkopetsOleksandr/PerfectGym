import { MeasurementCategory, MuscleGroup } from "./enums";

export interface IExercise {
    id?: string,
    imageUrl?: string,
    title: string,
    description?: string,
    muscleGroup: MuscleGroup,
    measurementCategory: MeasurementCategory
}

export interface IProgram {
    id?: string,
    title: string,
    description?: string,
    trainingPrograms: ITrainingProgram[]
}

export interface ITrainingProgram {
    dayNumber: number,
    title: string,
    workout: IWorkout[]
}

export interface IWorkout {
    orderNumber: number,
    exerciseSet: IWorkoutExerciseSet | IWorkoutExerciseSet[]
}

export interface IWorkoutExerciseSet {
    exerciseDetails: IExercise,
    sets: number,
    reps: number,
    weight: number
}
