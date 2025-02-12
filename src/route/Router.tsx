import React, { Suspense } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/home/HomePage";
import EnrollmentPeoplePage from "../pages/enrollment-people/EnrollmentPeoplePage";
import TeamMasterlistPage from "../pages/team-masterlist/TeamMasterlistPage";
import EmployeeMasterlistPage from "../pages/employee-masterlist/EmployeeMasterlistPage";
import AgencyPage from "../pages/agency/AgencyPage";

const LoginPage = React.lazy(() => import("../pages/_Auth/Login"));
const Maintenance = React.lazy(() => import("../pages/_Error/Maintenance"));
const ServerDown = React.lazy(() => import("../pages/_Error/ServerDown"));
const Unauthorized = React.lazy(() => import("../pages/_Error/Unauthorized"));
const Page404 = React.lazy(() => import("../pages/_Error/Page404"));

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout roles={[1, 2, 3]} />}>
      <Route
        path=""
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="home"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path="enrollment-people"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <EnrollmentPeoplePage />
          </Suspense>
        }
      />
      <Route
        path="team-masterlist"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <TeamMasterlistPage />
          </Suspense>
        }
      />
      <Route
        path="employee-masterlist"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <EmployeeMasterlistPage />
          </Suspense>
        }
      />
      <Route
        path="agency"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AgencyPage />
          </Suspense>
        }
      />
      {/* Protected routes for role 1 */}
      <Route element={<ProtectedRoute roles={[1]} />}>
        {/* <Route
          path="signup"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SignupPage />
            </Suspense>
          }
        />
        /> */}
      </Route>

      {/* Protected routes for role 2 */}
      <Route element={<ProtectedRoute roles={[1, 2]} />}>
        {/* <Route
          path="signup"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SignupPage />
            </Suspense>
          }
        />
        /> */}
      </Route>

      {/* General protected routes */}
      <Route element={<ProtectedRoute roles={[1, 2, 3]} />}>
        <Route
          path="maintenance"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Maintenance />
            </Suspense>
          }
        />
        <Route
          path="unauthorized"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Unauthorized />
            </Suspense>
          }
        />
        <Route
          path="serverdown"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ServerDown />
            </Suspense>
          }
        />
      </Route>

      {/* Catch-all route for 404 */}
      <Route
        path="*"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Page404 />
          </Suspense>
        }
      />
    </Route>
  )
);

export default Router;
