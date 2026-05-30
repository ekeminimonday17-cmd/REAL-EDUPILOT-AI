import { Link } from 'react-router-dom'
import { Bell, User, Menu } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'

export default function Navbar() {
  const { user } = useAuthStore()

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-900">
          <Menu size={24} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">Welcome back!</h2>
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative text-gray-600 hover:text-gray-900">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <Link
          to="/profile"
          className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {user?.full_name?.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-gray-700">{user?.full_name}</span>
        </Link>
      </div>
    </nav>
  )
}
