"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { deleteTask } from "@/services/task.service";

type Props = {
  taskId: string;
};

export function DeleteTaskButton({ taskId }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm("Deseja realmente excluir esta tarefa?");

    if (!confirmed) return;

    try {
      await deleteTask(taskId);

      toast.success("Tarefa excluída com sucesso!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir tarefa.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
    >
      Excluir
    </button>
  );
}