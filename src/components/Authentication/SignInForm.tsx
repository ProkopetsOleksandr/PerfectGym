import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';

export interface SignInFormValues {
    email: string,
    password: string
}

interface SignInFormProps {
    signInWithEmailAndPassword: (email: string, password: string) => void
}

const SignInForm: React.FC<SignInFormProps> = (props) => {
    const formik = useFormik<SignInFormValues>({
        initialValues: {
            email: '',
            password: ''
        },
        validate: validate,
        onSubmit: onSubmit
    });

    function validate(values: SignInFormValues) {
        const errors = {};

        return errors;
    }

    function onSubmit(values: SignInFormValues) {
        props.signInWithEmailAndPassword(values.email, values.password);
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

            <Button variant='contained' type='submit' style={{ background: "#272343" }} fullWidth disableElevation>Sign In</Button>
        </form>
    )
}

export default SignInForm;