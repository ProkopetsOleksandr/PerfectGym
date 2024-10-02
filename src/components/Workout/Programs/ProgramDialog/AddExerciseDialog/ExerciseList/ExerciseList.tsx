import { CheckCircleOutline, RadioButtonUnchecked } from '@mui/icons-material';
import { Box, List, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { MuscleGroupLabel } from '../../../../../../core/models/enums';
import { IExercise } from '../../../../../../core/models/workout';

interface ExerciseListProps {
    exercises: IExercise[],
    selectedExerciseIds: number[],
    onExerciseClick: (exerciseId: number) => void
}

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, selectedExerciseIds, onExerciseClick }) => {
    const defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

    const ExerciseItem = styled(ListItem)(({ theme }) => ({
        display: 'flex',
        justifyContent: 'space-between',
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
        <List>
            {exercises.map(exercise =>
                <ExerciseItem key={exercise.id!}>
                    <Box sx={{ display: 'flex', columnGap: '15px', alignItems: 'center' }}>
                        <img src={exercise.imageUrl ?? defaultImageUrl} style={{ maxWidth: '60px' }} alt='excercise' />
                        <Box>
                            <Typography variant='subtitle1' sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                                {exercise.title}
                            </Typography>
                            <Typography variant='caption'>
                                {MuscleGroupLabel.get(exercise.muscleGroup)}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ marginRight: '10px' }} onClick={() => onExerciseClick(exercise.id!)}>
                        {selectedExerciseIds.includes(exercise.id!)
                            ? <CheckCircleOutline />
                            : <RadioButtonUnchecked />}
                    </Box>
                </ExerciseItem>
            )}
        </List>
    )
}

export default ExerciseList;