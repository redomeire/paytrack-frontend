import type {
  IAuthorizeSocialLoginRequest,
  IAuthorizeSocialLoginResponse
} from '../../../common/types/http/auth/authorizeSocialLogin'
import type AuthRepository from '../../repository/authRepository'

export class AuthorizeSocialLogin {
  authRepository: AuthRepository
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  async execute(request: IAuthorizeSocialLoginRequest): Promise<IAuthorizeSocialLoginResponse> {
    return await this.authRepository.authorizeSocialLogin(request)
  }
}
