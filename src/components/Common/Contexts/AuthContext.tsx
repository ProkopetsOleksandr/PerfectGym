import { onAuthStateChanged } from "firebase/auth";
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { auth } from "../../../core/firebase/firebase";
import { ApplicationAction } from "../../../core/redux/application.slice";
import { useAppDispatch } from "../../../core/redux/hook";

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

                user.getIdToken(true).then(function(idToken) {
                    // Отправьте этот токен на ваш сервер для проверки
                    console.log("JWT Token:", idToken);
                  }).catch(function(error) {
                    // Обработка ошибок
                    console.error(error);
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