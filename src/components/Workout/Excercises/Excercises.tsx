import { FilterAlt, Search } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useState } from 'react'
import { MuscleGroupLabel } from '../../../core/models/workout'
import classes from '../Workout.module.css'
import FiltersDialog from './FiltersDialog'
import { useAppDispatch, useAppSelector } from '../../../core/redux/hook'
import ExcerciseDialog from './ExcerciseDialog/ExcerciseDialog'
import IconButton from '@mui/material/IconButton';
import { Exercise } from '../../../core/models/workout'
import { WorkoutAction } from '../../../core/redux/workout.slice'
import ExerciseList from './ExerciseList/ExerciseList'

function Excercises() {
    
    const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState<boolean>(false);
    const [isExcerciseDialogOpen, setIsExcerciseDialogOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const exercises = useAppSelector(store => store.workout.exercises);

    function openExcercise(exercise: Exercise) {
        dispatch(WorkoutAction.setSelectedExcercise(exercise));
        setIsExcerciseDialogOpen(true);
    }

    return (
        <div>
            <div className="margin-bottom-1" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <IconButton style={{ color: "#272343" }}><Search /></IconButton>
                <IconButton style={{ color: "#272343" }} onClick={() => setIsFiltersDialogOpen(true)}><FilterAlt /></IconButton>
                <Button variant='contained' style={{ background: "#272343" }} onClick={() => setIsExcerciseDialogOpen(true)}>Add</Button>
            </div>

            <ExerciseList exercises={exercises} openExercise={openExcercise} />

            <FiltersDialog open={isFiltersDialogOpen} handleClose={() => setIsFiltersDialogOpen(false)} />
            <ExcerciseDialog open={isExcerciseDialogOpen} handleClose={() => setIsExcerciseDialogOpen(false)} />
        </div>
    )
}

export default Excercises