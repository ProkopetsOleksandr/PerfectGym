import { MeasurementCategory, MuscleGroup } from "../enums";

export interface ExerciseModel {
    id?: string,
    imageUrl?: string,
    title: string,
    description?: string,
    muscleGroup: MuscleGroup,
    measurementCategory: MeasurementCategory
}

export interface ProgramDayExerciseSettingModel {
    sets: number,
    reps: number,
    weight: number
}

export interface ProgramDayExerciseModel {
    exerciseId: string,
    setting: ProgramDayExerciseSettingModel
}

export interface ProgramDayModel {
    exercises: ProgramDayExerciseModel[]
}

export interface ProgramModel {
    id?: string,
    title: string,
    description?: string,
    programDays: ProgramDayModel[]
}