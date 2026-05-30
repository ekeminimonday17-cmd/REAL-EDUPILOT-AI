import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Card from '../components/Card'
import { Users, BookOpen, Banknote, TrendingUp } from 'lucide-react'

const attendanceData = [
  { date: 'Mon', attendance: 95 },
  { date: 'Tue', attendance: 93 },
  { date: 'Wed', attendance: 97 },
  { date: 'Thu', attendance: 92 },
  { date: 'Fri', attendance: 96 },
]

const performanceData = [
  { subject: 'Math', score: 85 },
  { subject: 'English', score: 88 },
  { subject: 'Science', score: 92 },
  { subject: 'History', score: 78 },
  { subject: 'Computers', score: 94 },
]

export default function Dashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          title="Total Students"
          value="1,234"
          icon={<Users />}
          trend={5}
          color="blue"
        />
        <Card
          title="Total Teachers"
          value="156"
          icon={<BookOpen />}
          trend={2}
          color="green"
        />
        <Card
          title="Total Classes"
          value="45"
          icon={<TrendingUp />}
          trend={1}
          color="purple"
        />
        <Card
          title="Total Revenue"
          value="₦15.5M"
          icon={<Banknote />}
          trend={8}
          color="red"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="attendance" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance by Subject */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance by Subject</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
