import { Box, List, ListItem, MenuItem, SxProps, Theme, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { MuscleGroupLabel } from '../../../../../core/models/enums';
import { ITrainingProgramExerciseFormModel, ITrainingProgramWorkoutFormModel } from '../../../../../core/models/forms';
import MoreVertMenu from '../../../../Common/MoreVertMenu/MoreVertMenu';
import classes from './WorkoutList.module.css';

interface ProgramDayExerciseListProps {
    workout: ITrainingProgramWorkoutFormModel[],
    sx?: SxProps<Theme>
    onDeleteExercise: (exercise: ITrainingProgramExerciseFormModel) => void,
    onDeleteSuperset: (workout: ITrainingProgramWorkoutFormModel) => void,
}

const WorkoutList: React.FC<ProgramDayExerciseListProps> = ({ workout, onDeleteExercise, onDeleteSuperset }) => {
    const defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

    function Exercise({ trainingProgramExercise }: { trainingProgramExercise: ITrainingProgramExerciseFormModel }) {
        return (
            <li className={classes.exerciseRow}>
                <div className={classes.exerciseInfo}>
                    <img src={trainingProgramExercise.exercise.imageUrl ?? defaultImageUrl} alt='excercise' />
                    <div className={classes.exerciseInfoContent}>
                        <Typography variant='subtitle1' className={classes.title}>
                            {trainingProgramExercise.exercise.title}
                        </Typography>
                        <Typography variant='caption'>
                            {MuscleGroupLabel.get(trainingProgramExercise.exercise.muscleGroup)}
                        </Typography>
                    </div>
                </div>
                <MoreVertMenu menuName={'exerice-menu-' + trainingProgramExercise.id} sx={{ color: 'primary.main' }}>
                    <MenuItem>Change</MenuItem>
                    <MenuItem onClick={() => onDeleteExercise(trainingProgramExercise)}>Delete</MenuItem>
                </MoreVertMenu>
            </li>
        )
    }

    return (
        <ul style={{ padding: '5px' }}>
            {workout.map((currentWorkout, index) => {
                if (!currentWorkout.isSuperset) {
                    return <Exercise key={index} trainingProgramExercise={currentWorkout.exercises[0]} />
                }

                return (
                    <li key={index} className={classes.supersetRow}>
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
                                <Exercise key={`${index}-${trainingProgramExerciseIndex}`} trainingProgramExercise={trainingProgramExercise} />)}
                        </ul>
                    </li>
                );
            })}
        </ul>
    )
}

export default WorkoutList;