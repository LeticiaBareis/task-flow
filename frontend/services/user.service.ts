const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar usuários");
  }

  return response.json();
}