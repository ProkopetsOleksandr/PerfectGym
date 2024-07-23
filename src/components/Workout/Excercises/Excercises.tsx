import { FilterAlt, Search } from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ExcerciseGroup, ExcerciseGroupLabel, IExcercise } from '../../../core/models/workout'
import classes from '../Workout.module.css'
import FiltersDialog from './FiltersDialog'

function Excercises() {
    const defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
    const [excercises, setExercises] = useState<IExcercise[]>([]);
    const [isFiltersDialogOpen, setIsFiltersDialogOpen] = React.useState<boolean>(false);

    function openFiltersDialog() : void {
        setIsFiltersDialogOpen(true);
    }

    function closeFiltersDialog() : void {
        setIsFiltersDialogOpen(false);
    }

    useEffect(() => {
        setExercises([
            {
                id: 1,
                name: "banch press",
                imageUrl: "https://www.lyfta.app/_next/image?url=https%3A%2F%2Flyfta.app%2Fimages%2Fexercises%2F00251101.png&w=640&q=10",
                excerciseGroup: ExcerciseGroup.Chest
            },
            {
                id: 2,
                name: "dumbbel v storonu",
                excerciseGroup: ExcerciseGroup.Chest
            },
            {
                id: 3,
                name: "Upraznenie 3",
                excerciseGroup: ExcerciseGroup.Chest
            },
        ])
    }, []);

    return (
        <div>
            <div className="margin-bottom-1" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <Button style={{ color: "#272343", minWidth: "40px", width: "40px" }}><Search /></Button>
                <Button style={{ color: "#272343", minWidth: "40px", width: "40px" }} onClick={openFiltersDialog}><FilterAlt /></Button>
                <Button variant='contained' style={{ background: "#272343" }}>Add</Button>
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
        </div>
    )
}

export default Excercises