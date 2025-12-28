import { Navigate } from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

export function PrivateRoute({children}) {
    const { user } = useAuth();

    if (false) {
        return <Navigate to="/welcome" replace />;
    }

    return children;
}