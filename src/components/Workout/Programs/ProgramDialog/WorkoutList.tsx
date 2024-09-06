import React from 'react';
import { MuscleGroupLabel } from '../../../../core/models/enums';
import { ITrainingProgramExercise, ITrainingProgramWorkout } from '../../../../core/models/workout';
import classes from '../../Excercises/ExerciseList/ExerciseList.module.css';

interface ProgramDayExerciseListProps {
    workout: ITrainingProgramWorkout[],
}

const WorkoutList: React.FC<ProgramDayExerciseListProps> = ({ workout }) => {
    const defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

    function ExerciseRow({ exerciseSet }: { exerciseSet: ITrainingProgramExercise }) {
        return (
            <React.Fragment>
                <li className={classes.exercise}>
                    <img src={exerciseSet.exerciseDetails.imageUrl ?? defaultImageUrl} alt='excercise' />
                    <div className={classes.excerciseInfo}>
                        <div className={classes.name}>{exerciseSet.exerciseDetails.title}</div>
                        <div className={classes.group}>{MuscleGroupLabel.get(exerciseSet.exerciseDetails.muscleGroup)}</div>
                    </div>
                </li>
            </React.Fragment>
        )
    }

    return (
        <ul>
            {workout.map((currentWorkout, index) => {
                if (currentWorkout.exerciseSet.length === 1) {
                    return <ExerciseRow key={index} exerciseSet={currentWorkout.exerciseSet[0]} />
                }

                return <li className={classes.superset} key={index}>
                    <div style={{marginBottom: "5px"}}>Superset ({currentWorkout.exerciseSet.length})</div>
                    <ul>
                        {currentWorkout.exerciseSet.map((supersetExerciseSet, supersetExerciseSetIndex) =>
                            <ExerciseRow key={`${index}-${supersetExerciseSetIndex}`} exerciseSet={supersetExerciseSet} />)}
                    </ul>
                </li>
            })}
        </ul>
    )
}

export default WorkoutList;