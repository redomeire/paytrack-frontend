export default defineEventHandler(async (event) => {
  const pathname = getRequestURL(event).pathname;
  // retrieve session
  const session = await getUserSession(event);
  // private routes
  const privateRoutes = ["/dashboard"];
  // auth routes
  const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
  ];
  const isPrivateRoute = privateRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  if (!session.user) {
    if (isPrivateRoute) {
      return sendRedirect(event, "/auth/login");
    }
    return;
  }
  if (isAuthRoute) return sendRedirect(event, "/dashboard");
});
