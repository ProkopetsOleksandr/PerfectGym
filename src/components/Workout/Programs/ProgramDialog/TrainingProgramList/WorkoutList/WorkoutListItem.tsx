import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import { ITrainingProgramExerciseFormModel, ITrainingProgramWorkoutFormModel } from '../../../../../../core/models/forms';
import TrainingProgramExercise from './TrainingProgramExercise';
import TrainingProgramSuperset from './TrainingProgramSuperset';
import classes from './WorkoutList.module.css';

interface WorkoutListItemProps {
    currentWorkout: ITrainingProgramWorkoutFormModel,
    onDeleteExercise: (exercise: ITrainingProgramExerciseFormModel) => void,
    onDeleteSuperset: (workout: ITrainingProgramWorkoutFormModel) => void
}

const WorkoutListItem: React.FC<WorkoutListItemProps> = ({ currentWorkout, onDeleteExercise, onDeleteSuperset }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: currentWorkout.id })
    const style = { transition, transform: CSS.Translate.toString(transform) };

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} className={currentWorkout.isSuperset ? classes.supersetRow : classes.exerciseRow}>
            {!currentWorkout.isSuperset &&
                <TrainingProgramExercise trainingProgramExercise={currentWorkout.exercises[0]} onDeleteExercise={onDeleteExercise} />}

            {currentWorkout.isSuperset &&
                <TrainingProgramSuperset currentWorkout={currentWorkout} onDeleteExercise={onDeleteExercise} onDeleteSuperset={onDeleteSuperset} />}
        </div>
    )
}

export default WorkoutListItem;