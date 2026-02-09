import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard, ShoppingCart, FileText, Receipt, Truck, Package,
  Layers, Eye, AlertTriangle, DollarSign, RefreshCw, Settings,
  ChevronLeft, ChevronRight, LogOut,
} from "lucide-react";
import OptiWareLogo from "@/components/OptiWareLogo";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/manager", icon: LayoutDashboard },
    ],
  },
  {
    label: "Procurement",
    items: [
      { title: "Suppliers", url: "/manager/suppliers", icon: ShoppingCart },
      { title: "Purchase Orders", url: "/manager/purchase-orders", icon: FileText },
      { title: "Purchase Invoices", url: "/manager/invoices", icon: Receipt },
    ],
  },
  {
    label: "Fulfillment",
    items: [
      { title: "Sales Orders", url: "/manager/sales-orders", icon: Truck },
      { title: "Delivery Notes", url: "/manager/delivery-notes", icon: Package },
    ],
  },
  {
    label: "Inventory",
    items: [
      { title: "Shelves Layout", url: "/manager/shelves-layout", icon: Layers },
      { title: "Shelves View", url: "/manager/shelves-view", icon: Eye },
      { title: "Stock Monitor", url: "/manager/stock-monitor", icon: AlertTriangle },
    ],
  },
  {
    label: "Finance",
    items: [
      { title: "Financial Loss", url: "/manager/financial-loss", icon: DollarSign },
      { title: "Reorder Decisions", url: "/manager/reorder", icon: RefreshCw },
    ],
  },
];

const ManagerLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("optiware-role");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen z-30 flex flex-col transition-all duration-300 border-r",
          "bg-sidebar text-sidebar-foreground border-sidebar-border",
          collapsed ? "w-16" : "w-60"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-3 py-4 border-b border-sidebar-border">
          {!collapsed && <OptiWareLogo size="sm" />}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
          {navGroups.map((group) => (
            <div key={group.label}>
              {!collapsed && (
                <span className="text-[10px] uppercase tracking-[0.15em] text-sidebar-foreground/40 font-semibold px-2 mb-1.5 block">
                  {group.label}
                </span>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <NavLink
                      key={item.url}
                      to={item.url}
                      end={item.url === "/manager"}
                      className={cn(
                        "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-200",
                        "hover:bg-sidebar-accent",
                        collapsed && "justify-center px-0"
                      )}
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon size={18} className={isActive ? "text-sidebar-primary" : ""} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-2">
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm transition-colors",
              "hover:bg-sidebar-accent text-sidebar-foreground/60 hover:text-sidebar-foreground",
              collapsed && "justify-center px-0"
            )}
          >
            <LogOut size={18} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main
        className={cn(
          "flex-1 transition-all duration-300 min-h-screen",
          collapsed ? "ml-16" : "ml-60"
        )}
      >
        <div className="p-6 md:p-8 max-w-[1400px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ManagerLayout;
