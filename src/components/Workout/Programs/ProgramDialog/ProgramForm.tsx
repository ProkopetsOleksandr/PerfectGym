import styled from '@emotion/styled';
import { Add, Edit } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Card, CardContent, CardHeader, Chip, IconButton, Menu, MenuItem, TextField, Typography } from '@mui/material';
import { FormikErrors, useFormik } from 'formik';
import React, { useState } from 'react';
import { IProgram, ITrainingProgram } from '../../../../core/models/workout';
import Carousel from '../../../Common/Carousel/Carousel';
import CarouselItem from '../../../Common/Carousel/CarouselItem';
import WorkoutList from './WorkoutList';

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
    const [trainingPrograms, setTrainingPrograms] = useState<ITrainingProgram[]>(() => {
        return selectedProgram?.trainingPrograms ?? [];
    });

    console.log(selectedProgram);

    const initialValues: ProgramFormValues = {
        title: selectedProgram?.title ?? "",
        description: selectedProgram?.description ?? "",
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

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const newTrainingPrograms = structuredClone(trainingPrograms);
        const trainingProgram = newTrainingPrograms.at(index);
        if (trainingProgram) {
            trainingProgram.title = event.target.value;
        }

        setTrainingPrograms(newTrainingPrograms);
    };

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
                    <Carousel>
                        {trainingPrograms.map((trainingProgram, index) => {
                            return <div>
                                <CarouselItem key={index}>
                                    <Card>
                                        <Box sx={{ backgroundColor: '#f5f5f5', p: 1 }}> {/* Цвет фона заголовка */}
                                            <CardHeader
                                                title={
                                                    <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                                        <Chip label={`Day ${index + 1}`} color="primary" />
                                                        <TextField
                                                            variant="standard"
                                                            value={trainingProgram.title}
                                                            onChange={(e) => handleTitleChange(e, index)}
                                                            size="small"
                                                        />
                                                    </div>

                                                }
                                                action={
                                                    <IconButton onClick={handleMenuOpen}>
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                }
                                            />
                                        </Box>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                                            <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                                        </Menu>
                                        <CardContent>
                                            <WorkoutList workout={trainingProgram.workout} />
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            </div>
                        })}
                    </Carousel>}

                {/* {trainingPrograms &&
                    <ul>
                        {trainingPrograms.map((trainingProgram, index) => {
                            return (
                                <li key={index} style={{ marginTop: "1rem", backgroundColor: "#f3f3f3" }}>
                                    <div style={{ textAlign: "center", padding: "10px", background: "rgb(39, 35, 67)", color: "white" }}>Day {index + 1}</div>
                                    <div style={{ textAlign: "center", padding: "15px 10px", fontSize: "19px" }}>
                                        <TextField
                                            label="Title"
                                            variant="outlined"
                                            fullWidth
                                            value={trainingProgram.title}/>
                                    </div>
                                    <div style={{ textAlign: "center", fontSize: "15px" }}>
                                        <Button variant="text" endIcon={<Edit />} style={{color: "#272343"}}>
                                            manage exercises ({trainingProgram.workout.length})
                                        </Button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>} */}

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