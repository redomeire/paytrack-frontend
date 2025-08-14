import type AuthRepository from '~~/lib/domain/repository/authRepository'
import { Login } from '../../lib/domain/usecase/auth/login'
import { Register } from '../../lib/domain/usecase/auth/register'
import { ForgotPassword } from '../../lib/domain/usecase/auth/forgotPassword'
import { ResetPassword } from '../../lib/domain/usecase/auth/resetPassword'
import { Logout } from '../../lib/domain/usecase/auth/logout'
import { AuthorizeSocialLogin } from '../../lib/domain/usecase/auth/authorizeSocialLogin'
import type BillRepository from '~~/lib/domain/repository/billRepository'
import { CreateBill } from '../../lib/domain/usecase/bill/createBill'
import { CreateBillCategory } from '../../lib/domain/usecase/bill/createBillCategory'
import { GetAllBillCategories } from '../../lib/domain/usecase/bill/getAllBillCategories'

export default defineNuxtPlugin({
  name: 'useCases',
  dependsOn: ['repositories'],
  async setup() {
    const { $repositories } = useNuxtApp()

    // repositories
    const authRepository = $repositories.auth as AuthRepository
    const billRepository = $repositories.bill as BillRepository

    // register use cases
    const useCases = {
      auth: {
        login: new Login(authRepository),
        register: new Register(authRepository),
        forgotPassword: new ForgotPassword(authRepository),
        resetPassword: new ResetPassword(authRepository),
        logout: new Logout(authRepository),
        authorizeSocialLogin: new AuthorizeSocialLogin(authRepository)
      },
      bill: {
        createBill: new CreateBill(billRepository),
        createBillCategory: new CreateBillCategory(billRepository),
        getAllBillCategories: new GetAllBillCategories(billRepository)
      }
    }

    return {
      provide: {
        useCases
      }
    }
  }
})
