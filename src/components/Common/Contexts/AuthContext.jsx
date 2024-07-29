import React, { useEffect } from "react"
import { auth } from "../../../core/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext();

export function AuthProvider({children}) {
    [currentUser, setCurrentUser] = useState(null);
    [userLoggedIn, setUserLoggedIn] = useState(false);
    [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUzer);

        return unsubscribe;
    }, []);

    async function initializeUzer(user) {
        if (user) {
            setCurrentUser({...user});
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }

        setLoading(false);
    }

    const value = {currentUser, userLoggedIn, loading};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}