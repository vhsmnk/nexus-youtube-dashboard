function StatCard({ title, value, change, description }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">
          {title}
        </p>

        <span className="text-xs font-medium text-green-600">
          {change}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-2xl font-bold text-gray-900">
          {value}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          {description}
        </p>
      </div>
    </div>
  )
}

export default StatCard