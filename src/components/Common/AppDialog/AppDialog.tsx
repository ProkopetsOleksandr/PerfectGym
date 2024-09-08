import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FC, ReactNode } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import DialogTransition from './DialogTransition';

interface AppDialogProps {
    open: boolean,
    onClose: () => void,
    children?: ReactNode,
    title?: string
}

const AppDialog: FC<AppDialogProps> = (props) => {
    return (
        <Dialog open={props.open} onClose={props.onClose} fullScreen TransitionComponent={DialogTransition}>
            <AppBar style={{ position: 'relative', background: "#272343" }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="close">
                        <ArrowBackIcon />
                    </IconButton>
                    {props.title &&
                        <Typography variant="body1" component="div">
                            {props.title}
                        </Typography>}
                </Toolbar>
            </AppBar>
            <DialogContent style={{ paddingTop: "1rem" }}>
                {props.children}
            </DialogContent>
        </Dialog>
    )
}

export default AppDialog;