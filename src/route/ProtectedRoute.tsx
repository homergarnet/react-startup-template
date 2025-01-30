import { Navigate, Outlet } from "react-router-dom";

import useLoginContext from "../store/Login/useLoginContext";

interface ProtectedRouteProps {
  roles: number[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles }) => {
  const { zIsAuthenticated } = useLoginContext();
  const getRoleId = localStorage.getItem("roleId");
  const roleId = getRoleId !== null ? parseInt(getRoleId, 10) : 0;

  if (!zIsAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!roles.includes(roleId)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
