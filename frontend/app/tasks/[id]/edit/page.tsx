import Link from "next/link";

import { TaskForm } from "@/components/TaskForm";
import { getTaskById } from "@/services/task.service";
import { Sidebar } from "@/components/Sidebar";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTaskPage({
  params,
}: Props) {
  const { id } = await params;

  const task = await getTaskById(id);

  return (
    <div className="flex min-h-screen bg-slate-50">
          <Sidebar />
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50 mb-6 inline-block"
        >
          Voltar
        </Link>

        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Editar Tarefa
        </h1>

        <p className="mb-6 text-gray-500">
          Atualize as informações da tarefa.
        </p>

        <TaskForm
          mode="edit"
          taskId={id}
          initialData={task}
        />
      </div>
    </main>
    </div>
  );
}