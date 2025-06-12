import React, { Suspense } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import ProtectedRoute from "./ProtectedRoute";
import ManageOrderingPage from "../Pages/Manager/ManageOrdering/SkuMasterList/ManageOrderingPage";
import EventsSkuPage from "../Pages/Events/EventsSkuPage";
import WithPOPage from "../Pages/OrderAnalyst/WithPO/WithPOPage";

// Lazy-loaded components
const CustomerCode = React.lazy(
  () => import("../Pages/SystemAdmin/Merchants/Merchants")
);
const Club = React.lazy(() => import("../Pages/SystemAdmin/Stores/Stores"));
const Maintenance = React.lazy(() => import("../Pages/_Error/Maintenance"));
const TabPage = React.lazy(
  () => import("../Pages/SystemAdmin/Analytics/AnalyticsTabPages")
);
const Users = React.lazy(() => import("../Pages/SystemAdmin/Users/Users"));
const Logs = React.lazy(() => import("../Pages/SystemAdmin/Logs/Logs"));
const SkuMasterList = React.lazy(
  () => import("../Pages/OrderAnalyst/SkuMasterList/SkuMasterListPage")
);
const SkuEnrollmentPage = React.lazy(
  () => import("../Pages/OrderAnalyst/SkuEnrollment/SkuEnrollmentPage")
);
const OrderFormPage = React.lazy(
  () => import("../Pages/OrderAnalyst/OrderForm/OrderFormPage")
);
const PoSummary = React.lazy(
  () => import("../Pages/OrderAnalyst/PoSummary/PoSummaryPage")
);
const MixContainerSummary = React.lazy(
  () =>
    import("../Pages/OrderAnalyst/MixContainerSummary/MixContainerSummaryPage")
);
const Unauthorized = React.lazy(() => import("../Pages/_Error/Unauthorized"));
const ServerDown = React.lazy(() => import("../Pages/_Error/ServerDown"));
const SimulationOnly = React.lazy(
  () => import("../Pages/OrderAnalyst/SimulationOnly/SimulationOnlyPage")
);
const Home = React.lazy(() => import("../Pages/OrderAnalyst/Home/HomePage"));
const SystemGeneratedPage = React.lazy(
  () => import("../Pages/OrderAnalyst/SystemGenerated/SystemGeneratedPage")
);
const ManagerApprovalPage = React.lazy(
  () => import("../Pages/OrderAnalyst/ManagerApproval/ManagerApprovalPage")
);
const ApprovedSAndRPage = React.lazy(
  () => import("../Pages/OrderAnalyst/ApprovedSAndR/ApprovedSAndRPage")
);
const PendingApprovalPage = React.lazy(
  () => import("../Pages/OrderAnalyst/PendingApproval/PendingApprovalPage")
);
const ApprovedVendorPage = React.lazy(
  () => import("../Pages/OrderAnalyst/ApprovedVendor/ApprovedVendorPage")
);
const OnWaterPage = React.lazy(
  () => import("../Pages/OrderAnalyst/OnWater/OnWaterPage")
);
const PendingGatepassPage = React.lazy(
  () => import("../Pages/OrderAnalyst/PendingGatepass/PendingGatepassPage")
);
const WithGatepassPage = React.lazy(
  () => import("../Pages/OrderAnalyst/WithGatepass/WithGatepassPage")
);
const WorkSheetPODetails = React.lazy(
  () => import("../Pages/OrderAnalyst/OrderForm/components/WorkSheetPODetails")
);
const Page404 = React.lazy(() => import("../Pages/Page404"));
const SignupPage = React.lazy(() => import("../Pages/_Auth/SignupPage"));
const LoginPage = React.lazy(() => import("../Pages/_Auth/Login"));

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
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
        <Route
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
        />
        <Route
          path="manager/manager-ordering"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ManageOrderingPage />
            </Suspense>
          }
        />
      </Route>

      {/* Protected routes for role 2 */}
      <Route element={<ProtectedRoute roles={[1, 2]} />}>
        <Route
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
        />
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
          path="events"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <EventsSkuPage />
            </Suspense>
          }
        />
        <Route
          path="order-analyst/with-po"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <WithPOPage />
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
