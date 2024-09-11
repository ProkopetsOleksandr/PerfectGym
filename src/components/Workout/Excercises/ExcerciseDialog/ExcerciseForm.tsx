import { Button, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormikErrors, useFormik } from 'formik';
import { FC, useEffect } from 'react';
import { MeasurementCategory, MeasurementCategoryLabel, MuscleGroup, MuscleGroupLabel } from '../../../../core/models/enums';
import { IExercise } from '../../../../core/models/workout';

export interface ExcerciseFormValues {
    title: string,
    description?: string,
    muscleGroup: MuscleGroup,
    measurementCategory: MeasurementCategory
}

interface ExcerciseFormProps {
    selectedExercise?: IExercise,
    onSubmit: (values: ExcerciseFormValues) => void,
    onFormValidChange: (isValid: boolean) => void
}

const ExcerciseForm: FC<ExcerciseFormProps> = (({ selectedExercise, onSubmit, onFormValidChange }) => {
    const initialValues: ExcerciseFormValues = {
        title: selectedExercise?.title || "",
        description: selectedExercise?.description || "",
        muscleGroup: selectedExercise?.muscleGroup || MuscleGroup.None,
        measurementCategory: selectedExercise?.measurementCategory || MeasurementCategory.None
    };

    const formik = useFormik({
        initialValues: initialValues,
        validate: validate,
        onSubmit: onSubmit,
        validateOnMount: true
    });

    useEffect(() => {
        onFormValidChange(formik.isValid);
    }, [formik.isValid]);

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

    return (
        <div>
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
                        helperText={formik.errors.description && formik.touched.description && formik.errors.description}
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

                {/* {formik.isValid &&
                    <div className="margin-bottom-1" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                        <Button variant='contained' type='submit' style={{ background: "#272343" }}>Save</Button>
                    </div>
                } */}
            </form>
        </div>
    );
});

export default ExcerciseForm;