import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

function YoutubeViewsChart({ videos = [] }) {
  const chartData = videos.map((video) => ({
    name:
      video.title.length > 18
        ? `${video.title.slice(0, 18)}...`
        : video.title,
    views: Number(video.statistics?.viewCount || 0),
  }))

  return (
    <div className="rounded-2xl border border-violet-500/10 bg-zinc-900/80 p-6 shadow-lg shadow-violet-950/10">

      <div className="mb-6">

        <div className="flex items-center gap-3">

          <div className="h-8 w-1 rounded-full bg-violet-600" />

          <div>

            <h2 className="text-xl font-bold text-zinc-100">
              Visualizações dos vídeos
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Desempenho dos vídeos mais recentes
            </p>

          </div>

        </div>

      </div>

      {chartData.length > 0 ? (

        <div className="h-80 w-full">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 60,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#27272a"
              />

              <XAxis
                dataKey="name"
                angle={-35}
                textAnchor="end"
                interval={0}
                tick={{
                  fontSize: 12,
                  fill: '#71717a',
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 12,
                  fill: '#71717a',
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) =>
                  new Intl.NumberFormat('pt-BR', {
                    notation: 'compact',
                    maximumFractionDigits: 1,
                  }).format(value)
                }
              />

              <Tooltip
                cursor={{
                  fill: '#7c3aed',
                  opacity: 0.06,
                }}
                formatter={(value) => [
                  new Intl.NumberFormat('pt-BR').format(value),
                  'Visualizações',
                ]}
                contentStyle={{
                  backgroundColor: '#18181b',
                  borderRadius: '12px',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  color: '#f4f4f5',
                  boxShadow:
                    '0 15px 40px rgba(0, 0, 0, 0.35)',
                }}
              />

              <Bar
                dataKey="views"
                name="Visualizações"
                fill="#7c3aed"
                radius={[8, 8, 0, 0]}
                maxBarSize={55}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      ) : (

        <div className="flex h-80 items-center justify-center">

          <p className="text-zinc-500">
            Nenhum dado disponível para o gráfico.
          </p>

        </div>

      )}

    </div>
  )
}

export default YoutubeViewsChart