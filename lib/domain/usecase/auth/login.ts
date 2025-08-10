import type {
  ILoginRequest,
  ILoginResponse,
} from "~~/lib/common/types/http/auth/login";
import type AuthRepository from "../../repository/authRepository";

export class Login {
  authRepository: AuthRepository;
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }
  async execute(request: ILoginRequest): Promise<ILoginResponse> {
    return await this.authRepository.login(request);
  }
}
