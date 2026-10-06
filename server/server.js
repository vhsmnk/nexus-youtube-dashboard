import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.get('/api/youtube/test', (req, res) => {
  res.json({
    success: true,
    message: 'Backend do Nexus funcionando!',
    youtubeKeyConfigured: Boolean(process.env.YOUTUBE_API_KEY),
  })
})

app.get('/api/youtube/channel', async (req, res) => {
  try {
    const { query } = req.query

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Informe o nome ou ID do canal.',
      })
    }

    // 1. Encontrar o canal
    const searchResponse = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          part: 'snippet',
          q: query,
          type: 'channel',
          maxResults: 1,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    )

    const channel = searchResponse.data.items?.[0]

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: 'Canal não encontrado.',
      })
    }

    const channelId = channel.id.channelId

    // 2. Buscar informações completas do canal
    const channelResponse = await axios.get(
      'https://www.googleapis.com/youtube/v3/channels',
      {
        params: {
          part: 'snippet,statistics,brandingSettings,contentDetails',
          id: channelId,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    )

    const channelData = channelResponse.data.items?.[0]

    if (!channelData) {
      return res.status(404).json({
        success: false,
        message: 'Dados do canal não encontrados.',
      })
    }

    // 3. Encontrar a playlist de uploads do canal
    const uploadsPlaylistId =
      channelData.contentDetails?.relatedPlaylists?.uploads

    let recentVideos = []

    if (uploadsPlaylistId) {
      // 4. Buscar vídeos recentes
      const playlistResponse = await axios.get(
        'https://www.googleapis.com/youtube/v3/playlistItems',
        {
          params: {
            part: 'snippet,contentDetails',
            playlistId: uploadsPlaylistId,
            maxResults: 10,
            key: process.env.YOUTUBE_API_KEY,
          },
        }
      )

      const videoIds = playlistResponse.data.items
        ?.map((item) => item.contentDetails?.videoId)
        .filter(Boolean)

      // 5. Buscar estatísticas dos vídeos
      if (videoIds?.length) {
        const videosResponse = await axios.get(
          'https://www.googleapis.com/youtube/v3/videos',
          {
            params: {
              part: 'snippet,statistics',
              id: videoIds.join(','),
              key: process.env.YOUTUBE_API_KEY,
            },
          }
        )

        recentVideos = videosResponse.data.items.map((video) => ({
          id: video.id,

          title: video.snippet.title,

          description: video.snippet.description,

          publishedAt: video.snippet.publishedAt,

          thumbnail:
            video.snippet.thumbnails?.high?.url ||
            video.snippet.thumbnails?.medium?.url ||
            video.snippet.thumbnails?.default?.url,

          statistics: {
            viewCount: video.statistics?.viewCount || '0',
            likeCount: video.statistics?.likeCount || '0',
            commentCount: video.statistics?.commentCount || '0',
          },
        }))
      }
    }

    // 6. Retornar tudo para o frontend
    res.json({
      success: true,

      data: {
        id: channelData.id,

        title: channelData.snippet.title,

        description: channelData.snippet.description,

        publishedAt: channelData.snippet.publishedAt,

        thumbnails: channelData.snippet.thumbnails,

        statistics: channelData.statistics,

        brandingSettings: channelData.brandingSettings,

        recentVideos,
      },
    })
  } catch (error) {
    console.error(
      'ERRO YOUTUBE:',
      error.response?.data || error.message
    )

    res.status(500).json({
      success: false,
      message: 'Erro ao consultar o YouTube.',
    })
  }
})

app.listen(PORT, () => {
  console.log(`Nexus API rodando em http://localhost:${PORT}`)
})