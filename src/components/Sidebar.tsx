import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import {
  LayoutDashboard,
  Users,
  Chalkboard,
  BookOpen,
  CheckSquare,
  BarChart3,
  FileText,
  CreditCard,
  Bell,
  Brain,
  Settings,
  LogOut,
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Students', path: '/students' },
  { icon: Users, label: 'Teachers', path: '/teachers' },
  { icon: Chalkboard, label: 'Classes', path: '/classes' },
  { icon: BookOpen, label: 'Subjects', path: '/subjects' },
  { icon: CheckSquare, label: 'Attendance', path: '/attendance' },
  { icon: BarChart3, label: 'Results', path: '/results' },
  { icon: FileText, label: 'Report Cards', path: '/report-cards' },
  { icon: CreditCard, label: 'Payments', path: '/payments' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Bell, label: 'Announcements', path: '/announcements' },
  { icon: Brain, label: 'AI Assistant', path: '/ai-assistant' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export default function Sidebar() {
  const location = useLocation()
  const { logout, user } = useAuthStore()

  const isActive = (path: string) => location.pathname === path

  return (
    <aside className="w-64 bg-secondary-900 text-white shadow-lg flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-secondary-800">
        <h1 className="text-2xl font-bold text-primary-400">EduPilot AI</h1>
        <p className="text-xs text-secondary-400 mt-1">School Management</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                active
                  ? 'bg-primary-600 text-white'
                  : 'text-secondary-300 hover:bg-secondary-800'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="border-t border-secondary-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-white truncate">{user?.full_name}</p>
            <p className="text-xs text-secondary-400 capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={() => logout()}
          className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
