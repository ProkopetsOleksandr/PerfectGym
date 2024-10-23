import { MenuItem, Typography } from '@mui/material';
import React from 'react';
import { MuscleGroupLabel } from '../../../../../../core/models/enums';
import { ITrainingProgramExerciseFormModel } from '../../../../../../core/models/forms';
import MoreVertMenu from '../../../../../Common/MoreVertMenu/MoreVertMenu';
import classes from './WorkoutList.module.css';

interface TrainingProgramExerciseProps {
    trainingProgramExercise: ITrainingProgramExerciseFormModel,
    onDeleteExercise: (exercise: ITrainingProgramExerciseFormModel) => void,
}

const TrainingProgramExercise: React.FC<TrainingProgramExerciseProps> = ({ trainingProgramExercise, onDeleteExercise }) => {
    const defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
}

export default TrainingProgramExercise;
