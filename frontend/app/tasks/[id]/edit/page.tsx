import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { TaskForm } from "@/components/TaskForm";
import { getTaskById } from "@/services/task.service";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTaskPage({ params }: Props) {
  const { id } = await params;
  const task = await getTaskById(id);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-10">
        <div className="mx-auto w-full max-w-6xl">
          <Link href="/" className="mb-6 inline-block font-semibold text-purple-700">
            ← Voltar para tarefas
          </Link>

          <h1 className="mb-2 text-3xl font-bold text-gray-900">Editar Tarefa</h1>

          <p className="mb-8 text-gray-500">
            Atualize as informações da tarefa.
          </p>

          <TaskForm mode="edit" taskId={id} initialData={task} />
        </div>
      </main>
    </div>
  );
}