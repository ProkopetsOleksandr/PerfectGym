import { MeasurementCategory, MuscleGroup } from "../enums";

export const MuscleGroupLabel = new Map<number, string>([
    [MuscleGroup.Chest, 'Chest'],
    [MuscleGroup.Arm, 'Arm']
]);

export const MeasurementCategoryLabel = new Map<number, string>([
    [MeasurementCategory.WeightAndReps, 'Weight and repetitions'],
    [MeasurementCategory.Reps, 'Repetitions'],
    [MeasurementCategory.DistanceAndTime, 'Distance and time'],
    [MeasurementCategory.Time, 'Time']
]);

export interface ExerciseViewModel {
    id?: string,
    imageUrl?: string,
    title: string,
    description?: string,
    muscleGroup: MuscleGroup,
    measurementCategory: MeasurementCategory
}

export interface ProgramDayExerciseSettingViewModel {
    sets: number,
    reps: number,
    weight: number
}

export interface ProgramDayExerciseViewModel {
    exerciseId: string,
    setting: ProgramDayExerciseSettingViewModel
}

export interface ProgramDayViewModel {
    exercises: ProgramDayExerciseViewModel[]
}

export interface ProgramViewModel {
    id?: string,
    title: string,
    description?: string,
    programDays: ProgramDayViewModel[]
}