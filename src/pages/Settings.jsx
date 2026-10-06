import { useState } from 'react'

function Settings({ defaultChannel }) {
  const [theme, setTheme] = useState('Dark')
  const [refresh, setRefresh] = useState('Manual')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2500)
  }

  return (
    <main className="flex-1 p-6">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-violet-500 shadow-lg shadow-violet-500/60" />

          <span className="text-sm font-medium text-violet-400">
            Configuration
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
          Settings
        </h1>

        <p className="mt-1 text-zinc-500">
          Configure as preferências do Nexus
        </p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Appearance */}
        <section className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6 shadow-lg shadow-violet-950/10">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-zinc-100">
              Appearance
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Personalize a aparência do dashboard.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-zinc-200">
                Theme
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Tema atual da aplicação
              </p>
            </div>

            <select
              value={theme}
              onChange={(event) =>
                setTheme(event.target.value)
              }
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-300 focus:border-violet-500"
            >
              <option>Dark</option>
              <option>Light</option>
              <option>System</option>
            </select>
          </div>
        </section>

        {/* Channel */}
        <section className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6 shadow-lg shadow-violet-950/10">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-zinc-100">
              YouTube
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Configure o canal utilizado pelo dashboard.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-zinc-200">
                Default channel
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Canal carregado inicialmente
              </p>
            </div>

            <div className="rounded-xl border border-violet-500/10 bg-violet-500/5 px-4 py-2.5">
              <span className="text-sm font-medium text-violet-400">
                {defaultChannel || 'MrBeast'}
              </span>
            </div>
          </div>
        </section>

        {/* API */}
        <section className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6 shadow-lg shadow-violet-950/10">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-zinc-100">
              API
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Status das integrações utilizadas pelo Nexus.
            </p>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />

              <div>
                <p className="font-medium text-zinc-200">
                  YouTube Data API v3
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Conexão com a API do YouTube
                </p>
              </div>
            </div>

            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              Connected
            </span>
          </div>
        </section>

        {/* Data refresh */}
        <section className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6 shadow-lg shadow-violet-950/10">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-zinc-100">
              Data Refresh
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Defina como os dados devem ser atualizados.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-zinc-200">
                Refresh mode
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Método de atualização dos dados
              </p>
            </div>

            <select
              value={refresh}
              onChange={(event) =>
                setRefresh(event.target.value)
              }
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-300 focus:border-violet-500"
            >
              <option>Manual</option>
              <option>Every 5 minutes</option>
              <option>Every 15 minutes</option>
              <option>Every 30 minutes</option>
            </select>
          </div>
        </section>

        {/* Save */}
        <div className="flex items-center justify-between rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-4">
          <div>
            {saved && (
              <p className="text-sm font-medium text-emerald-400">
                Configurações salvas com sucesso.
              </p>
            )}
          </div>

          <button
            onClick={handleSave}
            className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500"
          >
            Save changes
          </button>
        </div>
      </div>
    </main>
  )
}

export default Settings