export enum ExcerciseGroup {
    Chest = 1
}

export const ExcerciseGroupLabel = new Map<number, string>([
    [ExcerciseGroup.Chest, 'Chest']
]);

export interface IExcercise {
    id?: number,
    imageUrl?: string,
    name: string,
    description?: string,
    excerciseGroup: ExcerciseGroup
}