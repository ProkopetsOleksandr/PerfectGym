import { FC, useEffect, useState } from 'react';
import { IExcercise, MeasurementCategory, MeasurementCategoryLabel, MuscleGroup, MuscleGroupLabel } from '../../../core/models/workout';
import { useFormik, FormikErrors } from 'formik';
import { TextField } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { WorkoutActions } from '../../../core/redux/workout.slice';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hook';
import ScreenLoader from '../../Common/ScreenLoader';
import AppDialog from '../../Common/AppDialog';

interface ExcerciseDialogProps {
    selectedExerciseId?: number,
    open: boolean,
    handleClose: () => void
}

interface ExcerciseFormValues {
    title: string,
    description?: string,
    muscleGroup: MuscleGroup,
    measurementCategory: MeasurementCategory
}

const ExcerciseDialog: FC<ExcerciseDialogProps> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const selectedExercise = useAppSelector(store => store.workout.selectedExcercise);

    useEffect(() => {
        if (props.open) {
            formik.validateForm();
        }
    }, [props.open]);

    useEffect(() => {
        if (!selectedExercise) {
            return;
        }

        formik.values.title = selectedExercise.title;
        formik.values.description = selectedExercise.description;
        formik.values.muscleGroup = selectedExercise.muscleGroup;
        formik.values.measurementCategory = selectedExercise.measurementCategory;

    }, [selectedExercise]);

    const initialValues: ExcerciseFormValues = {
        title: '',
        description: '',
        muscleGroup: MuscleGroup.None,
        measurementCategory: MeasurementCategory.None
    };

    const formik = useFormik({
        initialValues: initialValues,
        validate: validate,
        onSubmit: onSubmit
    });

    function validate(values: ExcerciseFormValues) {
        const errors: FormikErrors<ExcerciseFormValues> = {};
        const title = values.title.trim();

        if (!title) {
            errors.title = 'Required';
        } else if (title.length > 150) {
            errors.title = 'Max lenght is 150 characters';
        }

        if (!values.muscleGroup) {
            errors.muscleGroup = 'Required';
        }

        if (!values.measurementCategory) {
            errors.measurementCategory = 'Required';
        }

        return errors;
    }

    function onSubmit(values: ExcerciseFormValues) {
        const excercise: IExcercise = {
            title: values.title,
            description: values.description,
            muscleGroup: values.muscleGroup,
            measurementCategory: values.measurementCategory
        };

        setIsLoading(true);

        dispatch(WorkoutActions.addExcercise(excercise))
            .then(() => {
                setIsLoading(false);
                closeDialog();
            });
    }

    function closeDialog() {
        props.handleClose();
        formik.resetForm();
        dispatch(WorkoutActions.setSelectedExcercise(undefined));
    }

    return (
        <AppDialog title={selectedExercise ? editMode ? "Edit exercise" : `Exercise: ${selectedExercise.title}` : "Add Exercise"}
            open={props.open}
            isSaveButtonVisible={editMode}
            isSaveButtonDisabled={!formik.isValid || isLoading}
            onSave={formik.submitForm}
            onClose={closeDialog}
        >
            {isLoading && <ScreenLoader />}

            {!editMode && selectedExercise && 
                <div>
                    <label htmlFor=""></label>
                    <div>
                        {selectedExercise.description}
                    </div>
                </div>}

            {editMode &&
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

                    <div className="form-group">
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="muscle-group-label">Muscle Group</InputLabel>
                            <Select label="Muscle Group"
                                labelId="muscle-group-label"
                                {...formik.getFieldProps('muscleGroup')}
                            >
                                <MenuItem value={MuscleGroup.None} disabled>None</MenuItem>
                                {Array.from(MuscleGroupLabel).map(([key, value]) => {
                                    return <MenuItem key={key} value={key}>{value}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="form-group">
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="measurement-category-label">Category</InputLabel>
                            <Select labelId='measurement-category-label'
                                label="Category"
                                {...formik.getFieldProps('measurementCategory')}
                            >
                                <MenuItem value={MuscleGroup.None} disabled>None</MenuItem>
                                {Array.from(MeasurementCategoryLabel).map(([key, value]) => {
                                    return <MenuItem key={key} value={key}>{value}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </div>
                </form>
            }


        </AppDialog>
    )
}

export default ExcerciseDialog;