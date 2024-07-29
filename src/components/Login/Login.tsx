import React, { useState } from 'react'
import { useAuth } from '../Common/Hooks/useAuth';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../core/firebase/auth';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

    async function onSubmit() {
        if (isSigningIn) {
            return;
        }

        setIsSigningIn(true);
        await doSignInWithEmailAndPassword(email, password);

    }

    function onGoogleSignIn() {
        if (isSigningIn) {
            return;
        }

        setIsSigningIn(true);
        doSignInWithGoogle()
            .catch(error =>  {
                setIsSigningIn(false);
            });
    }

    return (
       <div>
            {userLoggedIn && (<Navigate to={'/'} replace={true} />)}
       </div>
    )
}

export default Login