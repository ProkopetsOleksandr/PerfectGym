import { MeasurementCategory, MuscleGroup } from "./enums";

export interface IExercise {
    id?: number,
    title: string,
    description?: string,
    imageUrl?: string,
    muscleGroup: MuscleGroup,
    measurementCategory: MeasurementCategory
}

export interface IProgram {
    id: number,
    title: string,
    description?: string,
    imageUrl?: string,
    trainingPrograms: ITrainingProgram[]
    createdAt?: Date // временно nullable
}

export interface ITrainingProgram {
    id: number,
    //programId?: number, // нужна ли эта переменная в этой модели?
    title: string,
    //order: number,
    workout: ITrainingProgramWorkout[]
}

export interface ITrainingProgramWorkout {
    id: number,
    //order: number,
    isSuperset: boolean,
    exerciseSet: ITrainingProgramExercise[]
}

export interface ITrainingProgramExercise {
    id: number,
    // order: number,
    // exerciseId: number,
    sets: number,
    reps: number,
    weight: number,
    exercise: IExercise
}
