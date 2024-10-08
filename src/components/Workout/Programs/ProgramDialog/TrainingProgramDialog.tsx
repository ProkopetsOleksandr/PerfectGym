import React from 'react';
import { useAppSelector } from '../../../../core/redux/hook';
import AppDialog from '../../../Common/AppDialog/AppDialog';
import WorkoutList from './WorkoutList';

interface TrainingProgramDialogProps {
    open: boolean,
    handleClose: () => void
}

const TrainingProgramDialog: React.FC<TrainingProgramDialogProps> = (props) => {
    // const { selectedProgram, selectedTrainingProgramIndex } = useAppSelector(state => state.programs);
    // const selectedTrainingProgram = selectedProgram?.trainingPrograms[selectedTrainingProgramIndex!];

    // function onDialogClose() {
    //     props.handleClose();
    // }

    // if (!selectedTrainingProgram) {
    //     return <div></div>;
    // }

    // return (
    //     <AppDialog open={props.open} onClose={onDialogClose} title={selectedTrainingProgram.title}>
    //         <div>
    //             {selectedTrainingProgram.workout?.length > 0 &&
    //                 <WorkoutList workout={selectedTrainingProgram.workout} />}
    //         </div>
    //     </AppDialog>
    // )

    return (<div></div>);
}

export default TrainingProgramDialog;