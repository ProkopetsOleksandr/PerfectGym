import { Button } from '@mui/material';
import { useEffect } from 'react';
import { IProgram } from '../../../core/models/workout';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hook';
import { ProgramAction } from '../../../core/redux/programs.slice';
import ProgramDialog from './ProgramDialog/ProgramDialog';
import ProgramList from './ProgramList/ProgramList';

function Programs() {
    //const [isProgramDialogOpen, setIsProgramDialogOpen] = useState<boolean>(false);

    const { status, programs } = useAppSelector(store => store.programs);
    
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (status === 'idle') {
            dispatch(ProgramAction.loadPrograms());
        }
    }, [status]);

    function openProgramDialog(program?: IProgram) {
        dispatch(ProgramAction.openProgramDialog(program));
    }

    return (
        <div>
            <div className="margin-bottom-1" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <Button variant='contained' style={{ background: "#272343", textTransform: "none" }} onClick={() => openProgramDialog()}>Create</Button>
            </div>

            <ProgramList programs={programs} openProgram={openProgramDialog} />

            <ProgramDialog />
        </div>
    )
}

export default Programs