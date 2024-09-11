import { Delete, Edit } from '@mui/icons-material';
import { Chip, IconButton, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { IProgram } from '../../../../core/models/workout';
import { useAppDispatch } from '../../../../core/redux/hook';
import { ProgramAction } from '../../../../core/redux/programs.slice';
import TrainingProgramDialog from './TrainingProgramDialog';

interface ProgramViewModeProps {
    selectedProgram: IProgram,
}

const ProgramViewMode: React.FC<ProgramViewModeProps> = ({ selectedProgram }) => {
    const [isProgramDayDialogOpen, setIsProgramDayDialogOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    // function openSelectedProgramDayDialog(selectedProgramDayIndex: number) {
    //     dispatch(ProgramAction.setSelectedTrainingProgramIndex(selectedProgramDayIndex));
    //     setIsProgramDayDialogOpen(true);
    // }

    return (
        <div>
            <div>
                <div style={{ marginBottom: "2rem" }}>
                    <div>
                        <strong style={{ fontSize: "1.3rem" }}>{selectedProgram.title}</strong>
                    </div>
                    {selectedProgram.description &&
                        <div className="margin-top-1">
                            <div>{selectedProgram.description}</div>
                        </div>
                    }
                    <div className='margin-top-1'>
                        <strong>Created At:</strong> {selectedProgram.createdAt.toDateString()}
                    </div>
                </div>

                {/* {selectedProgram.trainingPrograms?.length > 0 &&
                    <ul>
                        {selectedProgram.trainingPrograms.map((trainingProgram, index) =>
                            <li key={index} style={{ marginTop: "1rem", backgroundColor: "#f3f3f3"}} onClick={() => openSelectedProgramDayDialog(index)}>
                                <div style={{textAlign: "center", padding: "10px", background: "rgb(39, 35, 67)", color: "white"}}>Day {index + 1}</div>
                                <div style={{textAlign: "center", padding: "15px 10px", fontSize: "19px"}}>
                                    <strong>{trainingProgram.title}</strong>
                                </div>
                                <div style={{ textAlign: "center", fontSize: "15px" }}>
                                    ({`${trainingProgram.workout.length} exercises`})
                                </div>
                            </li>
                        )}
                    </ul>} */}
            </div>

            <TrainingProgramDialog open={isProgramDayDialogOpen} handleClose={() => setIsProgramDayDialogOpen(false)} />
        </div>
    )
}

export default ProgramViewMode