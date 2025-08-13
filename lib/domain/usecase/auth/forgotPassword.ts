import type {
  IForgotPasswordRequest,
  IForgotPasswordResponse
} from '../../../common/types/http/auth/forgotPassword'
import type AuthRepository from '../../repository/authRepository'

export class ForgotPassword {
  authRepository: AuthRepository
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  async execute(request: IForgotPasswordRequest): Promise<IForgotPasswordResponse> {
    return await this.authRepository.forgotPassword(request)
  }
}
