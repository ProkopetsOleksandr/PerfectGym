import React from 'react';
import { MuscleGroupLabel } from '../../../../core/models/enums';
import { Exercise } from '../../../../core/models/workout';
import classes from './ExerciseList.module.css';

interface ExerciseListProps {
    exercises: Exercise[],
    openExercise: (exercise: Exercise) => void
}

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, openExercise }) => {
    const defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

    return (
        <ul>
            {exercises && exercises.map(excercise =>
                <li key={excercise.id} className={classes.exercise} onClick={() => openExercise(excercise)}>
                    <img src={excercise.imageUrl ?? defaultImageUrl} alt='excercise' />
                    <div className={classes.excerciseInfo}>
                        <div className={classes.name}>{excercise.title}</div>
                        <div className={classes.group}>{MuscleGroupLabel.get(excercise.muscleGroup)}</div>
                    </div>
                </li>)}
        </ul>
    )
}

export default ExerciseList;