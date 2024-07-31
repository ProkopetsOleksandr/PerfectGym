import { ReactNode, FC, useEffect, useState, createContext } from "react"
import { auth } from "../../../core/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "../../../core/redux/hook";
import { ApplicationAction } from "../../../core/redux/application.slice";

interface User {
    displayName: string | null
    email: string | null
}

interface AuthContextProps {
    isAuthenticated: boolean
    currentUser?: User
}

export const AuthContext = createContext<AuthContextProps>({isAuthenticated: false});

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | undefined>();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setCurrentUser({
                    displayName: user.displayName,
                    email: user.email
                });
            } else {
                setIsAuthenticated(false);
                setCurrentUser(undefined);
            }

            dispatch(ApplicationAction.firebaseInitialized());
        });

        return unsubscribe;
    }, []);

    const value = { isAuthenticated, currentUser };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;