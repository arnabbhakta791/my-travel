import { apiClient } from './client'

export const login = async (username, password) => {
  const response = await apiClient.post('/auth/login', { username, password })
  const { token, user } = response.data
  localStorage.setItem('admin_token', token)
  localStorage.setItem('admin_user', JSON.stringify(user))
  return { token, user }
}

export const logout = () => {
  localStorage.removeItem('admin_token')
  localStorage.removeItem('admin_user')
}

export const getCurrentToken = () => {
  return localStorage.getItem('admin_token')
}

export const getCurrentUser = () => {
  const raw = localStorage.getItem('admin_user')
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}


