import type AuthRepository from "~~/lib/domain/repository/authRepository";
import { Login } from "../../lib/domain/usecase/auth/login";
import { SetUserSession } from "../../lib/domain/usecase/auth/setUserSession";
import { Register } from "../../lib/domain/usecase/auth/register";

export default defineNuxtPlugin({
  name: "useCases",
  dependsOn: ["repositories"],
  async setup() {
    const { $repositories } = useNuxtApp();

    // repositories
    const authRepository = $repositories.auth as AuthRepository;

    // register use cases
    const useCases = {
      auth: {
        login: new Login(authRepository),
        setUserSession: new SetUserSession(authRepository),
        register: new Register(authRepository),
      },
    };

    return {
      provide: {
        useCases,
      },
    };
  },
});
