import { Chip } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FC } from 'react';

interface IFiltersDialogProps {
    open: boolean,
    handleClose: () => void
}

const FiltersDialog: FC<IFiltersDialogProps> = (props) => {
    return (
        <Dialog open={props.open} fullWidth={true} onClose={props.handleClose}>
            <DialogTitle>Filters</DialogTitle>
            <DialogContent>
                <div style={{display: "flex", gap: "10px", flexWrap: "wrap"}}>
                    <Chip label="Chest" />
                    <Chip label="Neck" variant="outlined" />
                    <Chip label="Arms" />
                    <Chip label="Legs" variant="outlined" />
                    <Chip label="Quads" />
                    <Chip label="Biceps" variant="outlined" />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button type="submit">OK</Button>
            </DialogActions>
        </Dialog>
    )
}

export default FiltersDialog;