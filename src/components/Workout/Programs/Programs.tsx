import { Button } from '@mui/material';
import { useState } from 'react';
import { Program } from '../../../core/models/workout';
import { useAppSelector } from '../../../core/redux/hook';
import ProgramDialog from './ProgramDialog/ProgramDialog';
import ProgramList from './ProgramList/ProgramList';

function Programs() {
    const [isProgramDialogOpen, setIsProgramDialogOpen] = useState<boolean>(false);

    const { programs, exercises } = useAppSelector(store => store.workout);

    function onProgramSelected(program: Program) {
        setIsProgramDialogOpen(true);
    }

    return (
        <div>
            <div className="margin-bottom-1" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <Button variant='contained' style={{ background: "#272343" }} onClick={() => setIsProgramDialogOpen(true)}>Create program</Button>
            </div>

            <ProgramList programs={programs} onProgramSelected={onProgramSelected} />

            <ProgramDialog open={isProgramDialogOpen} handleClose={() => setIsProgramDialogOpen(false)} />
        </div>
    )
}

export default Programs