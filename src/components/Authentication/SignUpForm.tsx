import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';

export interface SignUpFormValues {
    email: string,
    password: string,
    confirmPassword: string
}

interface SignUpFormProps {
}

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
    const formik = useFormik<SignUpFormValues>({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate: validate,
        onSubmit: onSubmit
    });

    function validate(values: SignUpFormValues) {
        const errors = {};

        return errors;
    }

    function onSubmit(values: SignUpFormValues) {
        console.log(values);
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <TextField
                    {...formik.getFieldProps('email')}
                    label="Email"
                    // error={Boolean(formik.errors.login && formik.touched.login)}
                    helperText={formik.errors.email && formik.touched.email && String(formik.errors.email)}
                    variant="outlined"
                    autoComplete='new-login'
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
                    autoComplete='new-password'
                    fullWidth />
            </div>

            <div className="form-group">
                <TextField
                    {...formik.getFieldProps('confirmPassword')}
                    label="Confirm Password"
                    // error={Boolean(formik.errors.login && formik.touched.login)}
                    helperText={formik.errors.confirmPassword && formik.touched.confirmPassword && String(formik.errors.confirmPassword)}
                    variant="outlined"
                    type='password'
                    autoComplete='new-password'
                    fullWidth />
            </div>

            <Button variant='contained' type='submit' style={{ background: "#272343" }} fullWidth disableElevation>Sign up</Button>
        </form>
    )
}

export default SignUpForm