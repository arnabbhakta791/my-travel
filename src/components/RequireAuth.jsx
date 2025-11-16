import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCurrentToken } from '../api/auth'

const RequireAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    const token = getCurrentToken()
    setIsAuthenticated(!!token)
  }, [])

  // Show nothing while checking
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  // Render protected route
  return <Outlet />
}

export default RequireAuth


