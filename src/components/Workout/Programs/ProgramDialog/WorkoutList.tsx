import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { MuscleGroupLabel } from '../../../../core/models/enums';
import { ITrainingProgramExercise, ITrainingProgramWorkout } from '../../../../core/models/workout';

interface ProgramDayExerciseListProps {
    workout: ITrainingProgramWorkout[],
}

const WorkoutList: React.FC<ProgramDayExerciseListProps> = ({ workout }) => {
    const defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

    const TrainingProgramExerciseListItem = styled('li')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        columnGap: '15px',
        marginBottom: '10px',
        borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.1)'
    }));

    function ExerciseRow({ exerciseSet }: { exerciseSet: ITrainingProgramExercise }) {
        return (
            <React.Fragment>
                <TrainingProgramExerciseListItem>
                    <img src={exerciseSet.exerciseDetails.imageUrl ?? defaultImageUrl} style={{maxWidth: '70px'}} alt='excercise' />
                    <div>
                        <Typography variant='subtitle1' sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                            {exerciseSet.exerciseDetails.title}
                        </Typography>
                        <Typography variant='caption'>
                            {MuscleGroupLabel.get(exerciseSet.exerciseDetails.muscleGroup)}
                        </Typography>
                    </div>
                </TrainingProgramExerciseListItem>
            </React.Fragment>
        )
    }

    return (
        <ul>
            {workout.map((currentWorkout, index) => {
                if (currentWorkout.exerciseSet.length === 1) {
                    return <ExerciseRow key={index} exerciseSet={currentWorkout.exerciseSet[0]} />
                }

                return <li key={index} style={{paddingLeft: "15px", borderLeft: "3px solid #333", borderRadius: '15px'}}>
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