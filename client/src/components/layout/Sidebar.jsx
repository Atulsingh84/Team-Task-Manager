import { CalendarDays, FolderKanban, HelpCircle, LayoutDashboard, ListTodo, LogOut, Settings, Users } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { CardDescription, CardTitle } from "../ui/card.jsx";
import { Avatar } from "../ui/avatar.jsx";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "tasks", label: "Tasks", icon: ListTodo },
  { key: "calendar", label: "Calendar", icon: CalendarDays },
  { key: "members", label: "Members", icon: Users },
  { key: "settings", label: "Settings", icon: Settings }
];

export function Sidebar({ user, activeView, onChangeView, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="brand-row">
        <div className="brand-mark">
          <FolderKanban size={18} />
        </div>
        <div>
          <CardTitle>TaskFlow</CardTitle>
          <CardDescription>Project workspace</CardDescription>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.key} className={activeView === item.key ? "active" : ""} onClick={() => onChangeView(item.key)} type="button">
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="support-link" type="button">
          <HelpCircle size={15} />
          Help & Support
        </button>
        <div className="user-tile">
          <Avatar name={user.name} />
          <div>
            <strong>{user.name}</strong>
            <span>Admin</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onLogout} aria-label="Logout" title="Logout">
            <LogOut size={16} />
          </Button>
        </div>
      </div>
    </aside>
  );
}
