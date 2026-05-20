import { TaskBoard } from "@/components/TaskBoard";
import { getTasks } from "@/services/task.service";

export default async function Home() {
  const tasks = await getTasks();

  return <TaskBoard tasks={tasks} />;
}