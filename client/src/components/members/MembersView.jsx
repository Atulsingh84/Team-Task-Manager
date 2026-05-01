import { useState } from "react";
import { Search, UserPlus, Users, X } from "lucide-react";
import { Avatar } from "../ui/avatar.jsx";
import { Badge } from "../ui/badge.jsx";
import { Button } from "../ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx";
import { Input } from "../ui/input.jsx";
import { Select } from "../ui/select.jsx";
import { api } from "../../api.js";

export function MembersView({ project, canManage, onAddMember }) {
  const members = project?.members || [];
  const [memberForm, setMemberForm] = useState({ userId: "", role: "Member" });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searching, setSearching] = useState(false);

  async function handleSearch(query) {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setSearching(true);
      const data = await api(`/projects/${project._id}/search-users?q=${encodeURIComponent(query)}`);
      setSearchResults(data.users || []);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }

  function selectUser(user) {
    setSelectedUser(user);
    setMemberForm({ ...memberForm, userId: user._id });
    setSearchQuery(user.name);
    setSearchResults([]);
  }

  async function submitMember(event) {
    event.preventDefault();
    if (!selectedUser) return;

    await onAddMember({ email: selectedUser.email, role: memberForm.role });
    setMemberForm({ userId: "", role: "Member" });
    setSelectedUser(null);
    setSearchQuery("");
  }

  return (
    <section className="members-layout">
      <Card>
        <CardHeader className="inline-card-header">
          <CardTitle>Members</CardTitle>
          <div className="members-actions">
            <div className="search-box">
              <Search size={16} />
              <Input placeholder="Search members..." />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined At</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member._id}>
                    <td>
                      <div className="member-cell">
                        <Avatar name={member.user.name} />
                        <strong>{member.user.name}</strong>
                      </div>
                    </td>
                    <td>{member.user.email}</td>
                    <td><Badge variant={member.role === "Admin" ? "info" : "success"}>{member.role}</Badge></td>
                    <td>Project member</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Roles</CardTitle>
        </CardHeader>
        <CardContent>
          {canManage && (
            <form className="member-form invite-form" onSubmit={submitMember}>
              <div style={{ position: "relative" }}>
                <Input
                  placeholder="Search members by name or email..."
                  value={searchQuery}
                  onChange={(event) => handleSearch(event.target.value)}
                  autoComplete="off"
                  required={!selectedUser}
                />
                {searchResults.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      marginTop: "4px",
                      maxHeight: "200px",
                      overflowY: "auto",
                      zIndex: 10,
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                    }}
                  >
                    {searchResults.map((user) => (
                      <button
                        key={user._id}
                        type="button"
                        onClick={() => selectUser(user)}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          textAlign: "left",
                          border: "none",
                          backgroundColor: "#fff",
                          cursor: "pointer",
                          borderBottom: "1px solid #f3f4f6",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          fontSize: "0.95rem"
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#f9fafb")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#fff")}
                      >
                        <Avatar name={user.name} />
                        <div>
                          <strong>{user.name}</strong>
                          <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>{user.email}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {selectedUser && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 12px",
                    backgroundColor: "#f0f9ff",
                    borderRadius: "6px",
                    marginTop: "8px"
                  }}
                >
                  <Avatar name={selectedUser.name} />
                  <div style={{ flex: 1 }}>
                    <strong>{selectedUser.name}</strong>
                    <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>{selectedUser.email}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUser(null);
                      setSearchQuery("");
                      setMemberForm({ userId: "", role: "Member" });
                    }}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
                  >
                    <X size={18} />
                  </button>
                </div>
              )}

              <Select value={memberForm.role} onChange={(event) => setMemberForm({ ...memberForm, role: event.target.value })}>
                <option>Member</option>
                <option>Admin</option>
              </Select>

              <Button type="submit" disabled={!selectedUser}>
                <UserPlus size={16} />
                Add Member
              </Button>
            </form>
          )}
          <div className="role-cards">
            <div className="role-card">
              <div className="role-icon admin">
                <Users size={22} />
              </div>
              <div>
                <strong>Admin</strong>
                <span>Full access to projects, members, and settings.</span>
              </div>
            </div>
            <div className="role-card">
              <div className="role-icon member">
                <Users size={22} />
              </div>
              <div>
                <strong>Member</strong>
                <span>Can view and manage tasks in assigned projects.</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

