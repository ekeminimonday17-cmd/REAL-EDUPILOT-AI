interface CardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  trend?: number
  color?: 'blue' | 'green' | 'red' | 'purple'
}

const colors = {
  blue: 'bg-blue-50 border-blue-200',
  green: 'bg-green-50 border-green-200',
  red: 'bg-red-50 border-red-200',
  purple: 'bg-purple-50 border-purple-200',
}

const iconColors = {
  blue: 'text-blue-600',
  green: 'text-green-600',
  red: 'text-red-600',
  purple: 'text-purple-600',
}

export default function Card({ title, value, icon, trend, color = 'blue' }: CardProps) {
  return (
    <div className={`${colors[color]} border rounded-lg p-6 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        {icon && <div className={`text-3xl ${iconColors[color]}`}>{icon}</div>}
      </div>
    </div>
  )
}
