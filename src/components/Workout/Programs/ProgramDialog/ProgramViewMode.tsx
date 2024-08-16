import { Delete, Edit } from '@mui/icons-material';
import { Chip, IconButton, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { IProgram } from '../../../../core/models/workout';
import { useAppDispatch } from '../../../../core/redux/hook';
import { WorkoutAction } from '../../../../core/redux/workout.slice';
import ProgramDayDialog from './ProgramDayDialog';

interface ProgramViewModeProps {
    program: IProgram
}

const ProgramViewMode: React.FC<ProgramViewModeProps> = ({ program }) => {
    const [isProgramDayDialogOpen, setIsProgramDayDialogOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    function openSelectedProgramDayDialog(selectedProgramDayIndex: number) {
        dispatch(WorkoutAction.setSelectedProgramDayIndex(selectedProgramDayIndex));
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
                    <strong style={{ fontSize: "1.3rem" }}>{program.title}</strong>
                </div>

                {program.description &&
                    <div className='margin-bottom-1'>
                        <div><strong>Description:</strong></div>
                        <div>{program.description}</div>
                    </div>
                }

                {/* <div>
                    {program.programDays?.length > 0 &&
                        <Box sx={{ width: '100%', typography: 'body1' }}>

                            <Tabs value={activeProgramDayTab} onChange={onActiveTabChanged} variant="scrollable">
                               {program.programDays.map((day, index) => <Tab key={index} label={`Day ${index+1}`} />)}
                            </Tabs>

                            {activeProgramDay && <ProgramDay programDay={activeProgramDay} />}
                        </Box>}
                </div> */}

                {program.trainingPrograms?.length > 0 &&
                    <ul>
                        {program.trainingPrograms.map((programDay, index) =>
                            <li key={index} style={{ marginTop: "1rem", backgroundColor: "#f3f3f3", padding: "10px" }} onClick={() => openSelectedProgramDayDialog(index)}>
                                <div>
                                    <Chip label={`Day ${index + 1}`} /> <strong>{programDay.title}</strong>
                                </div>
                                <div style={{ marginTop: "10px" }}>{`${programDay.workout.length} exercises`}</div>
                            </li>)}
                    </ul>}
            </div>

            <ProgramDayDialog open={isProgramDayDialogOpen} handleClose={() => setIsProgramDayDialogOpen(false)} />
        </div>
    )
}

export default ProgramViewMode