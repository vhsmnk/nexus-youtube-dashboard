function Channel({ youtubeData }) {
  const formatNumber = (value) => {
    if (!value) return '0'

    return new Intl.NumberFormat('pt-BR', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(Number(value))
  }

  const formatDate = (date) => {
    if (!date) return 'Não disponível'

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date))
  }

  return (
    <main className="flex-1 p-6">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-violet-500 shadow-lg shadow-violet-500/60" />

          <span className="text-sm font-medium text-violet-400">
            Channel
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
          Channel Profile
        </h1>

        <p className="mt-1 text-zinc-500">
          Informações completas sobre o canal analisado
        </p>
      </div>

      {!youtubeData ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 text-center">
          <p className="text-zinc-500">
            Nenhum canal carregado.
          </p>
        </div>
      ) : (
        <>
          {/* Header do canal */}
          <div className="overflow-hidden rounded-2xl border border-violet-500/10 bg-zinc-900/80 shadow-lg shadow-violet-950/10">
            <div className="h-32 bg-linear-to-r from-violet-950 via-violet-900/40 to-zinc-950" />

            <div className="px-6 pb-6">
              <div className="-mt-12 flex flex-col gap-5 md:flex-row md:items-end">
                {youtubeData.thumbnails?.high?.url ||
                youtubeData.thumbnails?.medium?.url ||
                youtubeData.thumbnails?.default?.url ? (
                  <div className="rounded-2xl border-4 border-zinc-900 bg-zinc-900">
                    <img
                      src={
                        youtubeData.thumbnails?.high?.url ||
                        youtubeData.thumbnails?.medium?.url ||
                        youtubeData.thumbnails?.default?.url
                      }
                      alt={youtubeData.title}
                      className="h-24 w-24 rounded-xl object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-xl border-4 border-zinc-900 bg-violet-600 text-3xl font-bold text-white">
                    {youtubeData.title?.charAt(0)}
                  </div>
                )}

                <div className="flex-1 pb-1">
                  <h2 className="text-2xl font-bold text-zinc-100">
                    {youtubeData.title}
                  </h2>

                  <p className="mt-1 text-sm text-violet-400">
                    YouTube Channel
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6">
              <p className="text-sm text-zinc-500">
                Subscribers
              </p>

              <p className="mt-2 text-3xl font-bold text-violet-400">
                {formatNumber(
                  youtubeData.statistics?.subscriberCount
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6">
              <p className="text-sm text-zinc-500">
                Total Views
              </p>

              <p className="mt-2 text-3xl font-bold text-violet-400">
                {formatNumber(
                  youtubeData.statistics?.viewCount
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6">
              <p className="text-sm text-zinc-500">
                Videos
              </p>

              <p className="mt-2 text-3xl font-bold text-violet-400">
                {formatNumber(
                  youtubeData.statistics?.videoCount
                )}
              </p>
            </div>
          </div>

          {/* Sobre */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6">
              <h2 className="text-xl font-bold text-zinc-100">
                About
              </h2>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-zinc-500">
                {youtubeData.description ||
                  'Este canal não possui uma descrição pública.'}
              </p>
            </div>

            {/* Informações */}
            <div className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6">
              <h2 className="text-xl font-bold text-zinc-100">
                Channel Info
              </h2>

              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-600">
                    Channel ID
                  </p>

                  <p className="mt-1 break-all text-sm text-zinc-300">
                    {youtubeData.id}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-600">
                    Created
                  </p>

                  <p className="mt-1 text-sm text-zinc-300">
                    {formatDate(youtubeData.publishedAt)}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-600">
                    Platform
                  </p>

                  <p className="mt-1 text-sm text-zinc-300">
                    YouTube
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-600">
                    Data Source
                  </p>

                  <p className="mt-1 text-sm text-violet-400">
                    YouTube Data API v3
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  )
}

export default Channel