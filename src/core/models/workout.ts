export enum MuscleGroup {
    Chest = 1
}

export const MuscleGroupLabel = new Map<number, string>([
    [MuscleGroup.Chest, 'Chest']
]);

export interface IExcercise {
    id?: number,
    imageUrl?: string,
    title: string,
    description?: string,
    muscleGroup: MuscleGroup
}