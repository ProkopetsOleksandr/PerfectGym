import { FilterAlt, Search } from '@mui/icons-material'
import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useEffect } from 'react'
import { IExercise } from '../../../core/models/workout'
import { ExerciseAction } from '../../../core/redux/exercises.slice'
import { useAppDispatch, useAppSelector } from '../../../core/redux/hook'
import ExcerciseDialog from './ExcerciseDialog/ExcerciseDialog'
import ExerciseList from './ExerciseList/ExerciseList'
import FiltersDialog from './FiltersDialog/FiltersDialog'

function Excercises() {
    const { status, exercises } = useAppSelector(store => store.exercises);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(ExerciseAction.loadExercises());
        }
    }, [status]);

    function openExcerciseDialog(exercise?: IExercise) {
        dispatch(ExerciseAction.openExerciseDialog(exercise));
    }

    function openFilterDialog() {
        dispatch(ExerciseAction.openFilterDialog());
    }

    return (
        <div>
            <div className="margin-bottom-1" style={{ display: "flex", justifyContent: "flex-end", columnGap: "10px" }}>
                <IconButton style={{ padding: '4px 8px' }}><Search /></IconButton>
                <IconButton style={{ padding: '4px 8px' }} onClick={openFilterDialog}><FilterAlt /></IconButton>
                <Button variant='contained' onClick={() => openExcerciseDialog()}>Create</Button>
            </div>

            <ExerciseList exercises={exercises} openExercise={openExcerciseDialog} />

            <FiltersDialog />
            <ExcerciseDialog />
        </div>
    )
}

export default Excercises