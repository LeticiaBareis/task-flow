import Link from "next/link";

import { Sidebar } from "@/components/Sidebar";
import { DeleteTaskButton } from "@/components/DeleteTaskButton";
import { getTaskById } from "@/services/task.service";

type Props = {
  params: Promise<{ id: string }>;
};

const statusLabel: Record<string, string> = {
  PENDING: "Pendente",
  IN_PROGRESS: "Em andamento",
  DONE: "Concluída",
};

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

export default async function TaskDetailsPage({ params }: Props) {
  const { id } = await params;
  const task = await getTaskById(id);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-10">
        <div className="mx-auto w-full max-w-5xl">
          <Link
            href="/"
            className="mb-6 inline-block font-semibold text-purple-700 hover:text-purple-900"
          >
            ← Voltar para tarefas
          </Link>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  <span
                    className={`rounded-lg px-3 py-1 text-sm font-bold ${
                      priorityClass[String(task.priority)] ??
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    Prioridade {priorityLabel[String(task.priority)] ?? "-"}
                  </span>

                  <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700">
                    {statusLabel[String(task.status)] ?? "-"}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-slate-900">
                  {task.title}
                </h1>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                  {task.description || "Sem descrição informada."}
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <Link
                  href={`/tasks/${task.id}/edit`}
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-purple-800"
                >
                  Editar
                </Link>

                <DeleteTaskButton taskId={task.id} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <DetailCard label="Responsável" value={task.user?.name ?? "-"} />

              <DetailCard
                label="Data de vencimento"
                value={
                  task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString("pt-BR")
                    : "-"
                }
              />

              <DetailCard
                label="Status"
                value={statusLabel[String(task.status)] ?? "-"}
              />

              <DetailCard
                label="Prioridade"
                value={priorityLabel[String(task.priority)] ?? "-"}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5">
              <p className="mb-3 text-sm font-bold text-slate-500">
                Categorias
              </p>

              <div className="flex flex-wrap gap-2">
                {task.categories?.length ? (
                  task.categories.map((category: any) => (
                    <span
                      key={category.id}
                      className="rounded-lg bg-purple-100 px-3 py-1 text-sm font-bold text-purple-700"
                    >
                      {category.name}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">
                    Nenhuma categoria vinculada.
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5">
              <p className="mb-2 text-sm font-bold text-slate-500">
                Descrição
              </p>

              <p className="text-sm leading-6 text-slate-800">
                {task.description || "Sem descrição informada."}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <p className="mb-1 text-sm font-bold text-slate-500">{label}</p>
      <p className="font-semibold text-slate-900">{value}</p>
    </div>
  );
}