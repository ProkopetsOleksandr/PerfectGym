import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FC, ReactNode } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DialogTransition from './DialogTransition';

interface AppDialogProps {
    open: boolean,
    onClose: () => void,
    children?: ReactNode
}

const AppDialog: FC<AppDialogProps> = (props) => {
    return (
        <Dialog open={props.open} onClose={props.onClose} fullScreen TransitionComponent={DialogTransition}>
            <AppBar style={{ position: 'relative', background: "#272343" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={props.onClose}
                        aria-label="close">
                        <ArrowBackIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent style={{ paddingTop: "1rem" }}>
                {props.children}
            </DialogContent>
        </Dialog>
    )
}

export default AppDialog;