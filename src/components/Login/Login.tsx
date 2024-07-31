import React, { useState } from 'react'
import { useAuth } from '../Common/Hooks/useAuth';
import Auth_Global from '../../core/firebase/auth_global';
import { Navigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import { Fade, Hidden } from '@mui/material';

import { Button, Box, Typography, Paper } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Slide from '@mui/material/Slide';

const Login = () => {
    const containerRef = React.useRef<HTMLElement>(null);

    const { isAuthenticated } = useAuth();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

    const [showLogin, setShowLogin] = useState<boolean>(true);

    async function onSubmit() {
        if (isSigningIn) {
            return;
        }

        setIsSigningIn(true);
        await Auth_Global.signInWithEmailAndPassword(email, password)
            .finally(() => setIsSigningIn(false));
    }

    function onGoogleSignIn() {
        if (isSigningIn) {
            return;
        }

        setIsSigningIn(true);
        Auth_Global.signInWithGoogle()
            .catch((error) => {
                setIsSigningIn(false);
                console.log(error);
            });
    }

    if (isAuthenticated) {
        return (<Navigate to={'/'} replace={true} />);
    }

    // return (
    //    <div>
    //         <div>
    //             {`Is signing in: ${isSigningIn}`}
    //         </div>
    //         <br />

    //         <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
    //         <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />

    //         <button onClick={onSubmit}>Login</button>
    //         <button onClick={onGoogleSignIn}>Login Google</button>
    //    </div>
    // )

    const Login = () => (
        <div style={{ backgroundColor: 'black', color: "white" }}>
            Login page

            <div>
                Email:
            </div>
            <input type="text" />
        </div>
    );

    const Register = () => (
        <div style={{ backgroundColor: 'black', color: "white" }}>Register page</div>
    );

    

    return (
        <div style={{ height: '100vh', width: '100vw', position: 'relative', overflow: "hidden" }}>
            <Button
                variant="contained"
                onClick={() => setShowLogin(prev => !prev)}
            >
                {showLogin ? 'Go to Register' : 'Go to Login'}
            </Button>

            <div style={{display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <Slide direction="left" in={showLogin} mountOnEnter unmountOnExit>
                    <div style={{ position: "absolute" }}>
                        <Login />
                    </div>
                </Slide>

                <Slide direction="right" in={!showLogin} mountOnEnter unmountOnExit>
                    <div style={{ position: "absolute" }}>
                        <Register />
                    </div>
                </Slide>
            </div>
        </div>
    );
}

export default Login