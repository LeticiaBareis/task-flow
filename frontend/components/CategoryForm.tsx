"use client";

import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";

type Props = {
  initialValue?: string;
  loading?: boolean;
  submitLabel?: string;
  onSubmit: (name: string) => void;
  onCancel?: () => void;
};

export function CategoryForm({
  initialValue = "",
  loading = false,
  submitLabel = "Salvar",
  onSubmit,
  onCancel,
}: Props) {
  const [name, setName] = useState(initialValue);
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (!name.trim()) {
    setError("Nome da categoria é obrigatório.");
    return;
  }

  onSubmit(name.trim());

  setName("");
  setError("");
}

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          label="Nome da categoria"
          size="small"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError("");
          }}
          error={!!error}
          helperText={error}
          fullWidth
        />

        {onCancel && (
          <Button variant="outlined" onClick={onCancel}>
            Cancelar
          </Button>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ bgcolor: "#6D28D9", minWidth: 140 }}
        >
          {loading ? "Salvando..." : submitLabel}
        </Button>
      </Stack>
    </form>
  );
}