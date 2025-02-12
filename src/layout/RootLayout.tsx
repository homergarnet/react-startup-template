import { Box } from "@mui/material";
import { useEffect } from "react";
import Layout from "./Layout";
import { Outlet, useNavigate } from "react-router-dom";
import { initializeAxiosInterceptors } from "../config/AxiosConfig";
import useLoginContext from "../store/login/useLoginContext";

interface PrivateRouteProps {
  roles: number[];
}

const RootLayout: React.FC<PrivateRouteProps> = ({ roles }) => {
  let roleId = 0;
  const { zIsAuthenticated } = useLoginContext();
  const getRoleId = localStorage.getItem("roleId");
  const navigate = useNavigate();

  // if (zIsAuthenticated) {
  //   const token = Cookies.get("token");
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // }
  useEffect(() => {}, [zIsAuthenticated]);

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
