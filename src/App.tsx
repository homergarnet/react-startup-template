import { RouterProvider } from "react-router-dom";
import Router from "./route/Router";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/Theme";
import { AuthProvider } from "./context/AuthProvider";
// import SessionTimeout from './Components/SessionTimeout';
import "./App.css";
import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import useSharedStore from "./store/sharedStore";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const App: React.FC = () => {
  const { zLoading } = useSharedStore();

  useEffect(() => {
    document.title = "OWS";
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      {zLoading && (
        <div className="spinner-container">
          <ClipLoader size={50} color={"#123abc"} loading={zLoading} />
          {/* 
          <p className="please-wait-text">
            Please wait and will connect <br />
            you to our Customer Service Representative...
          </p> */}
        </div>
      )}
      <AuthProvider>
        <ThemeProvider theme={theme}>
          {/* <ErrorBoundary> */}
          <RouterProvider router={Router} />
          {/* </ErrorBoundary> */}
        </ThemeProvider>
      </AuthProvider>
    </React.Fragment>
  );
};

export default App;
