import type { AuthUser } from './auth.types'

const USER_STORAGE_KEY = 'skyra-user'

export function saveUser(user: AuthUser) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export function getStoredUser(): AuthUser | null {
  const rawUser = localStorage.getItem(USER_STORAGE_KEY)
  if (!rawUser) return null

  try {
    const user: unknown = JSON.parse(rawUser)
    if (
      typeof user === 'object' &&
      user !== null &&
      'name' in user &&
      typeof user.name === 'string' &&
      user.name.trim()
    ) {
      return { name: user.name }
    }
  } catch {
    // Invalid persisted data is treated as an unauthenticated state.
  }

  return null
}
