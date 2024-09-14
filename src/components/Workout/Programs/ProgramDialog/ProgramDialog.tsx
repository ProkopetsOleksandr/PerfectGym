import { Check, Delete, Edit } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, Dialog, DialogContent, IconButton, MenuItem, Toolbar, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../core/redux/hook';
import { ProgramAction } from '../../../../core/redux/programs.slice';
import DialogTransition from '../../../Common/AppDialog/DialogTransition';
import MoreVertMenu from '../../../Common/MoreVertMenu/MoreVertMenu';
import ProgramForm, { ProgramFormValues } from './ProgramForm';
import ProgramViewMode from './ProgramViewMode';

const ProgramDialog = () => {
    const { open, selectedProgram, editMode, formValid } = useAppSelector(store => store.programs.programDialog);

    const dispatch = useAppDispatch();

    function closeProgramDialog() {
        dispatch(ProgramAction.closeProgramDialog());
    }

    function onSave() {

    }

    // function onSubmit(values: ProgramFormValues) {
    //     console.log(values);
    // }

    function switchProgramDialogEditMode() {
        dispatch(ProgramAction.switchProgramDialogEditMode());
    }

    return (
        <Dialog open={open} onClose={closeProgramDialog} fullScreen TransitionComponent={DialogTransition}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton onClick={editMode && selectedProgram ? switchProgramDialogEditMode : closeProgramDialog}
                        aria-label="close" sx={{ position: "absolute", left: "5px" }} color="inherit">
                        <ArrowBackIcon />
                    </IconButton>
                    {editMode &&
                        <Typography variant="body1" component="div">
                            {selectedProgram ? "Edit program" : "Create program"}
                        </Typography>
                    }
                    {editMode && formValid &&
                        <IconButton onClick={onSave} sx={{ position: "absolute", right: "5px", color: 'primary.contrastText' }}>
                            <Check />
                        </IconButton>
                    }
                    {!editMode &&
                        <MoreVertMenu menuName='program-dialog-menu' sx={{ position: "absolute", right: "10px" }}>
                            <MenuItem onClick={switchProgramDialogEditMode}>
                                <Edit sx={{ marginRight: '10px' }} /> Edit
                            </MenuItem>
                            <MenuItem>
                                <Delete sx={{ marginRight: '10px' }} />Delete
                            </MenuItem>
                        </MoreVertMenu>}
                </Toolbar>
            </AppBar>
            <DialogContent style={{ paddingTop: "1rem" }}>
                {selectedProgram && !editMode
                    ? <ProgramViewMode selectedProgram={selectedProgram} />
                    : <ProgramForm selectedProgram={selectedProgram} />}
            </DialogContent>
        </Dialog >
    )
}

export default ProgramDialog