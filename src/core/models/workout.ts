import { MeasurementCategory, MuscleGroup } from "./enums";

export interface Exercise {
    id?: string,
    imageUrl?: string,
    title: string,
    description?: string,
    muscleGroup: MuscleGroup,
    measurementCategory: MeasurementCategory
}

export interface Program {
    id?: string,
    title: string,
    description?: string,
    programDays: ProgramDay[]
}


export interface ProgramDayExerciseSetting {
    sets: number,
    reps: number,
    weight: number
}

export interface ProgramDayExercise {
    exerciseId: string,
    setting: ProgramDayExerciseSetting
}

export interface ProgramDay {
    exercises: ProgramDayExercise[]
}

