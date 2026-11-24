import { Navigate, Route, Routes } from 'react-router-dom'

import { LoginPage } from '../../features/auth/pages/LoginPage/LoginPage'
import { DashboardPlaceholder } from '../../features/weather/pages/DashboardPlaceholder/DashboardPlaceholder'
import { ProtectedRoute } from './ProtectedRoute'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPlaceholder />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  )
}
