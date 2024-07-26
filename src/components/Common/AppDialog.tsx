import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, ReactNode } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DialogTransition from './DialogTransition';
import ScreenLoader from './ScreenLoader';

interface AppDialogProps {
    title: string,
    open: boolean,
    isSaveButtonVisible: boolean,
    isSaveButtonDisabled: boolean,
    onClose: () => void,
    onSave: () => Promise<void> | void,
    children?: ReactNode
}

const AppDialog: FC<AppDialogProps> = (props) => {
  return (
      <Dialog open={props.open} onClose={props.onClose} fullScreen TransitionComponent={DialogTransition}>
          <AppBar style={{ position: 'relative', background: "#272343" }}>
              <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                  <IconButton
                      edge="start"
                      color="inherit"
                      onClick={props.onClose}
                      aria-label="close">
                      <ArrowBackIcon />
                  </IconButton>
                  {props.isSaveButtonVisible &&
                    <Button color="inherit" onClick={props.onSave} disabled={props.isSaveButtonDisabled}>
                          save
                    </Button>}
              </Toolbar>
          </AppBar>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogContent style={{ paddingTop: "5px" }}>
              {props.children}
          </DialogContent>
      </Dialog>
  )
}

export default AppDialog