import { FolderKanban } from "lucide-react";
import { formatDate } from "../../lib/date.js";
import { Badge } from "../ui/badge.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card.jsx";
import { MetricsGrid } from "./MetricsGrid.jsx";

export function DashboardView({ dashboard, projects }) {
  const summary = dashboard?.summary || {};
  const hasTasks = Boolean(summary.tasks);
  const totalTasks = Math.max(summary.tasks || 1, 1);
  const pending = Math.round(((summary.pending || 0) / totalTasks) * 100);
  const inProgress = Math.round(((summary.inProgress || 0) / totalTasks) * 100);
  const completed = Math.round(((summary.completed || 0) / totalTasks) * 100);
  const overdue = Math.round(((summary.overdue || 0) / totalTasks) * 100);
  const pendingEnd = pending;
  const inProgressEnd = pending + inProgress;
  const completedEnd = pending + inProgress + completed;
  const chartStyle = {
    "--pending-end": `${pendingEnd}%`,
    "--progress-end": `${inProgressEnd}%`,
    "--completed-end": `${completedEnd}%`
  };

  return (
    <>
      <MetricsGrid summary={summary} />

      <section className="dashboard-grid">
        <Card>
          <CardHeader>
            <CardTitle>Tasks Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overview-content">
              <div className={hasTasks ? "donut-chart" : "donut-chart is-empty"} style={chartStyle} />
              <div className="legend-list">
                <LegendItem label="Pending" value={summary.pending || 0} percent={pending} tone="purple" />
                <LegendItem label="In Progress" value={summary.inProgress || 0} percent={inProgress} tone="blue" />
                <LegendItem label="Completed" value={summary.completed || 0} percent={completed} tone="green" />
                <LegendItem label="Overdue" value={summary.overdue || 0} percent={overdue} tone="red" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="inline-card-header">
            <div>
              <CardTitle>Overdue Tasks</CardTitle>
              <CardDescription>Needs attention</CardDescription>
            </div>
            <button className="text-link" type="button">View all</button>
          </CardHeader>
          <CardContent>
            <div className="overdue-list">
              {(dashboard?.overdueTasks || []).length === 0 ? (
                <p className="muted-text">No overdue tasks.</p>
              ) : (
                dashboard.overdueTasks.map((task) => (
                  <div className="dashboard-task-row" key={task._id}>
                    <div>
                      <strong>{task.title}</strong>
                      <span>{task.project?.name || "Project"}</span>
                    </div>
                    <Badge variant="danger">{formatDate(task.dueDate)}</Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader className="inline-card-header">
          <CardTitle>Recent Projects</CardTitle>
          <button className="text-link" type="button">View all</button>
        </CardHeader>
        <CardContent>
          <div className="recent-projects">
            {projects.slice(0, 3).map((project) => (
              <div className="recent-project-card" key={project._id}>
                <div className="project-icon">
                  <FolderKanban size={18} />
                </div>
                <div>
                  <strong>{project.name}</strong>
                  <span>Updated {formatDate(project.updatedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function LegendItem({ label, value, percent, tone }) {
  return (
    <div className="legend-item">
      <span className={`legend-dot ${tone}`} />
      <span>{label}</span>
      <strong>{value} ({percent}%)</strong>
    </div>
  );
}
