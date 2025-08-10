import type {
  ILoginAsyncDataResponse,
  ILoginRequest,
} from "~~/lib/common/types/http/auth/login";
import type { IUser } from "../entity/user";
import type {
  IRegisterAsyncDataResponse,
  IRegisterRequest,
} from "~~/lib/common/types/http/auth/register";
abstract class AuthRepository {
  abstract login(request: ILoginRequest): Promise<ILoginAsyncDataResponse>;
  abstract setUserSession(sessionData: ISession): Promise<void>;
  abstract register(
    request: IRegisterRequest
  ): Promise<IRegisterAsyncDataResponse>;
  abstract logout(): Promise<void>;
  abstract isAuthenticated(): Promise<boolean>;
  abstract getUserInfo(): Promise<IUser>;
}

export default AuthRepository;
