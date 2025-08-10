import type {
  ILoginRequest,
  ILoginResponse,
} from "~~/lib/common/types/http/auth/login";
import type { IUser } from "../entity/user";
abstract class AuthRepository {
  abstract login(request: ILoginRequest): Promise<ILoginResponse>;
  abstract setUserSession(sessionData: ISession): Promise<void>;
  abstract logout(): Promise<void>;
  abstract isAuthenticated(): Promise<boolean>;
  abstract getUserInfo(): Promise<IUser>;
}

export default AuthRepository;
