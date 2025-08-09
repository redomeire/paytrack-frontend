import type AuthRepository from "../../repository/authRepository";
import type { ISession } from "../../../../shared/types/session";

export class SetUserSession {
  authRepository: AuthRepository;
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }
  async execute(sessionData: ISession) {
    await this.authRepository.setUserSession(sessionData);
  }
}
