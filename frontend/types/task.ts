export type TaskStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "DONE";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;

  status: TaskStatus;
  priority: TaskPriority;

  user: {
    id: string;
    name: string;
  };

  categories: {
    id: string;
    name: string;
  }[];
};