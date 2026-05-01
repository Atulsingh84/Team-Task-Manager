export const taskStatuses = ["Pending", "In Progress", "Completed"];

export function createEmptyTask(project) {
  return {
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
    assignee: project?.members?.[0]?.user?._id || ""
  };
}
