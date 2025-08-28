import useLoginContext from "@/store/login/useLoginContext";
import { isAuthenticated } from "@/utils/tokenhelpers";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
    roles: number[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles }) => {
    const { zIsAuthenticated, zSetIsAuthenticated } = useLoginContext();
    const location = useLocation();
    const getRoleId = localStorage.getItem("roleId");
    const roleId = getRoleId !== null ? parseInt(getRoleId, 10) : 0;

    if (!isAuthenticated()) {
        return <Navigate to="/" state={{ prevUrl: location.pathname }} />;
    } else if (isAuthenticated()) {
        return <></>;
    }

    if (!roles.includes(roleId) && zIsAuthenticated && isAuthenticated()) {
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;