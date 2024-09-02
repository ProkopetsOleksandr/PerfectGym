import React from 'react';
import { useAppSelector } from '../../../../core/redux/hook';
import AppDialog from '../../../Common/AppDialog';

interface ExerciseWithSettingsDialogProps {
    open: boolean,
    handleClose: () => void
}

const ExerciseWithSettingsDialog: React.FC<ExerciseWithSettingsDialogProps> = ({open, handleClose}) => {
    //const selectedProgramDayExercise = useAppSelector(state => state.workout.selectedProgramExercise);

    function onDialogClose() {
        handleClose();
    }

    return (
        <AppDialog open={open} onClose={onDialogClose}>
            
        </AppDialog>
    )
}

export default ExerciseWithSettingsDialog;