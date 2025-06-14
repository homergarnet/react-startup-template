import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useSharedStore from "../store/sharedStore";
// Check if a token is expired

// Define the expected token payload structure
interface JwtPayload {
  exp?: number; // Optional because some tokens may not include it
  [key: string]: any; // To handle additional claims
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);

    if (decoded.exp !== undefined) {
      // Compare token expiration with the current time
      return decoded.exp < Math.floor(Date.now() / 1000);
    }

    // console.warn(
    //   "Token does not contain an 'exp' field. Treating it as expired."
    // );
    return true; // Consider tokens without `exp` as expired
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true; // Treat invalid tokens as expired
  }
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("authToken");
  const { zSetUserEmailAdd, zSetRoleId } = useSharedStore.getState();

  if (token) {
    // console.log("isTokenExpired(token): ", isTokenExpired(token));
    if (isTokenExpired(token)) {
      // Handle token expiration
      localStorage.removeItem("roleId");
      localStorage.removeItem("userEmailAdd");
      localStorage.removeItem("authToken");
      console.warn("Token has expired. User logged out.");
      // Optionally navigate to login page here
      // Example: window.location.href = '/login';
      return false;
    }
    zSetUserEmailAdd(localStorage.getItem("userEmailAdd") as string);
    zSetRoleId(localStorage.getItem("roleId") as string);
    return true; // Token is valid and not expired
  }

  return false; // No token found, user is not authenticated
};

export const decodeToken = (token: string) => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null; // Return null for invalid tokens
  }
};

export const IsAuth = () => {
  const location = useLocation();
  // console.log("location: ", location);
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ prevUrl: location.pathname }} />
  );
};
