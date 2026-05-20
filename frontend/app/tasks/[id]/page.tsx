import Link from "next/link";
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

export default async function TaskDetailsPage({ params }: Props) {
  const { id } = await params;
  const task = await getTaskById(id);

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="text-xl text-slate-500 hover:text-slate-900">
            ×
          </Link>

          <div className="flex gap-2">
            <Link
              href={`/tasks/${task.id}/edit`}
              className="rounded-lg bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700"
            >
              Editar
            </Link>

            <DeleteTaskButton taskId={task.id} />
          </div>
        </div>

        <div className="mb-4 flex items-start justify-between gap-3">
          <h1 className="text-2xl font-bold text-slate-900">{task.title}</h1>

          <span className="rounded-lg bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
            {priorityLabel[String(task.priority)] ?? "-"}
          </span>
        </div>

        <span className="mb-6 inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
          {statusLabel[String(task.status)] ?? "-"}
        </span>

        <div className="space-y-5 border-t border-slate-200 pt-5">
          <DetailItem label="Responsável" value={task.user?.name ?? "-"} />

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-500">
              Categorias
            </p>

            <div className="flex flex-wrap gap-2">
              {task.categories?.map((category: any) => (
                <span
                  key={category.id}
                  className="rounded-lg bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>

          <DetailItem
            label="Data de vencimento"
            value={
              task.dueDate
                ? new Date(task.dueDate).toLocaleDateString("pt-BR")
                : "-"
            }
          />

          <DetailItem
            label="Descrição"
            value={task.description || "-"}
            multiline
          />
        </div>
      </div>
    </main>
  );
}

function DetailItem({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <p className="mb-1 text-sm font-semibold text-slate-500">{label}</p>
      <p className={`text-sm text-slate-800 ${multiline ? "leading-6" : ""}`}>
        {value}
      </p>
    </div>
  );
}