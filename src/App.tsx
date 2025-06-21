import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import Router from "./route/Router";
import UseMemoEx from "./demo/UseMemoEx";

function App() {
  const [count, setCount] = useState(0);
  console.log("environment: ", import.meta.env);
  return (
    <>
      <UseMemoEx />
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
