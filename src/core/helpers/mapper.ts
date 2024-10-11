import { ITrainingProgramExerciseFormModel, ITrainingProgramFormModel, ITrainingProgramWorkoutFormModel } from "../models/forms";
import { ITrainingProgram, ITrainingProgramExercise, ITrainingProgramWorkout } from "../models/workout";

export function MapToITrainingProgramFormModel(trainingPrograms: ITrainingProgram[]) : ITrainingProgramFormModel[] {
    const result: ITrainingProgramFormModel[] = [];

    trainingPrograms.forEach(trainingProgram => {
        result.push({
            id: trainingProgram.id,
            title: trainingProgram.title,
            workout: MapToITrainingProgramWorkoutFormModel(trainingProgram.workout)
        });
    });
    
    return result;
}

function MapToITrainingProgramWorkoutFormModel(workout: ITrainingProgramWorkout[]): ITrainingProgramWorkoutFormModel[] {
    const result: ITrainingProgramWorkoutFormModel[] = [];

    workout.forEach(workoutItem => {
        result.push({
            id: workoutItem.id,
            isSuperset: workoutItem.isSuperset,
            exercises: MapToITrainingProgramExerciseFormModel(workoutItem.exerciseSet)
        });
    });

    return result;
}

function MapToITrainingProgramExerciseFormModel(exerciseSet: ITrainingProgramExercise[]): ITrainingProgramExerciseFormModel[] {
    const result: ITrainingProgramExerciseFormModel[] = [];

    exerciseSet.forEach(exerciseSetItem => {
        result.push({
            id: exerciseSetItem.id,
            reps: exerciseSetItem.reps,
            weight: exerciseSetItem.weight,
            sets: exerciseSetItem.sets,
            exercise: exerciseSetItem.exercise
        });
    });

    return result;
}