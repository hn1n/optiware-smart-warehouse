import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      <div className="glass-card rounded-xl p-12 flex flex-col items-center justify-center text-center">
        <div className="p-4 rounded-2xl bg-primary/10 mb-4">
          <Construction size={32} className="text-primary" />
        </div>
        <h3 className="font-semibold text-lg mb-1">Coming Soon</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          This module is under development. Check back soon for updates.
        </p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
