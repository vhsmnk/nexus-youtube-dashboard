function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <span className="text-xl font-bold text-gray-900">
          Nexus
        </span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <a
          href="#"
          className="flex items-center rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900"
        >
          Dashboard
        </a>

        <a
          href="#"
          className="flex items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          Usuários
        </a>

        <a
          href="#"
          className="flex items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          Transações
        </a>

        <a
          href="#"
          className="flex items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          Relatórios
        </a>

        <a
          href="#"
          className="flex items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          Configurações
        </a>
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-sm font-semibold text-gray-900">
            Admin
          </p>
          <p className="text-xs text-gray-500">
            admin@nexus.com
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar