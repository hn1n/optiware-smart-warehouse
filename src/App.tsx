import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ManagerLayout from "./layouts/ManagerLayout";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import StockMonitor from "./pages/manager/StockMonitor";
import ShelvesView from "./pages/manager/ShelvesView";
import FinancialLoss from "./pages/manager/FinancialLoss";
import StaffLayout from "./layouts/StaffLayout";
import StaffReceive from "./pages/staff/StaffReceive";
import StaffPutaway from "./pages/staff/StaffPutaway";
import StaffMap from "./pages/staff/StaffMap";
import StaffTasks from "./pages/staff/StaffTasks";
import PlaceholderPage from "./components/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          {/* Manager routes */}
          <Route path="/manager" element={<ManagerLayout />}>
            <Route index element={<ManagerDashboard />} />
            <Route path="suppliers" element={<PlaceholderPage title="Suppliers" description="Manage supplier contacts and agreements." />} />
            <Route path="purchase-orders" element={<PlaceholderPage title="Purchase Orders" description="Review and create purchase orders." />} />
            <Route path="invoices" element={<PlaceholderPage title="Purchase Invoices" description="Verify incoming invoices from suppliers." />} />
            <Route path="sales-orders" element={<PlaceholderPage title="Sales Orders" description="Review sales orders and create delivery notes." />} />
            <Route path="delivery-notes" element={<PlaceholderPage title="Delivery Notes" description="Track outbound delivery notes." />} />
            <Route path="shelves-layout" element={<PlaceholderPage title="Shelves Layout" description="Define shelf dimensions, zones, and capacity." />} />
            <Route path="shelves-view" element={<ShelvesView />} />
            <Route path="stock-monitor" element={<StockMonitor />} />
            <Route path="financial-loss" element={<FinancialLoss />} />
            <Route path="reorder" element={<PlaceholderPage title="Reorder Decisions" description="Review system suggestions for reordering stock." />} />
          </Route>

          {/* Staff routes */}
          <Route path="/staff" element={<StaffLayout />}>
            <Route index element={<StaffReceive />} />
            <Route path="putaway" element={<StaffPutaway />} />
            <Route path="map" element={<StaffMap />} />
            <Route path="tasks" element={<StaffTasks />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
