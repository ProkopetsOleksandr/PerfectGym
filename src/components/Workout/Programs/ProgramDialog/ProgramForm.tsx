import { Add, Edit } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Card, CardContent, CardHeader, Chip, IconButton, Menu, MenuItem, TextField, Typography } from '@mui/material';
import { FormikErrors, useFormik } from 'formik';
import React, { useState } from 'react';
import { IProgram, ITrainingProgram } from '../../../../core/models/workout';
import Carousel from '../../../Common/Carousel/Carousel';
import CarouselItem from '../../../Common/Carousel/CarouselItem';
import MoreVertMenu from '../../../Common/MoreVertMenu/MoreVertMenu';
import WorkoutList from './WorkoutList';

export interface ProgramFormValues {
    title: string,
    description?: string,
    trainingPrograms: ITrainingProgram[]
}

interface ProgramFormProps {
    selectedProgram?: IProgram
}

const ProgramForm: React.FC<ProgramFormProps> = ({ selectedProgram }) => {
    const [trainingPrograms, setTrainingPrograms] = useState<ITrainingProgram[]>(() => {
        return selectedProgram?.trainingPrograms ?? [];
    });

    const initialValues: ProgramFormValues = {
        title: selectedProgram?.title ?? "",
        description: selectedProgram?.description ?? "",
        trainingPrograms: []
    };

    const formik = useFormik({
        initialValues: initialValues,
        validate: validate,
        onSubmit: (values: ProgramFormValues) => { }
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

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const newTrainingPrograms = structuredClone(trainingPrograms);
        const trainingProgram = newTrainingPrograms.at(index);
        if (trainingProgram) {
            trainingProgram.title = event.target.value;
        }

        setTrainingPrograms(newTrainingPrograms);
    };

    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Box className="form-group">
                    <TextField
                        {...formik.getFieldProps('title')}
                        label="Title"
                        error={Boolean(formik.errors.title && formik.touched.title)}
                        helperText={formik.errors.title && formik.touched.title && String(formik.errors.title)}
                        variant="outlined"
                        fullWidth />
                </Box>

                <Box className="form-group">
                    <TextField
                        {...formik.getFieldProps('description')}
                        label="Description"
                        error={Boolean(formik.errors.description && formik.touched.description)}
                        helperText={formik.errors.description && formik.touched.description && String(formik.errors.description)}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4} />
                </Box>

                <Box className="margin-bottom-1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant='subtitle1'>
                        Training programs:
                    </Typography>
                    <IconButton sx={{ backgroundColor: 'secondary.main', color: 'primary.contrastText' }} onClick={addTrainingProgram}>
                        <Add />
                    </IconButton>
                </Box>

                {trainingPrograms &&
                    <Carousel>
                        {trainingPrograms.map((trainingProgram, index) => {
                            return <CarouselItem key={index}>
                                <Box className="margin-bottom-1" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <Chip label={`Day ${index + 1}`} color="secondary" sx={{ color: 'primary.contrastText' }} />

                                    <MoreVertMenu menuName={'training-program-menu-' + index} sx={{ color: 'primary.main', position: "absolute", right: "5px" }}>
                                        <MenuItem>Change order</MenuItem>
                                        <MenuItem>Delete</MenuItem>
                                    </MoreVertMenu>
                                </Box>

                                <Box className="margin-bottom-1" sx={{ padding: '0 10px' }}>
                                    <TextField
                                        label='Name'
                                        variant="standard"
                                        value={trainingProgram.title}
                                        onChange={(e) => handleTitleChange(e, index)}
                                        size="small"
                                        fullWidth
                                    />
                                </Box>

                                <WorkoutList workout={trainingProgram.workout} />
                            </CarouselItem>
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

                {/* {formik.isValid &&
                    <div className="margin-bottom-1" style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "2rem" }}>
                        <Button variant='contained' type='submit' style={{ background: "#272343" }} fullWidth>Save</Button>
                    </div>
                } */}
            </form>
        </Box>
    )
}

export default ProgramForm;