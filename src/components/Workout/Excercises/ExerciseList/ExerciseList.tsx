import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { MuscleGroupLabel } from '../../../../core/models/enums';
import { IExercise } from '../../../../core/models/workout';

interface ExerciseListProps {
    exercises: IExercise[],
    openExercise: (exercise: IExercise) => void
}

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, openExercise }) => {
    const defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

    const ListItem = styled('li')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        columnGap: '15px',
        marginBottom: '10px',
        borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: theme.palette.background.paper
    }));

    if (!exercises || !exercises.length) {
        return (
            <div>No data</div>
        );
    }

    return (
        <ul>
            {exercises.map(excercise =>
                <ListItem key={excercise.id} onClick={() => openExercise(excercise)}>
                    <img src={excercise.imageUrl ?? defaultImageUrl} style={{maxWidth: '70px'}} alt='excercise' />
                    <div>
                        <Typography variant='subtitle1' sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                            {excercise.title}
                        </Typography>
                        <Typography variant='caption'>
                            {MuscleGroupLabel.get(excercise.muscleGroup)}
                        </Typography>
                    </div>
                </ListItem>
            )}
        </ul>
    )
}

export default ExerciseList;