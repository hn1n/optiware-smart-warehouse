import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Box, BarChart3, Navigation, Shield, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import OptiWareLogo from "@/components/OptiWareLogo";

const LoginPage = () => {
  const navigate = useNavigate();
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  const handleLogin = (role: "manager" | "staff") => {
    localStorage.setItem("optiware-role", role);
    navigate(role === "manager" ? "/manager" : "/staff");
  };

  const features = [
    { icon: Zap, label: "Smart Allocation", desc: "Optimal shelf placement" },
    { icon: Navigation, label: "Pathfinding", desc: "Shortest route guidance" },
    { icon: BarChart3, label: "Analytics", desc: "Real-time stock insights" },
    { icon: Shield, label: "Loss Prevention", desc: "Expiry & dead stock alerts" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden relative">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <OptiWareLogo size="lg" />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users size={16} />
          <span>Group 6 — TNT Project</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center relative z-10 px-4">
        <div className="max-w-5xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
              Warehouse Operations,{" "}
              <span className="text-gradient">Optimized</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Efficient inventory tracking, smart shelf allocation, and real-time insights — 
              all in one intelligent system.
            </p>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-14"
          >
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm"
              >
                <f.icon size={14} className="text-primary" />
                <span className="font-medium">{f.label}</span>
                <span className="text-muted-foreground hidden sm:inline">· {f.desc}</span>
              </div>
            ))}
          </motion.div>

          {/* Role selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto"
          >
            {/* Manager Card */}
            <button
              onClick={() => handleLogin("manager")}
              onMouseEnter={() => setHoveredRole("manager")}
              onMouseLeave={() => setHoveredRole(null)}
              className="group relative glass-card-elevated rounded-2xl p-8 text-left transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="gradient-primary rounded-xl p-3">
                  <BarChart3 size={24} className="text-primary-foreground" />
                </div>
                <ArrowRight
                  size={20}
                  className={`text-muted-foreground transition-all duration-300 ${
                    hoveredRole === "manager" ? "translate-x-1 text-primary" : ""
                  }`}
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Manager Portal</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Monitor stock levels, manage procurement, review financials, and configure warehouse layout.
              </p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {["Dashboard", "Procurement", "Analytics", "Setup"].map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </button>

            {/* Staff Card */}
            <button
              onClick={() => handleLogin("staff")}
              onMouseEnter={() => setHoveredRole("staff")}
              onMouseLeave={() => setHoveredRole(null)}
              className="group relative glass-card-elevated rounded-2xl p-8 text-left transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="gradient-primary rounded-xl p-3">
                  <Box size={24} className="text-primary-foreground" />
                </div>
                <ArrowRight
                  size={20}
                  className={`text-muted-foreground transition-all duration-300 ${
                    hoveredRole === "staff" ? "translate-x-1 text-primary" : ""
                  }`}
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Staff Portal</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Scan products, follow navigation paths, verify placements, and view warehouse map.
              </p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {["Receive", "Put-away", "Map", "Tasks"].map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-xs text-muted-foreground">
        OptiWare v1.0 — Smart Warehouse Management & Optimization System
      </footer>
    </div>
  );
};

export default LoginPage;
