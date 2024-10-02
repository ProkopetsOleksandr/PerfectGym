import { Check, Delete, Edit, MoreVert } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { IExercise } from '../../../../core/models/workout';
import { ExerciseAction } from '../../../../core/redux/exercises.slice';
import { useAppDispatch, useAppSelector } from '../../../../core/redux/hook';
import DialogTransition from '../../../Common/AppDialog/DialogTransition';
import MoreVertMenu from '../../../Common/MoreVertMenu/MoreVertMenu';
import ExcerciseForm, { ExcerciseFormValues } from './ExcerciseForm';
import ExcerciseViewMode from './ExcerciseViewMode';

const ExcerciseDialog = () => {
    const { open, selectedExercise, editMode, formValid } = useAppSelector(store => store.exercises.exerciseDialog);
    const dispatch = useAppDispatch();

    function submitForm() {
    }

    function onFormSubmit(values: ExcerciseFormValues) {
        const excercise: IExercise = {
            id: selectedExercise?.id,
            title: values.title,
            description: values.description,
            muscleGroup: values.muscleGroup,
            measurementCategory: values.measurementCategory
        };

        // dispatch(ApplicationAction.startLoading());

        // if (selectedExercise) {
        //     dispatch(ExerciseAction.updateExcercise(excercise))
        //         .then(() => {
        //             dispatch(ApplicationAction.endLoading());
        //             setEditMode(false);
        //         });
        // } else {
        //     dispatch(ExerciseAction.addExcercise(excercise))
        //         .then(() => {
        //             dispatch(ApplicationAction.endLoading());
        //             closeExerciseDialog();
        //         });
        // }
    }

    function deleteExercise() {
        if (!selectedExercise) {
            return;
        }

        dispatch(ExerciseAction.deleteExercise(selectedExercise.id!));
        closeExerciseDialog();
    }

    function closeExerciseDialog() {
        dispatch(ExerciseAction.closeExerciseDialog());
    }

    function switchExerciseDialogEditMode() {
        dispatch(ExerciseAction.switchExerciseDialogEditMode());
    }

    function onFormValidChange(isValid: boolean) {
        dispatch(ExerciseAction.setExerciseDialogFormValid(isValid));
    }

    return (
        <Dialog open={open} onClose={closeExerciseDialog} fullScreen TransitionComponent={DialogTransition}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton onClick={editMode && selectedExercise ? switchExerciseDialogEditMode : closeExerciseDialog}
                        aria-label="close" sx={{ position: "absolute", left: "5px" }} color="inherit">
                        <ArrowBackIcon />
                    </IconButton>
                    {editMode &&
                        <Typography variant="body1" component="div">
                            {selectedExercise ? "Edit exercise" : "Create exercise"}
                        </Typography>
                    }
                    {editMode && formValid &&
                        <IconButton onClick={submitForm} sx={{ position: "absolute", right: "5px", color: 'primary.contrastText' }}>
                            <Check />
                        </IconButton>
                    }
                    {!editMode &&
                        <MoreVertMenu menuName='exercise-dialog-menu' sx={{ position: "absolute", right: "10px" }}>
                            <MenuItem onClick={switchExerciseDialogEditMode}>
                                <Edit sx={{ marginRight: '10px' }} /> Edit
                            </MenuItem>
                            <MenuItem>
                                <Delete sx={{ marginRight: '10px' }} />Delete
                            </MenuItem>
                        </MoreVertMenu>}
                </Toolbar>
            </AppBar>
            <DialogContent style={{ paddingTop: "1rem" }}>
                {selectedExercise && !editMode
                    ? <ExcerciseViewMode selectedExercise={selectedExercise} deleteExercise={deleteExercise} />
                    : <ExcerciseForm selectedExercise={selectedExercise} onSubmit={onFormSubmit} onFormValidChange={onFormValidChange} />}
            </DialogContent>
        </Dialog>
    )
}

export default ExcerciseDialog;