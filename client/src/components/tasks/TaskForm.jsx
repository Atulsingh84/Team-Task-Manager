import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { createEmptyTask } from "../../constants/tasks.js";
import { Avatar } from "../ui/avatar.jsx";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import { Select } from "../ui/select.jsx";
import { Textarea } from "../ui/textarea.jsx";

export function TaskForm({ project, onCreateTask }) {
  const [taskForm, setTaskForm] = useState(createEmptyTask(project));

  useEffect(() => {
    setTaskForm(createEmptyTask(project));
  }, [project?._id]);

  async function submitTask(event) {
    event.preventDefault();
    await onCreateTask(taskForm);
    setTaskForm(createEmptyTask(project));
  }

  return (
    <form className="task-form" onSubmit={submitTask}>
      <Input placeholder="Task title" value={taskForm.title} onChange={(event) => setTaskForm({ ...taskForm, title: event.target.value })} required />

      <div style={{ position: "relative" }}>
        <label style={{ display: "block", fontSize: "0.9rem", marginBottom: "6px", fontWeight: "500", color: "#6b7280" }}>
          Assign to
        </label>
        <Select value={taskForm.assignee} onChange={(event) => setTaskForm({ ...taskForm, assignee: event.target.value })}>
          <option value="">Unassigned</option>
          {project.members.map((member) => (
            <option key={member._id} value={member.user._id}>
              {member.user.name} ({member.user.email})
            </option>
          ))}
        </Select>
      </div>

      <div style={{ position: "relative" }}>
        <label style={{ display: "block", fontSize: "0.9rem", marginBottom: "6px", fontWeight: "500", color: "#6b7280" }}>
          Due date
        </label>
        <Input type="date" value={taskForm.dueDate} onChange={(event) => setTaskForm({ ...taskForm, dueDate: event.target.value })} />
      </div>

      <Textarea placeholder="Details" value={taskForm.description} onChange={(event) => setTaskForm({ ...taskForm, description: event.target.value })} />

      <Button type="submit">
        <Plus size={16} />
        Add task
      </Button>
    </form>
  );
}

