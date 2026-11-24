import { Navigate, Outlet } from 'react-router-dom'

import { getStoredUser } from '../../features/auth'

export function ProtectedRoute() {
  return getStoredUser() ? <Outlet /> : <Navigate replace to="/login" />
}
