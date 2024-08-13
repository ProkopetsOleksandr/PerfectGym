import { Button, TextField } from '@mui/material';
import { FormikErrors, useFormik } from 'formik';
import React from 'react';
import { ProgramViewModel } from '../../../../core/models/viewModels/workout';

export interface ProgramFormValues {
    title: string,
    description?: string
}

interface ProgramFormProps {
    selectedProgram?: ProgramViewModel
    onSubmit: (values: ProgramFormValues) => void
}

const ProgramForm: React.FC<ProgramFormProps> = ({ selectedProgram, onSubmit }) => {
    const initialValues: ProgramFormValues = {
        title: '',
        description: ''
    };

    const formik = useFormik({
        initialValues: initialValues,
        validate: validate,
        onSubmit: onSubmit
    });

    function validate(values: ProgramFormValues) {
        const errors: FormikErrors<ProgramFormValues> = {};


        return errors;
    }

    return (
        <div>
            <div style={{ marginBottom: "2rem" }}>
                <strong style={{ fontSize: "1.3rem" }}>{selectedProgram ? "Edit Program" : "Add Program"}</strong>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <TextField
                        {...formik.getFieldProps('title')}
                        label="Title"
                        error={Boolean(formik.errors.title && formik.touched.title)}
                        helperText={formik.errors.title && formik.touched.title && String(formik.errors.title)}
                        variant="outlined"
                        fullWidth />
                </div>

                <div className="form-group">
                    <TextField
                        {...formik.getFieldProps('description')}
                        label="Description"
                        error={Boolean(formik.errors.description && formik.touched.description)}
                        helperText={formik.errors.description && formik.touched.description && String(formik.errors.description)}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4} />
                </div>

                

                {formik.isValid &&
                    <div className="margin-bottom-1" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                        <Button variant='contained' type='submit' style={{ background: "#272343" }}>Save</Button>
                    </div>
                }
            </form>
        </div>
    )
}

export default ProgramForm;