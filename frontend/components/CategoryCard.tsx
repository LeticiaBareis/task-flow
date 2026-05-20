"use client";

import { useState } from "react";
import { Button, Card, CardContent, Stack } from "@mui/material";

import { CategoryForm } from "./CategoryForm";

type Category = {
  id: string;
  name: string;
  createdAt?: string;
};

type Props = {
  category: Category;
  onEdit: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
};

export function CategoryCard({ category, onEdit, onDelete, loading }: Props) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <CategoryForm
            initialValue={category.name}
            submitLabel="Salvar"
            loading={loading}
            onCancel={() => setEditing(false)}
            onSubmit={(name) => {
              onEdit(category.id, name);
              setEditing(false);
            }}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <div>
            <h3 className="font-bold text-slate-900">{category.name}</h3>

            <p className="text-sm text-slate-500">
              {category.createdAt
                ? new Date(category.createdAt).toLocaleDateString("pt-BR")
                : "Categoria cadastrada"}
            </p>
          </div>

          <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={() => setEditing(true)}>
              Editar
            </Button>

            <Button
              variant="contained"
              color="error"
              disabled={loading}
              onClick={() => onDelete(category.id)}
            >
              Excluir
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}