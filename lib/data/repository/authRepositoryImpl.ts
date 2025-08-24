import type {
  ILoginRequest,
  ILoginResponse
} from '~~/lib/common/types/http/auth/login'
import type { IUser } from '../../domain/entity/user'
import AuthRepository from '../../domain/repository/authRepository'
import type { AuthRemoteDataSourceImpl } from '../datasource/authRemoteDataSource'
import type {
  IRegisterRequest,
  IRegisterResponse
} from '~~/lib/common/types/http/auth/register'
import type { IForgotPasswordRequest, IForgotPasswordResponse } from '~~/lib/common/types/http/auth/forgotPassword'
import type { IResetPasswordRequest, IResetPasswordResponse } from '~~/lib/common/types/http/auth/resetPassword'
import type { ILogoutResponse } from '~~/lib/common/types/http/auth/logout'
import type { IAuthorizeSocialLoginRequest, IAuthorizeSocialLoginResponse } from '~~/lib/common/types/http/auth/authorizeSocialLogin'
import type { IChangePasswordRequest, IChangePasswordResponse } from '~~/lib/common/types/http/auth/changePassword'

export class AuthRepositoryImpl extends AuthRepository {
  private authRemoteDataSource: AuthRemoteDataSourceImpl
  constructor(authRemoteDataSource: AuthRemoteDataSourceImpl) {
    super()
    this.authRemoteDataSource = authRemoteDataSource
  }

  login(request: ILoginRequest): Promise<ILoginResponse> {
    return this.authRemoteDataSource.login(request)
  }

  register(request: IRegisterRequest): Promise<IRegisterResponse> {
    return this.authRemoteDataSource.register(request)
  }

  logout(): Promise<ILogoutResponse> {
    return this.authRemoteDataSource.logout()
  }

  isAuthenticated(): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  getUserInfo(): Promise<IUser> {
    throw new Error('Method not implemented.')
  }

  forgotPassword(request: IForgotPasswordRequest): Promise<IForgotPasswordResponse> {
    return this.authRemoteDataSource.forgotPassword(request)
  }

  resetPassword(request: IResetPasswordRequest): Promise<IResetPasswordResponse> {
    return this.authRemoteDataSource.resetPassword(request)
  }

  authorizeSocialLogin(request: IAuthorizeSocialLoginRequest): Promise<IAuthorizeSocialLoginResponse> {
    return this.authRemoteDataSource.authorizeSocialLogin(request)
  }

  changePassword(request: IChangePasswordRequest): Promise<IChangePasswordResponse> {
    return this.authRemoteDataSource.changePassword(request)
  }
}
