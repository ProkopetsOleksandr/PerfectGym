import React, {ReactNode} from 'react';
import { useAuth } from './Hooks/useAuth';
import { Navigate, useLocation } from "react-router-dom";

interface RequireAuthProps {
    children?: ReactNode
}

const RequireAuth: React.FC<RequireAuthProps> = (props) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ path: location.pathname }} />
    }

    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    );
}

export default RequireAuth;