import { CheckCircle2, Circle, Clock3, FolderKanban } from "lucide-react";
import { Card } from "../ui/card.jsx";

const metrics = [
  { key: "projects", label: "Total Projects", icon: FolderKanban },
  { key: "pending", label: "Pending Tasks", icon: Circle },
  { key: "inProgress", label: "In progress", icon: Clock3 },
  { key: "completed", label: "Completed", icon: CheckCircle2 }
];

export function MetricsGrid({ summary }) {
  return (
    <section className="metrics-grid">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card className={`metric-card ${metric.tone === "warning" ? "is-warning" : ""}`} key={metric.key}>
            <div className="metric-icon">
              <Icon size={18} />
            </div>
            <span>{metric.label}</span>
            <strong>{summary?.[metric.key] || 0}</strong>
          </Card>
        );
      })}
    </section>
  );
}
