import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

export function useAuth() {
    return useContext(AuthContext);
}