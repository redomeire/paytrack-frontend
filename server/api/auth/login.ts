// import type { ISession } from "~~/shared/types/session";

// interface ILoginResponse {
//   success: boolean;
//   message: string;
//   data: ISession | null;
// }

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // Simulate a login process
  const res = await fetch(process.env.NUXT_PUBLIC_API_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  console.log("Login response:", data);

  if (data.success) {
    console.log("Login successful, setting user session");
    await setUserSession(event, {
      user: data?.data.user,
      token: data?.data.token,
      loggedInAt: new Date(),
    });
  }
  return data;
});
