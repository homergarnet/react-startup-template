import { useState } from "react";
import "./App.css";
import User from "./pages/User/User";
import React from "react";
import useSharedStore from "./store/sharedStore";
import { ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import { RouterProvider } from "react-router-dom";
import Router from "./Route/Router";
function App() {
  const { zLoading } = useSharedStore();
  console.log("environment: ", import.meta.env);
  return (
    <React.Fragment>
      <User />
    </React.Fragment>
  );

  // return (
  //   <React.Fragment>
  //     <ToastContainer />
  //     {zLoading && (
  //       <div className="spinner-container">
  //         <ClipLoader size={50} color={"#123abc"} loading={zLoading} />
  //         {/*
  //         <p className="please-wait-text">
  //           Please wait and will connect <br />
  //           you to our Customer Service Representative...
  //         </p> */}
  //       </div>
  //     )}
  //     {/* <AuthProvider> */}
  //     <ThemeProvider theme={theme}>
  //       <RouterProvider router={Router} />
  //     </ThemeProvider>
  //     {/* </AuthProvider> */}
  //   </React.Fragment>
  // );
}

export default App;
