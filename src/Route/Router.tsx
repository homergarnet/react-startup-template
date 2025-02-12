import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import CustomerCode from "../Pages/SystemAdmin/Merchants/Merchants";
import Club from "../Pages/SystemAdmin/Stores/Stores";
import Maintenance from "../Pages/_Error/Maintenance";
import TabPage from "../Pages/SystemAdmin/Analytics/AnalyticsTabPages";
import Users from "../Pages/SystemAdmin/Users/Users";
import Logs from "../Pages/SystemAdmin/Logs/Logs";
import AnalystDashboard from "../Pages/OrderAnalyst/Dashboard/Dashboard";

import SkuMasterList from "../Pages/OrderAnalyst/SkuMasterList/SkuMasterList";
import SkuEnrollmentPage from "../Pages/OrderAnalyst/SkuEnrollment/SkuEnrollmentPage";
import SkuOrderForm from "../Pages/OrderAnalyst/OrderForm/OrderForm";
import PoSummary from "../Pages/OrderAnalyst/PoSummary/PoSummary";
import MixContainerSummary from "../Pages/OrderAnalyst/MixContainerSummary/MixContainerSummary";
import SkuReports from "../Pages/OrderAnalyst/Reports/Reports";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "../Pages/_Error/Unauthorized";
import ServerDown from "../Pages/_Error/ServerDown";
import SimulationOnly from "../Pages/OrderAnalyst/SimulationOnly/SimulationOnly";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout roles={[1, 2, 3]} />}>
      <Route element={<ProtectedRoute roles={[1]} />}>
        <Route
          path="system-admin/dashboard-system-admin"
          element={<Maintenance />}
        />
        <Route path="system-admin/customer-code" element={<CustomerCode />} />
        <Route path="system-admin/user" element={<Users />} />
        <Route path="system-admin/club" element={<Club />} />
        <Route path="system-admin/logs" element={<Logs />} />
        <Route path="system-admin/analytics" element={<TabPage />} />
      </Route>

      <Route element={<ProtectedRoute roles={[2]} />}>
        <Route
          path="order-analyst/dashboard-order-analyst"
          element={<AnalystDashboard />}
        />
        <Route
          path="order-analyst/sku-enrollment"
          element={<SkuEnrollmentPage />}
        />
        {/* <Route
          path="order-analyst/sku-enrollment"
          element={<SkuEnrollmentPage />}
        /> */}
        <Route
          path="order-analyst/sku-masterlist"
          element={<SkuMasterList />}
        />
        <Route path="order-analyst/order-form" element={<SkuOrderForm />} />
        <Route path="order-analyst/simulation-only" element={<SimulationOnly />} />
        <Route path="order-analyst/po-summary" element={<PoSummary />} />
        <Route
          path="order-analyst/mix-container-summary"
          element={<MixContainerSummary />}
        />
        <Route path="order-analyst/sku-reports" element={<Maintenance />} />
      </Route>

      <Route element={<ProtectedRoute roles={[1, 2, 3]} />}>
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="serverdown" element={<ServerDown />} />
      </Route>
    </Route>
  )
);

export default Router;
