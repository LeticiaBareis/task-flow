"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import { Sidebar } from "@/components/Sidebar";
import { CategoryForm } from "@/components/CategoryForm";
import { CategoryCard } from "@/components/CategoryCard";

import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/services/category.service";

type Category = {
  id: string;
  name: string;
  createdAt?: string;
};

type Props = {
  initialCategories: Category[];
};

export function CategoriesContent({ initialCategories }: Props) {
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(false);

  async function handleCreate(name: string) {
    try {
      setLoading(true);

      const newCategory = await createCategory({ name });

      setCategories((prev) => [newCategory, ...prev]);

      toast.success("Categoria adicionada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar categoria.");
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(id: string, name: string) {
    try {
      setLoading(true);

      const updatedCategory = await updateCategory(id, { name });

      setCategories((prev) =>
        prev.map((category) =>
          category.id === id ? updatedCategory : category,
        ),
      );

      toast.success("Categoria atualizada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar categoria.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = confirm("Deseja realmente excluir esta categoria?");

    if (!confirmed) return;

    try {
      setLoading(true);

      await deleteCategory(id);

      setCategories((prev) => prev.filter((category) => category.id !== id));

      toast.success("Categoria excluída com sucesso!");
    } catch (error) {
      console.error(error);

      const message =
        error instanceof Error ? error.message : "Erro ao excluir categoria.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>

            <p className="text-gray-500">
              Gerencie as categorias usadas nas tarefas.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Voltar
          </Link>
        </div>

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            Nova Categoria
          </h2>

          <CategoryForm
            submitLabel="Adicionar"
            loading={loading}
            onSubmit={handleCreate}
          />
        </div>

        <div className="space-y-4">
          {categories.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <p className="font-semibold text-slate-700">
                Nenhuma categoria cadastrada.
              </p>
            </div>
          ) : (
            categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
