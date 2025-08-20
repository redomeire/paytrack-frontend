import { isAuthRoute, isPrivateRoute } from '~~/shared/constants/route'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const pathname = getRequestURL(event).pathname

  if (!session.user) {
    if (isPrivateRoute(pathname)) {
      return sendRedirect(event, '/auth/login')
    }
    return
  }
  if (isAuthRoute(pathname)) return sendRedirect(event, '/dashboard')
})
