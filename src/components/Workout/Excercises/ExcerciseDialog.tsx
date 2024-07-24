import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, useEffect, useState, useRef } from 'react';
import { IExcercise } from '../../../core/models/workout';
import { useFormik } from 'formik';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DialogTransition from '../../Common/DialogTransition';
import { TextField, Menu, MenuItem } from '@mui/material';

interface IExcerciseDialogProps {
    excercise?: IExcercise,
    open: boolean,
    handleClose: () => void
}

interface ExcerciseFormValues {
    title: string,
    description?: string,
    imageUrl?: string
}

const ExcerciseDialog: FC<IExcerciseDialogProps> = (props) => {
    const defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
    const imageSelectorRef = useRef<HTMLInputElement>(null);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            imageUrl: ''
        },
        validate: validate,
        onSubmit: onSubmit
    });

    useEffect(() => {
        if (props.open) {
            formik.validateForm();
            setSelectedFile(undefined);
            setPreview(undefined);
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

        console.log(imageSelectorRef.current)
    }

    function closeDialog() {
        props.handleClose();
        formik.resetForm();
    }



    /* FILE SELECT-related stuff should be moved to another component */
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const imageContextPopupOpen = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChooseFileBtnClick = () => {
        imageSelectorRef.current?.click();
        handleClose();
    }

    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const [preview, setPreview] = useState<string | undefined>();

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    function onImageChanged (e: React.FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement & { files: FileList };

        if (!target.files || target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(target.files[0]);
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
                        <Button id="basic-button" aria-controls={imageContextPopupOpen ? 'basic-menu' : undefined} aria-haspopup="true"
                            aria-expanded={imageContextPopupOpen ? 'true' : undefined} onClick={handleClick} style={{ padding: "0" }}>
                            <img src={preview ?? defaultImageUrl} alt="excercise" style={{ maxWidth: "100%" }} />
                        </Button>
                        <Menu id="basic-menu"
                            anchorEl={anchorEl}
                            open={imageContextPopupOpen}
                            onClose={handleClose}
                            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                            anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                        >
                            <MenuItem onClick={handleChooseFileBtnClick}>Choose a file</MenuItem>
                            {props.excercise?.imageUrl && <MenuItem onClick={handleClose}>Delete</MenuItem>}
                        </Menu>
                    </div>

                    <div hidden>
                        <input type="file" accept="image/png, image/jpg" multiple={false} name="imageUrl" ref={imageSelectorRef}  onChange={onImageChanged}  />
                    </div>

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