import React from 'react';
import { ITrainingProgramExerciseFormModel, ITrainingProgramWorkoutFormModel } from '../../../../../core/models/forms';
import TrainingProgramExercise from './TrainingProgramExercise';
import TrainingProgramSuperset from './TrainingProgramSuperset';
import classes from './WorkoutList.module.css';

interface ProgramDayExerciseListProps {
    workout: ITrainingProgramWorkoutFormModel[],
    onDeleteExercise: (exercise: ITrainingProgramExerciseFormModel) => void,
    onDeleteSuperset: (workout: ITrainingProgramWorkoutFormModel) => void,
}

const WorkoutList: React.FC<ProgramDayExerciseListProps> = ({ workout, onDeleteExercise, onDeleteSuperset }) => {
    return (
        <ul style={{ padding: '5px' }}>
            {workout.map((currentWorkout, index) => {
                return (
                    <li className={currentWorkout.isSuperset ? classes.supersetRow : classes.exerciseRow}>
                        {!currentWorkout.isSuperset &&
                            <TrainingProgramExercise key={index} trainingProgramExercise={currentWorkout.exercises[0]} onDeleteExercise={onDeleteExercise} />}

                        {currentWorkout.isSuperset &&
                            <TrainingProgramSuperset key={index} currentWorkout={currentWorkout} onDeleteExercise={onDeleteExercise} onDeleteSuperset={onDeleteSuperset} />}
                    </li>
                );
            })}
        </ul>
    )
}

export default WorkoutList;