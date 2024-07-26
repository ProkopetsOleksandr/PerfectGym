import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, useEffect } from 'react';
import { IExcercise } from '../../../core/models/workout';
import { useFormik } from 'formik';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DialogTransition from '../../Common/DialogTransition';
import { TextField } from '@mui/material';

interface IExcerciseDialogProps {
    excercise?: IExcercise,
    open: boolean,
    handleClose: () => void
}

interface ExcerciseFormValues {
    title: string,
    description?: string
}

const ExcerciseDialog: FC<IExcerciseDialogProps> = (props) => {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: ''
        },
        validate: validate,
        onSubmit: onSubmit
    });

    useEffect(() => {
        if (props.open) {
            formik.validateForm();
        }
    }, [props.open])

    function validate(values: ExcerciseFormValues) {
        const errors: Partial<ExcerciseFormValues> = {};

        const title = values.title.trim();
        if (!title) {
            errors.title = 'Required';
        } else if (title.length > 150) {
            errors.title = 'Max lenght is 150 characters';
        }

        if (!values.description?.trim()) {
            errors.description = 'Required';
        }

        return errors;
    }

    function onSubmit(values: ExcerciseFormValues) {
        console.log(values);
    }

    function closeDialog() {
        props.handleClose();
        formik.resetForm();
    }

    return (
        <Dialog open={props.open} onClose={closeDialog} fullScreen TransitionComponent={DialogTransition}>
            <AppBar style={{ position: 'relative', background: "#272343" }}>
                <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={closeDialog}
                        aria-label="close">
                        <ArrowBackIcon />
                    </IconButton>
                    <Button color="inherit" onClick={formik.submitForm} disabled={!formik.isValid}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogTitle>{props.excercise ? "Update excerice" : "Add excercise"}</DialogTitle>
            <DialogContent style={{ paddingTop: "5px" }}>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <TextField
                            {...formik.getFieldProps('title')}
                            value={formik.values.title}
                            label="Title"
                            error={Boolean(formik.errors.title && formik.touched.title)}
                            helperText={formik.errors.title && formik.touched.title && String(formik.errors.title)}
                            variant="outlined"
                            fullWidth />
                    </div>

                    <div className="form-group">
                        <TextField
                            {...formik.getFieldProps('description')}
                            value={formik.values.description}
                            label="Description"
                            error={Boolean(formik.errors.description && formik.touched.description)}
                            helperText={formik.errors.description && formik.touched.description && String(formik.errors.description)}
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4} />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ExcerciseDialog