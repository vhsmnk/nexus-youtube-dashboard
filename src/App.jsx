import { useEffect, useState } from 'react'
import axios from 'axios'

import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import YoutubeViewsChart from './components/YoutubeViewsChart'

import Growth from './pages/Growth'
import Channel from './pages/Channel'
import Settings from './pages/Settings'

function App() {
  const [activePage, setActivePage] = useState('overview')

  const [youtubeData, setYoutubeData] = useState(null)
  const [loadingYoutube, setLoadingYoutube] = useState(true)
  const [youtubeError, setYoutubeError] = useState(null)

  const [searchQuery, setSearchQuery] = useState('MrBeast')

  const fetchYoutubeData = async (query) => {
    if (!query.trim()) return

    try {
      setLoadingYoutube(true)
      setYoutubeError(null)

      const response = await axios.get(
        'http://localhost:3001/api/youtube/channel',
        {
          params: {
            query: query.trim(),
          },
        }
      )

      setYoutubeData(response.data.data)
    } catch (error) {
      console.error('ERRO AO BUSCAR YOUTUBE:', error)

      setYoutubeData(null)

      setYoutubeError(
        error.response?.data?.message ||
          'Não foi possível carregar os dados do YouTube.'
      )
    } finally {
      setLoadingYoutube(false)
    }
  }

  useEffect(() => {
    const loadInitialChannel = async () => {
      try {
        setLoadingYoutube(true)
        setYoutubeError(null)

        const response = await axios.get(
          'http://localhost:3001/api/youtube/channel',
          {
            params: {
              query: 'MrBeast',
            },
          }
        )

        setYoutubeData(response.data.data)
      } catch (error) {
        console.error(
          'ERRO AO CARREGAR CANAL INICIAL:',
          error
        )

        setYoutubeError(
          'Não foi possível carregar os dados do YouTube.'
        )
      } finally {
        setLoadingYoutube(false)
      }
    }

    loadInitialChannel()
  }, [])

  const handleSearch = () => {
    fetchYoutubeData(searchQuery)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const formatNumber = (value) => {
    if (!value) return '0'

    return new Intl.NumberFormat('pt-BR', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(Number(value))
  }

  const renderOverview = () => {
    return (
      <main className="flex-1 p-6">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-violet-500 shadow-lg shadow-violet-500/60" />

            <span className="text-sm font-medium text-violet-400">
              YouTube Analytics
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
            YouTube Dashboard
          </h1>

          <p className="mt-1 text-zinc-500">
            Analise dados públicos de qualquer canal do YouTube
          </p>

          <div className="mt-6 flex gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Digite o nome do canal..."
              className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
            />

            <button
              onClick={handleSearch}
              disabled={
                loadingYoutube ||
                !searchQuery.trim()
              }
              className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loadingYoutube ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </div>

        {loadingYoutube && (
          <div className="mb-8 rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6 shadow-lg shadow-violet-950/10">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-700 border-t-violet-500" />

              <p className="text-zinc-400">
                Buscando dados do canal...
              </p>
            </div>
          </div>
        )}

        {youtubeError && !loadingYoutube && (
          <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-950/20 p-6">
            <p className="font-medium text-red-400">
              {youtubeError}
            </p>
          </div>
        )}

        {youtubeData && !loadingYoutube && (
          <>
            <div className="mb-8 overflow-hidden rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6 shadow-lg shadow-violet-950/10">
              <div className="flex items-center gap-4">
                {youtubeData.thumbnails?.default?.url && (
                  <div className="rounded-full bg-violet-500/20 p-1">
                    <img
                      src={youtubeData.thumbnails.default.url}
                      alt={youtubeData.title}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-bold text-zinc-100">
                    {youtubeData.title}
                  </h2>

                  <div className="mt-1 flex items-center gap-3">
                    <p className="text-sm text-violet-400">
                      Canal do YouTube
                    </p>

                    <span className="text-zinc-700">•</span>

                    <a
                      href={`https://www.youtube.com/channel/${youtubeData.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-zinc-500 transition hover:text-violet-400"
                    >
                      Visitar canal ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6 shadow-lg shadow-violet-950/10 transition hover:border-violet-500/30">
                <p className="text-sm font-medium text-zinc-500">
                  Inscritos
                </p>

                <p className="mt-2 text-3xl font-bold text-violet-400">
                  {formatNumber(
                    youtubeData.statistics?.subscriberCount
                  )}
                </p>

                <div className="mt-4 h-1 w-12 rounded-full bg-violet-600" />
              </div>

              <div className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6 shadow-lg shadow-violet-950/10 transition hover:border-violet-500/30">
                <p className="text-sm font-medium text-zinc-500">
                  Visualizações
                </p>

                <p className="mt-2 text-3xl font-bold text-violet-400">
                  {formatNumber(
                    youtubeData.statistics?.viewCount
                  )}
                </p>

                <div className="mt-4 h-1 w-12 rounded-full bg-violet-600" />
              </div>

              <div className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6 shadow-lg shadow-violet-950/10 transition hover:border-violet-500/30">
                <p className="text-sm font-medium text-zinc-500">
                  Vídeos
                </p>

                <p className="mt-2 text-3xl font-bold text-violet-400">
                  {formatNumber(
                    youtubeData.statistics?.videoCount
                  )}
                </p>

                <div className="mt-4 h-1 w-12 rounded-full bg-violet-600" />
              </div>
            </div>

            <div className="mt-8">
              <YoutubeViewsChart
                videos={youtubeData.recentVideos}
              />
            </div>

            <div className="mt-8 rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6 shadow-lg shadow-violet-950/10">
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-violet-600" />

                  <div>
                    <h2 className="text-xl font-bold text-zinc-100">
                      Vídeos recentes
                    </h2>

                    <p className="text-sm text-zinc-500">
                      Últimos vídeos publicados no canal
                    </p>
                  </div>
                </div>
              </div>

              {youtubeData.recentVideos?.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {youtubeData.recentVideos.map((video) => (
                    <div
                      key={video.id}
                      className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-950/20"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="aspect-video w-full object-cover"
                      />

                      <div className="p-4">
                        <h3 className="line-clamp-2 font-semibold text-zinc-100">
                          {video.title}
                        </h3>

                        <div className="mt-4 grid grid-cols-3 gap-2">
                          <div>
                            <p className="text-xs text-zinc-600">
                              Views
                            </p>

                            <p className="font-medium text-violet-400">
                              {formatNumber(
                                video.statistics?.viewCount
                              )}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-zinc-600">
                              Likes
                            </p>

                            <p className="font-medium text-violet-400">
                              {formatNumber(
                                video.statistics?.likeCount
                              )}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-zinc-600">
                              Comentários
                            </p>

                            <p className="font-medium text-violet-400">
                              {formatNumber(
                                video.statistics?.commentCount
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500">
                  Nenhum vídeo encontrado.
                </p>
              )}
            </div>
          </>
        )}
      </main>
    )
  }

  const renderPage = () => {
    if (activePage === 'growth') {
      return <Growth youtubeData={youtubeData} />
    }

    if (activePage === 'channel') {
      return <Channel youtubeData={youtubeData} />
    }

    if (activePage === 'settings') {
      return (
        <Settings
          defaultChannel={searchQuery}
        />
      )
    }

    return renderOverview()
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />

        {renderPage()}
      </div>
    </div>
  )
}

export default App