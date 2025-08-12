import type {
  ILoginRequest,
  ILoginResponse
} from '~~/lib/common/types/http/auth/login'
import type { IUser } from '../entity/user'
import type {
  IRegisterRequest,
  IRegisterResponse
} from '~~/lib/common/types/http/auth/register'
import type { IForgotPasswordRequest, IForgotPasswordResponse } from '~~/lib/common/types/http/auth/forgotPassword'
import type {
  IResetPasswordRequest,
  IResetPasswordResponse
} from '~~/lib/common/types/http/auth/resetPassword'

abstract class AuthRepository {
  abstract login(request: ILoginRequest): Promise<ILoginResponse>
  abstract register(
    request: IRegisterRequest
  ): Promise<IRegisterResponse>
  abstract logout(): Promise<void>
  abstract isAuthenticated(): Promise<boolean>
  abstract getUserInfo(): Promise<IUser>
  abstract forgotPassword(
    request: IForgotPasswordRequest
  ): Promise<IForgotPasswordResponse>
  abstract resetPassword(
    request: IResetPasswordRequest
  ): Promise<IResetPasswordResponse>
}

export default AuthRepository
