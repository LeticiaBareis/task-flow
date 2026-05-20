"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import toast from "react-hot-toast";

import {
  createTask,
  updateTask,
  updateTaskStatus,
} from "@/services/task.service";

import { getCategories } from "@/services/category.service";
import { getUsers } from "@/services/user.service";
import { Task } from "@/types/task";

type Option = {
  id: string;
  name: string;
};

type Priority = "LOW" | "MEDIUM" | "HIGH";
type Status = "PENDING" | "IN_PROGRESS" | "DONE";

type TaskFormProps = {
  mode?: "create" | "edit";
  taskId?: string;
  initialData?: Task;
};

export function TaskForm({
  mode = "create",
  taskId,
  initialData,
}: TaskFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [dueDate, setDueDate] = useState(
    initialData?.dueDate ? initialData.dueDate.slice(0, 10) : ""
  );
  const [priority, setPriority] = useState<Priority | "">(
    initialData?.priority ?? ""
  );
  const [status, setStatus] = useState<Status>(
    initialData?.status ?? "PENDING"
  );
  const [userId, setUserId] = useState(initialData?.user?.id ?? "");

  const [users, setUsers] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Option[]>(
    initialData?.categories ?? []
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [usersData, categoriesData] = await Promise.all([
          getUsers(),
          getCategories(),
        ]);

        setUsers(usersData);
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar usuários ou categorias.");
      } finally {
        setLoadingData(false);
      }
    }

    loadData();
  }, []);

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = "Título é obrigatório.";
    if (!description.trim()) newErrors.description = "Descrição é obrigatória.";
    if (!priority) newErrors.priority = "Prioridade é obrigatória.";
    if (!status) newErrors.status = "Status é obrigatório.";
    if (!userId) newErrors.userId = "Responsável é obrigatório.";

    if (selectedCategories.length === 0) {
      newErrors.categories = "Selecione pelo menos uma categoria.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) return;

    const payload = {
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null,
      priority,
      userId,
      categoryIds: selectedCategories.map((category) => category.id),
    };

    try {
      setSaving(true);

      if (mode === "edit" && taskId) {
        await updateTask(taskId, payload);
        await updateTaskStatus(taskId, status);

        toast.success("Tarefa atualizada com sucesso!");
      } else {
        await createTask({
          ...payload,
          status,
        });

        toast.success("Tarefa criada com sucesso!");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        mode === "edit"
          ? "Erro ao atualizar tarefa."
          : "Erro ao criar tarefa."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loadingData) {
    return (
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack spacing={2} sx={{ alignItems: "center", py: 4 }}>
            <CircularProgress />
            <p>Carregando formulário...</p>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 2px 12px rgba(15, 23, 42, 0.08)",
      }}
    >
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >

            </Stack>

            <TextField
              label="Título"
              size="small"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              error={!!errors.title}
              helperText={errors.title}
              fullWidth
            />

            <TextField
              label="Descrição"
              size="small"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={4}
              fullWidth
            />

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                select
                label="Responsável"
                size="small"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                error={!!errors.userId}
                helperText={errors.userId}
                fullWidth
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </TextField>

              <Autocomplete
                multiple
                options={categories}
                getOptionLabel={(option) => option.name}
                value={selectedCategories}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, value) => setSelectedCategories(value)}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Categorias"
                    size="small"
                    error={!!errors.categories}
                    helperText={errors.categories}
                  />
                )}
              />
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                select
                label="Prioridade"
                size="small"
                value={priority}
                onChange={(event) => setPriority(event.target.value as Priority)}
                error={!!errors.priority}
                helperText={errors.priority}
                fullWidth
              >
                <MenuItem value="LOW">Baixa</MenuItem>
                <MenuItem value="MEDIUM">Média</MenuItem>
                <MenuItem value="HIGH">Alta</MenuItem>
              </TextField>

              <TextField
                label="Data de vencimento"
                type="date"
                size="small"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                fullWidth
              />

              <TextField
                select
                label="Status"
                size="small"
                value={status}
                onChange={(event) => setStatus(event.target.value as Status)}
                error={!!errors.status}
                helperText={errors.status}
                fullWidth
              >
                <MenuItem value="PENDING">Pendente</MenuItem>
                <MenuItem value="IN_PROGRESS">Em andamento</MenuItem>
                <MenuItem value="DONE">Concluída</MenuItem>
              </TextField>
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: "flex-end",
                pt: 1,
              }}
            >
              <Button variant="outlined" onClick={() => router.push("/")}>
                Cancelar
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={saving}
                sx={{
                  bgcolor: "#6D28D9",
                  px: 4,
                }}
              >
                {saving
                  ? "Salvando..."
                  : mode === "edit"
                    ? "Salvar alterações"
                    : "Criar tarefa"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}