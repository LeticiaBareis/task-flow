import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { TaskForm } from "@/components/TaskForm";

export default function NewTaskPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-10">
        <div className="mx-auto w-full max-w-6xl">
          <Link href="/" className="mb-6 inline-block font-semibold text-purple-700">
            ← Voltar para tarefas
          </Link>

          <h1 className="mb-2 text-3xl font-bold text-gray-900">Nova Tarefa</h1>

          <p className="mb-8 text-gray-500">
            Preencha os dados para criar uma nova tarefa.
          </p>

          <TaskForm />
        </div>
      </main>
    </div>
  );
}