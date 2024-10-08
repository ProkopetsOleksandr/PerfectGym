import { Add, Edit } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Card, CardContent, CardHeader, Chip, IconButton, Menu, MenuItem, TextField, Typography } from '@mui/material';
import { FormikErrors, useFormik } from 'formik';
import React, { useState } from 'react';
import { IProgram, ITrainingProgram } from '../../../../core/models/workout';
import { useAppDispatch } from '../../../../core/redux/hook';
import { ProgramAction } from '../../../../core/redux/programs.slice';
import Carousel from '../../../Common/Carousel/Carousel';
import CarouselItem from '../../../Common/Carousel/CarouselItem';
import MoreVertMenu from '../../../Common/MoreVertMenu/MoreVertMenu';
import AddExerciseDialog from './AddExerciseDialog/AddExerciseDialog';
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
    const dispatch = useAppDispatch();

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

    function onAddExerciseButtonClick() {
        dispatch(ProgramAction.openAddExerciseDialog());
    }

    return (
        <Box sx={{ height: '100%' }}>
            <form onSubmit={formik.handleSubmit} style={{ height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                <Box className="form-group">
                    <TextField
                        {...formik.getFieldProps('title')}
                        label="Title"
                        error={Boolean(formik.errors.title && formik.touched.title)}
                        helperText={formik.errors.title && formik.touched.title && String(formik.errors.title)}
                        variant="standard"
                        fullWidth />
                </Box>

                <Box className="form-group">
                    <TextField
                        {...formik.getFieldProps('description')}
                        label="Description"
                        error={Boolean(formik.errors.description && formik.touched.description)}
                        helperText={formik.errors.description && formik.touched.description && String(formik.errors.description)}
                        variant="standard"
                        fullWidth />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <IconButton sx={{ backgroundColor: 'secondary.main', color: 'primary.contrastText' }} onClick={addTrainingProgram}>
                        <Add />
                    </IconButton>
                </Box>

                {trainingPrograms &&
                    <Carousel>
                        {trainingPrograms.map((trainingProgram, index) => {
                            return <CarouselItem key={index}>
                                <Box className="margin-bottom-1" sx={{ flex: '0 0 auto', display: "flex", alignItems: "center", gap: "10px", justifyContent: 'space-between' }}>
                                    <Chip label={`Day ${index + 1}`} color="secondary" sx={{ color: 'primary.contrastText' }} />

                                    <TextField
                                        variant="standard"
                                        value={trainingProgram.title}
                                        onChange={(e) => handleTitleChange(e, index)}
                                        size="small"
                                        fullWidth
                                    />

                                    <MoreVertMenu key={index} menuName={'training-program-menu-' + index} sx={{ color: 'primary.main' }}>
                                        <MenuItem>Change order</MenuItem>
                                        <MenuItem>Delete</MenuItem>
                                    </MoreVertMenu>
                                </Box>

                                <Box sx={{ flex: '1 1 auto', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                                    <WorkoutList workout={trainingProgram.workout} />
                                </Box>

                                <Button variant='contained' fullWidth sx={{ marginTop: '10px' }} onClick={onAddExerciseButtonClick}>Add exercise</Button>
                            </CarouselItem>
                        })}
                    </Carousel>}
            </form>

            <AddExerciseDialog />
        </Box>
    )
}

export default ProgramForm;