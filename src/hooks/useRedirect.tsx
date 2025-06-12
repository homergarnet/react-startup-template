// useScreenSize.js
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import useLoginContext from "../store/Login/useLoginContext";
const useRedirect = () => {
  const { zJwtToken, zIsAuthenticated } = useLoginContext();

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (zJwtToken) {
      try {
        const decodedToken = jwtDecode(zJwtToken);

        const isTokenExpired =
          decodedToken &&
          decodedToken.exp !== undefined &&
          decodedToken.exp * 1000 < Date.now();

        if (!isTokenExpired) {
          //redirect to order-analyst/home if authenticated else, to the login page
          const redirectUrl =
            location?.state?.prevUrl || zIsAuthenticated
              ? "/order-analyst/home"
              : "/";
          navigate(redirectUrl);
        }
      } catch (err: unknown) {
        console.error("Invalid token:", err);
      }
    }
  }, [zJwtToken, navigate, location]);
};

export default useRedirect;
