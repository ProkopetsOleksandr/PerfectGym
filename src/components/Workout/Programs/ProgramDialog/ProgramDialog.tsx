import React, { useState } from 'react';
import AppDialog from '../../../Common/AppDialog';
import ProgramForm, { ProgramFormValues } from './ProgramForm';

interface ProgramDialogProps {
    open: boolean,
    handleClose: () => void
}

const ProgramDialog: React.FC<ProgramDialogProps> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(true);

    function closeDialog() {
        props.handleClose();
    }

    function onSubmit(values: ProgramFormValues) {

    }

    return (
        <AppDialog open={props.open} onClose={closeDialog}>
            <ProgramForm onSubmit={onSubmit} />
        </AppDialog>
    )
}

export default ProgramDialog