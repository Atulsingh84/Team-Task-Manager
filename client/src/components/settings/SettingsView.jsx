import { Bell, Lock, Palette, Plug, UserRound } from "lucide-react";
import { Avatar } from "../ui/avatar.jsx";
import { Button } from "../ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx";
import { Input } from "../ui/input.jsx";
import { Select } from "../ui/select.jsx";
import { Textarea } from "../ui/textarea.jsx";

const settingsTabs = [
  { label: "Profile", icon: UserRound },
  { label: "Account", icon: Lock },
  { label: "Notifications", icon: Bell },
  { label: "Appearance", icon: Palette },
  { label: "Integrations", icon: Plug }
];

export function SettingsView({ user, role }) {
  return (
    <section className="settings-layout">
      <Card className="settings-nav">
        <CardContent>
          {settingsTabs.map((item, index) => {
            const Icon = item.icon;
            return (
              <button className={index === 0 ? "active" : ""} key={item.label} type="button">
                <Icon size={15} />
                {item.label}
              </button>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="settings-form">
            <div className="profile-picture-row">
              <Avatar name={user.name} />
              <Button variant="outline" size="sm" type="button">Change</Button>
            </div>
            <label>
              Full Name
              <Input value={user.name} readOnly />
            </label>
            <label>
              Email
              <Input value={user.email} readOnly />
            </label>
            <label>
              Role
              <Select value={role} disabled>
                <option>{role}</option>
              </Select>
            </label>
            <label>
              About
              <Textarea defaultValue="Project manager and product designer." />
            </label>
            <Button className="save-settings-button" type="button">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
