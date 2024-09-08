import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../core/redux/hook';
import { ProgramAction } from '../../../../core/redux/programs.slice';
import AppDialog from '../../../Common/AppDialog/AppDialog';
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
        if (editMode && selectedProgram) {
            setEditMode(false);
            return;
        }

        props.handleClose();
        dispatch(ProgramAction.setSelectedProgram(undefined));
        setEditMode(false);
    }

    function onSubmit(values: ProgramFormValues) {
        console.log(values);
    }

    function switchToEditMode() {
        setEditMode(true);
    }

    return (
        <AppDialog open={props.open} onClose={closeDialog}>            
            {selectedProgram && !editMode
                ? <ProgramViewMode selectedProgram={selectedProgram} switchToEditMode={switchToEditMode} />
                : <ProgramForm selectedProgram={selectedProgram} onSubmit={onSubmit} />}
        </AppDialog>
    )
}

export default ProgramDialog