export enum ExcerciseGroup {
    Chest = 1
}

export const ExcerciseGroupLabel = new Map<number, string>([
    [ExcerciseGroup.Chest, 'Chest']
]);

export interface IExcercise {
    id?: number,
    imageUrl?: string,
    title: string,
    description?: string,
    excerciseGroup: ExcerciseGroup
}