import { Button } from '@mui/material';
import { useState } from 'react';
import { IProgram } from '../../../core/models/workout';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hook';
import { ProgramAction } from '../../../core/redux/programs.slice';
import ProgramDialog from './ProgramDialog/ProgramDialog';
import ProgramList from './ProgramList/ProgramList';

function Programs() {
    const [isProgramDialogOpen, setIsProgramDialogOpen] = useState<boolean>(false);

    const { programs } = useAppSelector(store => store.programs);
    const dispatch = useAppDispatch();

    function onProgramSelected(program: IProgram) {
        dispatch(ProgramAction.setSelectedProgram(program));
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