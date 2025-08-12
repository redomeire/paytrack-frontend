import type AuthRepository from '~~/lib/domain/repository/authRepository'
import { Login } from '../../lib/domain/usecase/auth/login'
import { Register } from '../../lib/domain/usecase/auth/register'
import { ForgotPassword } from '../../lib/domain/usecase/auth/forgotPassword'
import { ResetPassword } from '../../lib/domain/usecase/auth/resetPassword'

export default defineNuxtPlugin({
  name: 'useCases',
  dependsOn: ['repositories'],
  async setup() {
    const { $repositories } = useNuxtApp()

    // repositories
    const authRepository = $repositories.auth as AuthRepository

    // register use cases
    const useCases = {
      auth: {
        login: new Login(authRepository),
        register: new Register(authRepository),
        forgotPassword: new ForgotPassword(authRepository),
        resetPassword: new ResetPassword(authRepository)
      }
    }

    return {
      provide: {
        useCases
      }
    }
  }
})
