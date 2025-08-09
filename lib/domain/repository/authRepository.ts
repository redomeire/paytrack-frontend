import type { IUser } from "../entity/user";

abstract class AuthRepository {
  abstract login(email: string, password: string): Promise<string>;
  abstract logout(): Promise<void>;
  abstract isAuthenticated(): Promise<boolean>;
  abstract getUserInfo(): Promise<IUser>;
}

export default AuthRepository;
