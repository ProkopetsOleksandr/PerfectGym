import { Add, } from '@mui/icons-material';
import { Box, Button, Chip, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import { FormikErrors, useFormik } from 'formik';
import React, { useState } from 'react';
import { generateTemporaryId } from '../../../../core/helpers/common';
import { MapToITrainingProgramFormModel } from '../../../../core/helpers/mapper';
import { IProgramFormValues, ITrainingProgramExerciseFormModel, ITrainingProgramFormModel, ITrainingProgramWorkoutFormModel } from '../../../../core/models/forms';
import { IExercise, IProgram, ITrainingProgram, ITrainingProgramExercise } from '../../../../core/models/workout';
import { useAppDispatch } from '../../../../core/redux/hook';
import { ProgramAction } from '../../../../core/redux/programs.slice';
import MoreVertMenu from '../../../Common/MoreVertMenu/MoreVertMenu';
import AddExerciseDialog from './AddExerciseDialog/AddExerciseDialog';
import WorkoutList from './WorkoutList/WorkoutList';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ProgramFormProps {
    selectedProgram?: IProgram
}

const ProgramForm: React.FC<ProgramFormProps> = ({ selectedProgram }) => {
    const [currentDay, setCurrentDay] = useState<number>(0);
    const dispatch = useAppDispatch();

    const initialValues: IProgramFormValues = {
        title: selectedProgram?.title ?? '',
        description: selectedProgram?.description ?? '',
        trainingPrograms: selectedProgram && selectedProgram.trainingPrograms.length > 0
            ? MapToITrainingProgramFormModel(selectedProgram.trainingPrograms)
            : []
    };

    const formik = useFormik({
        initialValues: initialValues,
        validate: validate,
        onSubmit: (values: IProgramFormValues) => { }
    });

    function validate(values: IProgramFormValues) {
        const errors: FormikErrors<IProgramFormValues> = {};

        return errors;
    }

    function addTrainingProgram() {
        const newTrainingProgram: ITrainingProgramFormModel = {
            id: generateTemporaryId(),
            title: '',
            workout: []
        };

        formik.setFieldValue('trainingPrograms', [...formik.values.trainingPrograms, newTrainingProgram]);
    }

    function onTrainingProgramTitleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, programIndex: number) {
        const newTrainingPrograms = [...formik.values.trainingPrograms];
        const targetTrainingProgram = newTrainingPrograms.at(programIndex);

        if (targetTrainingProgram) {
            targetTrainingProgram.title = event.target.value;

            console.log(newTrainingPrograms);

            formik.setFieldValue('trainingPrograms', newTrainingPrograms);
        }
    }

    function onAddExerciseButtonClick(index: number) {
        setCurrentDay(index);
        dispatch(ProgramAction.openAddExerciseDialog());
    }

    function onAddExercise(exercises: IExercise[], isSuperset: boolean) {
        const newTrainingPrograms = [...formik.values.trainingPrograms];
        const targetTrainingProgram = newTrainingPrograms.at(currentDay);
        if (!targetTrainingProgram) {
            return;
        }

        if (isSuperset) {
            const exerciseSet: ITrainingProgramExerciseFormModel[] = [];
            exercises.forEach(exercise => {
                exerciseSet.push({
                    id: generateTemporaryId(),
                    exercise: exercise
                });
            });

            targetTrainingProgram.workout.push({
                id: generateTemporaryId(),
                isSuperset: true,
                order: targetTrainingProgram.workout.length + 1,
                exercises: exerciseSet
            });
        } else {
            exercises.forEach(exercise => {
                targetTrainingProgram.workout.push({
                    id: generateTemporaryId(),
                    isSuperset: false,
                    order: targetTrainingProgram.workout.length + 1,
                    exercises: [{
                        id: generateTemporaryId(),
                        exercise: exercise
                    }]
                });
            });
        }

        formik.setFieldValue('trainingPrograms', newTrainingPrograms);
    }

    function onDeleteExercise(exercise: ITrainingProgramExerciseFormModel): void {
        let newTrainingPrograms = [...formik.values.trainingPrograms];

        newTrainingPrograms.forEach(trainingProgram => {
            trainingProgram.workout.forEach(workoutItem => {
                workoutItem.exercises = workoutItem.exercises.filter(m => m.id !== exercise.id);
            });

            trainingProgram.workout = trainingProgram.workout.filter(m => m.exercises.length > 0);
        });

        formik.setFieldValue('trainingPrograms', newTrainingPrograms);
    }

    function onDeleteSuperset(workout: ITrainingProgramWorkoutFormModel): void {
        let newTrainingPrograms = [...formik.values.trainingPrograms];

        newTrainingPrograms.forEach(trainingProgram => {
            trainingProgram.workout = trainingProgram.workout.filter(m => m.id !== workout.id)
        });

        formik.setFieldValue('trainingPrograms', newTrainingPrograms);
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
                    <IconButton sx={{ bgcolor: 'secondary.main', color: 'primary.contrastText', "&.MuiButtonBase-root:hover": { bgcolor: "secondary.main" } }} onClick={addTrainingProgram}>
                        <Add />
                    </IconButton>
                </Box>

                {formik.values.trainingPrograms &&
                    <Box style={{ position: 'relative', height: '100%', flex: '1 1 auto', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                        <div id="swiper-pagination"></div>
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            pagination={{ clickable: true, el: "#swiper-pagination" }}
                            modules={[Pagination]}
                            style={{ position: 'relative', width: '100%', flex: '1 1 auto', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}
                        >
                            {formik.values.trainingPrograms.map((trainingProgram, index) => {
                                return <SwiperSlide key={index} style={{ minWidth: '100%', boxSizing: 'border-box', padding: '10px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                                    <Box className="margin-bottom-1" sx={{ flex: '0 0 auto', display: "flex", alignItems: "center", gap: "10px", justifyContent: 'space-between' }}>
                                        <Chip label={`Day ${index + 1}`} color="secondary" sx={{ color: 'primary.contrastText' }} />

                                        <TextField
                                            variant="standard"
                                            value={trainingProgram.title}
                                            onChange={(e) => onTrainingProgramTitleChange(e, index)}
                                            size="small"
                                            fullWidth
                                        />

                                        <MoreVertMenu key={index} menuName={'training-program-menu-' + index} sx={{ color: 'primary.main' }}>
                                            <MenuItem>Change order</MenuItem>
                                            <MenuItem>Delete</MenuItem>
                                        </MoreVertMenu>
                                    </Box>

                                    <Box sx={{ flex: '1 1 auto', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                                        <WorkoutList
                                            workout={trainingProgram.workout}
                                            onDeleteExercise={onDeleteExercise}
                                            onDeleteSuperset={onDeleteSuperset} />
                                    </Box>

                                    <Button variant='contained' fullWidth sx={{ marginTop: '10px' }} onClick={() => onAddExerciseButtonClick(index)}>Add exercise</Button>
                                </SwiperSlide>
                            })}
                        </Swiper>
                    </Box>}
            </form>

            <AddExerciseDialog onAddExercise={onAddExercise} />
        </Box>
    )
}

export default ProgramForm;
