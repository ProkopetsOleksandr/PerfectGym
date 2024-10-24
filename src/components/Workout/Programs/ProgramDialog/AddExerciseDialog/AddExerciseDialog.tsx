import { Search } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, Box, Button, Dialog, DialogContent, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { IExercise } from '../../../../../core/models/workout';
import { useAppDispatch, useAppSelector } from '../../../../../core/redux/hook';
import { ProgramAction } from '../../../../../core/redux/programs.slice';
import DialogTransition from '../../../../Common/AppDialog/DialogTransition';
import ExerciseList from './ExerciseList/ExerciseList';

interface AddExerciseDialogProps {
    onAddExercise: (exercises: IExercise[], isSuperset: boolean) => void
}

const AddExerciseDialog: React.FC<AddExerciseDialogProps> = ({ onAddExercise }) => {
    const { open, selectedExerciseIds } = useAppSelector(store => store.programs.programDialog.addExerciseDialog);
    const { exercises } = useAppSelector(store => store.exercises);
    const dispatch = useAppDispatch();

    function closeAddExerciseDialog() {
        dispatch(ProgramAction.closeAddExerciseDialog());
    }

    function onExerciseClick(exerciseId: number) {
        dispatch(ProgramAction.switchSelectedExericseInAddExerciseDialog(exerciseId));
    }

    function onAddExerciseButtonClick(isSuperset: boolean) {
        if (!selectedExerciseIds.length) {
            return;
        }

        const exercisesToAdd = structuredClone(exercises.filter(exercise => selectedExerciseIds.includes(exercise.id!)));

        onAddExercise(exercisesToAdd, isSuperset);

        dispatch(ProgramAction.closeAddExerciseDialog());
    }

    return (
        <Dialog open={open} onClose={closeAddExerciseDialog} fullScreen TransitionComponent={DialogTransition}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton onClick={closeAddExerciseDialog}
                        aria-label="close" sx={{ position: "absolute", left: "5px" }} color="inherit">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="body1" component="div">
                        Choose exercises
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent style={{ paddingTop: "1rem" }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box sx={{ flex: '1 1 auto', height: '100%', overflowY: 'auto' }}>
                        <Box className="margin-bottom-1" sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Search /> <TextField variant='standard' fullWidth />
                        </Box>
                        <Box>
                            <ExerciseList exercises={exercises} selectedExerciseIds={selectedExerciseIds} onExerciseClick={onExerciseClick} />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Button variant='contained' onClick={() => onAddExerciseButtonClick(true)}>Add superset ({selectedExerciseIds.length})</Button>
                        <Button variant='contained' onClick={() => onAddExerciseButtonClick(false)}>Add exercises ({selectedExerciseIds.length})</Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default AddExerciseDialog