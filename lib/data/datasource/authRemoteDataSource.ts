import type { $Fetch } from 'ofetch'
import type { IUser } from '../../domain/entity/user'
import type {
  ILoginRequest,
  ILoginResponse
} from '../../common/types/http/auth/login'
import type {
  IRegisterRequest,
  IRegisterResponse
} from '../../common/types/http/auth/register'
import type {
  IForgotPasswordRequest,
  IForgotPasswordResponse
} from '~~/lib/common/types/http/auth/forgotPassword'
import type {
  IResetPasswordRequest,
  IResetPasswordResponse
} from '~~/lib/common/types/http/auth/resetPassword'

abstract class AuthRemoteDataSource {
  abstract login(request: ILoginRequest): Promise<ILoginResponse>
  abstract register(
    request: IRegisterRequest
  ): Promise<IRegisterResponse>
  abstract logout(): Promise<void>
  abstract getUserSession(): Promise<IUser>
  abstract forgotPassword(
    request: IForgotPasswordRequest
  ): Promise<IForgotPasswordResponse>
  abstract resetPassword(
    request: IResetPasswordRequest
  ): Promise<IResetPasswordResponse>
}

export class AuthRemoteDataSourceImpl extends AuthRemoteDataSource {
  private static instance: AuthRemoteDataSourceImpl
  fetcher: $Fetch
  constructor(fetcher: $Fetch) {
    super()
    this.fetcher = fetcher
  }

  public static getInstance(fetcher: $Fetch): AuthRemoteDataSourceImpl {
    if (!AuthRemoteDataSourceImpl.instance) {
      AuthRemoteDataSourceImpl.instance = new AuthRemoteDataSourceImpl(fetcher)
    }
    return AuthRemoteDataSourceImpl.instance
  }

  async login(request: ILoginRequest): Promise<ILoginResponse> {
    const response = await
    this.fetcher('/auth/login', {
      method: 'POST',
      body: JSON.stringify(request.payload),
      ...request.options
    }) as ILoginResponse

    if (response.success) {
      await $fetch('/api/auth/create-session', {
        method: 'POST',
        body: JSON.stringify({
          user: response.data?.user,
          token: response.data?.token,
          loggedInAt: new Date()
        })
      })
    }
    return response
  }

  async register(
    request: IRegisterRequest
  ): Promise<IRegisterResponse> {
    const response = this.fetcher('/auth/register', {
      method: 'POST',
      body: JSON.stringify(request)
    })
    return response
  }

  logout(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  getUserSession(): Promise<IUser> {
    throw new Error('Method not implemented.')
  }

  forgotPassword(request: IForgotPasswordRequest): Promise<IForgotPasswordResponse> {
    const response = this.fetcher('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(request)
    })
    return response
  }

  resetPassword(request: IResetPasswordRequest): Promise<IResetPasswordResponse> {
    const response = this.fetcher('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(request.payload),
      ...request.options
    })
    return response
  }
}
