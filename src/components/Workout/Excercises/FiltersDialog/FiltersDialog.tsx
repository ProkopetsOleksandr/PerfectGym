import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Chip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { ExerciseAction } from '../../../../core/redux/exercises.slice';
import { useAppDispatch, useAppSelector } from '../../../../core/redux/hook';
import DialogTransition from '../../../Common/AppDialog/DialogTransition';

const FiltersDialog = () => {
    const isOpen = useAppSelector(state => state.exercises.filterDialog.isOpen);
    const dispatch = useAppDispatch();

    function closeFilterDialog() {
        dispatch(ExerciseAction.closeFilterDialog());
    }

    return (
        <Dialog open={isOpen} fullWidth={true} fullScreen TransitionComponent={DialogTransition}>
            <AppBar sx={{ position: 'relative', background: "#272343" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={closeFilterDialog}
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