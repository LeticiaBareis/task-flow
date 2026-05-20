"use client";

import { useDroppable } from "@dnd-kit/core";
import { Task } from "@/types/task";
import { TaskCard } from "./TaskCard";

type Props = {
  title: string;
  tasks: Task[];
  color: "blue" | "orange" | "green";
  status: string;
};

const colorClass = {
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  orange: "border-orange-200 bg-orange-50 text-orange-700",
  green: "border-green-200 bg-green-50 text-green-700",
};

export function HomeColumn({ title, tasks, color, status }: Props) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <section ref={setNodeRef} className={`rounded-2xl border p-4 ${colorClass[color]}`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">{title}</h2>
        <span className="rounded-full bg-white px-2 py-1 text-xs">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}