import { Chip } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FC } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DialogTransition from '../../Common/DialogTransition';

interface IFiltersDialogProps {
    open: boolean,
    handleClose: () => void
}

const FiltersDialog: FC<IFiltersDialogProps> = (props) => {
    return (
        <Dialog open={props.open} fullWidth={true} fullScreen TransitionComponent={DialogTransition}>
            <AppBar sx={{ position: 'relative', background: "#272343" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={props.handleClose}
                        aria-label="close">
                        <ArrowBackIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogTitle>Filters</DialogTitle>
            <DialogContent>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <Chip label="Chest" />
                    <Chip label="Neck" variant="outlined" />
                    <Chip label="Arms" />
                    <Chip label="Legs" variant="outlined" />
                    <Chip label="Quads" />
                    <Chip label="Biceps" variant="outlined" />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default FiltersDialog;