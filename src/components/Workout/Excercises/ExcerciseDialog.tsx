import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FC } from 'react';
import { IExcercise } from '../../../core/models/workout';

interface IExcerciseDialogProps {
    excercise?: IExcercise,
    open: boolean,
    handleClose: () => void
}

const ExcerciseDialog : FC<IExcerciseDialogProps> = (props) => {

    return (
        <Dialog open={props.open} fullWidth={true} onClose={props.handleClose}>
            <DialogTitle>{props.excercise ? "Update excerice" : "Add excercise"}</DialogTitle>
            <DialogContent>
                Excercise dialog
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button type="submit">OK</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ExcerciseDialog