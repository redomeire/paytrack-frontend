import type { IUser } from "../../entity/user";
import type AuthRepository from "../../repository/authRepository";

export class Login {
  authRepository: AuthRepository;
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }
  async execute(
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    message: string;
    data: {
      user: IUser;
      token: string;
    };
  }> {
    return await this.authRepository.login(email, password);
  }
}
