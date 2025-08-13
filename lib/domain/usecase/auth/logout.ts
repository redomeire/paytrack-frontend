import type { ILogoutResponse } from '../../../common/types/http/auth/logout'
import type AuthRepository from '../../repository/authRepository'

export class Logout {
  authRepository: AuthRepository
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  async execute(): Promise<ILogoutResponse> {
    return await this.authRepository.logout()
  }
}
