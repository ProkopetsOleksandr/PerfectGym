import { Check } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { FC, ReactNode } from 'react';
import DialogTransition from './DialogTransition';

interface AppDialogProps {
    open: boolean,
    children?: ReactNode,
    title?: string,
    onClose: () => void,
    saveButtonEnabled?: boolean,
    saveButtonHandler?: () => void
}

const AppDialog: FC<AppDialogProps> = (props) => {
    return (
        <Dialog open={props.open} onClose={props.onClose} fullScreen TransitionComponent={DialogTransition}>
            <AppBar style={{ position: 'relative', background: "#272343" }}>
                <Toolbar style={{ display: "flex", justifyContent: "center" }}>
                    <IconButton onClick={props.onClose} aria-label="close" style={{ position: "absolute", left: "5px" }}>
                        <ArrowBackIcon />
                    </IconButton>
                    {props.title &&
                        <Typography variant="body1" component="div">
                            {props.title}
                        </Typography>
                    }
                    {props.saveButtonEnabled && props.saveButtonHandler &&
                        <IconButton onClick={props.saveButtonHandler} aria-label="close" style={{ position: "absolute", right: "5px" }}>
                            <Check />
                        </IconButton>
                    }
                </Toolbar>
            </AppBar>
            <DialogContent style={{ paddingTop: "1rem" }}>
                {props.children}
            </DialogContent>
        </Dialog >
    )
}

export default AppDialog;