import { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileOutput, Truck, CheckCircle2, Clock, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface SalesOrder {
  id: string;
  customer: string;
  date: string;
  items: { product: string; qty: number }[];
  total: string;
  status: "pending" | "processing" | "ready" | "shipped";
  deliveryNote: string | null;
}

const ordersData: SalesOrder[] = [
  { id: "SO-1105", customer: "RetailMax", date: "Feb 7, 2026", items: [{ product: "Organic Milk (2L)", qty: 100 }, { product: "Fresh Yogurt", qty: 60 }, { product: "Butter 250g", qty: 40 }], total: "$2,450", status: "ready", deliveryNote: null },
  { id: "SO-1104", customer: "QuickMart", date: "Feb 6, 2026", items: [{ product: "Canned Tuna 200g", qty: 200 }, { product: "Rice 5kg", qty: 50 }], total: "$1,870", status: "processing", deliveryNote: null },
  { id: "SO-1103", customer: "GreenGrocer", date: "Feb 5, 2026", items: [{ product: "Eggs Pack", qty: 80 }, { product: "Cheese Block", qty: 30 }], total: "$1,120", status: "shipped", deliveryNote: "DN-4501" },
  { id: "SO-1102", customer: "TechStore Plus", date: "Feb 4, 2026", items: [{ product: "USB-C Hub v1", qty: 25 }], total: "$750", status: "shipped", deliveryNote: "DN-4500" },
  { id: "SO-1101", customer: "ConstructCo", date: "Feb 3, 2026", items: [{ product: "Steel Rods (10mm)", qty: 100 }, { product: "Bolts M8", qty: 300 }], total: "$4,200", status: "pending", deliveryNote: null },
];

const statusMap: Record<string, { label: string; style: string }> = {
  pending: { label: "Pending", style: "bg-warning/10 text-warning" },
  processing: { label: "Processing", style: "bg-primary/10 text-primary" },
  ready: { label: "Ready to Ship", style: "bg-success/10 text-success" },
  shipped: { label: "Shipped", style: "bg-muted text-muted-foreground" },
};

const SalesOrders = () => {
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<SalesOrder | null>(null);
  const [createdNotes, setCreatedNotes] = useState<Record<string, string>>({});

  const filtered = ordersData.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.customer.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateDeliveryNote = (orderId: string) => {
    const noteId = `DN-${4502 + Object.keys(createdNotes).length}`;
    setCreatedNotes(prev => ({ ...prev, [orderId]: noteId }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">Review and fulfill customer orders.</p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Order list */}
        <div className="lg:col-span-3 space-y-3">
          {filtered.map((order, i) => {
            const st = statusMap[order.status];
            const note = order.deliveryNote || createdNotes[order.id];
            return (
              <motion.div key={order.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className={cn("glass-card rounded-xl p-4 cursor-pointer transition-all hover:border-primary/30",
                  selectedOrder?.id === order.id && "border-primary/40 shadow-md"
                )}
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-medium">{order.id}</span>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", st.style)}>{st.label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{order.date}</span>
                </div>
                <p className="text-sm font-medium">{order.customer}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">{order.items.length} items · {order.total}</p>
                  {note && (
                    <span className="text-xs font-mono text-primary flex items-center gap-1">
                      <FileOutput size={12} /> {note}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          {selectedOrder ? (
            <div className="glass-card rounded-xl p-5 sticky top-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{selectedOrder.id}</h2>
                <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", statusMap[selectedOrder.status].style)}>
                  {statusMap[selectedOrder.status].label}
                </span>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Customer</span><span className="font-medium">{selectedOrder.customer}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{selectedOrder.date}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-bold">{selectedOrder.total}</span></div>
              </div>
              <div className="border-t border-border pt-3">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, j) => (
                    <div key={j} className="flex items-center justify-between text-sm bg-muted/30 rounded-lg px-3 py-2">
                      <span className="flex items-center gap-2">
                        <Package size={14} className="text-muted-foreground" />
                        {item.product}
                      </span>
                      <span className="font-mono text-xs">×{item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
              {selectedOrder.status !== "shipped" && !selectedOrder.deliveryNote && !createdNotes[selectedOrder.id] && (
                <button
                  onClick={() => handleCreateDeliveryNote(selectedOrder.id)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl gradient-primary text-primary-foreground text-sm font-medium shadow-sm hover:opacity-90 transition-opacity"
                >
                  <Truck size={16} />
                  Create Delivery Note
                </button>
              )}
              {(selectedOrder.deliveryNote || createdNotes[selectedOrder.id]) && (
                <div className="flex items-center gap-2 text-sm text-success bg-success/10 rounded-xl p-3">
                  <CheckCircle2 size={16} />
                  Delivery Note: <span className="font-mono font-medium">{selectedOrder.deliveryNote || createdNotes[selectedOrder.id]}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-card rounded-xl p-8 text-center">
              <Truck size={32} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Select an order to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesOrders;
