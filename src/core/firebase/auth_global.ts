import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    UserCredential
} from "firebase/auth";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

export default class Auth_Global {
    static createUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    static signInWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    static signInWithGoogle = async (): Promise<void> => {
        await signInWithPopup(auth, provider);
    }

    static signOut = () => {
        signOut(auth);
    }    
}