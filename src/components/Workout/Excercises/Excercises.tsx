import { FilterAlt, Search } from '@mui/icons-material'
import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useEffect, useState } from 'react'
import { Exercise } from '../../../core/models/workout'
import { useAppDispatch, useAppSelector } from '../../../core/redux/hook'
import { WorkoutAction } from '../../../core/redux/workout.slice'
import ExcerciseDialog from './ExcerciseDialog/ExcerciseDialog'
import ExerciseList from './ExerciseList/ExerciseList'
import FiltersDialog from './FiltersDialog'

function Excercises() {
    const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState<boolean>(false);
    const [isExcerciseDialogOpen, setIsExcerciseDialogOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const exercises = useAppSelector(store => store.workout.exercises);
    
    useEffect(() => {
        if (!exercises.length) {
            dispatch(WorkoutAction.loadExercises());
        }
    }, []);

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