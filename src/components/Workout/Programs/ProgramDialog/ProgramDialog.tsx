import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../core/redux/hook';
import { ProgramAction } from '../../../../core/redux/programs.slice';
import AppDialog from '../../../Common/AppDialog';
import ProgramForm, { ProgramFormValues } from './ProgramForm';
import ProgramViewMode from './ProgramViewMode';

interface ProgramDialogProps {
    open: boolean,
    handleClose: () => void
}

const ProgramDialog: React.FC<ProgramDialogProps> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    const selectedProgram = useAppSelector(state => state.programs.selectedProgram);
    const dispatch = useAppDispatch();

    function closeDialog() {
        props.handleClose();
        dispatch(ProgramAction.setSelectedProgram(undefined));
    }

    function onSubmit(values: ProgramFormValues) {
        console.log(values);
    }

    return (
        <AppDialog open={props.open} onClose={closeDialog}>            
            {selectedProgram && !editMode
                ? <ProgramViewMode selectedProgram={selectedProgram} />
                : <ProgramForm selectedProgram={selectedProgram} onSubmit={onSubmit} />}
        </AppDialog>
    )
}

export default ProgramDialog