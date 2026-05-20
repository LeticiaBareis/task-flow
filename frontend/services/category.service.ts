const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCategories() {
  const response = await fetch(`${API_URL}/categories`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar categorias");
  }

  return response.json();
}

export async function createCategory(data: { name: string }) {
  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar categoria");
  }

  return response.json();
}

export async function updateCategory(id: string, data: { name: string }) {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar categoria");
  }

  return response.json();
}

export async function deleteCategory(id: string) {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao excluir categoria");
  }

  return response.json();
}