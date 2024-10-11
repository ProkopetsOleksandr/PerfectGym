import { IExercise } from "./workout"

export interface IProgramFormValues {
    title: string,
    description?: string,
    trainingPrograms: ITrainingProgramFormModel[]
}

export interface ITrainingProgramFormModel {
    id?: number,
    temporaryId?: number,
    //programId?: number, // нужна ли эта переменная в этой модели?
    title: string,
    //order: number,
    workout: ITrainingProgramWorkoutFormModel[]
}

export interface ITrainingProgramWorkoutFormModel {
    id?: number,
    temporaryId?: number,
    isSuperset: boolean,
    //order: number,
    exercises: ITrainingProgramExerciseFormModel[]
}

export interface ITrainingProgramExerciseFormModel {
    id?: number,
    temporaryId?: number
    // order: number,
    // exerciseId: number,
    sets?: number,
    reps?: number,
    weight?: number,
    exercise: IExercise,
}
