import React, { Suspense } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import ProtectedRoute from "./ProtectedRoute";


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
        <Route
          path="system-admin/dashboard-system-admin"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Maintenance />
            </Suspense>
          }
        />
        <Route
          path="system-admin/customer-code"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <CustomerCode />
            </Suspense>
          }
        />
        <Route
          path="system-admin/user"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Users />
            </Suspense>
          }
        />
        <Route
          path="system-admin/club"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Club />
            </Suspense>
          }
        />
        <Route
          path="system-admin/logs"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Logs />
            </Suspense>
          }
        />
        <Route
          path="system-admin/analytics"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <TabPage />
            </Suspense>
          }
        /> */}
      </Route>

      {/* Protected routes for role 2 */}
      <Route element={<ProtectedRoute roles={[1, 2]} />}>
        {/* <Route
          path="order-analyst/home"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="order-analyst/system-generated"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SystemGeneratedPage />
            </Suspense>
          }
        />
        <Route
          path="order-analyst/manager-approval"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ManagerApprovalPage />
            </Suspense>
          }
        />
        <Route
          path="order-analyst/approved-s-and-r"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ApprovedSAndRPage />
            </Suspense>
          }
        />
        <Route
          path="order-analyst/pending-approval"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PendingApprovalPage />
            </Suspense>
          }
        />
        <Route
          path="order-analyst/approved-vendor"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ApprovedVendorPage />
            </Suspense>
          }
        />
        <Route
          path="order-analyst/on-water"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <OnWaterPage />
            </Suspense>
          }
        />
        <Route
          path="order-analyst/pending-gatepass"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PendingGatepassPage />
            </Suspense>
          }
        />
        <Route
          path="order-analyst/with-gatepass"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <WithGatepassPage />
            </Suspense>
          }
        />
        <Route
          path="order-analyst/sku-enrollment"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SkuEnrollmentPage />
            </Suspense>
          }
        />
        <Route
          path="order-analyst/sku-masterlist"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SkuMasterList />
            </Suspense>
          }
        />
        <Route
          path="order-analyst/order-form"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <OrderFormPage />
            </Suspense>
          }
        />
        <Route
          path="order-analyst/order-form/worksheet-po-detail"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <WorkSheetPODetails />
            </Suspense>
          }
        />
        <Route
          path="order-analyst/po-summary"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PoSummary />
            </Suspense>
          }
        />
        <Route
          path="order-analyst/mix-container-summary"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MixContainerSummary />
            </Suspense>
          }
        />
        <Route
          path="order-analyst/simulation-only"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SimulationOnly />
            </Suspense>
          }
        /> */}
        <Route
          path="order-analyst/sku-reports"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Maintenance />
            </Suspense>
          }
        />
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
