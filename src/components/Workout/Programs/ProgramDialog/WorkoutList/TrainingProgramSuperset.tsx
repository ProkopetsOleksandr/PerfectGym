import { MenuItem, Typography } from '@mui/material';
import React from 'react';
import { ITrainingProgramExerciseFormModel, ITrainingProgramWorkoutFormModel } from '../../../../../core/models/forms';
import MoreVertMenu from '../../../../Common/MoreVertMenu/MoreVertMenu';
import TrainingProgramExercise from './TrainingProgramExercise';
import classes from './WorkoutList.module.css';

interface TrainingProgramSupersetProps {
    currentWorkout: ITrainingProgramWorkoutFormModel,
    onDeleteExercise: (exercise: ITrainingProgramExerciseFormModel) => void,
    onDeleteSuperset: (workout: ITrainingProgramWorkoutFormModel) => void
}

const TrainingProgramSuperset: React.FC<TrainingProgramSupersetProps> = ({ currentWorkout, onDeleteExercise, onDeleteSuperset }) => {
    return (
        <React.Fragment>
            <div className={classes.supersetInfo}>
                <div>
                    <div>
                        <Typography variant='subtitle2' sx={{ lineHeight: '1' }}>
                            Superset
                        </Typography>
                    </div>
                    <div>
                        <Typography variant='caption' sx={{ lineHeight: '1' }}>
                            ({currentWorkout.exercises.length} exercises)
                        </Typography>
                    </div>
                </div>
                <MoreVertMenu menuName={'workout-' + currentWorkout.id} sx={{ color: 'primary.main' }}>
                    <MenuItem onClick={() => onDeleteSuperset(currentWorkout)}>Delete</MenuItem>
                </MoreVertMenu>
            </div>
            <ul style={{ marginBottom: '10px' }}>
                {currentWorkout.exercises.map((trainingProgramExercise, trainingProgramExerciseIndex) =>
                    <li className={classes.exerciseRow}>
                        <TrainingProgramExercise key={`exercise-${trainingProgramExerciseIndex}`}
                            trainingProgramExercise={trainingProgramExercise}
                            onDeleteExercise={onDeleteExercise} />
                    </li>)}
            </ul>
        </React.Fragment>
    )
}

export default TrainingProgramSuperset;