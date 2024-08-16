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

export interface IWorkoutExerciseSet {
    exercise: IExercise,
    sets: number,
    reps: number,
    weight: number
}

export interface IWorkout {
    exerciseSets: IWorkoutExerciseSet | IWorkoutExerciseSet[]
}

export interface ITrainingProgram {
    dayNumber: number,
    title: string,
    workout: IWorkout
}

