import { Delete, Edit } from '@mui/icons-material';
import { Chip, IconButton, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { IProgram } from '../../../../core/models/workout';
import { useAppDispatch } from '../../../../core/redux/hook';
import { ProgramAction } from '../../../../core/redux/programs.slice';
import TrainingProgramDialog from './TrainingProgramDialog';

interface ProgramViewModeProps {
    selectedProgram: IProgram
}

const ProgramViewMode: React.FC<ProgramViewModeProps> = ({ selectedProgram }) => {
    const [isProgramDayDialogOpen, setIsProgramDayDialogOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    function openSelectedProgramDayDialog(selectedProgramDayIndex: number) {
        dispatch(ProgramAction.setSelectedTrainingProgramIndex(selectedProgramDayIndex));
        setIsProgramDayDialogOpen(true);
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "end", alignItems: "center", marginBottom: "1rem" }}>
                <IconButton style={{ color: "#272343" }}><Edit /></IconButton>
                <IconButton style={{ color: "#272343" }}><Delete /></IconButton>
            </div>

            <div>
                <div style={{ marginBottom: "2rem" }}>
                    <strong style={{ fontSize: "1.3rem" }}>{selectedProgram.title}</strong>
                </div>

                {selectedProgram.description &&
                    <div className='margin-bottom-1'>
                        <div><strong>Description:</strong></div>
                        <div>{selectedProgram.description}</div>
                    </div>
                }

                {selectedProgram.trainingPrograms?.length > 0 &&
                    <ul>
                        {selectedProgram.trainingPrograms.map((trainingProgram, index) =>
                            <li key={index} style={{ marginTop: "1rem", backgroundColor: "#f3f3f3", padding: "10px" }} onClick={() => openSelectedProgramDayDialog(index)}>
                                <div>
                                    <Chip label={`Day ${index + 1}`} /> <strong>{trainingProgram.title}</strong>
                                </div>
                                <div style={{ marginTop: "10px" }}>{`${trainingProgram.workout.length} exercises`}</div>
                            </li>)}
                    </ul>}
            </div>

            <TrainingProgramDialog open={isProgramDayDialogOpen} handleClose={() => setIsProgramDayDialogOpen(false)} />
        </div>
    )
}

export default ProgramViewMode