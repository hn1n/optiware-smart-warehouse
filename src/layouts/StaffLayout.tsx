import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Package, Navigation, Map, ClipboardList, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import OptiWareLogo from "@/components/OptiWareLogo";

const tabs = [
  { label: "Receive", icon: Package, path: "/staff" },
  { label: "Put-away", icon: Navigation, path: "/staff/putaway" },
  { label: "Map", icon: Map, path: "/staff/map" },
  { label: "Tasks", icon: ClipboardList, path: "/staff/tasks" },
];

const StaffLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("optiware-role");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-20">
        <OptiWareLogo size="sm" />
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20 px-4 py-5">
        <Outlet />
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-card/90 backdrop-blur-xl border-t border-border">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-1.5 px-4 rounded-lg transition-all duration-200 min-w-[64px]",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon size={22} strokeWidth={isActive ? 2.3 : 1.8} />
                <span className={cn("text-[10px] font-medium", isActive && "font-semibold")}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default StaffLayout;
