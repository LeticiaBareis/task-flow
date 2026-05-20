"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import toast from "react-hot-toast";

import { HomeColumn } from "@/components/HomeColumn";
import { Sidebar } from "@/components/Sidebar";
import { updateTaskStatus } from "@/services/task.service";
import { Task } from "@/types/task";

type Props = {
  tasks: Task[];
};

export function TaskBoard({ tasks }: Props) {
  const [localTasks, setLocalTasks] = useState(tasks);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [category, setCategory] = useState("ALL");
  const [priority, setPriority] = useState("ALL");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const categories = useMemo(() => {
    const allCategories = localTasks.flatMap((task) => task.categories ?? []);

    return Array.from(
      new Map(allCategories.map((item) => [item.id, item])).values()
    );
  }, [localTasks]);

  const filteredTasks = useMemo(() => {
    return localTasks.filter((task) => {
      const searchLower = search.toLowerCase();

      const matchesSearch =
        task.title?.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower);

      const matchesStatus = status === "ALL" || task.status === status;
      const matchesPriority = priority === "ALL" || task.priority === priority;

      const matchesCategory =
        category === "ALL" ||
        task.categories?.some((item) => item.id === category);

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesCategory
      );
    });
  }, [localTasks, search, status, priority, category]);

  const newTasks = filteredTasks.filter((task) => task.status === "PENDING");
  const progressTasks = filteredTasks.filter(
    (task) => task.status === "IN_PROGRESS"
  );
  const doneTasks = filteredTasks.filter((task) => task.status === "DONE");

  function clearFilters() {
    setSearch("");
    setStatus("ALL");
    setCategory("ALL");
    setPriority("ALL");
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = String(active.id);
    const newStatus = String(over.id);

    const task = localTasks.find((item) => item.id === taskId);

    if (!task || task.status === newStatus) return;

    setLocalTasks((prev) =>
      prev.map((item) =>
        item.id === taskId
          ? { ...item, status: newStatus as Task["status"] }
          : item
      )
    );

    try {
      await updateTaskStatus(taskId, newStatus);
      toast.success("Status atualizado!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar status.");

      setLocalTasks((prev) =>
        prev.map((item) =>
          item.id === taskId ? { ...item, status: task.status } : item
        )
      );
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Minhas Tarefas
            </h1>

            <p className="text-gray-500">
              Organize suas atividades e aumente sua produtividade.
            </p>
          </div>

          <Link
            href="/tasks/new"
            className="rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white hover:bg-purple-800"
          >
            + Nova Tarefa
          </Link>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-5">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-600"
            placeholder="Buscar tarefas..."
          />

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-600"
          >
            <option value="ALL">Status: Todos</option>
            <option value="PENDING">Novas</option>
            <option value="IN_PROGRESS">Em andamento</option>
            <option value="DONE">Concluídas</option>
          </select>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-600"
          >
            <option value="ALL">Categoria: Todas</option>

            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-600"
          >
            <option value="ALL">Prioridade: Todas</option>
            <option value="LOW">Baixa</option>
            <option value="MEDIUM">Média</option>
            <option value="HIGH">Alta</option>
          </select>

          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Limpar filtros
          </button>
        </div>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <HomeColumn
              title="Novas"
              tasks={newTasks}
              color="blue"
              status="PENDING"
            />

            <HomeColumn
              title="Em Andamento"
              tasks={progressTasks}
              color="orange"
              status="IN_PROGRESS"
            />

            <HomeColumn
              title="Concluídas"
              tasks={doneTasks}
              color="green"
              status="DONE"
            />
          </div>
        </DndContext>
      </main>
    </div>
  );
}