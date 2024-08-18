import { Button } from '@mui/material';
import { useState } from 'react';
import { IProgram } from '../../../core/models/workout';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hook';
import { WorkoutAction } from '../../../core/redux/workout.slice';
import ProgramDialog from './ProgramDialog/ProgramDialog';
import ProgramList from './ProgramList/ProgramList';

function Programs() {
    const [isProgramDialogOpen, setIsProgramDialogOpen] = useState<boolean>(false);

    const { programs, exercises } = useAppSelector(store => store.workout);
    const dispatch = useAppDispatch();

    function onProgramSelected(program: IProgram) {
        dispatch(WorkoutAction.setSelectedProgram(program));
        setIsProgramDialogOpen(true);
    }

    return (
        <div>
            <div className="margin-bottom-1" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <Button variant='contained' style={{ background: "#272343", textTransform: "none" }} onClick={() => setIsProgramDialogOpen(true)}>Create</Button>
            </div>

            <ProgramList programs={programs} onProgramSelected={onProgramSelected} />

            <ProgramDialog open={isProgramDialogOpen} handleClose={() => setIsProgramDialogOpen(false)} />
        </div>
    )
}

export default Programs