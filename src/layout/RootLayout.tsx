import { Box } from "@mui/material";
import LoginPage from "../Pages/_Auth/Login";
import useAuth from "../Hooks/UseAuth";
import { useEffect } from "react";
import Layout from "./Layout";
import Cookies from "js-cookie";
import axios from "axios";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { initializeAxiosInterceptors } from "../Config/AxiosConfig";
import useLoginContext from "../store/Login/useLoginContext";

interface PrivateRouteProps {
  roles: number[];
}

const RootLayout: React.FC<PrivateRouteProps> = ({ roles }) => {
  let roleId = 0;
  const { zIsAuthenticated } = useLoginContext();
  const getRoleId = localStorage.getItem("roleId");
  const navigate = useNavigate();

  if (getRoleId !== null) {
    roleId = parseInt(getRoleId, 10);
  }

  useEffect(() => {
    initializeAxiosInterceptors(navigate);
  }, [navigate]);

  if (!zIsAuthenticated) {
    return (
      <Box>
        <Outlet />
      </Box>
    );
  } else {
    return (
      <Box>
        <Layout />
      </Box>
    );
  }
};

export default RootLayout;
