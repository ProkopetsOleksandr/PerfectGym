import React from 'react';
import { MuscleGroupLabel } from '../../../../core/models/enums';
import { IWorkout, IWorkoutExerciseSet } from '../../../../core/models/workout';
import classes from '../../Excercises/ExerciseList/ExerciseList.module.css';

interface ProgramDayExerciseListProps {
    programDayExercises: IWorkout[],
}

const ProgramDayExerciseList: React.FC<ProgramDayExerciseListProps> = ({ programDayExercises }) => {
    const defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

    function ExerciseRow({ exerciseInfo }: { exerciseInfo: IWorkoutExerciseSet }) {
        return (
            <React.Fragment>
                <li className={classes.exercise}>
                    <img src={exerciseInfo.exercise.imageUrl ?? defaultImageUrl} alt='excercise' />
                    <div className={classes.excerciseInfo}>
                        <div className={classes.name}>{exerciseInfo.exercise.title}</div>
                        <div className={classes.group}>{MuscleGroupLabel.get(exerciseInfo.exercise.muscleGroup)}</div>
                    </div>
                </li>
            </React.Fragment>
        )
    }

    return (
        <ul>
            {programDayExercises.map((exercise, index) => {
                if (!Array.isArray(exercise.info)) {
                    return <ExerciseRow key={index} exerciseInfo={exercise.info} />
                }

                return <li className={classes.superset}>
                    <div style={{marginBottom: "5px"}}>Superset ({exercise.info.length})</div>
                    <ul>
                        {exercise.info.map((supersetExerciseInfo, supersetExerciseIndex) =>
                            <ExerciseRow key={`${index}-${supersetExerciseIndex}`} exerciseInfo={supersetExerciseInfo} />)}
                    </ul>
                </li>
            })}
        </ul>
    )
}

export default ProgramDayExerciseList;