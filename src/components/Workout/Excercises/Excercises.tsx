import { FilterAlt, Search } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useState } from 'react'
import { ExcerciseGroupLabel, IExcercise } from '../../../core/models/workout'
import classes from '../Workout.module.css'
import FiltersDialog from './FiltersDialog'
import { useAppSelector } from '../../../core/redux/hook'
import ExcerciseDialog from './ExcerciseDialog'

function Excercises() {
    const defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
    const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState<boolean>(false);
    const [isExcerciseDialogOpen, setIsExcerciseDialogOpen] = useState<boolean>(false);

    const excercises = useAppSelector(store => store.workout.excercises);

    function openFiltersDialog() : void {
        setIsFiltersDialogOpen(true);
    }

    function closeFiltersDialog() : void {
        setIsFiltersDialogOpen(false);
    }

    function openExcericseDialog() : void {
        setIsExcerciseDialogOpen(true);
    }

    function closeExcericseDialog() : void {
        setIsExcerciseDialogOpen(false);
    }

    return (
        <div>
            <div className="margin-bottom-1" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <Button style={{ color: "#272343", minWidth: "40px", width: "40px" }}><Search /></Button>
                <Button style={{ color: "#272343", minWidth: "40px", width: "40px" }} onClick={openFiltersDialog}><FilterAlt /></Button>
                <Button variant='contained' style={{ background: "#272343" }} onClick={openExcericseDialog}>Add</Button>
            </div>

            <ul>
                {excercises && excercises.map(excercise =>
                    <li key={excercise.id} className={classes.exercise}>
                        <img src={excercise.imageUrl ?? defaultImageUrl} alt='excercise' />
                        <div className={classes.excerciseInfo}>
                            <div className={classes.name}>{excercise.name}</div>
                            <div className={classes.group}>{ExcerciseGroupLabel.get(excercise.excerciseGroup)}</div>
                        </div>
                    </li>)}
            </ul>

            <FiltersDialog open={isFiltersDialogOpen} handleClose={closeFiltersDialog} />
            <ExcerciseDialog open={isExcerciseDialogOpen} handleClose={closeExcericseDialog} />
        </div>
    )
}

export default Excercises