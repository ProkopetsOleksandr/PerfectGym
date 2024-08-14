export enum MuscleGroup {
    None = 0,
    Chest = 1,
    Arm = 2
}

export enum MeasurementCategory {
    None = 0,
    WeightAndReps = 1,
    Reps = 2,
    DistanceAndTime = 3,
    Time = 4
}

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