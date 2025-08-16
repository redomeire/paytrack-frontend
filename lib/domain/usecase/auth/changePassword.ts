import type {
  IChangePasswordRequest,
  IChangePasswordResponse
} from '../../../common/types/http/auth/changePassword'
import type AuthRepository from '../../repository/authRepository'

export class ChangePassword {
  authRepository: AuthRepository
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  async execute(request: IChangePasswordRequest): Promise<IChangePasswordResponse> {
    return this.authRepository.changePassword(request)
  }
}
