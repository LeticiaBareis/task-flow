export function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-[#0D0628] p-5 text-white">
      <div className="mb-10 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-700">
          ✓
        </div>
        <h1 className="text-xl font-bold">TaskFlow</h1>
      </div>

      <nav className="space-y-3">
        <a href="/" className="block rounded-xl px-4 py-3 font-semibold text-gray-300 hover:bg-white/10">
          Tarefas
        </a>

        <a href="/categories" className="block rounded-xl px-4 py-3 font-semibold text-gray-300 hover:bg-white/10">
          Categorias
        </a>
      </nav>

      <div className="mt-auto pt-96 text-sm text-gray-300">
        <p className="font-semibold text-white">Letícia Reis</p>
        <p>leticia@email.com</p>
      </div>
    </aside>
  );
}