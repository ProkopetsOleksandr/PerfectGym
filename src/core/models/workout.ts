import { MuscleGroup, MeasurementCategory } from "./enums";

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

export interface Exercise {
    id?: number,
    imageUrl?: string,
    title: string,
    description?: string,
    muscleGroup: MuscleGroup,
    measurementCategory: MeasurementCategory
}