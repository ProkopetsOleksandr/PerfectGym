import React from 'react';
import { ITrainingProgram } from '../../../../core/models/workout';
import { useAppSelector } from '../../../../core/redux/hook';
import AppDialog from '../../../Common/AppDialog';
import ProgramDayExerciseList from './ProgramDayExerciseList';

interface ProgramDayDialogProps {
    open: boolean,
    handleClose: () => void
}

const ProgramDayDialog: React.FC<ProgramDayDialogProps> = ({ open, handleClose }) => {
    const { selectedProgram, selectedProgramDayIndex } = useAppSelector(state => state.workout);

    const selectedProgramDay = selectedProgram?.trainingPrograms[selectedProgramDayIndex!];

    function onDialogClose() {
        handleClose();
    }

    if (!selectedProgramDay) {
        return (
            <div>No data</div>
        )
    }

    return (
        <AppDialog open={open} onClose={onDialogClose} title={selectedProgramDay.title}>
            <div>
                {selectedProgramDay.workout?.length > 0 &&
                    <ProgramDayExerciseList programDayExercises={selectedProgramDay.workout} />}
            </div>
        </AppDialog>
    )
}

export default ProgramDayDialog;