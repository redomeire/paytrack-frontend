import type { IUser } from "../entity/user";
abstract class AuthRepository {
  abstract login(
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    message: string;
    data: { user: IUser; token: string };
  }>;
  abstract setUserSession(sessionData: ISession): Promise<void>;
  abstract logout(): Promise<void>;
  abstract isAuthenticated(): Promise<boolean>;
  abstract getUserInfo(): Promise<IUser>;
}

export default AuthRepository;
