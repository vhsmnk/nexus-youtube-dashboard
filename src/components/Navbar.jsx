function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          aria-label="Notificações"
        >
          🔔
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">
              Admin
            </p>
            <p className="text-xs text-gray-500">
              Administrador
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar