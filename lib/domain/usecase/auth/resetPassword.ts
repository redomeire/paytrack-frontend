import type {
  IResetPasswordRequest,
  IResetPasswordResponse
} from '../../../common/types/http/auth/resetPassword'
import type AuthRepository from '../../repository/authRepository'

export class ResetPassword {
  authRepository: AuthRepository
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  async execute(request: IResetPasswordRequest): Promise<IResetPasswordResponse> {
    return await this.authRepository.resetPassword(request)
  }
}
