import type {
  IRegisterAsyncDataResponse,
  IRegisterRequest,
} from "../../../common/types/http/auth/register";
import type AuthRepository from "../../repository/authRepository";

export class Register {
  authRepository: AuthRepository;
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }
  async execute(
    request: IRegisterRequest
  ): Promise<IRegisterAsyncDataResponse> {
    return await this.authRepository.register(request);
  }
}
