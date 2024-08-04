import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';

export interface RegistrationFormValues {
    login: string,
    password: string
}

interface RegistrationProps {
}

const Registration: React.FC<RegistrationProps> = (props) => {
    const formik = useFormik<RegistrationFormValues>({
        initialValues: {
            login: '',
            password: ''
        },
        validate: validate,
        onSubmit: onSubmit
    });

    function validate(values: RegistrationFormValues) {
        const errors = {};

        return errors;
    }

    function onSubmit(values: RegistrationFormValues) {
        console.log(values);
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <TextField
                    {...formik.getFieldProps('login')}
                    label="Login"
                    // error={Boolean(formik.errors.login && formik.touched.login)}
                    helperText={formik.errors.login && formik.touched.login && String(formik.errors.login)}
                    variant="outlined"
                    fullWidth />
            </div>

            <div className="form-group">
                <TextField
                    {...formik.getFieldProps('password')}
                    label="Password"
                    // error={Boolean(formik.errors.login && formik.touched.login)}
                    helperText={formik.errors.password && formik.touched.password && String(formik.errors.password)}
                    variant="outlined"
                    type='password'
                    fullWidth />
            </div>

            <Button variant='contained' type='submit' style={{ background: "#272343" }} fullWidth disableElevation>Sign up</Button>
        </form>
    )
}

export default Registration