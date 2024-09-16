import { Box, List, ListItem, MenuItem, SxProps, Theme, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { MuscleGroupLabel } from '../../../../core/models/enums';
import { ITrainingProgramExercise, ITrainingProgramWorkout } from '../../../../core/models/workout';
import MoreVertMenu from '../../../Common/MoreVertMenu/MoreVertMenu';

interface ProgramDayExerciseListProps {
    workout: ITrainingProgramWorkout[],
    sx?: SxProps<Theme>
}

const WorkoutList: React.FC<ProgramDayExerciseListProps> = ({ workout, sx }) => {
    const defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

    const ExerciseRow = styled(ListItem)(({ theme }) => ({
        alignItems: 'center',
        columnGap: '15px',
        marginBottom: '10px',
        borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.1)',
        justifyContent: 'space-between'
    }));

    const TrainingProgramSupersetListItem = styled(ListItem)(({ theme }) => ({
        padding: "0 0 0 15px",
        borderLeft: "3px solid #333",
        flexDirection: 'column',
        alignItems: 'stretch',
        marginBottom: '10px'
    }));

    function TrainingProgramExerciseListItem({ exerciseSet }: { exerciseSet: ITrainingProgramExercise }) {
        return (
            <ExerciseRow>
                <Box sx={{ display: 'flex', columnGap: '10px' }}>
                    <img src={exerciseSet.exerciseDetails.imageUrl ?? defaultImageUrl} style={{ width: '55px' }} alt='excercise' />
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant='subtitle1' sx={{ color: 'primary.main', fontWeight: 'bold', lineHeight: '1' }}>
                            {exerciseSet.exerciseDetails.title}
                        </Typography>
                        <Typography variant='caption'>
                            {MuscleGroupLabel.get(exerciseSet.exerciseDetails.muscleGroup)}
                        </Typography>
                    </Box>
                </Box>
                <MoreVertMenu menuName={'exerice-menu-' + exerciseSet.id} sx={{ color: 'primary.main' }}>
                    <MenuItem>Change</MenuItem>
                </MoreVertMenu>
            </ExerciseRow>
        )
    }

    return (
        <List>
            {workout.map((currentWorkout, index) => {
                if (currentWorkout.exerciseSet.length === 1) {
                    return <TrainingProgramExerciseListItem key={index} exerciseSet={currentWorkout.exerciseSet[0]} />
                }

                return (
                    <TrainingProgramSupersetListItem key={index}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "5px" }}>
                            <Box>
                                <Box><Typography variant='subtitle2' sx={{ lineHeight: '1' }}>Superset</Typography></Box>
                                <Box><Typography variant='caption' sx={{ lineHeight: '1' }}>({currentWorkout.exerciseSet.length} exercises)</Typography></Box>
                            </Box>
                            <MoreVertMenu menuName={'workout-' + currentWorkout.id} sx={{ color: 'primary.main' }}>
                                <MenuItem>Change</MenuItem>
                            </MoreVertMenu>
                        </Box>
                        <List sx={{marginBottom: '-10px'}}>
                            {currentWorkout.exerciseSet.map((supersetExerciseSet, supersetExerciseSetIndex) =>
                                <TrainingProgramExerciseListItem key={`${index}-${supersetExerciseSetIndex}`} exerciseSet={supersetExerciseSet} />)}
                        </List>
                    </TrainingProgramSupersetListItem>
                );
            })}
        </List>
    )
}

export default WorkoutList;