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
    <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Visualizações dos vídeos
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Desempenho dos vídeos mais recentes
        </p>
      </div>

      {chartData.length > 0 ? (
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
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
                stroke="#ede9fe"
              />

              <XAxis
                dataKey="name"
                angle={-35}
                textAnchor="end"
                interval={0}
                tick={{
                  fontSize: 12,
                  fill: '#6b7280',
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 12,
                  fill: '#6b7280',
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
                  fill: '#f5f3ff',
                }}
                formatter={(value) => [
                  new Intl.NumberFormat('pt-BR').format(value),
                  'Visualizações',
                ]}
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #ede9fe',
                  boxShadow:
                    '0 10px 30px rgba(76, 29, 149, 0.10)',
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
          <p className="text-gray-500">
            Nenhum dado disponível para o gráfico.
          </p>
        </div>
      )}

    </div>
  )
}

export default YoutubeViewsChart