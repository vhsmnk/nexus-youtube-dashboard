function Navbar() {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-zinc-800/80 bg-zinc-950/90 px-6 backdrop-blur-xl">

      {/* ESQUERDA */}
      <div className="flex items-center gap-3">

        <div className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/30">
          <span className="font-black text-white">
            N
          </span>
        </div>

        <div>

          <p className="text-sm font-medium text-zinc-300">
            Dashboard
          </p>

          <p className="text-xs text-zinc-600">
            YouTube Analytics
          </p>

        </div>

      </div>

      {/* DIREITA */}
      <div className="flex items-center gap-4">

        {/* STATUS */}
        <div className="hidden items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 sm:flex">

          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />

          <span className="text-xs font-medium text-zinc-500">
            Sistema online
          </span>

        </div>

        {/* SEPARADOR */}
        <div className="hidden h-6 w-px bg-zinc-800 sm:block" />

        {/* PERFIL */}
        <div className="flex items-center gap-3">

          <div className="hidden text-right sm:block">

            <p className="text-sm font-medium text-zinc-200">
              Nexus User
            </p>

            <p className="text-xs text-zinc-600">
              Administrator
            </p>

          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-600/10">

            <span className="text-sm font-bold text-violet-400">
              V
            </span>

          </div>

        </div>

      </div>

    </header>
  )
}

export default Navbar