function Growth({ youtubeData }) {
  const videos = youtubeData?.recentVideos || []

  const formatNumber = (value) => {
    if (!value) return '0'

    return new Intl.NumberFormat('pt-BR', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(Number(value))
  }

  const getAverageViews = () => {
    if (!videos.length) return 0

    const totalViews = videos.reduce(
      (total, video) =>
        total + Number(video.statistics?.viewCount || 0),
      0
    )

    return totalViews / videos.length
  }

  const getEngagement = () => {
    if (!videos.length) return 0

    const totalViews = videos.reduce(
      (total, video) =>
        total + Number(video.statistics?.viewCount || 0),
      0
    )

    const totalLikes = videos.reduce(
      (total, video) =>
        total + Number(video.statistics?.likeCount || 0),
      0
    )

    const totalComments = videos.reduce(
      (total, video) =>
        total + Number(video.statistics?.commentCount || 0),
      0
    )

    if (!totalViews) return 0

    return ((totalLikes + totalComments) / totalViews) * 100
  }

  const topVideo = [...videos].sort(
    (a, b) =>
      Number(b.statistics?.viewCount || 0) -
      Number(a.statistics?.viewCount || 0)
  )[0]

  const bestEngagementVideo = [...videos]
    .map((video) => {
      const views = Number(video.statistics?.viewCount || 0)
      const likes = Number(video.statistics?.likeCount || 0)
      const comments = Number(video.statistics?.commentCount || 0)

      return {
        ...video,
        engagement: views
          ? ((likes + comments) / views) * 100
          : 0,
      }
    })
    .sort((a, b) => b.engagement - a.engagement)[0]

  const mostCommentedVideo = [...videos].sort(
    (a, b) =>
      Number(b.statistics?.commentCount || 0) -
      Number(a.statistics?.commentCount || 0)
  )[0]

  const averageViews = getAverageViews()
  const engagement = getEngagement()

  return (
    <main className="flex-1 p-6">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-violet-500 shadow-lg shadow-violet-500/60" />

          <span className="text-sm font-medium text-violet-400">
            Performance
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
          Growth
        </h1>

        <p className="mt-1 text-zinc-500">
          Entenda o crescimento e o desempenho do canal
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
          {/* Métricas principais */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6 shadow-lg shadow-violet-950/10">
              <p className="text-sm font-medium text-zinc-500">
                Subscribers
              </p>

              <p className="mt-2 text-3xl font-bold text-violet-400">
                {formatNumber(
                  youtubeData.statistics?.subscriberCount
                )}
              </p>

              <p className="mt-2 text-xs text-zinc-600">
                Inscritos no canal
              </p>
            </div>

            <div className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6 shadow-lg shadow-violet-950/10">
              <p className="text-sm font-medium text-zinc-500">
                Total Views
              </p>

              <p className="mt-2 text-3xl font-bold text-violet-400">
                {formatNumber(
                  youtubeData.statistics?.viewCount
                )}
              </p>

              <p className="mt-2 text-xs text-zinc-600">
                Visualizações totais
              </p>
            </div>

            <div className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6 shadow-lg shadow-violet-950/10">
              <p className="text-sm font-medium text-zinc-500">
                Average Views
              </p>

              <p className="mt-2 text-3xl font-bold text-violet-400">
                {formatNumber(averageViews)}
              </p>

              <p className="mt-2 text-xs text-zinc-600">
                Média dos vídeos recentes
              </p>
            </div>

            <div className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6 shadow-lg shadow-violet-950/10">
              <p className="text-sm font-medium text-zinc-500">
                Engagement
              </p>

              <p className="mt-2 text-3xl font-bold text-violet-400">
                {engagement.toFixed(2)}%
              </p>

              <p className="mt-2 text-xs text-zinc-600">
                Likes + comentários / views
              </p>
            </div>
          </div>

          {/* Indicadores */}
          <div className="mt-8">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-zinc-100">
                Performance Highlights
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Os principais destaques dos vídeos recentes
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {/* Top performing */}
              <div className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-5 transition hover:border-violet-500/30">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-2xl">🔥</span>

                  <span className="rounded-full bg-violet-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-400">
                    Top
                  </span>
                </div>

                <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Top performing video
                </p>

                <h3 className="mt-2 line-clamp-2 font-semibold text-zinc-200">
                  {topVideo?.title || 'Sem dados'}
                </h3>

                {topVideo && (
                  <p className="mt-3 text-sm text-violet-400">
                    {formatNumber(
                      topVideo.statistics?.viewCount
                    )}{' '}
                    views
                  </p>
                )}
              </div>

              {/* Best engagement */}
              <div className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-5 transition hover:border-violet-500/30">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-2xl">📈</span>

                  <span className="rounded-full bg-violet-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-400">
                    Best
                  </span>
                </div>

                <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Best engagement
                </p>

                <h3 className="mt-2 line-clamp-2 font-semibold text-zinc-200">
                  {bestEngagementVideo?.title || 'Sem dados'}
                </h3>

                {bestEngagementVideo && (
                  <p className="mt-3 text-sm text-violet-400">
                    {bestEngagementVideo.engagement.toFixed(2)}%
                    {' '}engagement
                  </p>
                )}
              </div>

              {/* Most viewed */}
              <div className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-5 transition hover:border-violet-500/30">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-2xl">👀</span>

                  <span className="rounded-full bg-violet-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-400">
                    Views
                  </span>
                </div>

                <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Most viewed
                </p>

                <h3 className="mt-2 line-clamp-2 font-semibold text-zinc-200">
                  {topVideo?.title || 'Sem dados'}
                </h3>

                {topVideo && (
                  <p className="mt-3 text-sm text-violet-400">
                    {formatNumber(
                      topVideo.statistics?.viewCount
                    )}{' '}
                    visualizações
                  </p>
                )}
              </div>

              {/* Most commented */}
              <div className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-5 transition hover:border-violet-500/30">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-2xl">💬</span>

                  <span className="rounded-full bg-violet-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-400">
                    Comments
                  </span>
                </div>

                <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Most commented
                </p>

                <h3 className="mt-2 line-clamp-2 font-semibold text-zinc-200">
                  {mostCommentedVideo?.title || 'Sem dados'}
                </h3>

                {mostCommentedVideo && (
                  <p className="mt-3 text-sm text-violet-400">
                    {formatNumber(
                      mostCommentedVideo.statistics?.commentCount
                    )}{' '}
                    comentários
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Ranking */}
          <div className="mt-8 rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6 shadow-lg shadow-violet-950/10">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-zinc-100">
                Video Ranking
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Ranking dos vídeos recentes por visualizações
              </p>
            </div>

            <div className="space-y-3">
              {[...videos]
                .sort(
                  (a, b) =>
                    Number(b.statistics?.viewCount || 0) -
                    Number(a.statistics?.viewCount || 0)
                )
                .map((video, index) => (
                  <div
                    key={video.id}
                    className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-3 transition hover:border-violet-500/20"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-sm font-bold text-violet-400">
                      #{index + 1}
                    </div>

                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="h-14 w-24 shrink-0 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-zinc-200">
                        {video.title}
                      </p>

                      <p className="mt-1 text-xs text-zinc-600">
                        {formatNumber(
                          video.statistics?.likeCount
                        )}{' '}
                        likes ·{' '}
                        {formatNumber(
                          video.statistics?.commentCount
                        )}{' '}
                        comentários
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-violet-400">
                        {formatNumber(
                          video.statistics?.viewCount
                        )}
                      </p>

                      <p className="text-xs text-zinc-600">
                        views
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </main>
  )
}

export default Growth