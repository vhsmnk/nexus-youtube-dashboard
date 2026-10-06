import { useEffect, useState } from 'react'
import axios from 'axios'

import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import YoutubeViewsChart from './components/YoutubeViewsChart'

function App() {
  const [youtubeData, setYoutubeData] = useState(null)
  const [loadingYoutube, setLoadingYoutube] = useState(true)
  const [youtubeError, setYoutubeError] = useState(null)

  const [searchQuery, setSearchQuery] = useState('MrBeast')

  // ================================
  // BUSCAR CANAL
  // ================================

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

  // ================================
  // CARREGAR CANAL INICIAL
  // ================================

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

  // ================================
  // PESQUISA
  // ================================

  const handleSearch = () => {
    fetchYoutubeData(searchQuery)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  // ================================
  // FORMATAR NÚMEROS
  // ================================

  const formatNumber = (value) => {
    if (!value) return '0'

    return new Intl.NumberFormat('pt-BR', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(Number(value))
  }

  // ================================
  // INTERFACE
  // ================================

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* ÁREA PRINCIPAL */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* NAVBAR */}
        <Navbar />

        <main className="flex-1 p-6">

          {/* CABEÇALHO */}
          <div className="mb-8">

            <h1 className="text-3xl font-bold text-gray-900">
              YouTube Dashboard
            </h1>

            <p className="mt-1 text-gray-500">
              Analise dados públicos de qualquer canal do YouTube
            </p>

            {/* BARRA DE PESQUISA */}
            <div className="mt-6 flex gap-3">

              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Digite o nome do canal..."
                className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />

              <button
                onClick={handleSearch}
                disabled={
                  loadingYoutube ||
                  !searchQuery.trim()
                }
                className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loadingYoutube
                  ? 'Buscando...'
                  : 'Buscar'}
              </button>

            </div>
          </div>

          {/* LOADING */}
          {loadingYoutube && (
            <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">

              <p className="text-gray-500">
                Buscando dados do canal...
              </p>

            </div>
          )}

          {/* ERRO */}
          {youtubeError && !loadingYoutube && (
            <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-6">

              <p className="font-medium text-red-600">
                {youtubeError}
              </p>

            </div>
          )}

          {/* DASHBOARD */}
          {youtubeData && !loadingYoutube && (
            <>

              {/* INFORMAÇÕES DO CANAL */}
              <div className="mb-8 rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-4">

                  {youtubeData.thumbnails?.default?.url && (
                    <img
                      src={
                        youtubeData.thumbnails.default.url
                      }
                      alt={youtubeData.title}
                      className="h-16 w-16 rounded-full object-cover ring-4 ring-violet-50"
                    />
                  )}

                  <div>

                    <h2 className="text-2xl font-bold text-gray-900">
                      {youtubeData.title}
                    </h2>

                    <p className="text-sm text-violet-600">
                      Canal do YouTube
                    </p>

                  </div>

                </div>

              </div>

              {/* CARDS */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                {/* INSCRITOS */}
                <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">

                  <p className="text-sm font-medium text-gray-500">
                    Inscritos
                  </p>

                  <p className="mt-2 text-3xl font-bold text-violet-600">
                    {formatNumber(
                      youtubeData.statistics
                        ?.subscriberCount
                    )}
                  </p>

                </div>

                {/* VISUALIZAÇÕES */}
                <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">

                  <p className="text-sm font-medium text-gray-500">
                    Visualizações
                  </p>

                  <p className="mt-2 text-3xl font-bold text-violet-600">
                    {formatNumber(
                      youtubeData.statistics
                        ?.viewCount
                    )}
                  </p>

                </div>

                {/* VÍDEOS */}
                <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">

                  <p className="text-sm font-medium text-gray-500">
                    Vídeos
                  </p>

                  <p className="mt-2 text-3xl font-bold text-violet-600">
                    {formatNumber(
                      youtubeData.statistics
                        ?.videoCount
                    )}
                  </p>

                </div>

              </div>

              {/* GRÁFICO */}
              <div className="mt-8">

                <YoutubeViewsChart
                  videos={youtubeData.recentVideos}
                />

              </div>

              {/* VÍDEOS RECENTES */}
              <div className="mt-8 rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">

                <div className="mb-6">

                  <h2 className="text-xl font-bold text-gray-900">
                    Vídeos recentes
                  </h2>

                  <p className="text-sm text-gray-500">
                    Últimos vídeos publicados no canal
                  </p>

                </div>

                {youtubeData.recentVideos?.length > 0 ? (

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    {youtubeData.recentVideos.map(
                      (video) => (

                        <div
                          key={video.id}
                          className="overflow-hidden rounded-2xl border border-violet-100 bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100"
                        >

                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="aspect-video w-full object-cover"
                          />

                          <div className="p-4">

                            <h3 className="line-clamp-2 font-semibold text-gray-900">
                              {video.title}
                            </h3>

                            <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-gray-500">

                              <div>
                                <p className="text-xs">
                                  Views
                                </p>

                                <p className="font-medium text-violet-600">
                                  {formatNumber(
                                    video.statistics
                                      ?.viewCount
                                  )}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs">
                                  Likes
                                </p>

                                <p className="font-medium text-violet-600">
                                  {formatNumber(
                                    video.statistics
                                      ?.likeCount
                                  )}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs">
                                  Comentários
                                </p>

                                <p className="font-medium text-violet-600">
                                  {formatNumber(
                                    video.statistics
                                      ?.commentCount
                                  )}
                                </p>
                              </div>

                            </div>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                ) : (

                  <p className="text-gray-500">
                    Nenhum vídeo encontrado.
                  </p>

                )}

              </div>

            </>
          )}

        </main>

      </div>

    </div>
  )
}

export default App