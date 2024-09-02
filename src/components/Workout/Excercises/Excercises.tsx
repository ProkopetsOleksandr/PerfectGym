import { FilterAlt, Search } from '@mui/icons-material'
import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useEffect, useState } from 'react'
import { IExercise } from '../../../core/models/workout'
import { ExerciseAction } from '../../../core/redux/exercises.slice'
import { useAppDispatch, useAppSelector } from '../../../core/redux/hook'
import ExcerciseDialog from './ExcerciseDialog/ExcerciseDialog'
import ExerciseList from './ExerciseList/ExerciseList'
import FiltersDialog from './FiltersDialog'

function Excercises() {
    const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState<boolean>(false);
    const [isExcerciseDialogOpen, setIsExcerciseDialogOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const exercises = useAppSelector(store => store.exercises.exercises);
    
    useEffect(() => {
        if (!exercises.length) {
            dispatch(ExerciseAction.loadExercises());
        }
    }, []);

    function openExcercise(exercise: IExercise) {
        dispatch(ExerciseAction.setSelectedExcercise(exercise));
        setIsExcerciseDialogOpen(true);
    }

    return (
        <div>
            <div className="margin-bottom-1" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <IconButton style={{ color: "#272343" }}><Search /></IconButton>
                <IconButton style={{ color: "#272343" }} onClick={() => setIsFiltersDialogOpen(true)}><FilterAlt /></IconButton>
                <Button variant='contained' style={{ background: "#272343", textTransform: "none" }} onClick={() => setIsExcerciseDialogOpen(true)}>Create</Button>
            </div>

            <ExerciseList exercises={exercises} openExercise={openExcercise} />

            <FiltersDialog open={isFiltersDialogOpen} handleClose={() => setIsFiltersDialogOpen(false)} />
            <ExcerciseDialog open={isExcerciseDialogOpen} handleClose={() => setIsExcerciseDialogOpen(false)} />
        </div>
    )
}

export default Excercises