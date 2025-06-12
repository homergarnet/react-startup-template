import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import useLoginContext from "../store/Login/useLoginContext";
import { isAuthenticated } from "../utils/tokenhelpers";
import { Box } from "@mui/material";
import Layout from "../Layout/Layout";
import { useEffect } from "react";
import useSharedStore from "../store/sharedStore";

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
    return (
      <Box>
        <Layout />
      </Box>
    );
  }

  if (!roles.includes(roleId) && zIsAuthenticated && isAuthenticated()) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
