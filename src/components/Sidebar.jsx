function Sidebar({ activePage, onNavigate }) {
  const menuItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      id: 'growth',
      label: 'Growth',
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 17 9 11 13 15 21 7" />
          <polyline points="14 7 21 7 21 14" />
        </svg>
      ),
    },
    {
      id: 'channel',
      label: 'Channel',
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="10" r="3" />
          <path d="M6.5 19c1.5-2.3 3.3-3.5 5.5-3.5s4 .9 5.5 3.5" />
        </svg>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.6v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.5-1H6.3v-2.6h.2A1.7 1.7 0 0 0 8 10a1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2h2.6v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.5 1h.2v2.6h-.2a1.7 1.7 0 0 0-1.5 1.4Z" />
        </svg>
      ),
    },
  ]

  return (
    <aside className="hidden w-64 shrink-0 border-r border-zinc-800/80 bg-zinc-950 lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-zinc-800/80 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/30">
            <span className="text-lg font-black text-white">
              N
            </span>
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-zinc-100">
              Nexus
            </h1>

            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-violet-400">
              Analytics
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
          Dashboard
        </p>

        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = activePage === item.id

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                  isActive
                    ? 'border border-violet-500/20 bg-violet-600/10 text-violet-300'
                    : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200'
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                    isActive
                      ? 'bg-violet-600/20 text-violet-400'
                      : 'bg-zinc-900 text-zinc-500 group-hover:text-violet-400'
                  }`}
                >
                  {item.icon}
                </div>

                <span>{item.label}</span>

                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400 shadow-lg shadow-violet-400/70" />
                )}
              </button>
            )
          })}
        </div>
      </nav>

      {/* API Status */}
      <div className="border-t border-zinc-800/80 p-4">
        <div className="rounded-xl border border-violet-500/10 bg-violet-500/5 p-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />

            <span className="text-xs font-medium text-zinc-400">
              API conectada
            </span>
          </div>

          <p className="mt-2 text-[11px] text-zinc-600">
            YouTube Data API v3
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar