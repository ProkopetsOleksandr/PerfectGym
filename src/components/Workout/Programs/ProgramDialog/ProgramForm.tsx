import { Add } from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';
import { FormikErrors, useFormik } from 'formik';
import React, { useState } from 'react';
import { IProgram, ITrainingProgram } from '../../../../core/models/workout';

export interface ProgramFormValues {
    title: string,
    description?: string,
    trainingPrograms: ITrainingProgram[]
}

interface ProgramFormProps {
    selectedProgram?: IProgram
    onSubmit: (values: ProgramFormValues) => void
}

const ProgramForm: React.FC<ProgramFormProps> = ({ selectedProgram, onSubmit }) => {
    const [trainingPrograms, setTrainingPrograms] = useState<ITrainingProgram[]>([]);

    const initialValues: ProgramFormValues = {
        title: '',
        description: '',
        trainingPrograms: []
    };

    const formik = useFormik({
        initialValues: initialValues,
        validate: validate,
        onSubmit: (values: ProgramFormValues) => {
            values.trainingPrograms = trainingPrograms;

            onSubmit(values);
        }
    });

    function validate(values: ProgramFormValues) {
        const errors: FormikErrors<ProgramFormValues> = {};


        return errors;
    }

    function addTrainingProgram() {
        const newTrainingProgram: ITrainingProgram = {
            title: 'Chest, foot',
            workout: []
        };

        setTrainingPrograms(prev => [...prev, newTrainingProgram]);

        console.log(trainingPrograms);
    }

    function onTrainingProgramTitleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, programIndex: number) {
        setTrainingPrograms(prev => {
            const programs = [...prev];
            programs[programIndex].title = event.target.value;

            return programs;
        })
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

                <div className="margin-bottom-1">
                    Training programs: <IconButton style={{ color: "#272343" }} onClick={addTrainingProgram}><Add /></IconButton>
                </div>

                {trainingPrograms &&
                    <ul>
                        {trainingPrograms.map((tp, index) => {
                            return (
                                <li key={index} style={{ marginTop: "1rem", backgroundColor: "#f3f3f3", padding: "10px" }}>
                                    <div>
                                        <span>{`${index + 1} training day`} ({`${tp.workout.length} exercises`})</span>
                                    </div>
                                    <div style={{ marginTop: "10px" }}>
                                        <strong>{tp.title}</strong>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>}

                {formik.isValid &&
                    <div className="margin-bottom-1" style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "2rem" }}>
                        <Button variant='contained' type='submit' style={{ background: "#272343" }} fullWidth>Save</Button>
                    </div>
                }
            </form>
        </div>
    )
}

export default ProgramForm;