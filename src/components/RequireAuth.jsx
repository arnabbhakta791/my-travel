import { Navigate, Outlet } from 'react-router-dom'
import { getCurrentToken } from '../api/auth'

const RequireAuth = () => {
  const token = getCurrentToken()

  if (!token) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}

export default RequireAuth


