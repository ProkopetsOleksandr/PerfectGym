import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Auth_Global from '../../core/firebase/auth_global';
import { useAuth } from '../Common/Hooks/useAuth';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { Google, Apple, Facebook, Microsoft } from '@mui/icons-material';
import { Box, Button, IconButton, Slide } from '@mui/material';

const Authentication = () => {
    const { isAuthenticated } = useAuth();

    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [showForm, setShowForm] = useState<boolean>(true);
    const [slideFormDirection, setSlideFormDirection] = useState<'left' | 'right'>('right');
    const [activeForm, setActiveForm] = useState<'signIn' | 'signUp'>('signIn');

    async function signInWithEmailAndPassword(email: string, password: string) {
        if (isSigningIn) {
            return;
        }

        setIsSigningIn(true);

        try {
            await Auth_Global.signInWithEmailAndPassword(email, password);
        } catch(exception) {
            console.log(exception);
        } finally {
            setIsSigningIn(false);
        }
    }

    async function signInWithGoogle() {
        if (isSigningIn) {
            return;
        }

        setIsSigningIn(true);

        try {
            await Auth_Global.signInWithGoogle();
        } catch (exception) {
            console.log(exception);
        } finally {
            setIsSigningIn(false);
        }
    }

    const toggleForm = () => {
        setShowForm(false);

        setTimeout(() => {
            setSlideFormDirection(prev => prev == 'left' ? 'right' : 'left');
            setActiveForm(prev => prev === 'signIn' ? 'signUp' : 'signIn');
            setShowForm(true);
        }, 350);
    };

    if (isAuthenticated) {
        return (<Navigate to={'/'} replace={true} />);
    }

    return (
        <Box position="relative" display="flex" justifyContent="center" alignItems="center" height="100vh" overflow={'hidden'}>
            <Slide direction={slideFormDirection} in={showForm}>
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
                                <span style={{ color: "rgb(39, 35, 67)" }}>{activeForm === 'signIn' ? "Sign In" : "Sign Up"}</span>
                            </div>

                            <div>
                                {activeForm === 'signIn'
                                    ? <SignInForm signInWithEmailAndPassword={signInWithEmailAndPassword} />
                                    : <SignUpForm />}
                            </div>

                            <div style={{ textAlign: "center", marginTop: "10px" }}>

                                <div style={{margin: "10px 0"}}>
                                    <IconButton onClick={signInWithGoogle}>
                                        <Google fontSize='medium'/>
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

                                <Button onClick={toggleForm} variant="outlined" fullWidth >
                                    {activeForm === 'signIn' ? "Create an account" : "Login to my account"}
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