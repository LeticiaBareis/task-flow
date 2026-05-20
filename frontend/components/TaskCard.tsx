"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDraggable } from "@dnd-kit/core";

import { Task } from "@/types/task";

const priorityLabel: Record<string, string> = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
};

const priorityClass: Record<string, string> = {
  LOW: "bg-green-100 text-green-700",
  MEDIUM: "bg-orange-100 text-orange-700",
  HIGH: "bg-red-100 text-red-700",
};

export function TaskCard({ task }: { task: Task }) {
  const router = useRouter();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.6 : 1,
      }
    : undefined;

  function getInitials(name?: string) {
    if (!name) return "-";

    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => router.push(`/tasks/${task.id}`)}
      className="cursor-grab rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md active:cursor-grabbing"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="line-clamp-2 text-sm font-bold text-slate-900">
          {task.title}
        </h3>

        <span
          className={`shrink-0 rounded-lg px-2 py-1 text-xs font-bold ${
            priorityClass[String(task.priority)] ?? "bg-gray-100 text-gray-700"
          }`}
        >
          {priorityLabel[String(task.priority)] ?? "-"}
        </span>
      </div>

      <p className="mb-4 line-clamp-2 text-sm leading-6 text-slate-600">
        {task.description || "Sem descrição"}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {task.categories?.map((category) => (
          <span
            key={category.id}
            className="rounded-lg bg-purple-100 px-2 py-1 text-xs font-bold text-purple-700"
          >
            {category.name}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
        <span>
          📅{" "}
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString("pt-BR")
            : "-"}
        </span>

        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-500 text-[10px] font-bold text-white">
          {getInitials(task.user?.name)}
        </span>
      </div>

    </div>
  );
}