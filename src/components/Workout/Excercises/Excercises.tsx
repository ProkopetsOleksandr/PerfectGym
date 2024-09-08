import { FilterAlt, Search } from '@mui/icons-material'
import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useEffect, useState } from 'react'
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

    function openExcercise(exercise?: IExercise) {
        dispatch(ExerciseAction.openExerciseDialog(exercise));
    }

    function openFilterDialog() {
        dispatch(ExerciseAction.openFilterDialog());
    }

    return (
        <div>
            <div className="margin-bottom-1" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <IconButton style={{ color: "#272343" }}><Search /></IconButton>
                <IconButton style={{ color: "#272343" }} onClick={openFilterDialog}><FilterAlt /></IconButton>
                <Button variant='contained' style={{ background: "#272343", textTransform: "none" }} onClick={() => openExcercise()}>Create</Button>
            </div>

            <ExerciseList exercises={exercises} openExercise={openExcercise} />

            <FiltersDialog />
            <ExcerciseDialog />
        </div>
    )
}

export default Excercises