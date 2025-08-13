// private routes
const privateRoutes = ['/dashboard']
// auth routes
const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password'
]

const isAuthRoute = (pathname: string): boolean => {
  return authRoutes.includes(pathname)
}

const isPrivateRoute = (pathname: string): boolean => {
  return privateRoutes.includes(pathname)
}

export { isAuthRoute, isPrivateRoute }
