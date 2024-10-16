import { IExercise } from "./workout"

export interface IProgramFormValues {
    title: string,
    description?: string,
    trainingPrograms: ITrainingProgramFormModel[]
}

export interface ITrainingProgramFormModel {
    id: number | string,
    //programId?: number, // нужна ли эта переменная в этой модели?
    title: string,
    //order: number,
    workout: ITrainingProgramWorkoutFormModel[]
}

export interface ITrainingProgramWorkoutFormModel {
    id: number | string,
    isSuperset: boolean,
    order: number,
    exercises: ITrainingProgramExerciseFormModel[]
}

export interface ITrainingProgramExerciseFormModel {
    id: number | string,
    // order: number,
    // exerciseId: number,
    sets?: number,
    reps?: number,
    weight?: number,
    exercise: IExercise,
}
