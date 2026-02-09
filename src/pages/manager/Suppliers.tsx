import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Phone, Mail, MapPin, Package, MoreHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  products: number;
  status: "active" | "inactive";
  lastOrder: string;
}

const suppliersData: Supplier[] = [
  { id: "SUP-001", name: "FreshCo Ltd.", contact: "Alice Chen", email: "alice@freshco.com", phone: "+1 555-0101", address: "123 Green Ave, Portland", category: "Dairy & Fresh", products: 14, status: "active", lastOrder: "Feb 8, 2026" },
  { id: "SUP-002", name: "SteelWorks Inc.", contact: "Robert Kim", email: "r.kim@steelworks.com", phone: "+1 555-0202", address: "456 Industrial Blvd, Detroit", category: "Hardware", products: 8, status: "active", lastOrder: "Feb 7, 2026" },
  { id: "SUP-003", name: "PackPro", contact: "Maria Lopez", email: "maria@packpro.com", phone: "+1 555-0303", address: "789 Box St, Austin", category: "Packaging", products: 6, status: "active", lastOrder: "Feb 5, 2026" },
  { id: "SUP-004", name: "TechParts Global", contact: "James Ota", email: "j.ota@techparts.io", phone: "+1 555-0404", address: "321 Circuit Rd, San Jose", category: "Electronics", products: 11, status: "inactive", lastOrder: "Jan 15, 2026" },
  { id: "SUP-005", name: "OrganicFarms Co.", contact: "Sarah Patel", email: "sarah@organicfarms.com", phone: "+1 555-0505", address: "654 Valley Ln, Sacramento", category: "Dairy & Fresh", products: 9, status: "active", lastOrder: "Feb 9, 2026" },
  { id: "SUP-006", name: "BuildRight Supply", contact: "Tom Baker", email: "tom@buildright.com", phone: "+1 555-0606", address: "111 Builder Way, Phoenix", category: "Hardware", products: 5, status: "active", lastOrder: "Feb 3, 2026" },
];

const Suppliers = () => {
  const [search, setSearch] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const filtered = suppliersData.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-sm text-muted-foreground mt-1">{suppliersData.length} suppliers · {suppliersData.filter(s => s.status === "active").length} active</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-medium shadow-sm hover:opacity-90 transition-opacity">
          <Plus size={16} />
          Add Supplier
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search suppliers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border bg-muted/30">
                <th className="px-5 py-3 font-medium">Supplier</th>
                <th className="px-5 py-3 font-medium">Contact</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Products</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Last Order</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <motion.tr
                  key={s.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedSupplier(s)}
                >
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="font-medium">{s.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{s.id}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{s.contact}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">{s.category}</span>
                  </td>
                  <td className="px-5 py-3.5">{s.products}</td>
                  <td className="px-5 py-3.5">
                    <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium",
                      s.status === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                    )}>{s.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{s.lastOrder}</td>
                  <td className="px-5 py-3.5">
                    <MoreHorizontal size={16} className="text-muted-foreground" />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail drawer */}
      {selectedSupplier && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelectedSupplier(null)}>
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            className="relative w-full max-w-md bg-card border-l border-border h-full overflow-y-auto p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{selectedSupplier.name}</h2>
              <button onClick={() => setSelectedSupplier(null)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={15} className="text-muted-foreground" />
                <span>{selectedSupplier.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={15} className="text-muted-foreground" />
                <span>{selectedSupplier.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={15} className="text-muted-foreground" />
                <span>{selectedSupplier.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Package size={15} className="text-muted-foreground" />
                <span>{selectedSupplier.products} linked products</span>
              </div>
            </div>
            <div className="pt-3 border-t border-border space-y-2">
              <h3 className="text-sm font-semibold">Recent Activity</h3>
              <p className="text-xs text-muted-foreground">Last order placed on {selectedSupplier.lastOrder}</p>
              <p className="text-xs text-muted-foreground">Category: {selectedSupplier.category}</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
