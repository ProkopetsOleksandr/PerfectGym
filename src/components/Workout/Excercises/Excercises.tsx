import { FilterAlt, Search } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useState } from 'react'
import { ExcerciseGroupLabel } from '../../../core/models/workout'
import classes from '../Workout.module.css'
import FiltersDialog from './FiltersDialog'
import { useAppSelector } from '../../../core/redux/hook'
import ExcerciseDialog from './ExcerciseDialog'
import IconButton from '@mui/material/IconButton';

function Excercises() {
    const defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

    const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState<boolean>(false);
    const [isExcerciseDialogOpen, setIsExcerciseDialogOpen] = useState<boolean>(false);
    const excercises = useAppSelector(store => store.workout.excercises);

    return (
        <div>
            <div className="margin-bottom-1" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <IconButton style={{ color: "#272343" }}><Search /></IconButton>
                <IconButton style={{ color: "#272343" }} onClick={() => setIsFiltersDialogOpen(true)}><FilterAlt /></IconButton>
                <Button variant='contained' style={{ background: "#272343" }} onClick={() => setIsExcerciseDialogOpen(true)}>Add</Button>
            </div>

            <ul>
                {excercises && excercises.map(excercise =>
                    <li key={excercise.id} className={classes.exercise}>
                        <img src={excercise.imageUrl ?? defaultImageUrl} alt='excercise' />
                        <div className={classes.excerciseInfo}>
                            <div className={classes.name}>{excercise.title}</div>
                            <div className={classes.group}>{ExcerciseGroupLabel.get(excercise.excerciseGroup)}</div>
                        </div>
                    </li>)}
            </ul>

            <FiltersDialog open={isFiltersDialogOpen} handleClose={() => setIsFiltersDialogOpen(false)} />
            <ExcerciseDialog open={isExcerciseDialogOpen} handleClose={() => setIsExcerciseDialogOpen(false)} />
        </div>
    )
}

export default Excercises