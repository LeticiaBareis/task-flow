"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

import { deleteTask } from "@/services/task.service";

type Props = {
  taskId: string;
};

export function DeleteTaskButton({ taskId }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      await deleteTask(taskId);

      toast.success("Tarefa excluída com sucesso!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir tarefa.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-700 transition hover:bg-red-200"
      >
        Excluir
      </button>

      <Dialog
  open={open}
  onClose={() => setOpen(false)}
  slotProps={{
    paper: {
      sx: {
        borderRadius: 4,
        padding: 1,
      },
    },
  }}
>
        <DialogTitle sx={{ fontWeight: 700 }}>
          Excluir tarefa
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Deseja realmente excluir esta tarefa?
            Esta ação não poderá ser desfeita.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ padding: 2 }}>
          <Button
            onClick={() => setOpen(false)}
            disabled={loading}
            variant="outlined"
          >
            Cancelar
          </Button>

          <Button
            onClick={handleDelete}
            disabled={loading}
            variant="contained"
            color="error"
          >
            {loading ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}