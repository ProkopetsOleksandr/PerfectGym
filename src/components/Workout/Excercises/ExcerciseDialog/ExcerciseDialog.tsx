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
import ExcerciseForm, { ExcerciseFormValues } from './ExcerciseForm';
import ExcerciseViewMode from './ExcerciseViewMode';

const ExcerciseDialog = () => {
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(menuAnchorEl);

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

    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setMenuAnchorEl(null);
    };

    return (
        <Dialog open={open} onClose={closeExerciseDialog} fullScreen TransitionComponent={DialogTransition}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton onClick={editMode && selectedExercise ? switchExerciseDialogEditMode : closeExerciseDialog}
                        aria-label="close" sx={{ position: "absolute", left: "5px"}} color="inherit">
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
                        <React.Fragment>
                            <Box sx={{ position: "absolute", right: "10px" }}>
                                <IconButton
                                    onClick={openMenu}
                                    size="small"
                                    aria-controls={menuOpen ? 'exercise-dialog-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={menuOpen ? 'true' : undefined}
                                    sx={{ color: 'primary.contrastText' }}
                                >
                                    <MoreVert />
                                </IconButton>
                            </Box>
                            <Menu
                                anchorEl={menuAnchorEl}
                                id="exercise-dialog-menu"
                                open={menuOpen}
                                onClose={closeMenu}
                                onClick={closeMenu}
                                slotProps={{
                                    paper: {
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={switchExerciseDialogEditMode}>
                                    <Edit sx={{ marginRight: '10px' }} /> Edit
                                </MenuItem>
                                <MenuItem onClick={closeMenu}>
                                    <Delete sx={{ marginRight: '10px' }} />Delete
                                </MenuItem>
                            </Menu>
                        </React.Fragment>}
                </Toolbar>
            </AppBar>
            <DialogContent style={{ paddingTop: "1rem" }}>
                {selectedExercise && !editMode
                    ? <ExcerciseViewMode selectedExercise={selectedExercise} deleteExercise={deleteExercise} />
                    : <ExcerciseForm selectedExercise={selectedExercise} onSubmit={onFormSubmit} onFormValidChange={onFormValidChange} />}
            </DialogContent>
        </Dialog >


        // <AppDialog open={isOpen} onClose={closeExerciseDialog} title={mode === 'create' ? "Add exercise" : mode === 'edit' ? "Edit exercise" : ""}>
        //     {mode === 'view'
        //         ? <ExcerciseViewMode selectedExercise={selectedExercise!} setEditMode={switchExerciseDialogEditMode} deleteExercise={deleteExercise} />
        //         : <ExcerciseForm selectedExercise={selectedExercise} onSubmit={onSubmit} />}
        // </AppDialog>
    )
}

export default ExcerciseDialog;