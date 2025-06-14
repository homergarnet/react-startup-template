import { Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        path=""
        element={
          <Suspense fallback={<div>Loading...</div>}>
            {/* <LoginPage /> */}
          </Suspense>
        }
      />
      {/* Protected routes for role 1 */}
      <Route element={<ProtectedRoute roles={[1]} />}></Route>

      {/* Protected routes for role 2 */}

      {/* Catch-all route for 404 */}
      <Route
        path="*"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            {/* <Page404 /> */}
          </Suspense>
        }
      />
    </Route>
  )
);

export default Router;
