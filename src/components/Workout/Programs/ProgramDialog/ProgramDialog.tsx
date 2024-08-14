import React, { useState } from 'react';
import { useAppSelector } from '../../../../core/redux/hook';
import AppDialog from '../../../Common/AppDialog';
import ProgramForm, { ProgramFormValues } from './ProgramForm';
import ProgramViewMode from './ProgramViewMode';

interface ProgramDialogProps {
    open: boolean,
    handleClose: () => void
}

const ProgramDialog: React.FC<ProgramDialogProps> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(true);

    const selectedProgram = useAppSelector(state => state.workout.selectedProgram);

    function closeDialog() {
        props.handleClose();
    }

    function onSubmit(values: ProgramFormValues) {

    }

    return (
        <AppDialog open={props.open} onClose={closeDialog}>
            {/* <ProgramForm onSubmit={onSubmit} /> */}
            
            {selectedProgram && <ProgramViewMode program={selectedProgram} />}
            {!selectedProgram && <div>Unknown program</div>}
        </AppDialog>
    )
}

export default ProgramDialog