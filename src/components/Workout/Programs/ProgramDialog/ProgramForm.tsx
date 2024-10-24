import { Add, } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import { FormikErrors, useFormik } from 'formik';
import React, { useState } from 'react';
import { generateTemporaryId } from '../../../../core/helpers/common';
import { MapToITrainingProgramFormModel } from '../../../../core/helpers/mapper';
import { IProgramFormValues, ITrainingProgramExerciseFormModel, ITrainingProgramFormModel, ITrainingProgramWorkoutFormModel } from '../../../../core/models/forms';
import { IExercise, IProgram } from '../../../../core/models/workout';
import { useAppDispatch } from '../../../../core/redux/hook';
import { ProgramAction } from '../../../../core/redux/programs.slice';
import AddExerciseDialog from './AddExerciseDialog/AddExerciseDialog';

import TrainingProgramList from './TrainingProgramList/TrainingProgramList';

interface ProgramFormProps {
    selectedProgram?: IProgram
}

const ProgramForm: React.FC<ProgramFormProps> = ({ selectedProgram }) => {
    const [selectedTrainingProgramIndex, setSelectedTrainingProgramIndex] = useState<number>(0);

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

    function onTrainingProgramTitleChange(trainingProgramId: number | string, value: string) {
        const newTrainingPrograms = [...formik.values.trainingPrograms];
        const targetTrainingProgram = newTrainingPrograms.find(m => m.id === trainingProgramId);

        if (targetTrainingProgram) {
            targetTrainingProgram.title = value;
            formik.setFieldValue('trainingPrograms', newTrainingPrograms);
        }
    }

    function onAddExerciseButtonClick() {
        dispatch(ProgramAction.openAddExerciseDialog());
    }

    function onAddExercise(exercises: IExercise[], isSuperset: boolean) {
        const newTrainingPrograms = [...formik.values.trainingPrograms];
        const targetTrainingProgram = newTrainingPrograms.at(selectedTrainingProgramIndex);
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
            <form onSubmit={formik.handleSubmit} style={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth: "100%" }}>
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

                <Box sx={{ textAlign: 'end' }}>
                    <IconButton sx={{ bgcolor: 'secondary.main', color: 'primary.contrastText', "&.MuiButtonBase-root:hover": { bgcolor: "secondary.main" } }} onClick={addTrainingProgram}>
                        <Add />
                    </IconButton>
                </Box>

                {formik.values.trainingPrograms &&
                    <TrainingProgramList
                        trainingPrograms={formik.values.trainingPrograms}
                        onAddExerciseButtonClick={onAddExerciseButtonClick}
                        onDeleteExercise={onDeleteExercise}
                        onDeleteSuperset={onDeleteSuperset}
                        onTrainingProgramTitleChange={onTrainingProgramTitleChange}
                        onSelectedTrainingProgramChange={(index) => setSelectedTrainingProgramIndex(index)}
                    />}
            </form>

            <AddExerciseDialog onAddExercise={onAddExercise} />
        </Box>
    )
}

export default ProgramForm;
