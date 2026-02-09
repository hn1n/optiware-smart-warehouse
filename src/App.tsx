import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ManagerLayout from "./layouts/ManagerLayout";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import Suppliers from "./pages/manager/Suppliers";
import PurchaseOrders from "./pages/manager/PurchaseOrders";
import PurchaseInvoices from "./pages/manager/PurchaseInvoices";
import SalesOrders from "./pages/manager/SalesOrders";
import DeliveryNotes from "./pages/manager/DeliveryNotes";
import ShelvesLayout from "./pages/manager/ShelvesLayout";
import ShelvesView from "./pages/manager/ShelvesView";
import StockMonitor from "./pages/manager/StockMonitor";
import FinancialLoss from "./pages/manager/FinancialLoss";
import ReorderDecisions from "./pages/manager/ReorderDecisions";
import StaffLayout from "./layouts/StaffLayout";
import StaffReceive from "./pages/staff/StaffReceive";
import StaffPutaway from "./pages/staff/StaffPutaway";
import StaffMap from "./pages/staff/StaffMap";
import StaffTasks from "./pages/staff/StaffTasks";
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

          <Route path="/manager" element={<ManagerLayout />}>
            <Route index element={<ManagerDashboard />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="purchase-orders" element={<PurchaseOrders />} />
            <Route path="invoices" element={<PurchaseInvoices />} />
            <Route path="sales-orders" element={<SalesOrders />} />
            <Route path="delivery-notes" element={<DeliveryNotes />} />
            <Route path="shelves-layout" element={<ShelvesLayout />} />
            <Route path="shelves-view" element={<ShelvesView />} />
            <Route path="stock-monitor" element={<StockMonitor />} />
            <Route path="financial-loss" element={<FinancialLoss />} />
            <Route path="reorder" element={<ReorderDecisions />} />
          </Route>

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
