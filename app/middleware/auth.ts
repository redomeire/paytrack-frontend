import { isAuthRoute, isPrivateRoute } from '~~/shared/constants/route'

export default defineNuxtRouteMiddleware(async (to, _) => {
  const session = useUserSession()
  const pathname = to.fullPath

  if (!session.user.value) {
    if (isPrivateRoute(pathname)) {
      return navigateTo('/auth/login')
    }
    return
  }
  if (isAuthRoute(pathname)) return navigateTo('/dashboard')
})
