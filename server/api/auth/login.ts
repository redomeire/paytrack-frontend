export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  await setUserSession(event, {
    user: body.user,
    token: body.token,
    loggedInAt: new Date(),
  });
});
