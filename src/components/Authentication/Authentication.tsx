import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Auth_Global from '../../core/firebase/Auth_Global';
import { useAuth } from '../Common/Hooks/useAuth';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classes from './Authentication.module.css';
import Login from './Login';
import Registration from './Registration';

import { Apple, Facebook, Microsoft } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Paper, Slide, Typography } from '@mui/material';

const Authentication = () => {
    const containerRef = React.useRef(null);

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

    function signInWithGoogle() {
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

    const [slideContentDirection, setSlideContentDirection] = useState<'left' | 'right'>('right');
    const [showContent, setShowContent] = useState<boolean>(true);

    const togglePage = () => {
        setShowContent(false);

        setTimeout(() => {
            setSlideContentDirection(prev => prev == 'left' ? 'right' : 'left');
            setShowLogin(!showLogin);
            setShowContent(true);
        }, 350);
    };

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

    // return (
    //     <div id={classes.authContainer}>
    //         <div style={{display: 'flex', justifyContent: "center", alignItems: "center" }}>
    //             <Slide direction="left" in={showLogin} mountOnEnter unmountOnExit>
    //                 <div style={{ position: "absolute" }}>
    //                     <Login />
    //                 </div>
    //             </Slide>

    //             <Slide direction="right" in={!showLogin} mountOnEnter unmountOnExit>
    //                 <div style={{ position: "absolute" }}>
    //                     <Registration />
    //                 </div>
    //             </Slide>
    //         </div>
    //     </div>
    // );



    return (
        <Box position="relative" display="flex" justifyContent="center" alignItems="center" height="100vh" overflow={'hidden'}>
            <Slide direction={slideContentDirection} in={showContent}>
                <div style={{ width: '100%', height: '100%', display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div>
                        <div>
                            <img src={process.env.PUBLIC_URL + '/assets/images/logo.png'} alt='logo' style={{ width: "300px" }} />
                            <div style={{ textAlign: "center", position: 'relative', top: "-65px" }}>
                                <span style={{ fontSize: "2.2rem", fontWeight: "bold" }}>Perfect Gym</span>
                            </div>
                        </div>

                        <div style={{ marginBottom: "200px" }}>
                            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                                <span style={{ color: "rgb(39, 35, 67)" }}>{showLogin ? "Sign In" : "Sign Up"}</span>
                            </div>

                            <div>
                                {showLogin ? <Login /> : <Registration />}
                            </div>

                            <div style={{ textAlign: "center", marginTop: "10px" }}>

                                <div style={{margin: "10px 0"}}>
                                    <IconButton onClick={signInWithGoogle}>
                                        <GoogleIcon fontSize='medium'/>
                                    </IconButton>

                                    <IconButton>
                                        <Facebook fontSize='medium'/>
                                    </IconButton>
                                    
                                    <IconButton>
                                        <Apple fontSize='medium'/>
                                    </IconButton>

                                    <IconButton>
                                        <Microsoft fontSize='medium'/>
                                    </IconButton>
                                </div>

                                <Button onClick={togglePage} variant="outlined" fullWidth >
                                    {showLogin ? "Create an account" : "Login to my account"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Slide>
        </Box>
    );
}

export default Authentication;